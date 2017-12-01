import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class WelcomeContainer extends React.Component {

   render() {
      return (
        <div>
            <Link>
                <div id="welcomeProjectAddButton" onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                    <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="40" height="40" alt="User avatar, DNA Helix" />
                </div>
            </Link>
        </div>
      );
   }
}