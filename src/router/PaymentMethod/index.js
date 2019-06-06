import PaymentMethodList from '@/components/Resources/PaymentMethod/ListPage'
import PaymentMethodShow from '@/components/Resources/PaymentMethod/Show/ShowPage'
import PaymentMethodCreate from '@/components/Resources/PaymentMethod/Create/CreatePage'
import PaymentMethodEdit from '@/components/Resources/PaymentMethod/Edit/EditPage'

export const paymentMethodRoutes = [
  {
    path: '/payment-method',
    name: 'PaymentMethodList',
    component: PaymentMethodList
  },
  {
    path: '/payment-method/:id/show',
    name: 'PaymentMethodShow',
    component: PaymentMethodShow,
    props: { formReadonly: true }
  },
  {
    path: '/payment-method/:id/edit',
    name: 'PaymentMethodEdit',
    component: PaymentMethodEdit,
    props: { formReadonly: false }
  },
  {
    path: '/payment-method/create',
    name: 'PaymentMethodCreate',
    component: PaymentMethodCreate,
    props: { formReadonly: false }
  }
]

export default {}
