<template>
  <div>
    <div v-if="authenticated" id="app">
      <header id="header">
        <div style="text-align:center" id="logo-group">
          <span id="logo"> <img src="static/template/img/logo-pale.jpg" width="100%" alt="MSB Tech"></span>
        </div>
        <top-buttons></top-buttons>
      </header>

      <aside id="left-panel" class="hidden-print">
        <login-info></login-info class="hidden-print">
        <nav-left></nav-left class="hidden-print">
      </aside>
      <div id="main" role="main" style="overflow: auto !important;">
        <div id="ribbon" class="hidden-print">

          <!-- <span class="ribbon-button-alignment"> 
            <span id="refresh" class="btn btn-ribbon">
              <i class="fa fa-refresh"></i>
            </span> 
          </span> -->
          <!-- breadcrumb -->
          <breadcrumb></breadcrumb>
          <span v-if="this.$router.history.current.path !== '/'" class="ribbon-button-alignment pull-right">
            <!-- <span @click.prevent="$root.bus.$emit('breadcrumb-add')" class="btn btn-ribbon hidden-xs" data-title="add">
              <i class="fa fa-plus-circle"></i> Cadastrar novo
            </span> -->
            <span @click.prevent="$root.bus.$emit('breadcrumb-search')" class="btn btn-ribbon" data-title="search">
              <i class="fa fa-search"></i>
              <span class="hidden-mobile">Pesquisar</span>
            </span>
          </span>
        </div>
        <div id="content" style="overflow: auto;">
          <div clas="row">
            <message class="hidden-print"></message>
            <router-view></router-view>
          </div>
        </div>
      </div>
      <page-footer></page-footer>
    </div>
    <div v-else>
      <login-page></login-page>
    </div>
  </div>
</template>

<script>
  import '@/../static/template/css/bootstrap.min.css'
  import '@/../static/template/css/font-awesome.css'
  import '@/../static/template/css/smartadmin-production.min.css'
  import '@/../static/template/css/smartadmin-skins.min.css'
  import '@/../static/template/js/bootstrap/bootstrap.min.js'
  import '@/../static/template/js/custom.js'
  import '@/../static/template/js/notification/SmartNotification.min.js'
  import '@/../static/template/js/smartwidgets/jarvis.widget.min.js'
  import '@/../static/template/js/plugin/select2/select2.min.js'
  import '@/../static/template/js/plugin/bootstrap-slider/bootstrap-slider.min.js'
  import '@/../static/template/js/plugin/fastclick/fastclick.min.js'
  import '@/../static/template/js/plugin/masked-input/jquery.maskedinput.min.js'
  // import '@/../static/template/js/plugin/jquery-touch/jquery.ui.touch-punch.min.js'
  import '@/../static/template/js/plugin/easy-pie-chart/jquery.easy-pie-chart.min.js'
  import '@/../static/template/js/plugin/sparkline/jquery.sparkline.min.js'
  import '@/../static/template/js/plugin/jquery-validate/jquery.validate.min.js'
  import '@/../static/template/js/plugin/msie-fix/jquery.mb.browser.min.js'
  import '@/../static/template/js/plugin/flot/jquery.flot.cust.min.js'
  import '@/../static/template/js/plugin/flot/jquery.flot.resize.min.js'
  import '@/../static/template/js/plugin/vectormap/jquery-jvectormap-1.2.2.min.js'
  import '@/../static/template/js/plugin/vectormap/jquery-jvectormap-world-mill-en.js'
  import '@/../static/template/js/plugin/flot/jquery.flot.tooltip.min.js'
  import '@/../static/template/js/plugin/fullcalendar/jquery.fullcalendar.min.js'
  // import '@/../'
  import '@/../static/template/css/style.css'

  import LoginInfo from '@/components/LoginInfo'
  import TopButtons from '@/components/TopButtons'
  import PageFooter from '@/components/PageFooter'
  import NavLeft from '@/components/NavLeft'
  import LoginPage from '@/components/Auth/LoginPage'
  import jquery from 'jquery'
  import Message from '@/components/Messages/Message'
  import Breadcrumb from '@/components/Breadcrumb'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'app',
    components: {
      'login-info': LoginInfo,
      'top-buttons': TopButtons,
      'page-footer': PageFooter,
      'nav-left': NavLeft,
      'login-page': LoginPage,
      Message,
      Breadcrumb
    },
    computed: {
      ...mapState({
        authenticated: state => state.user.authenticated,
        token: state => state.user.token,
        profile: state => state.user.profile
      })
    },
    watch: {
      '$route' (to, from) {
        if (!this.authenticated && from.path !== '/') {
          jquery('body').removeClass('smart-style-3 fixed-header fixed-navigation fixed-ribbon fixed-page-footer')
        }
      }
    },
    created () {
      this.$root.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
    },
    mounted () {
      if (this.authenticated) {
        this.$root.axios.get('protected').catch((response) => {
          this.logout(this.$router)
        })

        this.afterLogged()
      }

      this.$root.bus.$on('logged', () => {
        this.afterLogged()
      })

      this.$router.beforeEach((to, from, next) => {
        this.$root.bus.$emit('close-alert')
        next()
      })
    },
    methods: {
      ...mapActions('user', [ 'logout' ]),
      afterLogged: () => {
        jquery('body').addClass('smart-style-2 fixed-header fixed-navigation fixed-ribbon fixed-page-footer')
        // jquery('select').chosen()
      }
    }
  }
</script>
