import React from 'react'
import axios from 'axios'

//props are id, item, history, match and username
export const WishlistItem = props => {
  const item = props.item.item
  const url = props.item.url || ''
  const instructions = props.item.instructions || ''
  const giftReceiver = props.match.params.username
  const body = {item, url, instructions, username: props.currentUser}

  const updateClick = () => {
    props.history.push(`${props.username}/update/${props.id}`)
  }

  //makes request that adds to users promise list and turns purchased on users wishlist to null
  const promiseClick = async () => {
    // props.history.push(`${props.username}/promise/${props.id}`)
    console.log(props.username)
    await axios.post(`/api/promises/${props.username}/${props.id}`, body)
  }

  const handleDelete = async () => {
    await axios.delete(`/api/wishlist/${props.username}/${props.id}`)
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
      {giftReceiver !== props.username ? (
        <div>
          {' '}
          <button onClick={updateClick}>Edit</button>
          <button onClick={handleDelete}>Delete Gift From List</button>
        </div>
      ) : (
        <div>
          I will get this present for {giftReceiver}
          <button onClick={promiseClick}>Promise</button>
        </div>
      )}
    </div>
  )
}
