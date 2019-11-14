import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Wishlist from './wishlist'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h1>Hello, {email}!</h1>
      <Wishlist />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
