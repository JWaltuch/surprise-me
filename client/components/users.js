import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'

export default withRouter(
  class Users extends Component {
    constructor(props) {
      super(props)
      this.state = {users: []}
    }

    async componentDidMount() {
      const {data} = await axios.get(`/api/users`)
      this.setState({users: Object.keys(data)})
    }

    render() {
      return (
        <div>
          <h2>Users: </h2>
          {this.state.users[0] && (
            <div>
              {this.state.users.map(user => {
                return (
                  <li key={user}>
                    <Link to={`/${user}`}>{user}</Link>
                  </li>
                )
              })}
            </div>
          )}
        </div>
      )
    }
  }
)
