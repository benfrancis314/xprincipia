import React from 'react';
import {Link, bros} from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import $ from 'jquery';

export default class RegisterUnit extends React.Component {

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
  this.showLegal = this.showLegal.bind(this);
  this.hideLegal = this.hideLegal.bind(this);
};

  componentDidMount() {
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
        
        axios.post( Config.API + '/login', {
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
          axios.post( Config.API + '/auth/saveToken',  {
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
    axios.post( Config.API + '/login', {
      username : self.state.username,
      password: self.state.password
    })  
    .then(function (result) {
      self.setState({
        userToken: result.data.token
      })
      cookie.save('userToken', self.state.userToken, { path: '/' });
      cookie.save('userName', self.state.username, { path: '/' })
      
      // Store token/Username in db table
      axios.post( Config.API + '/auth/saveToken',  {
        username : self.state.username,
        token : "Bearer " + self.state.userToken
      }, {headers: { Authorization: "Bearer " + self.state.userToken }}).then (function (response){
        
      })
      document.location = "/profile/prestige";
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

showLegal() {
  $(document).ready(function() {
      $('#legalAgreementRegisterDescriptionHide').attr('id','legalAgreementRegisterDescription');
  });
}
hideLegal() {
    $(document).ready(function() {
        $('#legalAgreementRegisterDescription').attr('id','legalAgreementRegisterDescriptionHide');
    });
}


  render() {
      return (

      <div>
        <Link to={`/introduction`}>
          <div id="introductionButton">
            introduction
          </div>
        </Link>
        <div id="register">
            <form >
                <input type="text" name="fullname" required="required" maxLength="30" placeholder="full name" id="registerFullName" autoFocus />
                <input type="text" name="username" required="required" maxLength="20" placeholder="username" id="registerUserName" />
                <input type="email" name="email" required="required" maxLength="30" placeholder="email" id="registerEmail" />
                <input type="password" name="password" required="required" maxLength="30" placeholder="password" id="registerPassword"/>
                <Link to={window.location.pathname}>
                  <input type="submit" value="register" onClick={this.postRegister} id="submitRegister"/>
                </Link>
                <Link to='/login'>
                  <div id="loginButton">login</div>
                </Link>
                {/* <div id="legalAgreementRegisterButton" onClick={this.showLegal}>
                  legal agreement
                </div> */}
                <div id="legalAgreementRegisterDescription">
                  {/* <img onClick={this.hideLegal} src={require('../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />             */}
                  <span id="legalBlue">all rights are reserved by the creators </span>
                  <br />of intellectual property on xprincipia.com
                  <br />
                  <span id="legalBlue">the creators permit this content to be distributed </span>
                  <br />and used by xprincipia, inc. upon creation
                </div>
            </form>
        </div>
      </div>

      );
   }
}
