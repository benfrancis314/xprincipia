import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';
import img from '../assets/dnablackinvert.png';
import $ from 'jquery';

export default class NotificationSuccess extends React.Component {

    notificationSuccessAck() {
    $(document).ready(function() {
        $('#notificationSuccessBox').hide();
        $('#avatarHeader').show();
    });
    }

   render() {
      return (
        <div id="notificationSuccessBox" onClick={this.notificationSuccessAck}>
            {/*<Link to="/profile" >*/}
                <div id="notificationSuccessText">Post Successful</div>
            {/*</Link>*/}
        </div>
      );
   }
}