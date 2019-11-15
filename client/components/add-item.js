import React, {Component} from 'react'
import {Form} from './form'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from '../store'
import axios from 'axios'

class AddItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData()
  }

  handleClick() {
    console.log('clicked')
  }

  async handleSubmit(event) {
    event.preventDefault()
    const body = {
      item: event.target.item.value,
      url: event.target.url.value,
      instructs: event.target.instructs.value
    }
    await axios.post(`/api/wishlist/${this.props.username}`, body)
    this.props.history.push('/home')
  }

  render() {
    return (
      <div>
        <h1>Add Gift: </h1>
        <Form item="" url="" instructions="" handleSubmit={this.handleSubmit} />
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

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(AddItem))
