import React from 'react';
import ReactDOM from 'react-dom';
import {Link, bros} from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import GoogleLogin from 'react-google-login';
import $ from 'jquery';
// or
// import { GoogleLogin } from 'react-google-login';
 

 
export default class GoogleRegisterButton extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            email: '',
            password: '',
            fullname: '',
            username: '',
            userToken: ''
          }
        this.signup = this.signup.bind(this )
    }

    signup(res, type) {
        // console.log('signup function')
        // console.log(res.w3.U3.toLowerCase())
        // console.log(res.w3.ig.toLowerCase())
        // console.log(res.w3.ofa.toLowerCase() + '.' + res.w3.wea.toLowerCase())
        // console.log(res.w3.Eea+'xp12357*')
        
        // Put these in the fields, then trigger login function
        // Do separately in Join/Register Unit
            // Set username to 'ofa'+'.'+'wea' (set all to lower case)
            // Full name is ig
            // Email is 

        // What about password?
            // Eea + xp password (xp12357*)


        this.state.email = res.w3.U3.toLowerCase()
        this.state.password = res.w3.Eea+'xp12357*'

        if(res.w3.ig) {
            this.state.fullname = res.w3.ig.toLowerCase()
        } else {
            this.state.fullname = res.w3.U3.toLowerCase()
        }

        if (res.w3.ofa && res.w3.wea) {
            this.state.username = res.w3.ofa.toLowerCase() + '.' + res.w3.wea.toLowerCase()
        } else {
            this.state.username = res.w3.U3.toLowerCase()
        }
        
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
                            $('#notificationContent').html('We apologize for the error. Please contact <span id="blue">info@xprincipia.com </span>for assistance');
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




    render() {
        const responseGoogle = (response) => {
            // console.log(response);
            this.signup(response, 'google')
            // Create an error IF so they know if it doesn't work
            if(response.error == "popup_closed_by_user") {
                // alert('1')
            } 
          }
       return (
       <div id="googleRegisterContainer">
            <GoogleLogin
                clientId="789713593890-c0hcn4j0nma3pubtcq01h7obm7afuneg.apps.googleusercontent.com"
                buttonText=""
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                className="googleRegisterButton"
            />
            <div id="googleRegisterAlert">
                <span id="blue">sign in </span>with google
            </div>
       </div>
       );
    }
 }