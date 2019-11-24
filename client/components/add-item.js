import React, {Component} from 'react'
import {Form} from './form'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from '../store'
import axios from 'axios'

class AddItem extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData()
  }

  async handleSubmit(event) {
    event.preventDefault()
    const body = {
      item: event.target.item.value,
      url: event.target.url.value,
      instructions: event.target.instructions.value
    }
    await axios.post(`/api/wishlist/${this.props.username}`, body)
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className="box">
        {this.props.username === this.props.match.params.username ? (
          <div>
            <h1>Add Gift: </h1>
            <Form
              item=""
              url=""
              instructions=""
              handleSubmit={this.handleSubmit}
            />
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
    username: state.user.displayName
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}
export default withRouter(connect(mapState, mapDispatch)(AddItem))
