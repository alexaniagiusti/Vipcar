import EmployeeList from '@/components/Resources/Employee/ListPage'
import EmployeeShow from '@/components/Resources/Employee/Show/ShowPage'
import EmployeeCreate from '@/components/Resources/Employee/Create/CreatePage'
import EmployeeEdit from '@/components/Resources/Employee/Edit/EditPage'

export const employeesRoutes = [
  {
    path: '/employees',
    name: 'EmployeeList',
    component: EmployeeList
  },
  {
    path: '/employees/:id/show',
    name: 'EmployeeShow',
    component: EmployeeShow,
    props: { formReadonly: true }
  },
  {
    path: '/employees/:id/edit',
    name: 'EmployeeEdit',
    component: EmployeeEdit,
    props: { formReadonly: false }
  },
  {
    path: '/employees/create',
    name: 'EmployeeCreate',
    component: EmployeeCreate,
    props: { formReadonly: false }
  }
]

export default {}
