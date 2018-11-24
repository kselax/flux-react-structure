import React from 'react'

import UserStore from '../stores/UserStore'
import UserActions from '../actions/UserActions'
import { data as AppConstants } from '../constants/AppConstants'

class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: UserStore.getAllUsers(),
      user: null,
    }

    this.onChangeInput = this.onChangeInput.bind(this)
    this.onClickAddUser = this.onClickAddUser.bind(this)
    this.onClickRemoveUser = this.onClickRemoveUser.bind(this)

    this.handleAddUser = this.handleAddUser.bind(this)
    this.handleRemoveUser = this.handleRemoveUser.bind(this)
  }

  componentDidMount() {
    UserStore.addChangeListener(
      AppConstants.ADD_USER,
      this.handleAddUser)
    UserStore.addChangeListener(
      AppConstants.REMOVE_USER,
      this.handleRemoveUser)
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(
      AppConstants.ADD_USER,
      this.handleAddUser)
    UserStore.removeChangeListener(
      AppConstants.REMOVE_USER,
      this.handleRemoveUser)
  }

  handleAddUser() {
    this.setState({
      users: UserStore.getAllUsers(),
    })
  }

  handleRemoveUser() {
    this.setState({
      users: UserStore.getAllUsers(),
    })
  }

  onChangeInput(e) {
    this.setState({ user: e.target.value })
  }

  onClickAddUser(e) {
    console.log(this.state.user);
    UserActions.addUser(this.state.user)
  }

  onClickRemoveUser(e) {
    let id = e.target.attributes.id.value
    console.log('id = ', id);
    UserActions.removeUser(id)
  }

  render() {
    let users = ''
    if(this.state){
      users = this.state.users.map((e, ind) => {
        return (
          <li key={ind}>
            {e.user} &nbsp; 
            <button
              onClick={this.onClickRemoveUser}
              id={e.id}
            >remove</button>
          </li>
        )
      })
    }
    return (
      <div>
        <h1>User lists:</h1>
        <ul>
          {users}
        </ul>
        <input
          type="text"
          onChange={this.onChangeInput}
        />
        <br />
        <button 
          onClick={this.onClickAddUser}
        >Add</button>
      </div>
    )
  }
}

export default UserList