import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';
import img from '../assets/dnablackinvert.png';
import $ from 'jquery';

export default class CreateFailure extends React.Component {

    createFailureAck() {
    $(document).ready(function() {
        $('#createFailureBox').hide();
        $('#avatarHeader').show();
    });
    }

   render() {
      return (
        <div id="createFailureBox" onClick={this.createFailureAck}>
            {/*<Link to="/profile">*/}
                <div id="notificationFailureText">Create Failure</div>
            {/*</Link>*/}
        </div>
      );
   }
}