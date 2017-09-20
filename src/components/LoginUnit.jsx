import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import axios from 'axios';
import {Config} from '../config.js';
import $ from 'jquery';

export default class LoginUnit extends React.Component {
  constructor(){
    super();

    this.state= {
      username: '',
      password: '',
    }

    this.postLogin = this.postLogin.bind(this);
  };

  componentWillMount() {
    this.state =  { userToken: cookie.load('userToken') };
  }

  postLogin() {
    var self = this
    //Read field items into component state
    this.state.username = document.getElementById('loginEmail').value
    this.state.password = document.getElementById('loginPassword').value

    return axios.post( Config.API + '/login', {
      username : this.state.username,
      password: this.state.password
    })
    .then(function (result) {
      self.setState({
        userToken: result.data.token
      })
      cookie.save('userToken', result.data.token, { path: '/' });
      cookie.save('userName', self.state.username, { path: '/' })
      
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

   render() {
      return (
        <div>
          
          <Link to={`/introduction`}>
            <div id="introductionButton">
              Introduction
            </div>
          </Link>

          <div id="signup">
              <form>
                  <input type="text" name="email" required="required" maxLength="30" placeholder="Username" id="loginEmail" autoFocus />
                  <input type="password" name="password" required="required" maxLength="30" placeholder="Password" id="loginPassword" />
                  <Link to='/login'><input type="submit" value="Login" onClick={this.postLogin} id="submitLogin" /></Link>
                  <Link to='/register'><div id="registerButton">Register</div></Link>
              </form>
          </div>
        </div>

      );
   }
}
