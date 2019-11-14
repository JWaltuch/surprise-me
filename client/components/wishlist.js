import React, {Component} from 'react'
import {WishlistItem} from './wishlist-item'
import axios from 'axios'

export default class Wishlist extends Component {
  constructor(props) {
    super(props)
    this.state = {wishlist: {}}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log('clicked')
    //redirect to add form?
    //put add form on page?
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
            <WishlistItem id={id} item={this.state.wishlist[id]} />
          ))}
        {/* Maps over wishlist items, each with update/del button */}
      </div>
    )
  }
}
