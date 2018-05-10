import React from 'react';
import cookie from 'react-cookie';
import $ from 'jquery';

export default class LoginContainer extends React.Component {
  constructor(props){
      super(props);

      this.state = {
          userId: []
      }

    };

  openIntroduction() {
    $(document).ready(function(){
            $("introductionContainer").fadeTo('fast', 0.5);
    });
}


   render() {
      return (
        <div id="loginContainer">
          <div id="info">
              <div id="banner">
                  <div id="bannerTitle"><span id="blue">x</span>principia</div>
                    {this.props.children}
              </div>
          </div>
        </div>
      );
   }
}

