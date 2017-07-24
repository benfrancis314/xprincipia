import React from 'react';
import { Link  } from 'react-router';
import cookie from 'react-cookie';
import $ from 'jquery';

export default class LoginContainer extends React.Component {
  constructor(props){
      super(props);

      this.state = {
          userId: []
      }

    };
  onLogin(userId) {
    this.setState({ userId });
    cookie.save('userId', this.state.userId, { path: '/' });
  }

  openIntroduction() {
    $(document).ready(function(){
        // $("#introductionButton").click(function(){
            // $("introductionContainer").slideUp();
            $("introductionContainer").fadeTo('fast', 0.5);
        
        // $(".btn2").click(function(){
        //     $("p").slideDown();
        // });
    });
}


   render() {
      return (
        <div id="loginContainer">
          <div id="info">
              <div id="banner">
                  <div id="bannerTitle">XPrincipia</div>
                    
                    <Link to={`/introduction`}>
                      <div id="introductionButton" onClick={this.openIntroduction}>
                        Introduction
                      </div>
                    </Link>
                    {this.props.children}
                  <div id="bannerLoginSlogan">Open R&D</div>
              </div>
          </div>
        </div>
      );
   }
}

