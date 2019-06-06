<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{path: '/'}" title="Início">
          <i class="fa fa-lg fa-fw fa-home"></i>
          <span class="menu-item-parent">Início</span>
        </router-link>
      </li>
            <li>
        <router-link :to="{path: '/estoque'}" title="Estoque">
          <i class="fa fa-lg fa-fw fa-list-alt"></i>
          <span class="menu-item-parent">Estoque</span>
        </router-link>
      </li>
      <li v-if="profile.map.hasOwnProperty('vehicle-entries') || profile.map.hasOwnProperty('checklist-items') || profile.map.hasOwnProperty('expense-types')">
        <a href="#">
          <i class="fa fa-lg fa-fw fa-car"></i>
          <span class="menu-item-parent">Veículos </span>
        </a>
        <ul>
          <li v-if="profile.map.hasOwnProperty('vehicle-entries')">
            <router-link :to="{path: '/vehicle-entry'}">
              <i class="fa fa-fw fa-sign-in"></i> Entrada de veículos
            </router-link>
          </li>
          <li v-if="profile.map.hasOwnProperty('vehicle-sale')">
            <router-link :to="{path: '/vehicle-sale', query: {'verified': 'unverified', 't': 'Negociações'}}">
              <i class="fa fa-fw fa-sign-out"></i> Negociações
            </router-link>
          </li>
          <li v-if="profile.map.hasOwnProperty('vehicle-sale')">
            <router-link :to="{path: '/vehicle-sale', query: {'verified': 'verified', 't': 'Saídas'}}">
              <i class="fa fa-fw fa-sign-out"></i> Saídas
            </router-link>
          </li>
          <li v-if="profile.map.hasOwnProperty('checklist-items')">
            <router-link :to="{path: '/checklist-items'}">
              <i class="fa fa-fw fa-check-square-o"></i> Itens do checklist
            </router-link>
          </li>
          <li v-if="profile.map.hasOwnProperty('expense-types')">
            <router-link :to="{path: '/expense-types'}">
              <i class="fa fa-fw fa-window-restore"></i> Tipos de despesas
            </router-link>
          </li>
          <li v-if="profile.map.hasOwnProperty('expense-types')">
            <router-link :to="{path: '/payment-method'}">
              <i class="fa fa-fw fa-credit-card"></i> Tipos de Pagamento
            </router-link>
          </li>

          <li v-if="profile.map.hasOwnProperty('categories-pendency')">
            <router-link :to="{path: '/categories-pendency'}">
              <i class="fa fa-fw fa-tag"></i> Categorias de Pendência
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-lg fa-fw fa-money"></i>
          <span class="menu-item-parent">Entrada / Saída </span>
        </a>
        <ul>
          <li>
            <router-link :to="{path: '/expense-vehicle-plate'}">
              <i class="fa fa-fw fa-car"></i> Despesa de veículo
            </router-link>
          </li>
          <li>
            <router-link v-if="profile.map.hasOwnProperty('general-expenses')" :to="{path: '/expenses'}">
              <i class="fa fa-fw fa-refresh"></i> Despesas Gerais
            </router-link>
          </li>
          <li>
            <router-link v-if="profile.map.hasOwnProperty('account-mov')" :to="{path: '/receive'}">
              <i class="fa fa-fw fa-sign-in"></i> A Receber
            </router-link>
          </li>
          <li>
            <router-link v-if="profile.map.hasOwnProperty('account-mov')" :to="{path: '/pay'}">
              <i class="fa fa-fw fa-sign-out"></i> A Pagar
            </router-link>
          </li>
        </ul>
      </li>
      <li v-if="profile.map.hasOwnProperty('customers')">
        <router-link :to="{ path: '/customers' }">
          <i class="fa fa-lg fa-fw fa-group"></i>
          <span class="menu-item-parent">Pessoas</span>
        </router-link>
      </li>
      <li v-if="profile.map.hasOwnProperty('employees')">
        <router-link :to="{ path: '/employees' }">
          <i class="fa fa-lg fa-fw fa-user"></i>
          <span class="menu-item-parent"> Funcionários</span>
        </router-link>
      </li>
      <!-- <li v-if="profile.map.hasOwnProperty('providers')">
        <router-link :to="{ path: '/providers' }">
          <i class="fa fa-lg fa-fw fa-industry"></i>
          <span class="menu-item-parent"> Fornecedores</span>
        </router-link>
      </li> -->
      <li v-if="profile.map.hasOwnProperty('finantial')">
        <router-link :to="{path: '/finantial'}">
          <i class="fa fa-fw fa-institution"></i>
          <span class="menu-item-parent"> Financeiras </span>
        </router-link>
      </li>
      <li v-if="profile.map.hasOwnProperty('account-mov') || profile.map.hasOwnProperty('card-operators') || profile.map.hasOwnProperty('account-plans') || profile.map.hasOwnProperty('account-types')">
        <a href="#">
          <i class="fa fa-lg fa-fw fa-dollar"></i>
          <span class="menu-item-parent">Financeiro</span>
        </a>
        <ul>
          <li>
            <router-link :to="{path: '/nfe'}">
              <i class="fa fa-fw fa-archive"></i> Notas Fiscais
            </router-link>
          </li>
          <li v-if="profile.map.hasOwnProperty('vehicle-sale')">
            <router-link :to="{path: '/vehicle-sale', query: {'verified': 'unverified', 't': 'Negociações'}}">
              <i class="fa fa-fw fa-sign-out"></i> Negociações
            </router-link>
          </li>
          <li v-if="profile.map.hasOwnProperty('vehicle-sale')">
            <router-link :to="{path: '/vehicle-sale', query: {'verified': 'verified', 't': 'Saídas'}}">
              <i class="fa fa-fw fa-sign-out"></i> Saídas
            </router-link>
          </li>
          <li v-if="profile.map.hasOwnProperty('account-mov')">
            <router-link :to="{path: '/account-mov'}">
              <i class="fa fa-fw fa-exchange"></i> Contas de Mov.
            </router-link>
          </li>
          <li v-if="profile.map.hasOwnProperty('card-operators')">
            <router-link :to="{path: '/card-operators'}">
              <i class="fa fa-fw fa-credit-card"></i> Operadoras Cartão
            </router-link>
          </li>
          <li v-if="profile.map.hasOwnProperty('account-plans')">
            <router-link :to="{path: '/account-plans'}">
              <i class="fa fa-fw fa-list"></i> Planos de contas
            </router-link>
          </li>
          <li v-if="profile.map.hasOwnProperty('account-types')">
            <router-link :to="{path: '/account-mov-type'}">
              <i class="fa fa-fw fa-tag"></i> Tipos de Conta
            </router-link>
          </li>
        </ul>
      </li>
      <li v-if="profile.map.hasOwnProperty('profiles')">
        <router-link href="#" :to="{path: '/profiles'}">
          <i class="fa fa-lg fa-fw fa-tags"></i>
          <span class="menu-item-parent">Perfis</span>
        </router-link>
      </li>
      <li v-if="profile.map.hasOwnProperty('tenants')">
        <router-link :to="{path: '/tenants'}" href="#">
          <i class="fa fa-lg fa-fw fa-building"></i>
          <span class="menu-item-parent">Unidades</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/reports'}" href="#">
          <i class="fa fa-lg fa-fw fa-file"></i>
          <span class="menu-item-parent">Relatórios</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/reports-v2'}" href="#">
          <i class="fa fa-lg fa-fw fa-file"></i>
          <span class="menu-item-parent">Relatórios v2</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{path: '/configurations'}" href="#">
          <i class="fa fa-lg fa-fw fa-cog"></i>
          <span class="menu-item-parent">Configurações</span>
        </router-link>
      </li>
      <li>
        <a href="https://webmail-seguro.com.br/vipcarseminovos.com.br/" target="_blank">
          <i class="fa fa-lg fa-fw fa-at"></i>
          <span class="menu-item-parent">Email</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        authenticated: state => state.user.authenticated,
        token: state => state.user.token,
        profile: state => state.user.profile
      })
    }
  }
</script>
