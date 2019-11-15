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
      if (this.state.wishlist) {
        wishlistKeys = Object.keys(this.state.wishlist)
      }
      return (
        <div>
          <button onClick={this.handleClick}>Add Gift</button>
          <h1>My Wishlist</h1>
          {!this.state.wishlist ||
            wishlistKeys.map(id => (
              <WishlistItem
                key={id}
                id={id}
                item={this.state.wishlist[id]}
                username={this.props.username}
                history={this.props.history}
              />
            ))}
        </div>
      )
    }
  }
)
