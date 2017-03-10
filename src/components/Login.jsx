import React from 'react';
import ReactDOM from 'react-dom';

export default class Login extends React.Component {
   render() {
      return (


<div id="loginComponent">

    <div id="logoBanner">
        <div id="bannerTitle">XPrincipia</div>

        <div id="bannerSlogan">Open Source Science</div>
    </div>


    <form action="http://www.xprincipia.com/login.php" method="post" id="loginForm">

        <input type="email" name="email" required="required" maxlength="30" placeholder="Email"/> <br />

        <input type="password" name="password" required="required" maxlength="30" placeholder="Password"/>

        <input type="submit" value="Login" id="submit"/>
    </form>


    <div id="otherOptions">

        <a href="./register.html">
            <button type="button" id="registerButton">Login</button>
            </a>

        <a href="./learnmore.html">
            <button type="button" id="learnMoreButton">Learn More</button>
            </a>
    </div>

</div>
      );
   }
}
