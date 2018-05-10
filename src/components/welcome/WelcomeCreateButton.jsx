import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class WelcomeContainer extends React.Component {
   
  hoverText() {
        $(document).ready(function() {
            // $('#privateContainerMotto').html("NEW PROJECT").fadeIn(7500);
            $('#welcomeSearchFormLabel').attr('placeholder','NEW PROJECT');
            $('#welcomeSearchFormLabel').attr('id','welcomeSearchFormLabelBlue');
        });
    }
    unHoverText() {
        $(document).ready(function() {
            // $('#privateContainerMottoBlue').html("ORGANIZE YOUR THOUGHTS");
            $('#welcomeSearchFormLabelBlue').attr('placeholder','SEARCH PROJECT TREES');            
            $('#welcomeSearchFormLabelBlue').attr('id','welcomeSearchFormLabel');
        });
    }

   render() {
      return (
        <div>
          {this.props.children}
          {/* <div id="createWelcomeButtonBox"> */}
            <Link to="/welcome/create" activeClassName="activeBlue">
              <div id="welcomeProjectAddButton" onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                {/* Old height and width were 80 */}
                  <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="40" height="40" alt="User avatar, DNA Helix" />
              </div>
            </Link>
          {/* </div> */}
        </div>
      );
   }
}