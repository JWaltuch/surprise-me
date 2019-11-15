import React from 'react'
import {withRouter} from 'react-router-dom'

//props are id, item, history and username
export const WishlistItem = props => {
  const updateClick = () => {
    props.history.push(`${props.username}/update`)
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
      <button>Delete</button>
    </div>
  )
}
