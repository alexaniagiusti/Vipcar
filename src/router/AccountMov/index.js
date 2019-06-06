import AccountMovList from '@/components/Resources/AccountMov/ListPage'
import AccountMovShow from '@/components/Resources/AccountMov/Show/ShowPage'
import AccountMovCreate from '@/components/Resources/AccountMov/Create/CreatePage'
import AccountMovEdit from '@/components/Resources/AccountMov/Edit/EditPage'

export const accountMovRoutes = [
  {
    path: '/account-mov',
    name: 'AccountMovList',
    component: AccountMovList
  },
  {
    path: '/account-mov/:id/show',
    name: 'AccountMovShow',
    component: AccountMovShow,
    props: { formReadonly: true }
  },
  {
    path: '/account-mov/:id/edit',
    name: 'AccountMovEdit',
    component: AccountMovEdit,
    props: { formReadonly: false }
  },
  {
    path: '/account-mov/create',
    name: 'AccountMovCreate',
    component: AccountMovCreate,
    props: { formReadonly: false }
  }
]

export default {}
