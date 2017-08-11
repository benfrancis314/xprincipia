import React from 'react';
import {Link, bros} from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import $ from 'jquery';

export default class IntroductionRegister extends React.Component {

constructor(){
  super();

  this.state= {
    email: '',
    password: '',
    fullname: '',
    username: '',
    userToken: ''
  }

  this.postRegister = this.postRegister.bind(this);
  this.postRegisterReturn = this.postRegisterReturn.bind(this);
};

  componentWillMount() {
    this.state =  { userToken: cookie.load('userToken') };
  }

  postRegister() {
    //Read field items into component state
    this.state.email = document.getElementById('registerEmail').value
    this.state.password = document.getElementById('registerPassword').value
    this.state.fullname = document.getElementById('registerFullName').value
    this.state.username = document.getElementById('registerUserName').value

    var self = this;
    return axios.post( Config.API + '/register', {
        fullName: this.state.fullname,
        email: this.state.email,
        username : this.state.username,
        password: this.state.password
      })      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              $('#notificationContent').text(error.response.data);
              // alert( "Please login to add content. ");
              if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
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
          cookie.save('userToken', self.state.userToken );
          cookie.save('userName', self.state.username)
          
          // Store token/Username in db table
          return axios.post( Config.API + '/auth/saveToken',  {
            username : self.state.username,
            token : "Bearer " + self.state.userToken
          }, {headers: { Authorization: "Bearer " + self.state.userToken }}).then (function (response){
            
            document.location = "/welcome";

          })
          
      })
      
    })
  }

postRegisterReturn(e) {

if (e.keyCode === 13) {  
//Read field items into component state
this.state.email = document.getElementById('registerEmail').value
this.state.password = document.getElementById('registerPassword').value
this.state.fullname = document.getElementById('registerFullName').value
this.state.username = document.getElementById('registerUserName').value

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
              $('#notificationContent').text(error.response.data);
              // alert( "Please login to add content. ");
              if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
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
      cookie.save('userToken', self.state.userToken );
      cookie.save('userName', self.state.username)
      
      // Store token/Username in db table
      return axios.post( Config.API + '/auth/saveToken',  {
        username : self.state.username,
        token : "Bearer " + self.state.userToken
      }, {headers: { Authorization: "Bearer " + self.state.userToken }}).then (function (response){
        document.location = "/welcome";
      })
  
  })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              $('#notificationContent').text(error.response.data);
              // alert( "Please login to add content. ");
              if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
                  })
                );
              }
          });
      });
})
}}

  render() {
      return (

      <div>
        <div id="introRegisterJoin">
            Join XPrincipia
        </div>
        <div id="introRegister">
            <form >
                <input type="text" name="fullname" required="required" maxLength="30" placeholder="Full Name" id="introRegisterFullName" />
                <input type="text" name="username" required="required" maxLength="30" placeholder="Username" id="introRegisterUserName" />
                <input type="email" name="email" required="required" maxLength="30" placeholder="Email" id="introRegisterEmail" />
                <input type="password" name="password" required="required" maxLength="30" placeholder="Password" id="introRegisterPassword"/>
                <Link to="/register"><input type="submit" value="Register" onClick={this.postRegister} id="submitRegister"/></Link>
                <Link to='/login'><div id="loginButton">Login</div></Link>
            </form>
        </div>
      </div>

      );
   }
}
