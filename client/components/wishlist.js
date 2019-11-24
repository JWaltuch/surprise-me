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
      //if the user in the uri is the current user, or there is no
      //user in the params (so user is "home"), set the user whose list
      //we want to view to be the current, logged in user. otherwise,
      //set the user whose list we want to view to be the user in the uri
      this.userToView =
        this.props.match.params.username !== this.props.currentUser &&
        this.props.match.params.username
          ? this.props.match.params.username
          : this.props.currentUser
      //set a reference to that users wishlist for the socket
      this.wishlistData = db.ref(`wishlist/${this.userToView}`)
    }

    handleClick() {
      this.props.history.push(`${this.userToView}/add`)
    }

    async componentDidMount() {
      //puts the users list on state
      const {data} = await axios.get(`/api/wishlist/${this.userToView}`)
      this.setState({wishlist: data})
      //sets up listener on the users list
      this.wishlistData.on('value', snapshot => {
        this.setState({wishlist: snapshot.val()})
      })
    }

    componentWillUnmount() {
      this.wishlistData.off()
    }

    render() {
      //once a user's wishlist loads, make an array of its keys to map over
      //and load each item
      let wishlistKeys
      let wishlist = this.state.wishlist
      if (wishlist) {
        wishlistKeys = Object.keys(wishlist)
      }
      return (
        <div>
          <div className="list-container">
            {!this.props.match.params.username && (
              <button onClick={this.handleClick}>Add Gift</button>
            )}
            {wishlist &&
              wishlistKeys.map(id => (
                <div key={id}>
                  {(wishlist[id].promised === false ||
                    this.userToView === this.props.currentUser) && (
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
        </div>
      )
    }
  }
)
