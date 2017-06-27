import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';

export default class RegisterUnit extends React.Component {

constructor(){
  super();

  this.state= {
    email: '',
    password: '',
    fullname: '',
    username: ''
  }

  this.postRegister = this.postRegister.bind(this);
};

postRegister() {
  //Read field items into component state
  this.state.email = document.getElementById('registerEmail').value
  this.state.password = document.getElementById('registerPassword').value
  this.state.fullname = document.getElementById('registerFullName').value
  this.state.username = document.getElementById('registerUserName').value

// // Ajax post register request
// $.ajax({
//   crossDomain: 'true',
//   type: 'POST',
//   headers: {'Content-Type' : 'application/json'},
//   url: 'http://ec2-13-58-239-116.us-east-2.compute.amazonaws.com/login/register',
//   processData: false,
//   data: JSON.stringify({
//     'email' : this.state.email,
//     'username' : this.state.username,
//     'password' : this.state.password,
//     // 'fullname' : this.state.fullname,
    
//   }),
//   success: function(result){
//     console.log(result)
//     document.location('/welcome')
    
//     alert('Welcome to XPrincipia.')
//   },
//   error: function(result){
//     console.log(result)

//     alert('Please try again.')
//   },

// });
axios.post('http://ec2-13-58-239-116.us-east-2.compute.amazonaws.com/register', {
      fullName: this.state.fullname,
      email: this.state.email,
      username : this.state.username,
      password: this.state.password
    })
    .then(function (result) {
      // {window.location.href='/intro'}
     
    })
    .catch(function (error) {
      console.log(error.response.data)
      alert( error.response.data)
    });
}

  render() {
      return (

        <div id="register">
            <form>
                <input type="text" name="fullname" required="required" maxLength="30" placeholder="Full Name" id="registerFullName" autoFocus />
                <input type="text" name="username" required="required" maxLength="30" placeholder="Username" id="registerUserName" />
                <input type="email" name="email" required="required" maxLength="30" placeholder="Email" id="registerEmail" />
                <input type="password" name="password" required="required" maxLength="30" placeholder="Password" id="registerPassword"/>
                <Link to='/login'><input type="submit" value="Join" onClick={this.postRegister} id="submitRegister"/></Link>
                <Link to='/login'><div id="loginButton">Enter</div></Link>
            </form>
        </div>

      );
   }
}
