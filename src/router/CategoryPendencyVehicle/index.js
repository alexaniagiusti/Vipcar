import CategoryPendencyVehicleList from '@/components/Resources/CategoryPendencyVehicle/ListPage'
import CategoryPendencyVehicleShow from '@/components/Resources/CategoryPendencyVehicle/Show/ShowPage'
import CategoryPendencyVehicleCreate from '@/components/Resources/CategoryPendencyVehicle/Create/CreatePage'
import CategoryPendencyVehicleEdit from '@/components/Resources/CategoryPendencyVehicle/Edit/EditPage'

export const categoryPendencyVehicleRoutes = [
  {
    path: '/categories-pendency',
    name: 'CategoryPendencyVehicleList',
    component: CategoryPendencyVehicleList
  },
  {
    path: '/categories-pendency/:id/show',
    name: 'CategoryPendencyVehicleShow',
    component: CategoryPendencyVehicleShow,
    props: { formReadonly: true }
  },
  {
    path: '/categories-pendency/:id/edit',
    name: 'CategoryPendencyVehicleEdit',
    component: CategoryPendencyVehicleEdit,
    props: { formReadonly: false }
  },
  {
    path: '/categories-pendency/create',
    name: 'CategoryPendencyVehicleCreate',
    component: CategoryPendencyVehicleCreate,
    props: { formReadonly: false }
  }
]

export default {}
