import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

//props are id, item, history and username
export const WishlistItem = props => {
  const updateClick = () => {
    props.history.push(`${props.username}/update/${props.id}`)
  }
  const deleteClick = async () => {
    await axios.delete(`/api/wishlist/${props.username}/${props.id}`)
    props.history.push(`/home`)
  }
  return (
    <div>
      <h3>Gift: {props.item.item}</h3>
      {!props.item.url || (
        <li>
          <a href={props.item.url}>Link</a>
        </li>
      )}
      {!props.item.instructions || (
        <li>Special Instructions: {props.item.instructions}</li>
      )}
      <button onClick={updateClick}>Edit</button>
      <button onClick={deleteClick}>Delete</button>
    </div>
  )
}
