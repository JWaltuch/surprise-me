import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Wishlist from './wishlist'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const {username} = props

  return (
    <div>
      <h1>Hello, {email}!</h1>
      <Wishlist username={username} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    username: state.user.username
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  username: PropTypes.string
}
