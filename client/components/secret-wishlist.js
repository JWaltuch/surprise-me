import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from '../store'
import Wishlist from './wishlist'

const SecretWishlist = props => {
  const {username} = props.match.params

  return (
    <div className="goldBox">
      {username !== props.username ? (
        <div>
          <h1>Choose something to make {username}'s day!</h1>
          <Wishlist username={username} />
        </div>
      ) : (
        <div>
          You're spoiling all the fun! You can't see what people are getting
          you! Go away!
        </div>
      )}
    </div>
  )
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

export default withRouter(connect(mapState, mapDispatch)(SecretWishlist))
