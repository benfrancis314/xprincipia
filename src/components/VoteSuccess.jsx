import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';
import img from '../assets/dnablackinvert.png';
import $ from 'jquery';

export default class VoteSuccess extends React.Component {

    voteSuccessAck() {
    $(document).ready(function() {
        $('#voteSuccessBox').hide();
        $('#avatarHeader').show();
    });
    }

   render() {
      return (
        <div id="voteSuccessBox" onClick={this.voteSuccessAck}>
            {/*<Link to="/profile" >*/}
                <div id="notificationSuccessText">Vote Successful</div>
            {/*</Link>*/}
        </div>
      );
   }
}