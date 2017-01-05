import React, { Component } from 'react'

import Modal from './Modal'

import '../App.css'
import './Lobby.css'

// import io from 'socket.io-client'
// let socket = io(`http://localhost:7331`)

class Lobby extends Component {
  constructor (props) {
    super(props)
    this.state = {showModal: false,
      usernameInput: '',
      roomNameInput: '',
      chatInput: '',
      room: null,
      messages: [],
      username: null,
      numOnline: -1
    }
    this.joinButtonClickHandler = this.joinButtonClickHandler.bind(this)
    this.leaveButtonClickHandler = this.leaveButtonClickHandler.bind(this)

    this.joinRoomButtonHandler = this.joinRoomButtonHandler.bind(this)
    this.handleJoinRoomChange = this.handleJoinRoomChange.bind(this)
    this.closeModalClickHandler = this.closeModalClickHandler.bind(this)

    this.chatSumbitButtonHandler = this.chatSumbitButtonHandler.bind(this)
    this.handleChatInputChange = this.handleChatInputChange.bind(this)

    this.startButtonHandler = this.startButtonHandler.bind(this)
  }

  componentDidMount () {
    let comp = this

    this.props.socket.on('join room success', function (data) {
      comp.setState(prevState => ({
        room: data.roomInfo,
        showModal: false,
        username: data.username
      }))
      comp.pushMessage({name: '', text: 'You joined the room.'})
    })

    this.props.socket.on('join room failure', function () {
      comp.setState(prevState => ({
        room: null,
        showModal: false
      }))
      comp.pushMessage({name: '', text: 'You failed to join the room.'})
    })

    this.props.socket.on('left room', function () {
      comp.setState(prevState => ({
        room: null
      }))
      comp.pushMessage({name: '', text: 'You left the room.'})
    })

    this.props.socket.on('chat message', function (message) {
      comp.pushMessage(message)
    })

    this.props.socket.on('player joined', function (data) {
      comp.setState(prevState => ({
        room: data.roomInfo
      }))
      comp.pushMessage({name: '', text: data.username + ' joined the room.'})
    })

    this.props.socket.on('player left', function (data) {
      comp.setState(prevState => ({
        room: data.roomInfo
      }))
      comp.pushMessage({name: '', text: data.username + ' left the room.'})
    })

    // 'update number online' tells the client how many people are connected to the server in total
    this.props.socket.on('update number online', function (num) {
      comp.setState(prevState => ({
        numOnline: num
      }))
    })
  }

  joinButtonClickHandler () {
    this.setState(prevState => ({
      showModal: true
    }))
  }

  leaveButtonClickHandler () {
    this.props.socket.emit('leave room')
  }

  closeModalClickHandler () {
    this.setState(prevState => ({
      showModal: false
    }))
  }

  joinRoomButtonHandler () {
    this.props.socket.emit('join room', {username: this.state.usernameInput, roomName: this.state.roomNameInput})
  }

  handleJoinRoomChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleChatInputChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  chatSumbitButtonHandler () {
    this.props.socket.emit('chat message', this.state.chatInput)
    this.setState(prevState => ({
      chatInput: ''
    }))
  }

  startButtonHandler () {
    this.props.socket.emit('start game')
  }

  pushMessage (message) {
    var messages = this.state.messages
    messages.push(message)
    this.setState({messages})
  }

  render () {
    let comp = this
    return (
      <div>
        {/* Logo and room name display */}
        <div className='lobbyInfoBar'>
          <span className='lobbyLogoBox'>
            Dopakon Kingdom
          </span>
          <span>
            # online: {this.state.numOnline}
          </span>
          <span>
            Current Room: {this.state.room ? this.state.room.name : <em>none</em>}
          </span>
          <span>
            <button id='lobby-joinButton' onClick={this.joinButtonClickHandler}>Join</button>
            <button disabled={this.state.room === null} onClick={this.state.room ? this.leaveButtonClickHandler : null} >Leave</button>
            <button disabled={this.state.room === null} onClick={this.state.room ? this.startButtonHandler : null} >Start</button>
          </span>
        </div>

        {/* Chat Area */}
        <div className='lobbyChat'>
          <div className='lobbyPlayerList'>
            Players ({this.state.room ? this.state.room.players.length : 0})
            <ul>
              { !this.state.room ? '' : this.state.room.players.map((name, i) => {
                return (
                  <li className='playerListing' key={i}>
                    <span style={name === comp.state.username ? {fontWeight: 'bold'} : {}}>
                      {name}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='lobbyChatArea'>
            <ul className='lobbyMessages'>
              { this.state.messages.map((message, i) => {
                return (
                  <li className='chatMessage' key={i} >
                    <span style={message.name === comp.state.username ? {fontWeight: 'bold'} : {}}>
                      { message.name.length > 0 ? message.name + ': ' : ''}
                    </span>
                    { message.text }
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className='lobbyChatInput'>
          Chat:
          <input type='text' style={{width: '80%', marginLeft: '10px'}} value={this.state.chatInput} name='chatInput' onChange={this.handleChatInputChange} />
          <button onClick={this.chatSumbitButtonHandler}>Send</button>
        </div>

        {/* Modal (hidden by default) */}
        <Modal show={this.state.showModal} onCloseButton={this.closeModalClickHandler}>
          Name: <input type='text' value={this.state.usernameInput} name='usernameInput' onChange={this.handleJoinRoomChange} /> <br />
          Room: <input type='text' value={this.state.roomNameInput} name='roomNameInput' onChange={this.handleJoinRoomChange} /> <br />
          <button onClick={this.joinRoomButtonHandler}>Join Room</button>
        </Modal>

      </div>
    )
  }
}

export default Lobby
