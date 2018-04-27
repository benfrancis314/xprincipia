import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import $ from 'jquery';


export default class HeaderAvatar extends React.Component {

constructor(props){
    super(props);

    this.state = {
        notification: '',
        messageNotifications: '',
        messageButtonID: '',
    }
    this.clearMessageNotifications = this.clearMessageNotifications.bind(this)

    // this.renderItem = this.renderItem.bind(this)
};
componentDidMount(){
    var self = this;
        // return axios.get( Config.API + '/notifications/number?username='+cookie.load("userName")).then(function (response) {
            self.setState({
                notification: this.props.notification
            })
        // }) 
        axios.get( Config.API + '/messagenotifications/number?username='+cookie.load("userName")).then(function (response) {
            if (response.data == '0') {
                self.setState({
                    messageNotifications: '',
                    messageButtonID: 'headerMessagesButton',
                })
            } else {
                self.setState({
                    messageNotifications: response.data,
                    messageButtonID: 'headerMessagesButtonNotifications',
                })
            }
        }) 
}
// componentWillReceiveProps(nextState) {
//     var self = this;
//     return axios.get( Config.API + '/notifications/number?username='+cookie.load("userName")).then(function (response) {
//         nextState({
//             notification: response.data
//         })
//     }) 
// }


    clearMessageNotifications() {
        this.setState({
            messageNotifications: '',
            messageButtonID: 'headerMessagesButton',
          })
        axios.get( Config.API + '/messagenotifications/clear?username='+cookie.load("userName")).then(function (response) {
        }) 
    }

    hoverMessagesHeader() {
        $(document).ready(function() {
            // $('#welcomeSearchFormLabel').attr('placeholder','CINEMATIC GUIDE');
            // $('#welcomeSearchFormLabel').attr('id','welcomeSearchFormLabelBlue');
            $('#logoName').html("messages").fadeIn(7500);
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
        
    if (this.props.notification != ('0' || undefined)) {
    // if (1) {
        return (
            <div id="headerOptionsContainerNotifications">
            {/* <div id="headerOptionsContainer"> */}
                <div id="headerTabContainer">
                    <Link>
                        <div id="notebookHeaderButton" onClick={this.showNotebook} onMouseOver={this.hoverNotebook} onMouseOut={this.unHoverNotebook}>
                            <img src={require('../assets/notebookWhite.svg')} id="mindTempleButton" width="30" height="30" alt="Gear logo, link to settings"/>
                        </div>
                    </Link>
                    <Link to="/messages" activeClassName="activePrivate">
                        <div id={this.state.messageButtonID} onMouseOver={this.hoverMessagesHeader} onMouseOut={this.unHoverMessagesHeader} onClick={this.clearMessageNotifications}>
                            {this.state.messageNotifications}
                        </div>
                    </Link>
                    <Link to="/mindtemple" id="whiteHeader" activeClassName="activePrivate">
                        <div id="headerTempleName" onMouseOver={this.hoverMindTemple} onMouseOut={this.unHoverMindTemple}>
                            <img src={require('../assets/templeSoftWhite.svg')} id="mindTempleButton" width="30" height="30" alt="Gear logo, link to settings"/>
                        </div>
                    </Link>
                </div>
                <Link to="/profile" activeClassName="activeProfile">
                    <div id="headerNameNotifications" onMouseOver={this.hoverProfile} onMouseOut={this.unHoverProfile}>
                        {cookie.load("userName")}
                    </div>
                </Link>
                <Link to="/profile/notifications" activeClassName="activeNotifications">
                    <div id="headerNotificationsButton" onMouseOver={this.hoverNotificationsHeader} onMouseOut={this.unHoverNotificationsHeader}>
                        {this.props.notification}
                    </div>
                </Link>
            </div>
        );
    } else {
    
        return (
            <div id="headerOptionsContainer">
                    <div id="headerTabContainer">
                        <Link>
                            <div id="notebookHeaderButton" onClick={this.showNotebook} onMouseOver={this.hoverNotebook} onMouseOut={this.unHoverNotebook}>
                                <img src={require('../assets/notebookWhite.svg')} id="mindTempleButton" width="30" height="30" alt="Gear logo, link to settings"/>
                            </div>
                        </Link>
                        <Link to="/messages" activeClassName="activePrivate">
                            <div id={this.state.messageButtonID} onMouseOver={this.hoverMessagesHeader} onMouseOut={this.unHoverMessagesHeader} onClick={this.clearMessageNotifications}>
                                {this.state.messageNotifications}
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
                    </Link>
                    <Link to="/profile/points" id="whiteHeader" activeClassName="activePointsHeader">
                        <div id="headerPointsContainer">
                            <div id="headerLevelTitle">
                                newcomer
                            </div>
                            <div id="headerPointsNumber">
                                16
                            </div>
                        </div>
                    </Link>
            </div>
        );
    }
   }
}