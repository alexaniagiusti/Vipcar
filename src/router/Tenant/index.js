import TenantList from '@/components/Resources/Tenants/ListPage'
import TenantShow from '@/components/Resources/Tenants/ShowPage'
import TenantCreate from '@/components/Resources/Tenants/Create/CreatePage'
import TenantEdit from '@/components/Resources/Tenants/Edit/EditPage'

export const tenantRoutes = [
  {
    path: '/tenants',
    name: 'TenantsList',
    component: TenantList
  },
  {
    path: '/tenants/:id/show',
    name: 'TenantsShow',
    component: TenantShow,
    props: { formReadonly: true }
  },
  {
    path: '/tenants/:id/edit',
    name: 'TenantsEdit',
    component: TenantEdit,
    props: { formReadonly: false }
  },
  {
    path: '/tenants/create',
    name: 'TenantsCreate',
    component: TenantCreate,
    props: { formReadonly: false }
  }
]

export default {}
