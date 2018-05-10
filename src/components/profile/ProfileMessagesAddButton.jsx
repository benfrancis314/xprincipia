import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class WelcomeContainer extends React.Component {
   
  hoverNewMessage() {
        $(document).ready(function() {
            // $('#privateContainerMotto').html("NEW PROJECT").fadeIn(7500);
            $('#messagesHeader').html("new message").fadeIn(7500);
            $('#messagesHeader').attr('id','messagesHeaderBlue');
        });
    }
    unHoverNewMessage() {
        $(document).ready(function() {
            // $('#privateContainerMottoBlue').html("ORGANIZE YOUR THOUGHTS");
            $('#messagesHeaderBlue').html("conversations");           
            $('#messagesHeaderBlue').attr('id','messagesHeader');
        });
    }

   render() {
      return (
        <div>
            <div id="messagesHeader">
                conversations
            </div>
            <Link to="/messages/new" activeClassName="activeBlue">
                <div id="newMessageAddButton" onMouseOver={this.hoverNewMessage} onMouseOut={this.unHoverNewMessage}>
                    <img src={require('../../assets/blueAdd2.svg')} id="newMessageAddButtonImg" width="40" height="40" alt="New message button" />
                </div>
            </Link>
        </div>
      );
   }
}