import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';

export default class HeaderAvatar extends React.Component {

   render() {
      return (
        <div id="headerOptionsContainer">
                <Link to="/mindtemple" id="whiteHeader" activeClassName="activePrivate">
                    <div id="headerTempleName">
                        <img src={require('../assets/templeSoftWhite.svg')} id="mindTempleButton" width="30" height="30" alt="Gear logo, link to settings"/>
                    </div>
                </Link>
                <Link to="/profile" id="whiteHeader" activeClassName="activeProfile">
                    <div id="headerName">{cookie.load("userName")}</div>
                        {/*<div id="commandButton">Command</div>*/}
                        {/*<img src={require('../assets/dnaAvatar.svg')} id="avatarImage" width="33" height="33" alt="User avatar, DNA Helix" />*/}
                </Link>
                
        </div>
      );
   }
}