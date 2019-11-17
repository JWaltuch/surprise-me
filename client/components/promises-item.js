import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

//props are id, item, history, match and currentUser
export const PromisesItem = props => {
  //declare shorthand for variables
  const item = props.item.item
  const url = props.item.url
  const instructions = props.item.instructions
  const giftReceiver = props.item.for

  const handleDelete = async () => {
    await axios.delete(
      `/api/promises/${props.currentUser}/${giftReceiver}/${props.id}`
    )
  }

  return (
    <div className="list-container-item">
      <h3>Gift: {item}</h3>
      <img src="http://placekitten.com/100/200" />
      <li>
        For: <Link to={`/${giftReceiver}`}>{giftReceiver}</Link>
      </li>
      {!url || (
        <li>
          <a href={url}>Link</a>
        </li>
      )}
      {!instructions || <li>Special Instructions: {instructions}</li>}
      <button onClick={() => handleDelete()}>I Can't Get This Anymore</button>
    </div>
  )
}
