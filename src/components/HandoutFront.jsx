import React from 'react';
import HandoutBack from './HandoutBack.jsx';

export default class Handout extends React.Component {
   render() {
      return (
     <div id="handoutContainer">
      <div id="handoutFront">
          <div id="bannerHandout">
              <div id="bannerHandoutTitle">XPrincipia</div>
              <div id="bannerHandoutSlogan">Open Source Science</div>
          </div>
          <div id="learnMoreHandout">
              <div id="introductionHandout">
                  .<br />Signup for Progress Updates
                 <br /><div id="emailHandout">xprincipia.com</div>.<br />
                  .
              </div>
              <br />
          </div>
      </div>
<HandoutBack />
    </div>
      );
   }
}