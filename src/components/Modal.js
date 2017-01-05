import React, { Component } from 'react'

import './Modal.css'

class Modal extends Component {
  render () {
    return (
      <div className='modal' style={this.props.show ? {display: 'block'} : {display: 'none'}} >
        <div className='modal-content'>
          <span className='modal-close' onClick={this.props.onCloseButton}>&times;</span>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Modal
