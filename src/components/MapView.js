import React, { Component } from 'react'

import Tile from './Tile'

import './MapView.css'

class MapView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPlayer: null,
      map: null
    }
  }

  componentDidMount () {
    let comp = this

    this.props.socket.emit('map update request')

    // map update carries the view for the map
    this.props.socket.on('map update', function (map) {
      comp.setState(prevState => ({
        map: map
      }))
      console.log(map)
    })
  }

  render () {
    if (!this.state.map) {
      return (
        <div className='mapView' >
          {this.state.currentPlayer ? this.state.currentPlayer : 'NO PLAYERS TURN'}
        </div>
      )
    } else {
      // let rows = Object.keys(grid.nodes).map((v) => {
      //   return <Cell key={v} color={colors[grid.nodes[v].color]} size={grid.size} />
      // });
      let rows = []
      for (let j = 0; j < 10; j++) {
        rows.push([])
        for (let i = 0; i < 10; i++) {
          let tileColor = 'white'
          if (this.state.map[i][j] === 1) {
            tileColor = 'green'
          }
          rows[j].push(
            <Tile color={tileColor} size='10' />
          )
        }
      }

      return (
        <div className='grid'>
          {rows}
        </div>
      )
    }
  }
}

export default MapView
