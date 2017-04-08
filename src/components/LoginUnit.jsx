import React from 'react';
import {Link} from 'react-router';
import $ from 'min-jquery';
import cookie from 'react-cookie'
import axios from 'axios'

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

  // Ajax post login request
  // $.ajax({
  //   crossDomain: 'true',
  //   type: 'POST',
  //   headers: {'Content-Type' : 'application/json'},
  //   url: 'http://localhost:10000/login',
  //   processData: false,
  //   data: JSON.stringify({
  //     'username' : this.state.username,
  //     'password' : this.state.password
  //   }),
  //   success: function(result){
  //     // cookie.save('userToken', result.token );
  //     console.log(result)
  //     self.setState({
  //       userToken: result.token
  //     })
  //     cookie.save('userToken', self.state.token );
  //     alert('Welcome to XPrincipia.'+ cookie.load('userToken'))
  //     document.location = "/welcome";
  //   },
  //   error: function(result){
  //     console.log(result)

  //     alert('Please try again.')
  //   },

  // });
    var self = this
    axios.post('http://localhost:10000/login', {
      username : this.state.username,
      password: this.state.password
    })
    .then(function (result) {
      cookie.save('userToken', result.data.token );
      console.log(result.data)
      self.setState({
        userToken: result.data.token
      })
      
      document.location = "/welcome";
    })
    .catch(function (error) {
      console.log(error);

      alert('Please try again.')
    });
  }

   render() {
      return (

        <div id="signup">
            <form action="http://www.xprincipia.com/login.php" method="post" id="loginForm">
                <div id="enter">Enter</div>
                <input type="email" name="email" required="required" maxLength="30" placeholder="Email" id="loginEmail" autofocus /> <br />
                <input type="password" name="password" required="required" maxLength="30" placeholder="Password" id="loginPassword" /> <br />
                <Link to='/login'><input type="submit" value="Login" onClick={this.postLogin} id="submitLogin" /></Link>
            </form>
            <Link to='/register'><div id="registerButton">Register</div></Link>
        </div>

      );
   }
}
