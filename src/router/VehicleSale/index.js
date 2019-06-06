import VehicleSaleList from '@/components/Resources/VehicleSale/ListPage'
import VehicleSaleShow from '@/components/Resources/VehicleSale/ShowPage'
import VehicleSaleCreate from '@/components/Resources/VehicleSale/Create/CreatePage'
import VehicleSaleEdit from '@/components/Resources/VehicleSale/Edit/EditPage'

export const vehicleSalesRoutes = [
  {
    path: '/vehicle-sale',
    name: 'VehicleSaleList',
    component: VehicleSaleList
  },
  {
    path: '/vehicle-sale/:id/show',
    name: 'VehicleSaleShow',
    component: VehicleSaleShow,
    props: { formReadonly: true }
  },
  {
    path: '/vehicle-sale/:id/edit',
    name: 'VehicleSaleEdit',
    component: VehicleSaleEdit,
    props: { formReadonly: false }
  },
  {
    path: '/vehicle-sale/create/:entry_id?',
    name: 'VehicleSaleCreate',
    component: VehicleSaleCreate,
    props: { formReadonly: false }
  }
]

export default {}
