import React from 'react'
import './MapView.css'

// TODO: presently, this ignores the size aspect
const Tile = ({color, size}) => {
  let classString = 'tile' + ' ' + color
  return (
    <div className={classString} />
  )
}

export default Tile
