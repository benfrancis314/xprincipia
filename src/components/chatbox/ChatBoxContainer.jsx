import React, { Component } from 'react';
import cookie from 'react-cookie'
import io from 'socket.io-client'
import ChatBox from './ChatBox.jsx';
import WelcomeCreateForm from './ChatBox.jsx';
import {Config} from '../../config.js';

let socket = io(Config.CHATAPI)

class ChatBoxContainer extends Component {
  state = { data: [''] }

  componentDidMount() {    
    socket.emit('add user', cookie.load('userName'))
  }

  sendMessage = message => {
    if (cookie.load('userName') == undefined ){
      alert("you must log in")
    } else {
      socket.emit(`new message`, message)
    }
  }

  render () {
    return (
      <div id='chatBoxContainer'>
      <ChatBox 
        socket={ socket } 
        sendMessage={ this.sendMessage }
       
      />
      </div>
    )
  }
}

export default ChatBoxContainer;
