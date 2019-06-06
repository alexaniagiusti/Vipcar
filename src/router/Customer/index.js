import CustomerList from '@/components/Resources/Customer/ListPage'
import CustomerShow from '@/components/Resources/Customer/Show/ShowPage'
import CustomerCreate from '@/components/Resources/Customer/Create/CreatePage'
import CustomerEdit from '@/components/Resources/Customer/Edit/EditPage'

export const customersRoutes = [
  {
    path: '/customers',
    name: 'CustomerList',
    component: CustomerList
  },
  {
    path: '/customers/:id/show',
    name: 'CustomerShow',
    component: CustomerShow,
    props: { formReadonly: true }
  },
  {
    path: '/customers/:id/edit',
    name: 'CustomerEdit',
    component: CustomerEdit,
    props: { formReadonly: false }
  },
  {
    path: '/customers/create',
    name: 'CustomerCreate',
    component: CustomerCreate,
    props: { formReadonly: false }
  }
]

export default {}
