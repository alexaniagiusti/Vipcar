import CardOperatorsList from '@/components/Resources/CardOperators/ListPage'
import CardOperatorsShow from '@/components/Resources/CardOperators/Show/ShowPage'
import CardOperatorsCreate from '@/components/Resources/CardOperators/Create/CreatePage'
import CardOperatorsEdit from '@/components/Resources/CardOperators/Edit/EditPage'

export const cardOperatorsRoutes = [
  {
    path: '/card-operators',
    name: 'CardOperatorsList',
    component: CardOperatorsList
  },
  {
    path: '/card-operators/:id/show',
    name: 'CardOperatorsShow',
    component: CardOperatorsShow,
    props: { formReadonly: true }
  },
  {
    path: '/card-operators/:id/edit',
    name: 'CardOperatorsEdit',
    component: CardOperatorsEdit,
    props: { formReadonly: false }
  },
  {
    path: '/card-operators/create',
    name: 'CardOperatorsCreate',
    component: CardOperatorsCreate,
    props: { formReadonly: false }
  }
]

export default {}
