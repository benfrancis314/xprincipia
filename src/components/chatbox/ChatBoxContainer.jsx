import React, { Component } from 'react';
import cookie from 'react-cookie'
import io from 'socket.io-client'
import ChatBox from './ChatBox.jsx';
import WelcomeCreateForm from './ChatBox.jsx';
import $ from 'jquery';

let socket = io(`http://localhost:8000`)

class ChatBoxContainer extends Component {
  state = { data: [''] }

  componentDidMount() {    
    socket.emit('add user', cookie.load('userName'))
  }

  sendMessage = message => {
    if (cookie.load('userName') == undefined ){
      $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
              $('#notificationFeedbackShow').attr('id','notificationFeedback');
              $('#notificationContent').html('Please <span id="blue">login </span>to add to the<span id="blue"> live debate</span>');
          });
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
