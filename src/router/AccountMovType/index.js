import AccountMovTypeList from '@/components/Resources/AccountMovType/ListPage'
import AccountMovTypeShow from '@/components/Resources/AccountMovType/Show/ShowPage'
import AccountMovTypeCreate from '@/components/Resources/AccountMovType/Create/CreatePage'
import AccountMovTypeEdit from '@/components/Resources/AccountMovType/Edit/EditPage'

export const accountMovTypeRoutes = [
  {
    path: '/account-mov-type',
    name: 'AccountMovTypeList',
    component: AccountMovTypeList
  },
  {
    path: '/account-mov-type/:id/show',
    name: 'AccountMovTypeShow',
    component: AccountMovTypeShow,
    props: { formReadonly: true }
  },
  {
    path: '/account-mov-type/:id/edit',
    name: 'AccountMovTypeEdit',
    component: AccountMovTypeEdit,
    props: { formReadonly: false }
  },
  {
    path: '/account-mov-type/create',
    name: 'AccountMovTypeCreate',
    component: AccountMovTypeCreate,
    props: { formReadonly: false }
  }
]

export default {}
