import { EventEmitter } from 'events'
import uuid from 'uuid/v4'

import AppDispatcher from '../dispatcher/AppDispatcher'
import { data as AppConstants } from '../constants/AppConstants'

let users = [
      {
        id: uuid(),
        user: "user111",
      }, {
        id: uuid(),
        user: "user2",
      }, {
        id: uuid(),
        user: "user3",
      }
    ]

const UserStore = Object.assign({}, EventEmitter.prototype, {
  getAllUsers() {
    return users
  },

  emitAddUser() {
    this.emit(AppConstants.ADD_USER)
  },

  emitRemoveUser() {
    this.emit(AppConstants.REMOVE_USER)
  },

  addChangeListener(event, callback) {
    this.on(event, callback)
  },

  removeChangeListener(event, callback) {
    this.removeListener(event, callback)
  }
})

AppDispatcher.register((action) => {
  switch (action.type) {
    case undefined: {break}

    case AppConstants.ADD_USER: {
      console.log(AppConstants.ADD_USER);
      users.push({
        id: uuid(),
        user: action.user,
      })
      UserStore.emitAddUser()
      break
    }

    case AppConstants.REMOVE_USER: {
      console.log(AppConstants.REMOVE_USER);
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === action.id) {
          users.splice(i, 1)
          UserStore.emitRemoveUser()
          break;
        }
      }
      break;
    }

    default: {}
  }
})

export default UserStore