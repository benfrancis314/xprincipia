import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import axios from 'axios';
import HeaderAvatar from '../components/HeaderAvatar.jsx';
// import SearchUnit from '../components/search/SearchUnit.jsx';
import SearchResults from '../components/search/SearchResults.jsx';
import {Config} from '../config.js';
import $ from 'jquery';

export default class Header extends React.Component {

    constructor(){
        super();

        this.state = {
           username: '',
           password: '',
           userToken: '',
           notification: '',
           userproblems : [],
           searchText: [],
        }
        this.queryProblem = this.queryProblem.bind(this);
        this.postLogin = this.postLogin.bind(this);
    };

    // toggleFullScreen() {
    //   if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
    //    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    //     if (document.documentElement.requestFullScreen) {  
    //       document.documentElement.requestFullScreen();  
    //     } else if (document.documentElement.mozRequestFullScreen) {  
    //       document.documentElement.mozRequestFullScreen();  
    //     } else if (document.documentElement.webkitRequestFullScreen) {  
    //       document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    //     }  
    //   } else {  
    //     if (document.cancelFullScreen) {  
    //       document.cancelFullScreen();  
    //     } else if (document.mozCancelFullScreen) {  
    //       document.mozCancelFullScreen();  
    //     } else if (document.webkitCancelFullScreen) {  
    //       document.webkitCancelFullScreen();  
    //     }  
    //   }  
    // }

// Used WillMount before, not sure if advantage either way
  // componentWillMount() {
  //   this.state =  { 
  //     userToken: cookie.load('userToken'),
  //     username: cookie.load('userName')
  //   }
  // }
componentDidMount(){
  var self = this;
  self.setState({ 
    userToken: cookie.load('userToken'),
    username: cookie.load('userName'),
    notification: this.props.notification,
  })
}
// TESTING, don't use
  // componentDidMount() {
  //   this.state =  { 
  //     userToken: cookie.load('userToken')
  //   };
  // }
  
  // componentWillReceiveProps(nextState) {
    // nextState =  { 
      // userToken: cookie.load('userToken'),
      // username: cookie.load('userName')
    // };
  // }

  postLogin() {
    var self = this
    //Read field items into component state
    this.state.username = document.getElementById('loginHeaderEmail').value
    this.state.password = document.getElementById('loginHeaderPassword').value

    return axios.post( Config.API + '/login', {
      username : this.state.username,
      password: this.state.password
    })
    .then(function (result) {
      // alert('headerBeforeState');
      self.setState({
        userToken: result.data.token
      })
      cookie.save('userToken', result.data.token, { path: '/' } );
      cookie.save('userName', self.state.username, { path: '/' })
      // Store token/Username in db table
      return axios.post( Config.API + '/auth/saveToken',  {
        username : self.state.username,
        token : "Bearer " + self.state.userToken
      }, 
      {headers: { Authorization: "Bearer " + self.state.userToken }}).then (function (response) {
        document.location = window.location.pathname;
      })
    })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationFeedbackShow').attr('id','notificationFeedback');
                      $('#notificationContent').html('Your information was <span id="red">not recognized</span>.<br />Please<span id="blue"> try again </span> or <span id="green">register</span>');
                    })
                  );
                }  else if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
          });
      });
}

queryProblem () {
  //get search text box data
  $(document).ready(function() {
    $('#searchResultsContainerHide').attr('id','searchResultsContainer');
  });
 this.state.searchText = document.getElementById('exploreHeaderInput').value

 var self = this
 return axios.get( Config.API + '/problems/search?q='+this.state.searchText).then(function (response) {
     self.setState({
       userproblems: response.data
     })
  })
}
hideSearch() {
  $(document).ready(function() {
      $('#searchResultsContainer').attr('id','searchResultsContainerHide');
  });
}
   render() {

if (this.state.userToken === undefined ){
      return (
        <div id="header">
            <div id="logo">
              <Link to="/welcome">
                <div id="logoName">
                  XPrincipia
                </div>
              </Link>
            </div>
            <div id="explore">
                <form id="exploreFormHeader">
                    <input type="search" name="search"
                        // placeholder="explore" 
                        id="exploreHeaderInput"  
                        onKeyDown={this.queryProblem} autoFocus autoComplete="off" />
                    <input onKeyPress={this.submitSearch}  id="submitExplore" />
                </form>
            </div>
            {/*Login in header*/}
            <input type="text" name="email" required="required" maxLength="30" placeholder="username" id="loginHeaderEmail" autoFocus />
            <input type="password" name="password" required="required" maxLength="30" placeholder="password" id="loginHeaderPassword" />            
            <input type="submit" value="login" onClick={this.postLogin} id="loginHeaderSubmitButton" />           
            {/*Attempt to get the login button to just be an arrow*/}
            {/*<input type="image" src={require('../assets/rightArrowWhite.svg')} onClick={this.postLogin} id="loginHeaderSubmitImage" alt="Submit login arrow, blue right arrow"/>*/}
            <div id="registerHeaderButton">
                <Link to="/register">
                    join
                </Link>
            </div>
        </div>
      );
    } else {
        return (
            <div>
              <div id="header">
                  <div id="logo">
                    <Link to="/welcome">
                      <div id="logoName">
                        XPrincipia
                      </div>
                    </Link>
                  </div>
                  <div id="explore">
                      <form id="exploreFormHeader">
                          <input type="search" name="search"
                              // placeholder="explore" 
                              id="exploreHeaderInput"  
                              onKeyDown={this.queryProblem} autoFocus autoComplete="off" />
                          {/* <input onKeyPress={this.submitSearch}  id="submitExplore" /> */}
                      </form>
                  </div>
                  <HeaderAvatar notification={this.props.notification}/>
                  {/* <SearchUnit problems={this.state.userproblems} /> */}
              </div>

              {/* SEARCH RESULTS */}
              <div id="searchResultsContainerHide">
                <img src={require('../assets/redX3.svg')} id="searchResultsExitButton" width="20" height="20" alt="exit button" onClick={this.hideSearch} />
                <SearchResults problems={this.state.userproblems}/>
              </div>
            </div>
      );  

 }}
}
