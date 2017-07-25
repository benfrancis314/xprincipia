import React from 'react';
import {Link, bros} from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../config.js'

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
      })
      .then(function (result) {
        
        return axios.post( Config.API + '/login', {
          username : self.state.username,
          password: self.state.password
        })
        .then(function (result) {
          self.setState({
            userToken: result.data.token
          });
        
          cookie.save('userToken', self.state.userToken );
          cookie.save('userName', self.state.username)
          
          // Store token/Username in db table
          return axios.post( Config.API + '/auth/saveToken',  {
            username : self.state.username,
            token : "Bearer " + self.state.userToken
          }, {headers: { Authorization: "Bearer " + self.state.userToken }})
          .then (function (response){
            
            document.location = "/welcome";

          })

          // Using this to see when error does not send. This one doesn't send, instead most third error does
          // .catch(function (error) {
          //   alert('Please try again (posting register error).')
          // });
          
      })
      // Seems not to go off, seems like third one does
      // .catch(function (error) {
      //   alert('Please try again.')
      // });
      
    })
              .catch(function (error) {
            alert('This username is taken OR the password is not long enough.')
          });
  }

  render() {
      return (
        <div>
          <Link to={`/introduction`}>
            <div id="introductionButton" onClick={this.openIntroduction}>
              Introduction
            </div>
          </Link>
          <div id="register">
              <form >
                  <input type="text" name="fullname" required="required" maxLength="30" placeholder="Full Name" id="registerFullName" autoFocus />
                  <input type="text" name="username" required="required" maxLength="30" placeholder="Username" id="registerUserName" />
                  <input type="email" name="email" required="required" maxLength="30" placeholder="Email" id="registerEmail" />
                  <input type="password" name="password" required="required" maxLength="30" placeholder="Password (8 ch Min)" id="registerPassword"/>
                  <Link to="/register"><input type="submit" value="Register" onClick={this.postRegister} id="submitRegister"/></Link>
                  <Link to='/login'><div id="loginButton">Login</div></Link>
              </form>
          </div>
        </div>

      );
   }
}
