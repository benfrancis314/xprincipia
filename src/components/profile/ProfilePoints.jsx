import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProfilePointsContainer extends React.Component {
constructor(){
  super();

  this.state= {
    // feedback: '',
  }

};

hoverEarth() {
  $(document).ready(function() {
      $('#userSymbolLabel').html("select earth").fadeIn(7500);
      $('#userSymbolLabel').attr('id','userSymbolLabelHover');
  });
}
unHoverEarth() {
  $(document).ready(function() {
    $('#userSymbolLabelHover').html("insignia").fadeIn(7500);
    $('#userSymbolLabelHover').attr('id','userSymbolLabel');
  });
}
hoverMars() {
  $(document).ready(function() {
      $('#userSymbolLabel').html("select mars").fadeIn(7500);
      $('#userSymbolLabel').attr('id','userSymbolLabelHover');
  });
}
unHoverMars() {
  $(document).ready(function() {
    $('#userSymbolLabelHover').html("insignia").fadeIn(7500);
    $('#userSymbolLabelHover').attr('id','userSymbolLabel');
  });
}
selectFutureTitle() {
  $(document).ready(function() {
    $('#pointsLevelTitleWest').html("polymath apprentice").fadeIn(7500);
    $('#pointsLevelTitleWest').attr('id','pointsLevelTitleFuture');
    $('#pointsTitleSwitchButtonFuture').attr('id','pointsTitleSwitchButtonFutureHide');
    $('#pointsTitleSwitchButtonWestHide').attr('id','pointsTitleSwitchButtonWest');
  });
}
selectWestTitle() {
  $(document).ready(function() {
    $('#pointsLevelTitleFuture').html("westward newcomer").fadeIn(7500);
    $('#pointsLevelTitleFuture').attr('id','pointsLevelTitleWest');
    $('#pointsTitleSwitchButtonWest').attr('id','pointsTitleSwitchButtonWestHide');
    $('#pointsTitleSwitchButtonFutureHide').attr('id','pointsTitleSwitchButtonFuture');
    
  });
}

   render() {
    
    return (
      <div id="pointsContainer">
        <div id="pointsBackground">
          <div id="pointsLevelLabel">
            level i
          </div>
          <div id="pointsTitleContainer">
            <div id="pointsLevelTitleWest">
              westward newcomer
              {/* div here to alternate name title */}
            </div>
            <div id="pointsTitleSwitchButtonFuture" onClick={this.selectFutureTitle}>
              -> future
            </div>  
            <div id="pointsTitleSwitchButtonWestHide" onClick={this.selectWestTitle}>
              -> west
            </div>   
          </div>      
          <div id="pointsNumberContainer">
            <div id="pointsNumberValue">
              50
            </div>
            <div id="pointsNumberDisplay">
              prestige
            </div>
          </div>
          <div id="pointsRankingDisplay">
            top x%
          </div>
          {/* <div id="pointsBreakdownType">
            creation points: <span id="pointsBreakdownNumber">8</span>
          </div>
          <div id="pointsBreakdownType">
            voted points: <span id="pointsBreakdownNumber">4</span>
          </div>
          <div id="pointsBreakdownType">
            activity points: <span id="pointsBreakdownNumber">4</span>
          </div> */}
          <div id="userSymbolLabel">
            insignia
          </div>
          <div id="userSymbolSelectContainer">
            <div id="earthMini" onMouseOver={this.hoverEarth} onMouseOut={this.unHoverEarth}></div>
            <br />
            <div id="marsMini" onMouseOver={this.hoverMars} onMouseOut={this.unHoverMars}></div>
            {/* When hovering on one, make it bigger, change some text to: SELECT NEW SYMBOL */}
            {/* Then, if clicked on, give alert saying 'new symbol selected', or something */}
          </div>
          <div id="nextLevelLabel">
            next level
          </div>
          <div id="nextLevelPointsNumberDisplay">
            50 points
          </div>
          <div id="nextLevelLabel">
            at level 11
          </div>
          <div id="nextLevelTitle">
            [lock] frontiersman [lock]
          </div>
          <div id="nextLevelPointsRankingDisplay">
            enter top x%
          </div>
        </div>
      </div>
      );
   }
}
