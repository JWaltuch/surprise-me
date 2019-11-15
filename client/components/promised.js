import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

export const Promised = withRouter(props => {
  const commitClick = async () => {
    await axios.put(
      `/api/wishlist/${props.match.params.username}/promise/${
        props.match.params.id
      }`
    )
    props.history.push(`/home`)
  }

  const changeMind = () => {
    props.history.push(`/home`)
  }

  return (
    <div>
      {props.match.params.username !== props.username ? (
        <div>
          Are you absolutely SURE you want to commit to this? Once you click
          this button, no one else will see this present on the wish list, so
          you better get out your credit card!
          <button onClick={commitClick}>I Promise!</button>
          <button onClick={changeMind}>Um, nevermind...</button>
        </div>
      ) : (
        <div>You do not have permission to be here!</div>
      )}
    </div>
  )
})
