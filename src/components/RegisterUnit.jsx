import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import $ from 'min-jquery';

export default class RegisterUnit extends React.Component {

constructor(){
  super();

  this.state= {
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  }

  this.postRegister = this.postRegister.bind(this);
};

postRegister() {
  //Read field items into component state
  this.state.email = document.getElementById('registerEmail').value
  this.state.password = document.getElementById('registerPassword').value
  this.state.firstname = document.getElementById('registerFirstName').value
  this.state.firstname = document.getElementById('registerLastName').value

// Ajax post register request
$.ajax({
  crossDomain: 'true',
  type: 'POST',
  headers: {'Content-Type' : 'application/json'},
  url: 'http://localhost:10000/register',
  processData: false,
  data: JSON.stringify({
    'email' : this.state.email,
    'password' : this.state.password,
    'firstname' : this.state.firstname,
    'lastname' : this.state.lastname
  }),
  success: function(result){
    console.log(result)

    alert('Welcome to XPrincipia.')
  },
  error: function(result){
    console.log(result)

    alert('Please try again.')
  },

  });
}

  render() {
      return (

        <div id="register">
            <form action="http://www.xprincipia.com/register.php" method="post" id="registerForm">
                <div id="enter">Enter</div>
                <input type="text" name="firstname" required="required" maxLength="30" placeholder="First Name" id="registerFirstName" autofocus />
                <input type="text" name="lastname" required="required" maxLength="30" placeholder="Last Name" id="registerLastName" />
                <input type="email" name="email" required="required" maxLength="30" placeholder="Email" id="registerEmail" /> <br />
                <input type="password" name="password" required="required" maxLength="30" placeholder="Password" id="registerPassword"/> <br />
                <Link to='/welcome'><input type="submit" value="Register" onClick={this.postRegister} id="submitRegister"/></Link>
            </form>
            <Link to='/login'><div id="loginButton">Login</div></Link>
        </div>

      );
   }
}
