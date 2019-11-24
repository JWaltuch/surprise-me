import React from 'react'
import {withRouter} from 'react-router-dom'

export const SearchBar = withRouter(props => {
  const goToPage = event => {
    event.preventDefault()
    let username = event.target.user.value
    props.history.push(`/${username}`)
  }

  return (
    <form className="goldBox box" onSubmit={() => goToPage(event)}>
      <label htmlFor="user">Search For User:</label>
      <input name="user" />
      <button type="submit">Go To Page</button>
    </form>
  )
})
