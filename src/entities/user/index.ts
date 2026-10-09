export {
  userReducer,
  userActions,
  getUserAuthData,
  getUserInited,
  getUserRole,
  getUserIsAdmin,
  getUserIsUser,
  getUserIsManager,
} from './model/slices/userSlice'
export { userRole } from './model/consts/consts'
export type { UserRole } from './model/consts/consts'
export type { UserSchema, User } from './model/types/user'
