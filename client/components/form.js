import React from 'react'

export const Form = props => {
  const {item, url, instructions, handleSubmit} = props

  return (
    <div>
      <form onSubmit={() => handleSubmit(event)} name={item}>
        <div>
          <label htmlFor="item">
            <small>Gift Name:</small>
          </label>
          <input name="item" type="text" defaultValue={item} />
        </div>
        <div>
          <label htmlFor="url">
            <small>Link Where To Buy It: (Optional)</small>
          </label>
          <input name="url" type="text" defaultValue={url} />
        </div>
        <div>
          <label htmlFor="instructs">
            <small>Special Instructions: (Optional)</small>
          </label>
          <input name="instructs" type="text" defaultValue={instructions} />
        </div>
        <div>
          <button type="submit">Add Gift</button>
        </div>
      </form>
    </div>
  )
}
