import React, {Component} from 'react'
import {WishlistItem} from './wishlist-item'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

export default withRouter(
  class Wishlist extends Component {
    constructor(props) {
      super(props)
      this.state = {wishlist: {}}
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
      this.props.history.push(`${this.props.username}/add`)
    }

    async componentDidMount() {
      const {data} = await axios.get(`/api/wishlist/${this.props.username}`)
      this.setState({wishlist: data})
    }

    render() {
      let wishlistKeys
      let wishlist = this.state.wishlist
      console.log(wishlist)
      if (wishlist) {
        wishlistKeys = Object.keys(wishlist)
      }
      return (
        <div>
          {this.props.match.params.username !== this.props.username && (
            <button onClick={this.handleClick}>Add Gift</button>
          )}
          <h1>Wishlist</h1>
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
