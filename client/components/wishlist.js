import React, {Component} from 'react'
import {WishlistItem} from './wishlist-item'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import firebase from '../../server/firebase'
const db = firebase.database()
// import {db} from '../../server/api/wishlist'
// import app from 'firebase/app'

//to use config with secrets, just import secrets. duh
// if (process.env.NODE_ENV !== 'production') require('../secrets')
// var config = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: 'surpriseme-ce130.firebaseapp.com',
//   databaseURL: process.env.DATABASE_URL,
//   projectId: 'surpriseme-ce130',
//   storageBucket: 'surpriseme-ce130.appspot.com',
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: 'G-S6C7MLVB57'
// }

export default withRouter(
  class Wishlist extends Component {
    constructor(props) {
      super(props)
      this.state = {wishlist: {}}
      this.handleClick = this.handleClick.bind(this)
      this.wishlistData = db.ref(`wishlist/${this.props.username}`)
    }

    handleClick() {
      this.props.history.push(`${this.props.username}/add`)
    }

    async componentDidMount() {
      const {data} = await axios.get(`/api/wishlist/${this.props.username}`)
      this.setState({wishlist: data})
      this.wishlistData.on('value', snapshot => {
        this.setState({wishlist: snapshot.val()})
      })
    }

    componentWillUnmount() {
      this.wishlistData.off()
    }

    render() {
      let wishlistKeys
      let wishlist = this.state.wishlist
      if (wishlist) {
        wishlistKeys = Object.keys(wishlist)
      }
      return (
        <div>
          {this.props.match.params.username !== this.props.username && (
            <button onClick={this.handleClick}>Add Gift</button>
          )}
          {!wishlist ||
            wishlistKeys.map(id => (
              <div key={id}>
                {wishlist[id].purchased === false && (
                  <WishlistItem
                    id={id}
                    item={wishlist[id]}
                    username={this.props.username}
                    history={this.props.history}
                    match={this.props.match}
                  />
                )}
              </div>
            ))}
        </div>
      )
    }
  }
)
