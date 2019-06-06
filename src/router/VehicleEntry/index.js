import VehicleEntryList from '@/components/Resources/VehicleEntry/ListPage'
import VehicleEntryShow from '@/components/Resources/VehicleEntry/Show/ShowPage'
import VehicleEntryCreate from '@/components/Resources/VehicleEntry/Create/CreatePage'
import VehicleEntryEdit from '@/components/Resources/VehicleEntry/Edit/EditPage'
import VehicleEntryReturn from '@/components/Resources/VehicleEntry/Edit/ReturnPage'

export const vehicleEntryRoutes = [
  {
    path: '/vehicle-entry',
    name: 'VehicleEntryList',
    component: VehicleEntryList
  },
  {
    path: '/vehicle-entry/:id/show',
    name: 'VehicleEntryShow',
    component: VehicleEntryShow,
    props: { formReadonly: true }
  },
  {
    path: '/vehicle-entry/:id/edit',
    name: 'VehicleEntryEdit',
    component: VehicleEntryEdit,
    props: { formReadonly: false }
  },
  {
    path: '/vehicle-entry/create',
    name: 'VehicleEntryCreate',
    component: VehicleEntryCreate,
    props: { formReadonly: false }
  },
  {
    path: '/vehicle-entry/:id/return',
    name: 'VehicleEntryReturn',
    component: VehicleEntryReturn,
    props: { formReadonly: false }
  }
]

export default {}
