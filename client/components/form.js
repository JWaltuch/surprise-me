import React from 'react'

export const Form = props => {
  const {item, url, instructions, handleSubmit} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={item}>
        <div>
          <label htmlFor="item">
            <small>Gift Name:</small>
          </label>
          <input name="url" type="text" value={item} />
        </div>
        <div>
          <label htmlFor="url">
            <small>Link Where To Buy It: (Optional)</small>
          </label>
          <input name="url" type="text" value={url} />
        </div>
        <div>
          <label htmlFor="instructions">
            <small>Special Instructions: (Optional)</small>
          </label>
          <input name="instructions" type="text" value={instructions} />
        </div>
        <div>
          <button type="submit">Add Gift</button>
        </div>
      </form>
    </div>
  )
}
