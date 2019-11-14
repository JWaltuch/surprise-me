import React, {Component} from 'react'
import axios from 'axios'

export default class Wishlist extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <button>Add Item</button>
        <h1>My Wishlist</h1>
        {/* Maps over wishlist items, each with update/del button */}
      </div>
    )
  }
}
