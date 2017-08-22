import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import axios from 'axios';
import HeaderAvatar from '../components/HeaderAvatar.jsx';
// Notifications currently unused, may be used for notifications in future
// import NotificationSuccess from '../components/NotificationSuccess.jsx';
// import NotificationFailure from '../components/NotificationFailure.jsx';
import {Config} from '../config.js';
import $ from 'jquery';

export default class Header extends React.Component {

    constructor(props){
        super(props);

        this.state = {
           problems : [],
           searchText: [],
           username: '',
           password: '',
        }
        this.queryProblem = this.queryProblem.bind(this);
        this.postLogin = this.postLogin.bind(this);
    };

  componentWillMount() {
    this.state =  { userToken: cookie.load('userToken') };
  }

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
      self.setState({
        userToken: result.data.token
      })
      cookie.save('userToken', result.data.token );
      cookie.save('userName', self.state.username)
      
      // Store token/Username in db table
      return axios.post( Config.API + '/auth/saveToken',  {
        username : self.state.username,
        token : "Bearer " + self.state.userToken
      }, {headers: { Authorization: "Bearer " + self.state.userToken }}).then (function (response){
        // alert('success')
        document.location = window.location.pathname;
      })
    })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });
}


    queryProblem () {
        var self = this
        this.state.searchText = document.getElementById('exploreInput').value
        return axios.get( Config.API + '/problems/search?q='+this.state.searchText).then(function (response) {
            self.setState({
              problems: response.data
            })
            document.location = '/welcome';
        })  
    }

// Not using currently
    // submitSearch(e) {
    //     // if (e.keyCode === 13)
    //         document.location = '/search';
    // }

   render() {

if (this.state.userToken === undefined ){
      return (
        <div id="header">
            <div id="logo">
              <Link to="/welcome"><div id="logoName">XPrincipia</div></Link>
            </div>
            {/*Login in header*/}
            <input type="text" name="email" required="required" maxLength="30" placeholder="Username" id="loginHeaderEmail" autoFocus />
            <input type="password" name="password" required="required" maxLength="30" placeholder="Password" id="loginHeaderPassword" />            
            <input type="submit" value="Login" onClick={this.postLogin} id="loginHeaderSubmitButton" />           
            {/*Attempt to get the login button to just be an arrow*/}
            {/*<input type="image" src={require('../assets/rightArrowWhite.svg')} onClick={this.postLogin} id="loginHeaderSubmitImage" alt="Submit login arrow, blue right arrow"/>*/}
            <div id="registerHeaderButton">
                <Link to="/register">
                    Register
                </Link>
            </div>
        </div>
      );
    } else {
        return (
            <div id="header">
                <div id="logo">
                <Link to="/welcome"><div id="logoName">XPrincipia</div></Link>
                </div>
                {/*<div id="explore">
                    <form id="exploreFormHeader">
                        <input type="search" name="search"
                            placeholder="Explore" id="exploreHeaderInput"  
                            onKeyDown={this.queryProblem} />
                        <input onKeyPress={this.submitSearch}  id="submitExplore" />
                    </form>
                </div>*/}
                <HeaderAvatar />
            </div>
      );  

 }}
}
