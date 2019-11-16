import React from 'react'
import axios from 'axios'

//props are id, item, history, match and currentUser
export const WishlistItem = props => {
  const item = props.item.item
  const url = props.item.url || ''
  const instructions = props.item.instructions || ''
  const body = {item, url, instructions, username: props.currentUser}
  const userToView =
    props.match.params.username !== props.currentUser &&
    props.match.params.username
      ? props.match.params.username
      : props.currentUser

  const updateClick = () => {
    props.history.push(`${userToView}/update/${props.id}`)
  }

  //makes request that adds to users promise list and turns purchased on users wishlist to null
  const promiseClick = async () => {
    await axios.post(`/api/promises/${userToView}/${props.id}`, body)
  }

  const handleDelete = async () => {
    await axios.delete(`/api/wishlist/${userToView}/${props.id}`)
  }

  return (
    <div>
      <h3>Gift: {item}</h3>
      {!url || (
        <li>
          <a href={url}>Link</a>
        </li>
      )}
      {!instructions || <li>Special Instructions: {instructions}</li>}
      {userToView === props.currentUser ? (
        <div>
          {' '}
          <button onClick={updateClick}>Edit</button>
          <button onClick={handleDelete}>Delete Gift From List</button>
        </div>
      ) : (
        <div>
          I will get this present for {userToView}
          <button onClick={promiseClick}>Promise</button>
        </div>
      )}
    </div>
  )
}
