import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';
import img from '../assets/dnablackinvert.png';
import $ from 'jquery';

export default class HeaderAvatar extends React.Component {


fadeEnter() {
    $(document).ready(function() {
        $('#profileBox').fadeTo('slow', 1);
        $('#headerSection').fadeTo('fast', 0.5);
    });
}

   render() {
      return (
        <div id="avatarHeader">
            <Link to="/profile" onClick={this.fadeEnter}>
            <div id="avatarFullName">
                <div id="headerName">{cookie.load("userName")}</div>
                <div id="imgContainer"><img src={require('../assets/dnablackinvert.png')} id="avatarImage" width="33" height="33" alt="User avatar, DNA Helix" /></div>
            </div>
            </Link>
        </div>
      );
   }
}