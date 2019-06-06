import AccountPlanList from '@/components/Resources/AccountPlan/ListPage'
import AccountPlanShow from '@/components/Resources/AccountPlan/ShowPage'
import AccountPlanEdit from '@/components/Resources/AccountPlan/Edit/EditPage'
import AccountPlanCreate from '@/components/Resources/AccountPlan/Create/CreatePage'

export const accountPlanRoutes = [
  {
    path: '/account-plans',
    name: 'AccountPlanList',
    component: AccountPlanList
  },
  {
    path: '/account-plans/:id/show',
    name: 'AccountPlanShow',
    component: AccountPlanShow,
    props: { formReadonly: true }
  },
  {
    path: '/account-plans/:id/edit',
    name: 'AccountPlanEdit',
    component: AccountPlanEdit,
    props: { formReadonly: false }
  },
  {
    path: '/account-plans/create',
    name: 'AccountPlanCreate',
    component: AccountPlanCreate,
    props: { formReadonly: false }
  }
]

export default {}
