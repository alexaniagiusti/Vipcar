import ProfileList from '@/components/Resources/Profile/ListPage'
import ProfileShow from '@/components/Resources/Profile/Show/ShowPage'
import ProfileCreate from '@/components/Resources/Profile/Create/CreatePage'
import ProfileEdit from '@/components/Resources/Profile/Edit/EditPage'

export const profileRoutes = [
  {
    path: '/profiles',
    name: 'ProfileList',
    component: ProfileList
  },
  {
    path: '/profiles/:id/show',
    name: 'ProfileShow',
    component: ProfileShow,
    props: { formReadonly: true }
  },
  {
    path: '/profiles/:id/edit',
    name: 'ProfileEdit',
    component: ProfileEdit,
    props: { formReadonly: false }
  },
  {
    path: '/profiles/create',
    name: 'ProfileCreate',
    component: ProfileCreate,
    props: { formReadonly: false }
  }
]

export default {}
