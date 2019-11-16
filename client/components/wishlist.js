import React, {Component} from 'react'
import {WishlistItem} from './wishlist-item'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import firebase from '../../server/firebase'
const db = firebase.database()

export default withRouter(
  class Wishlist extends Component {
    constructor(props) {
      super(props)
      this.state = {wishlist: {}}
      this.handleClick = this.handleClick.bind(this)
      this.userToView =
        this.props.match.params.username !== this.props.currentUser &&
        this.props.match.params.username
          ? this.props.match.params.username
          : this.props.currentUser
      this.wishlistData = db.ref(`wishlist/${this.userToView}`)
    }

    handleClick() {
      this.props.history.push(`${this.userToView}/add`)
    }

    async componentDidMount() {
      const {data} = await axios.get(`/api/wishlist/${this.userToView}`)
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
          {!this.props.match.params.username && (
            <button onClick={this.handleClick}>Add Gift</button>
          )}
          {wishlist &&
            wishlistKeys.map(id => (
              <div key={id}>
                {wishlist[id].purchased === false && (
                  <WishlistItem
                    id={id}
                    item={wishlist[id]}
                    history={this.props.history}
                    match={this.props.match}
                    currentUser={this.props.currentUser}
                  />
                )}
              </div>
            ))}
        </div>
      )
    }
  }
)
