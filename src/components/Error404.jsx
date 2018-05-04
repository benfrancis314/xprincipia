import React from 'react';
import { browserHistory } from 'react-router';

export default class Error404 extends React.Component {
   render() {
       setTimeout(function(){
           browserHistory.goBack()},1500)
      return (
      <div>
            <div id="errorContainer">
                <div id="error">
                    <img src={require('../assets/gear2.svg')} id="errorGear" width="250" height="250" alt="User avatar, DNA Helix" />
                    <h1 id="errorTitle">404</h1>
                    <div id="errorSlogan">Page not found</div>
                    <div id="errorSlogan2">redirecting</div>
                    
                </div>
             
            </div>
      </div>
      );
   }
}
