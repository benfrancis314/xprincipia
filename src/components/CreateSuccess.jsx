import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';
import img from '../assets/dnablackinvert.png';
import $ from 'jquery';

export default class CreateFailure extends React.Component {

    createSuccessAck() {
    $(document).ready(function() {
        $('#createSuccessBox').hide();
        $('#avatarHeader').show();
    });
    }

   render() {
      return (
        <div id="createSuccessBox" onClick={this.createSuccessAck}>
            {/*<Link to="/profile" >*/}
                <div id="notificationSuccessText">Create Successful</div>
            {/*</Link>*/}
        </div>
      );
   }
}