import List from '@/components/Resources/ExpenseType/ListPage'
import Show from '@/components/Resources/ExpenseType/Show/ShowPage'
import Create from '@/components/Resources/ExpenseType/Create/CreatePage'
import Edit from '@/components/Resources/ExpenseType/Edit/EditPage'

export const expenseTypesRoutes = [
  {
    path: '/expense-types',
    name: 'ExpenseTypeList',
    component: List
  },
  {
    path: '/expense-types/:id/show',
    name: 'ExpenseTypeShow',
    component: Show,
    props: { formReadonly: true }
  },
  {
    path: '/expense-types/:id/edit',
    name: 'ExpenseTypeEdit',
    component: Edit,
    props: { formReadonly: false }
  },
  {
    path: '/expense-types/create',
    name: 'ExpenseTypeCreate',
    component: Create,
    props: { formReadonly: false }
  }
]

export default {}
