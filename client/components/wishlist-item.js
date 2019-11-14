import React from 'react'

//props are id and item
export const WishlistItem = props => {
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
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}
