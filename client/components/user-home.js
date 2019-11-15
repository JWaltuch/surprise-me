import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Wishlist from './wishlist'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const {displayName} = props

  return (
    <div className="goldBox">
      <h1>Hello, {displayName}!</h1>
      <div className="homepage-container">
        <div>
          <h2>My Wishlist</h2>
          <Wishlist username={displayName} />
        </div>
        <h2>Users:</h2>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    displayName: state.user.displayName
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
