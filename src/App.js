import React from 'react';
import axios from 'axios'
import cookie from 'react-cookie'
import './assets/App.css';
import './assets/index.css';
import { Link } from 'react-router';
import $ from 'jquery';


class App extends React.Component {
    constructor(props){
      super(props);

      this.state = {
          userToken: [],
          undefinedPaths: [
          "/project/undefined/suggestions", 
          '/project/undefined/subprojects',
          '/project/undefined/questions',
          '/project/undefined/solutions',
          '/project/solutions',
          '/project/subprojects',
          '/project/suggestions',
          '/project/questions']
      }
        
    };

  componentWillMount() {
    this.setState( { userToken: cookie.load('userToken') });
    axios.defaults.headers.common['Authorization'] = 'Bearer '+cookie.load('userToken');
  }
 
  onLogin(userToken) {
    this.setState({ userToken });
    cookie.save('userToken', this.state.userToken, { path: '/' });
  }
 
  onLogout() {
    cookie.remove('userToken', { path: '/' });
  }
  hideNotification() {
    $(document).ready(function() {
        $('#notificationShow').attr('id','notification');
     });
    };
    hidePrivateNotification() {
    $(document).ready(function() {
        $('#privateAlertShow').attr('id','privateAlert');
     });
    };
    
  render() {
    //Check if user is logged in
    // if (this.state.userToken === undefined ){
      //redirect to login page if not logged in. Register is also allowed
      // if (window.location.pathname !== "/login" && window.location.pathname !== "/register" && window.location.pathname !== "/introduction"){
      //   document.location = "/login";
      //   return (
        /*<div>
          <p>error image</p>*/
          /*Put 404 error image and also wait 2 seconds before redirecting*/
        /*</div>
        )
      }
    } */

    //Load the welcome page if route is '/'
    if (window.location.pathname === "/" || this.state.undefinedPaths.inArray(window.location.pathname) //continue to next line
        || window.location.pathname === "/project/0/subprojects"){ 
          document.location = "/welcome";
    }

    //Return the rest of the renderings
      return (
      <div className="App">
        {this.props.children}
        {/*Error alert below*/}
        <div id="notification">
          <div id="notificationHeader">!</div>
          <div id="notificationContent">We apologize for this error. In your <span id="blue">Personal Headquarters</span>, please tell us the error under <span id="blue">Feedback</span>.</div>
          <div id="notificationLoginRegisterContainer">
            <Link to='/login'>
              <div id="notificationLogin" onClick={this.hideNotification}>Login</div>
            </Link>
            <Link to='/register'>
            <div id="notificationRegister" onClick={this.hideNotification}>Register</div>
            </Link>
          </div>
          <Link to='/profile/feedback'>
              <div id="notificationFeedbackShow" onClick={this.hideNotification}>Feedback</div>
          </Link>
          <div id="notificationReturn" onClick={this.hideNotification}>Return</div>
        </div>
        <div id="privateAlert">
                <div id="privateAlertHeader">
                    <img src={require('./assets/lock2Blue.svg')} id="lockAlert" width="30" height="30" onClick={this.privateAlert} alt="Logo logo, signifying this is private"/>
                </div>
                <div id="privateAlertContent">This space is entirely <span id="blue">private</span></div>
                <div id="privateAlertReturn" onClick={this.hidePrivateNotification}>Return</div>
            </div>
      </div>
      );
    
    
    
  }
}

export default App;


 Array.prototype.inArray = function (value)
//TODO: Put in util library

// Returns true if the passed value is found in the
// array. Returns false if it is not.
{
    var i;
    for (i=0; i < this.length; i++) {
        // Matches identical (===), not just similar (==).
        if (this[i] === value) {
            return true;
        }
    }
    return false;
};