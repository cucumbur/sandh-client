import React, { Component } from 'react'
import './App.css'

import Lobby from './components/Lobby'
import Game from './components/Game'

import io from 'socket.io-client'
let socket = io(`http://localhost:7331`)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      appState: 'LOBBY'
    }
  }

  componentDidMount () {
    let comp = this

    socket.on('start game', function (data) { // TODO: implement check to make sure user is in a room, probably by moving roomInfo up from lobby view
      comp.setState(prevState => ({
        appState: 'GAME'
      }))
    })
  }
  render () {
    if (this.state.appState === 'LOBBY') {
      return (
        <div className='app'>
          <Lobby socket={socket} />
        </div>
      )
    } else if (this.state.appState === 'GAME') {
      return (
        <div className='app'>
          <Game socket={socket} />
        </div>
      )
    }
  }
}

export default App
