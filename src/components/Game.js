import React, { Component } from 'react'

import MapView from './MapView'

import './Game.css'

class Game extends Component {
  render () {
    return (
      <div className='game'>
        <div className='statusBar'>
          <img src='http://placehold.it/150x150' />
          <p> Playername </p>
          <p> 15/60hp </p>
          <p>Level: 1 Money: 3299gp </p>
        </div>
        <div className='mainMenu'>
          <ul>
            <li> Move </li>
            <li> Items </li>
            <li> Map </li>
            <li> Info </li>
          </ul>
        </div>
        <MapView socket={this.props.socket} />
        <div className='messageBar'>This is where you will recieve messages</div>
        <div className='playersBar'>
          <div className='playersBarPlayer'>
            <img src='http://placehold.it/100x100' />
            <span>Player 2</span>
            <span>Lvl 13</span>
            <span>15/20hp</span>
          </div>
          <div className='playersBarPlayer'>
            <img src='http://placehold.it/100x100' />
            <span>Player 3</span>
            <span>Lvl 20</span>
            <span>55/55hp</span>
          </div>
          <div className='playersBarPlayer'>
            <img src='http://placehold.it/100x100' />
            <span>Player 4</span>
            <span>Lvl 6</span>
            <span>10/30hp</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Game
