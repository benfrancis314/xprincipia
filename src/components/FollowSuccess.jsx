import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';
import img from '../assets/dnablackinvert.png';
import $ from 'jquery';

export default class FollowSuccess extends React.Component {

    followSuccessAck() {
    $(document).ready(function() {
        $('#followSuccessBox').hide();
        $('#avatarHeader').show();
    });
    }

   render() {
      return (
        <div id="followSuccessBox" onClick={this.followSuccessAck}>
            {/*<Link to="/profile" >*/}
                <div id="notificationSuccessText">Follow Successful</div>
            {/*</Link>*/}
        </div>
      );
   }
}