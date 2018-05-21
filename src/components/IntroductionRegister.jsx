import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import $ from 'jquery';
// import ScrollableAnchor from 'react-scrollable-anchor';


export default class IntroductionRegister extends React.Component {

constructor(){
  super();

  this.state= {
    email: '',
    password: '',
    fullname: '',
    username: '',
    userToken: '',
    registerContainerID: '',
  }

  this.postRegister = this.postRegister.bind(this);
  this.postRegisterReturn = this.postRegisterReturn.bind(this);
};

  componentDidMount() {
    this.state =  { userToken: cookie.load('userToken') };
    var self = this;
    if (cookie.load('userName')) {
      self.setState({
          registerContainerID: 'noDisplay',
      })
    } else {
        self.setState({
            registerContainerID: 'introRegisterContainer',
        })
    }
  }

  postRegister() {
    //Read field items into component state
    this.state.email = document.getElementById('introRegisterEmail').value
    this.state.password = document.getElementById('introRegisterPassword').value
    this.state.fullname = document.getElementById('introRegisterFullName').value
    this.state.username = document.getElementById('introRegisterUserName').value

    var self = this;
    return axios.post( Config.API + '/register', {
        fullName: this.state.fullname,
        email: this.state.email,
        username : this.state.username,
        password: this.state.password
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
      })
      .then(function (result) {
        
        return axios.post( Config.API + '/login', {
          username : self.state.username,
          password: self.state.password
        })
        .then(function (result) {
          self.setState({
            userToken: result.data.token
          })
          cookie.save('userToken', self.state.userToken, { path: '/' } );
          cookie.save('userName', self.state.username, { path: '/' })
          
          // Store token/Username in db table
          return axios.post( Config.API + '/auth/saveToken',  {
            username : self.state.username,
            token : "Bearer " + self.state.userToken
          }, {headers: { Authorization: "Bearer " + self.state.userToken }}).then (function (response){
            
            document.location = "/profile/prestige";

          })
          
      })
      
    })
  }

postRegisterReturn(e) {

if (e.keyCode === 13) {  
//Read field items into component state
this.state.email = document.getElementById('introRegisterEmail').value
this.state.password = document.getElementById('introRegisterPassword').value
this.state.fullname = document.getElementById('introRegisterFullName').value
this.state.username = document.getElementById('introRegisterUserName').value

var self = this;
return axios.post( Config.API + '/register', {
    fullName: this.state.fullname,
    email: this.state.email,
    username : this.state.username,
    password: this.state.password
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
      })
  .then(function (result) {
    return axios.post( Config.API + '/login', {
      username : self.state.username,
      password: self.state.password
    })  
    .then(function (result) {
      self.setState({
        userToken: result.data.token
      })
      cookie.save('userToken', self.state.userToken, { path: '/' } );
      cookie.save('userName', self.state.username, { path: '/' })
      
      // Store token/Username in db table
      return axios.post( Config.API + '/auth/saveToken',  {
        username : self.state.username,
        token : "Bearer " + self.state.userToken
      }, {headers: { Authorization: "Bearer " + self.state.userToken }}).then (function (response){
        document.location = "/profile/prestige";
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
})
}}

  render() {
      return (

      <div id={this.state.registerContainerID}>
        {/*<ScrollableAnchor id={'register'}>*/}
          <div id="introRegisterJoin">
            join xprincipia
          </div>
        {/*</ScrollableAnchor>*/}
        <div id="introRegister">
            <form >
                <input type="text" name="fullname" required="required" maxLength="30" placeholder="full name" id="introRegisterFullName" />
                <input type="text" name="username" required="required" maxLength="30" placeholder="username" id="introRegisterUserName" />
                <input type="email" name="email" required="required" maxLength="30" placeholder="email" id="introRegisterEmail" />
                <input type="password" name="password" required="required" maxLength="30" placeholder="password" id="introRegisterPassword"/>
                <Link to='/profile/prestige'>
                  <input type="submit" value="join" onClick={this.postRegister} id="submitRegisterIntroduction"/>
                </Link>
                <Link to='/login'><div id="registerButtonIntroduction">login</div></Link>
            </form>
        </div>
      </div>

      );
   }
}

