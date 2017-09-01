import React, { Component } from 'react';
import cookie from 'react-cookie'
import io from 'socket.io-client'
import ChatBox from './ChatBox.jsx'

let socket = io(`http://localhost:8000`)

class ChatBoxContainer extends Component {
  state = { data: [''] }

  componentDidMount() {    
    socket.emit('add user', cookie.load('userName'))
  }

  sendMessage = message => {
    socket.emit(`new message`, message)
  }

  render () {
    return (
      <div id='chatBoxContainer'>
      <ChatBox 
        socket = { socket } 
        sendMessage = { this.sendMessage }
       
      />
      </div>
    )
  }
}

export default ChatBoxContainer;
