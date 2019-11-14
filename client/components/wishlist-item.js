import React from 'react'

//props are id and item
export const WishlistItem = props => {
  console.log('props', props)
  return <div>{props.item}</div>
}
