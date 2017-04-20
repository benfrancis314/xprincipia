import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';
import img from '../assets/dnablackinvert.png';
import $ from 'jquery';

export default class FollowFailure extends React.Component {

    followFailureAck() {
    $(document).ready(function() {
        $('#followFailureBox').hide();
        $('#avatarHeader').show();
    });
    }

   render() {
      return (
        <div id="followFailureBox" onClick={this.followFailureAck}>
            {/*<Link to="/profile">*/}
                <div id="notificationFailureText">Post Failure</div>
            {/*</Link>*/}
        </div>
      );
   }
}