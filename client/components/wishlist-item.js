import React from 'react'
import axios from 'axios'

//props are id, item, history, match and username
export const WishlistItem = props => {
  const updateClick = () => {
    props.history.push(`${props.username}/update/${props.id}`)
  }

  const commitClick = () => {
    props.history.push(`${props.username}/promise/${props.id}`)
  }

  const handleDelete = async () => {
    await axios.delete(`/api/wishlist/${props.username}/${props.id}`)
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
      {props.match.params.username !== props.username ? (
        <div>
          {' '}
          <button onClick={updateClick}>Edit</button>
          <button onClick={handleDelete}>Delete Gift From List</button>
        </div>
      ) : (
        <div>
          Click here to commit to getting this present! No take backs!
          <button onClick={commitClick}>Promise</button>
        </div>
      )}
    </div>
  )
}
