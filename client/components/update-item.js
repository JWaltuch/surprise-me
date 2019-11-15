import React, {Component} from 'react'
import {Form} from './form'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from '../store'
import axios from 'axios'

class UpdateItem extends Component {
  constructor(props) {
    super(props)
    this.state = {item: '', url: '', instructions: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    this.props.loadInitialData()
    let {data} = await axios.get(
      `/api/wishlist/${this.props.username}/${this.props.match.params.id}`
    )
    this.setState(data)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const body = {
      item: event.target.item.value,
      url: event.target.url.value,
      instructions: event.target.instructions.value
    }
    await axios.put(
      `/api/wishlist/${this.props.username}/${this.props.match.params.id}`,
      body
    )
    this.props.history.push('/home')
  }

  async handleDelete() {
    await axios.delete(
      `/api/wishlist/${this.props.username}/${this.props.match.params.id}`
    )
    this.props.history.push(`/home`)
  }

  render() {
    return (
      <div>
        {this.props.username === this.props.match.params.username ? (
          <div>
            <h1>Update Gift Listing: </h1>
            <Form
              item={this.state.item}
              url={this.state.url}
              instructions={this.state.instructions}
              handleSubmit={this.handleSubmit}
            />
            <button onClick={this.handleDelete}>Delete Gift From List</button>
          </div>
        ) : (
          <div>You do not have permission to modify this list!</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    username: state.user.username
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(UpdateItem))
