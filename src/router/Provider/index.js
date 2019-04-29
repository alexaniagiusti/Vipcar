import ProvidersList from '@/components/Resources/Provider/ListPage'
import ProvidersShow from '@/components/Resources/Provider/Show/ShowPage'
import ProvidersCreate from '@/components/Resources/Provider/Create/CreatePage'
import ProvidersEdit from '@/components/Resources/Provider/Edit/EditPage'

export const providerRoutes = [
  {
    path: '/providers',
    name: 'ProvidersList',
    component: ProvidersList
  },
  {
    path: '/providers/:id/show',
    name: 'ProvidersShow',
    component: ProvidersShow,
    props: { formReadonly: true }
  },
  {
    path: '/providers/:id/edit',
    name: 'ProvidersEdit',
    component: ProvidersEdit,
    props: { formReadonly: false }
  },
  {
    path: '/providers/create',
    name: 'ProvidersCreate',
    component: ProvidersCreate,
    props: { formReadonly: false }
  }
]

export default {}
