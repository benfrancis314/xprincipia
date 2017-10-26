import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';
import $ from 'jquery';


export default class HeaderAvatar extends React.Component {

    hoverMindTemple() {
        $(document).ready(function() {
            // $('#welcomeSearchFormLabel').attr('placeholder','CINEMATIC GUIDE');
            // $('#welcomeSearchFormLabel').attr('id','welcomeSearchFormLabelBlue');
            $('#logoName').html("mind temple").fadeIn(7500);
            $('#logoName').attr('id','logoNameGuide');
        });
      }
      unHoverMindTemple() {
          $(document).ready(function() {
              // Used to say SEARCH PROJECT TREES
              $('#logoNameGuide').html('XPrincipia');            
              $('#logoNameGuide').attr('id','logoName');
          });
      }

      hoverProfile() {
        $(document).ready(function() {
            // $('#welcomeSearchFormLabel').attr('placeholder','CINEMATIC GUIDE');
            // $('#welcomeSearchFormLabel').attr('id','welcomeSearchFormLabelBlue');
            $('#logoName').html("command center").fadeIn(7500);
            $('#logoName').attr('id','logoNameGuide');
        });
      }
      unHoverProfile() {
          $(document).ready(function() {
              // Used to say SEARCH PROJECT TREES
              $('#logoNameGuide').html('XPrincipia');            
              $('#logoNameGuide').attr('id','logoName');
          });
      }

   render() {
      return (
        <div id="headerOptionsContainer">
                <Link to="/mindtemple" id="whiteHeader" activeClassName="activePrivate">
                    <div id="headerTempleName" onMouseOver={this.hoverMindTemple} onMouseOut={this.unHoverMindTemple}>
                        <img src={require('../assets/templeSoftWhite.svg')} id="mindTempleButton" width="30" height="30" alt="Gear logo, link to settings"/>
                    </div>
                </Link>
                <Link to="/profile" id="whiteHeader" activeClassName="activeProfile">
                    <div id="headerName" onMouseOver={this.hoverProfile} onMouseOut={this.unHoverProfile}>
                        {cookie.load("userName")}
                    </div>
                        {/*<div id="commandButton">Command</div>*/}
                        {/*<img src={require('../assets/dnaAvatar.svg')} id="avatarImage" width="33" height="33" alt="User avatar, DNA Helix" />*/}
                </Link>
                
        </div>
      );
   }
}