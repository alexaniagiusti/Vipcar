import FinantialList from '@/components/Resources/Finantial/ListPage'
import FinantialShow from '@/components/Resources/Finantial/Show/ShowPage'
import FinantialCreate from '@/components/Resources/Finantial/Create/CreatePage'
import FinantialEdit from '@/components/Resources/Finantial/Edit/EditPage'

export const finantialRoutes = [
  {
    path: '/finantial',
    name: 'FinantialList',
    component: FinantialList
  },
  {
    path: '/finantial/:id/show',
    name: 'FinantialShow',
    component: FinantialShow,
    props: { formReadonly: true }
  },
  {
    path: '/finantial/:id/edit',
    name: 'FinantialEdit',
    component: FinantialEdit,
    props: { formReadonly: false }
  },
  {
    path: '/finantial/create',
    name: 'FinantialCreate',
    component: FinantialCreate,
    props: { formReadonly: false }
  }
]

export default {}
