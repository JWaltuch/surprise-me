import React, {Component} from 'react'
import {WishlistItem} from './wishlist-item'
import axios from 'axios'

export default class Wishlist extends Component {
  constructor(props) {
    super(props)
    this.state = {wishlist: {}}
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
        <button>Add Item</button>
        <h1>My Wishlist</h1>
        {!this.state.wishlist ||
          wishlistKeys.map(id => (
            <WishlistItem id={id} item={this.state.wishlist[id].item} />
          ))}
        {/* Maps over wishlist items, each with update/del button */}
      </div>
    )
  }
}
