<template>
  <div>
    <form @submit.prevent>
      <div v-if="submitted" :class="{
        'alert-danger': !loginIsValid && submitted,
        'in': submitted,
        'alert-success': loginIsValid && submitted
        }" class="alert fade">
        <button @click="hideMessage" class="close">
          ×
        </button>
        <i :class="'fa-fw fa fa-' + icon"></i>
        <strong>{{ title }}!</strong> {{ message }}
      </div>
      <fieldset>
      <section>
      <label class="label">
        <i class="fa fa-at"></i> Email
      </label>
      <label :class="{
        'state-error': fields.failed('email'),
        'state-success': fields.valid('email')
      }" class="input">

        <input v-validate="emailRule" type="text" autocomplete="off" name="email" v-model="email">

        <b class="tooltip tooltip-top-right">
          <i class="fa fa-lock txt-color-teal"></i>
          Preencha o Email
        </b>
        <span v-show="fields.failed('email')">
          <i class="fa text-danger fa-warning"></i>
          {{ errors.first('email') }}
        </span>
      </label>
    </section>
    <section>
      <label class="label">
        <i class="fa fa-key"></i> Senha
      </label>
      <label :class="{
        'state-error': fields.failed('password'),
        'state-success': fields.valid('password')
      }" class="input"> 
        <input  v-validate="passwordRule" type="password" autocomplete="off" name="password" v-model="password">

        <b class="tooltip tooltip-top-right">
          <i class="fa fa-lock txt-color-teal"></i>
          Preencha a senha
        </b>
        <span v-show="fields.failed('password')">
          <i class="fa text-danger fa-warning"></i>
          {{ errors.first('password') }}
        </span>
      </label>
    </section>
    <section v-if="needTenant">
      <label class="label">
        <i class="fa fa-building"></i> Unidade
      </label>
      <label class="input"> 
        <select v-model="selectedTenant" class="form-control">
          <option :value="null"> <== Selecione ==> </option>
          <option :value="tenant.tenant.id_key" v-for="tenant in availableTenants">{{ tenant.tenant.tenant_fancy_name }}</option>
        </select>
      </label>
    </section>
        <!-- <section>
      <label class="label">
      <i :class="'fa fa-' + icon"></i> {{ label }}
      </label>
      <label :class="{
        'state-error': failed,
        'state-success': valid
      }" class="input">

        <input
          v-if="type === 'text'"
          @input="onInput"
          type="text"
          autocomplete="off"
          :name="name"
          v-model="value">

          <input
          v-else-if="type === 'password'"
          @input="onInput"
          type="text"
          autocomplete="off"
          :name="name"
          v-model="value">

        <b class="tooltip tooltip-top-right">
          <i class="fa fa-lock txt-color-teal"></i>
          {{ placeholder }}
        </b>
        <span v-show="failed">
          <i class="fa text-danger fa-warning"></i>
          {{ customError }}
        </span>
      </label>
    </section> -->
        <!-- <section>
          <text-field
          placeholder="Preencha o email" label="Email" icon="at"
          v-validate="emailRule" data-vv-name="email" v-model="email"
          :custom-error="errors.first('email')" :valid="fields.valid('email')"
          :failed="fields.failed('email')"
          >
        </text-field>
      </section> -->
      <!-- <section>
        <password-field placeholder="Preencha a Senha" label="Senha" icon="key" name="password" v-validate="passwordRule" data-vv-name="password" v-model="password"
        :custom-error="errors.first('password')" :valid="fields.valid('password')"
        :failed="fields.failed('password')"></password-field>
      </section> -->
    </fieldset>
    <footer>
    <!-- :disabled="!this.fields.passed()" -->
      <button  @click="attempt" type="submit" class="btn btn-block btn-primary">
        <i class="fa fa-sign-in"></i> Entrar
      </button>
    </footer>
  </form>
</div>
</template>

<script>
  import { debounce } from 'lodash'
  import { mapActions, mapState } from 'vuex'
  export default {
    data () {
      return {
        email: '',
        password: '',
        emailRule: '',
        passwordRule: '',
        loginIsValid: false,
        submitted: false,
        message: '',
        title: '',
        icon: '',
        needTenant: false,
        availableTenants: [],
        selectedTenant: null
      }
    },
    computed: {
      ...mapState({
        authenticated: state => state.user.authenticated,
        token: state => state.user.token
      })
    },
    beforeCreate () {
      this.$root.axios.get('auth/login/rules').then(({ data }) => {
        let rules = data.rules
        Object.keys(rules).forEach((prop, index) => {
          this[prop + 'Rule'] = rules[prop]
        })
      })
    },
    methods: {
      hideMessage () {
        this.submitted = false
      },
      doLogin (loginReponse) {
        this.loginIsValid = !this.loginIsValid
        this.submitted = true
        this.title = 'Login efetuado'
        this.message = 'Aguarde o credenciamento...'
        this.icon = 'check-circle'

        this.$root.axios.get(`profiles/${loginReponse.user.profile_id}`, {
          headers: {
            'Authorization': `Bearer ${loginReponse.token}`
          }
        }).then(({data}) => {
          var callbackDebounced = debounce(() => {
            loginReponse.profile = data.data
            this.login(loginReponse)
            this.$root.bus.$emit('logged')
            window.location.reload()
          }, 2000)
          callbackDebounced()
        })
      },
      ...mapActions('user', [ 'login' ]),
      attempt () {
        this.$validator.validateAll().then(() => {
          this.$root.axios.post('auth/login', {
            email: this.email,
            password: this.password
          }).then(({data}) => {
            var userResponse = data

            this.$root.axios.get('user-tenants', {
              params: {
                'q': `user_id:${data.user.id}`,
                'sf': 'user_id:='
              },
              headers: {
                'Authorization': `Bearer ${data.token}`
              }
            }).then(({data}) => {
              var response = data.data.data
              if (response.length === 0) {
                this.loginIsValid = false
                this.submitted = true
                this.title = 'Falha ao entrar'
                this.message = 'Usuário sem permissão nas unidades...'
                this.icon = 'times-circle'
              } else {
                if (response.length === 1) {
                  window.localStorage.setItem('current-tenant', response[0].tenant.id)
                  window.localStorage.setItem('current-tenant-idkey', response[0].tenant.id_key)
                  this.doLogin(userResponse)
                } else {
                  if (this.selectedTenant) {
                    window.localStorage.setItem('current-tenant-idkey', this.selectedTenant)
                    this.doLogin(userResponse)
                  } else {
                    this.needTenant = true
                    this.availableTenants = response
                  }
                }
              }
            })
          }).catch(() => {
            this.loginIsValid = false
            this.submitted = true
            this.title = 'Não autorizado'
            this.message = 'Verifique seu usuário/senha.'
            this.icon = 'times'
          })
        }).catch(() => {
          this.loginIsValid = false
          this.submitted = true
          this.title = 'Falha ao entrar'
          this.message = 'Verifique os dados preenchidos.'
          this.icon = 'times'
        })
      }
    }
  }
</script>
