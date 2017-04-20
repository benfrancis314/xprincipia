import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';
import img from '../assets/dnablackinvert.png';
import $ from 'jquery';

export default class VoteFailure extends React.Component {

    voteFailureAck() {
    $(document).ready(function() {
        $('#voteFailureBox').hide();
        $('#avatarHeader').show();
    });
    }

   render() {
      return (
        <div id="voteFailureBox" onClick={this.voteFailureAck}>
            {/*<Link to="/profile">*/}
                <div id="notificationFailureText">Vote Failure</div>
            {/*</Link>*/}
        </div>
      );
   }
}