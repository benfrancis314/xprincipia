import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import axios from 'axios';
import HeaderAvatar from '../components/HeaderAvatar.jsx';
// import SearchUnit from '../components/search/SearchUnit.jsx';
import SearchResults from '../components/search/SearchResults.jsx';
import {Config} from '../config.js';
import $ from 'jquery';
import HeaderSphere from '../components/HeaderSphere.jsx';


export default class Header extends React.Component {

  
    constructor(){
        super();

        this.state = {
           username: '',
           password: '',
           userToken: '',
           notification: '',
           searchResults : [],
           searchText: '',
        }
        this.queryProblem = this.queryProblem.bind(this);
        this.postLogin = this.postLogin.bind(this);
        this.enterLogin = this.enterLogin.bind(this);
        this.enterRegister = this.enterRegister.bind(this);
        this.stopEnter = this.stopEnter.bind(this);

    };

componentDidMount(){
  var self = this;
  self.setState({ 
    userToken: cookie.load('userToken'),
    username: cookie.load('userName'),
    notification: this.props.notification,
  })
}
enterLogin(event) {
  var code = event.keyCode || event.which;
  if(code === 13) { //13 is the enter keycode
      this.postLogin()
  } 
}
enterRegister(event) {
  var code = event.keyCode || event.which;
  if(code === 13) { //13 is the enter keycode
       document.location = '/register';
  } 
}

  postLogin() {
    var self = this
    //Read field items into component state
    this.state.username = document.getElementById('loginHeaderEmail').value
    this.state.password = document.getElementById('loginHeaderPassword').value

    axios.post( Config.API + '/login', {
      username : this.state.username,
      password: this.state.password
    })
    .then(function (result) {
      self.setState({
        userToken: result.data.token
      })
      cookie.save('userToken', result.data.token, { path: '/' } );
      cookie.save('userName', self.state.username, { path: '/' })
      // Store token/Username in db table
      axios.post( Config.API + '/auth/saveToken',  {
        username : self.state.username,
        token : "Bearer " + self.state.userToken
      }, 
      {headers: { Authorization: "Bearer " + self.state.userToken }}).then (function (response) {
        // Added back in due to new auth system needing it and the notebook system needing it
        document.location = window.location.pathname;
      })
    })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationFeedbackShow').attr('id','notificationFeedback');
                      $('#notificationContent').html('your information was <span id="red">not recognized</span>.<br />Please<span id="blue"> try again </span> or <span id="green">register</span>');
                      $('#passwordResetAlertButtonHide').attr('id','passwordResetAlertButton');
                    })
                  );
                }  else if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
          });
      });
}
stopEnter(e) {
  e.preventDefault();
}
queryProblem (e) {
    $(document).ready(function() {
      $('#searchResultsContainerHide').attr('id','searchResultsContainer');
    });
    this.state.searchText = document.getElementById('exploreHeaderInput').value
    var self = this
    if (self.state.searchText == '') {
      $(document).ready(function() {
        $('#searchResultsContainer').attr('id','searchResultsContainerHide');
    });
    } else {
      axios.get( Config.API + '/problems/search?q='+self.state.searchText).then(function (response) {
        self.setState({
          searchResults: response.data
        })
      })
    }
    console.log(this.state.searchText)
}
hideSearch() {
  $(document).ready(function() {
      $('#searchResultsContainer').attr('id','searchResultsContainerHide');
      document.getElementById("exploreFormHeader").reset();
  });
}

hoverExplore() {
  $(document).ready(function() {
      $('#logoName').html("explore").fadeIn(7500);
      $('#logoName').attr('id','logoNameGuideWhite');
  });
}
unHoverExplore() {
    $(document).ready(function() {
        $('#logoNameGuideWhite').html('<span id="xBlue">x</span>principia');             
        $('#logoNameGuideWhite').attr('id','logoName');
    });
}
hideMenu() {
  // IF MOBILE (and thus can't hover), THEN: 
  if (window.screen.width <= 600) {
      $(document).ready(function() {
          $('#exitHeaderMenuMobileLogoutShow').attr('id','exitHeaderMenuMobileLogout');
          $('#headerSphereHide').attr('id','headerSphere');
          $('#headerOptionsContainer').attr('id','headerOptionsContainerHide');
          $('#headerLeftHide').attr('id','headerLeft');
          $('#exploreHeaderInputHide').attr('id','exploreHeaderInput');
          $('#exploreFormHeaderHide').attr('id','exploreFormHeader');
          $('#headerRightMobile').attr('id','headerRight');
          $('#headerSphereInfo1Hide').attr('id','#headerSphereInfo1');
      });
  }
}


render() {
  // var input = document.getElementById("loginHeaderPassword");

  // // Execute a function when the user releases a key on the keyboard
  // input.addEventListener("keyup", function(event) {
  //   // Cancel the default action, if needed
  //   event.preventDefault();
  //   // Number 13 is the "Enter" key on the keyboard
  //   if (event.keyCode === 13) {
  //     // Trigger the button element with a click
  //     document.getElementById("loginHeaderSubmitButton").click();
  //   }
  // });

if (this.state.userToken === undefined ){
  // $().html("explore").fadeIn(7500);
  // $('#loginHeaderLink' ).keypress(function() {
  //   console.log( "Handler for .keypress() called." );
  // });

      return (
        <div>
          <div id="header">
              <div id="headerLeft">
                <form id="exploreFormHeader" onMouseOver={this.hoverExplore} onMouseOut={this.unHoverExplore} onSubmit={this.stopEnter}>
                    <input type="search" name="search" id="exploreHeaderInput" onKeyUp={this.queryProblem} autoFocus autoComplete="off" />
                </form>
                <Link to="/welcome">
                  <div id="logoName">
                    <span id="xBlue">x</span>principia
                  </div>
                </Link>
              </div>
              <div id="headerRight">
                <HeaderSphere />
                <div id="headerSphereInfo1">
                    login | join
                </div>
                <div id="exitHeaderMenuMobileLogout" onClick={this.hideMenu}></div>
                {/* <div id="headerSphereInfo2">
                    join |
                </div> */}
                  <div id="headerOptionsContainerHide">
                          <input name="email" required="required" maxLength="30" placeholder="username" id="loginHeaderEmail" autoFocus onKeyPress={this.enterLogin} />
                          <input type="password" name="password" required="required" maxLength="30" placeholder="password" id="loginHeaderPassword" onKeyPress={this.enterLogin}/>            
                          <Link to={window.location.pathname} id="loginHeaderLink"  onKeyPress={this.postLogin}>
                            <input type="submit" value="login" onClick={this.postLogin} id="loginHeaderSubmitButton" onKeyPress={this.enterLogin}/>           
                          </Link>
                          {/*Attempt to get the login button to just be an arrow*/}
                          {/*<input type="image" src={require('../assets/rightArrowWhite.svg')} onClick={this.postLogin} id="loginHeaderSubmitImage" alt="Submit login arrow, blue right arrow"/>*/}
                          
                          <Link to="/register" activeClassName="activeHeaderRegister">
                            <div id="registerHeaderButton" onKeyPress={this.enterRegister}>
                              join
                            </div>
                          </Link>
                  </div>
                </div>
              
          </div>

          {/* SEARCH RESULTS */}
          <div id="searchResultsContainerHide">
            <img src={require('../assets/redX3.svg')} id="searchResultsExitButton" width="20" height="20" alt="exit button" onClick={this.hideSearch} />
            <SearchResults searchText={this.state.searchText} searchResults={this.state.searchResults}/>

          </div>
        </div>
      );
    } else {
        return (
            <div>
              <div id="header">
                  <div id="headerLeft">
                    <form id="exploreFormHeader" onMouseOver={this.hoverExplore} onMouseOut={this.unHoverExplore} onSubmit={this.stopEnter}>
                        <input type="search" name="search" id="exploreHeaderInput" onKeyUp={this.queryProblem} autoComplete="off" />
                    </form>
                    <Link to="/welcome" >
                      <div id="logoName">
                        <span id="xBlue">x</span>principia
                      </div>
                    </Link>
                  </div>

              
                    <HeaderAvatar notification={this.props.notification}/>

                {/* SEARCH RESULTS */}
                <div id="searchResultsContainerHide">
                  <img src={require('../assets/redX3.svg')} id="searchResultsExitButton" width="20" height="20" alt="exit button" onClick={this.hideSearch} />
                  <SearchResults searchText={this.state.searchText} searchResults={this.state.searchResults}/>
                </div>
              </div>
            </div>
      );  

 }}
}
