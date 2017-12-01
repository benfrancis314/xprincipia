import React from 'react';
import {  Link  } from 'react-router';
import cookie from 'react-cookie';
import $ from 'jquery';


export default class HeaderAvatar extends React.Component {

    hoverMessagesHeader() {
        $(document).ready(function() {
            // $('#welcomeSearchFormLabel').attr('placeholder','CINEMATIC GUIDE');
            // $('#welcomeSearchFormLabel').attr('id','welcomeSearchFormLabelBlue');
            $('#logoName').html("conversations").fadeIn(7500);
            $('#logoName').attr('id','logoNameGuide');
            // Also an option for red font
            // $('#logoName').attr('id','logoNameGuideRed');
        });
      }
    unHoverMessagesHeader() {
        $(document).ready(function() {
            // Used to say SEARCH PROJECT TREES
            $('#logoNameGuide').html('XPrincipia');            
            $('#logoNameGuide').attr('id','logoName');
        });
    }
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
      hoverNotificationsHeader() {
        $(document).ready(function() {
            // $('#welcomeSearchFormLabel').attr('placeholder','CINEMATIC GUIDE');
            // $('#welcomeSearchFormLabel').attr('id','welcomeSearchFormLabelBlue');
            $('#logoName').html("updates").fadeIn(7500);
            $('#logoName').attr('id','logoNameGuide');
            // Also an option for red font
            $('#logoName').attr('id','logoNameGuideRed');
        });
      }
      unHoverNotificationsHeader() {
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
            $('#logoName').html("personal quarters").fadeIn(7500);
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
      hoverNotebook() {
        $(document).ready(function() {
            $('#logoName').html("universal notebook").fadeIn(7500);
            $('#logoName').attr('id','logoNameGuide');
        });
      }
      unHoverNotebook() {
          $(document).ready(function() {
              $('#logoNameGuide').html('XPrincipia');            
              $('#logoNameGuide').attr('id','logoName');
          });
      }
    showNotebook() {
        $(document).ready(function() {           
            $('#notebookContainer').attr('id','notebookContainerShow');
        });
    }



// Need to load notifications
// Hopefully do with a system other than cookie

   render() {
        
    if (0) {
        return (
            <div id="headerOptionsContainerNotifications">
                    <Link to="/messages" activeClassName="activePrivate">
                        <div id="headerMessagesButton" onMouseOver={this.hoverMessagesHeader} onMouseOut={this.unHoverMessagesHeader}>
                            <img src={require('../assets/comments.svg')} id="messagesHeaderImg" width="30" height="30" alt="Gear logo, link to settings"/>
                        </div>
                    </Link>
                    <Link to="/mindtemple" activeClassName="activePrivate">
                        <div id="headerTempleName" onMouseOver={this.hoverMindTemple} onMouseOut={this.unHoverMindTemple}>
                            <img src={require('../assets/templeSoftWhite.svg')} id="mindTempleButton" width="30" height="30" alt="Gear logo, link to settings"/>
                        </div>
                    </Link>
                    <Link to="/profile" activeClassName="activeProfile">
                        <div id="headerNameNotifications" onMouseOver={this.hoverProfile} onMouseOut={this.unHoverProfile}>
                            {cookie.load("userName")}
                        </div>
                    </Link>
                    <Link to="/profile/notifications" activeClassName="activeNotifications">
                        <div id="headerNotificationsButton" onMouseOver={this.hoverNotificationsHeader} onMouseOut={this.unHoverNotificationsHeader}>
                            4
                        </div>
                    </Link>
                    
            </div>
        );
    } else {
    
        return (
            <div id="headerOptionsContainer">
                    <div id="headerTabContainer">
                        <Link>
                            <div id="notebookHeaderButton" onClick ={this.showNotebook} onMouseOver={this.hoverNotebook} onMouseOut={this.unHoverNotebook}>
                                <img src={require('../assets/notebookWhite.svg')} id="mindTempleButton" width="30" height="30" alt="Gear logo, link to settings"/>
                            </div>
                        </Link>
                        <Link to="/messages" activeClassName="activePrivate">
                            <div id="headerMessagesButton" onMouseOver={this.hoverMessagesHeader} onMouseOut={this.unHoverMessagesHeader}>
                                <img src={require('../assets/comments.svg')} id="mindTempleButton" width="30" height="30" alt="Gear logo, link to settings"/>
                            </div>
                        </Link>
                        <Link to="/mindtemple" id="whiteHeader" activeClassName="activePrivate">
                            <div id="headerTempleName" onMouseOver={this.hoverMindTemple} onMouseOut={this.unHoverMindTemple}>
                                <img src={require('../assets/templeSoftWhite.svg')} id="mindTempleButton" width="30" height="30" alt="Gear logo, link to settings"/>
                            </div>
                        </Link>
                    </div>
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
}