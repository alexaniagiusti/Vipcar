import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NovoEstoque from '@/components/NovoEstoque'
import ReportsV2 from '@/components/ReportsV2'
import Report from '@/components/Report'
import Config from '@/components/Config'
import { tenantRoutes } from '@/router/Tenant'
import { vehicleSalesRoutes } from '@/router/VehicleSale'
import { accountPlanRoutes } from '@/router/AccountPlan'
import { accountMovTypeRoutes } from '@/router/AccountMovType'
import { cardOperatorsRoutes } from '@/router/CardOperators'
import { accountMovRoutes } from '@/router/AccountMov'
import { finantialRoutes } from '@/router/Finantial'
import { providerRoutes } from '@/router/Provider'
import { employeesRoutes } from '@/router/Employee'
import { customersRoutes } from '@/router/Customer'
import { vehicleEntryRoutes } from '@/router/VehicleEntry'
import { checklistItemRoutes } from '@/router/ChecklistItem'
import { expenseTypesRoutes } from '@/router/ExpenseType'
import { profileRoutes } from '@/router/Profile'
import { paymentMethodRoutes } from '@/router/PaymentMethod'
import { categoryPendencyVehicleRoutes } from '@/router/CategoryPendencyVehicle'
import ExpenseVehiclePlate from '@/components/Resources/ExpenseVehiclePlate/ListPage'
import NotasFiscaisList from '@/components/Resources/NotasFiscaisList'
import GeneralExpenseComponent from '@/components/Resources/GeneralExpense/MainPage'
import BillToReceive from '@/components/Resources/BillToReceive'
import BillToPay from '@/components/Resources/BillToPay'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/estoque',
      name: 'Estoque',
      component: NovoEstoque
    },
    {
      path: '/reports-v2',
      name: 'ReportsV2',
      component: ReportsV2
    },
    {
      path: '/nfe',
      name: 'NotasFiscais',
      component: NotasFiscaisList
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Report
    },
    {
      path: '/expense-vehicle-plate',
      name: 'ExpenseVehiclePlate',
      component: ExpenseVehiclePlate
    },
    {
      path: '/expenses',
      name: 'GeneralExpense',
      component: GeneralExpenseComponent
    },
    {
      path: '/configurations',
      name: 'Config',
      component: Config
    },
    {
      path: '/receive',
      name: 'Receive',
      component: BillToReceive
    },
    {
      path: '/pay',
      name: 'Pay',
      component: BillToPay
    },
    ...tenantRoutes,
    ...accountPlanRoutes,
    ...accountMovTypeRoutes,
    ...cardOperatorsRoutes,
    ...accountMovRoutes,
    ...finantialRoutes,
    ...providerRoutes,
    ...employeesRoutes,
    ...customersRoutes,
    ...vehicleEntryRoutes,
    ...checklistItemRoutes,
    ...expenseTypesRoutes,
    ...profileRoutes,
    ...vehicleSalesRoutes,
    ...paymentMethodRoutes,
    ...categoryPendencyVehicleRoutes
  ]
})

export default router
