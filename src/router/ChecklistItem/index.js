import ChecklistItemList from '@/components/Resources/ChecklistItem/ListPage'
import ChecklistItemShow from '@/components/Resources/ChecklistItem/Show/ShowPage'
import ChecklistItemCreate from '@/components/Resources/ChecklistItem/Create/CreatePage'
import ChecklistItemEdit from '@/components/Resources/ChecklistItem/Edit/EditPage'

export const checklistItemRoutes = [
  {
    path: '/checklist-items',
    name: 'ChecklistItemList',
    component: ChecklistItemList
  },
  {
    path: '/checklist-items/:id/show',
    name: 'ChecklistItemShow',
    component: ChecklistItemShow,
    props: { formReadonly: true }
  },
  {
    path: '/checklist-items/:id/edit',
    name: 'ChecklistItemEdit',
    component: ChecklistItemEdit,
    props: { formReadonly: false }
  },
  {
    path: '/checklist-items/create',
    name: 'ChecklistItemCreate',
    component: ChecklistItemCreate,
    props: { formReadonly: false }
  }
]

export default {}
