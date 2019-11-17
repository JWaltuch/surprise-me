import React from 'react'
import axios from 'axios'

//props are id, item, history, match and currentUser
export const WishlistItem = props => {
  //declare shorthand for variables
  const item = props.item.item
  const url = props.item.url || ''
  const instructions = props.item.instructions || ''
  //set up a the body for building a promise with a post request
  const body = {item, url, instructions, username: props.currentUser}
  //if the user in the uri is the current user, or there is no
  //user in the params (so user is "home"), set the user whose list
  //we want to view to be the current, logged in user. otherwise,
  //set the user whose list we want to view to be the user in the uri
  const userToView =
    props.match.params.username !== props.currentUser &&
    props.match.params.username
      ? props.match.params.username
      : props.currentUser

  const updateClick = () => {
    props.history.push(`${userToView}/update/${props.id}`)
  }

  const promiseClick = async () => {
    //makes request that adds item to currentUser's promise list and
    //switches "promised" on userToView's wishlist item to false
    await axios.post(`/api/promises/${userToView}/${props.id}`, body)
  }

  const handleDelete = async () => {
    await axios.delete(`/api/wishlist/${userToView}/${props.id}`)
  }

  return (
    <div className="list-container-item">
      <h3>Gift: {item}</h3>
      <img src="http://placekitten.com/100/200" />
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
          <button onClick={promiseClick}>
            I will get this present for {userToView}
          </button>
        </div>
      )}
    </div>
  )
}
