import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';
import img from '../assets/dnablackinvert.png';
import $ from 'jquery';

export default class NotificationFailure extends React.Component {

    notificationFailureAck() {
    $(document).ready(function() {
        $('#notificationFailureBox').hide();
        $('#avatarHeader').show();
    });
    }

   render() {
      return (
        <div id="notificationFailureBox" onClick={this.notificationFailureAck}>
            {/*<Link to="/profile">*/}
                <div id="notificationFailureText">Post Failure</div>
            {/*</Link>*/}
        </div>
      );
   }
}