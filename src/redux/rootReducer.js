// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import usersList from './usersList'
import postsList from './postsList'
import commentsList from './commentsList'
import todo from '@src/views/apps/todo/store'
import chat from './chat'
import users from '@src/views/apps/user/store'
import email from '@src/views/apps/email/store'
import invoice from '@src/views/apps/invoice/store'
import calendar from '@src/views/apps/calendar/store'
import ecommerce from '@src/views/apps/ecommerce/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'

const rootReducer = {
  auth,
  todo,
  chat,
  email,
  users,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions,
  usersList,
  postsList,
  commentsList
}

export default rootReducer
