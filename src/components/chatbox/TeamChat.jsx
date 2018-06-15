import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link  } from 'react-router';

export default class TeamChat extends React.Component {

  constructor(props){ 
    super(props);

    this.state= {
      on: '',
    }

    this.onChat = this.onChat.bind(this);
    this.offChat = this.offChat.bind(this);
  };
  unHoverText() {
    
}

  onChat() {
    this.setState({
      on: 'on',
    })
  }

  offChat() {
    this.setState({
      on: 'off',
    })
  }


   render() {
    if (this.state.on === 'on') {
      return (

        <div id="teamChatContainer">
          <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" onClick={this.offChat} />            
          <div id="teamChatHeader">
            team chat
          </div>
          <div id="teamChatInterface">
            <div id="teamChatList">
              <div id="teachChatTeamUnitNew">
                <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="50" height="50" alt="User avatar, DNA Helix" />
              </div>
              <div id="teachChatTeamUnit">
                tom.frawley
              </div>
              <div id="teachChatTeamUnit">
                madelyn.sather
              </div>
            </div>
            <div id="teamChatMessagesContainer">
            </div>
          </div>
        </div> 

      );
    } else if (cookie.load('userName')) {
      return (

        <div id="teamChatButtonContainer" onClick={this.onChat}>
          team chat
        </div> 

      );
    }  else {
      return (

        <div id="noDisplay">
        </div> 

      );
    }
      
   }
}