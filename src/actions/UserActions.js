import AppDispatcher from '../dispatcher/AppDispatcher'
import { data as AppConstants } from '../constants/AppConstants'

const UserActions = {
  addUser(user) {
    AppDispatcher.dispatch({
      type: AppConstants.ADD_USER,
      user: user,
    })
  },

  removeUser(id) {
    AppDispatcher.dispatch({
      type: AppConstants.REMOVE_USER,
      id: id,
    })
  }
}

export default UserActions