import Vue from 'vue'
import Vuex from 'vuex'

import { stateUser } from '@/store/user/state'
import { actionUser } from '@/store/user/actions'
import { mutationsUser } from '@/store/user/mutations'

import { stateReserveVehicle } from '@/store/reserveVehicle/state'
import { actionsReserveVehicle } from '@/store/reserveVehicle/actions'
import { mutationsReserveVehicle } from '@/store/reserveVehicle/mutations'

import { stateBreadcrumb } from '@/store/breadcrumbs'
import { actionBreadcrumb } from '@/store/breadcrumbs/actions'
import { mutationsBreadcrumb } from '@/store/breadcrumbs/mutations'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      state: {
        ...stateUser
      },
      actions: {
        ...actionUser
      },
      mutations: {
        ...mutationsUser
      }
    },
    breadcrumb: {
      namespaced: true,
      state: {
        ...stateBreadcrumb
      },
      actions: {
        ...actionBreadcrumb
      },
      mutations: {
        ...mutationsBreadcrumb
      }
    },
    reserveVehicle: {
      state: {
        ...stateReserveVehicle
      },
      actions: {
        ...actionsReserveVehicle
      },
      mutations: {
        ...mutationsReserveVehicle
      }
    }
  }
})

export default store
