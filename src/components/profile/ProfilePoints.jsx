import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link } from 'react-router';

export default class ProfilePointsContainer extends React.Component {
constructor(){
  super();

  this.state= {
    // feedback: '',
    user: [],
    userPoints: '',
    level: '',
  }
  this.changePlanetEarth = this.changePlanetEarth.bind(this)
  this.changePlanetMars = this.changePlanetMars.bind(this)
};
componentDidMount(){
  var self = this;
  axios.get( Config.API + '/users/byusername?username='+cookie.load('userName')).then(function (response) {
      self.setState({
          user: response.data,
          userPoints: response.data.Points,
          level: response.data.Level,
      })
  })
}
// componentWillReceiveProps(nextProps){
//   var self = this;
//   axios.get( Config.API + '/users/byuser?username='+cookie.load('userName')).then(function (response) {
//       self.setState({
//           user: response.data,
//           userPoints: response.data.Points,
//       })
//   })
// }

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
    $('#pointsTitleSwitchButtonWest').html("future").fadeIn(7500);
    $('#pointsLevelTitleWest').attr('id','pointsLevelTitleFuture');
    $('#pointsTitleSwitchButtonWest').attr('id','pointsTitleSwitchButtonWestHide');
    $('#pointsTitleSwitchButtonFutureHide').attr('id','pointsTitleSwitchButtonFuture');
    $('#pointsBackgroundWest').attr('id','pointsBackgroundFuture');
  });
  axios.put( Config.API + '/auth/users/updateTheme?username='+cookie.load('userName'), {
    theme : 'future'
  })
}
selectWestTitle() {
  $(document).ready(function() {
    $('#pointsLevelTitleFuture').html("westward newcomer").fadeIn(7500);
    $('#pointsTitleSwitchButtonFuture').html("frontier").fadeIn(7500);
    $('#pointsLevelTitleFuture').attr('id','pointsLevelTitleWest');
    $('#pointsTitleSwitchButtonFuture').attr('id','pointsTitleSwitchButtonFutureHide');
    $('#pointsTitleSwitchButtonWestHide').attr('id','pointsTitleSwitchButtonWest');
    $('#pointsBackgroundFuture').attr('id','pointsBackgroundWest');
  });
  axios.put( Config.API + '/auth/users/updateTheme?username='+cookie.load('userName'), {
    theme : 'frontier'
  })
}
hoverWestTitle() {
  $(document).ready(function() {
    $('#pointsTitleSwitchButtonWest').html("future").fadeIn(7500);
  });
}
unHoverWestTitle() {
  $(document).ready(function() {
    $('#pointsTitleSwitchButtonWest').html("frontier").fadeIn(7500);    
  });
}
hoverFutureTitle() {
  $(document).ready(function() {
    $('#pointsTitleSwitchButtonFuture').html("frontier").fadeIn(7500);
  });
}
unHoverFutureTitle() {
  $(document).ready(function() {
    $('#pointsTitleSwitchButtonFuture').html("future").fadeIn(7500);
  });
}
changePlanetEarth() {
  axios.put( Config.API + '/auth/users/updatePlanet?username='+cookie.load('userName'), {
    planet : 3
  })
}
changePlanetMars() {
  axios.put( Config.API + '/auth/users/updatePlanet?username='+cookie.load('userName'), {
    planet : 4
  })
  alert('mars')
}

   render() {
    //  IF STATEMENT, based on theme
    return (
      <div id="pointsContainer">
        <div id="pointsBackgroundWest">
          <div id="pointsTitleSwitchButtonWest" onClick={this.selectFutureTitle} onMouseOver={this.hoverWestTitle} onMouseOut={this.unHoverWestTitle}>
            frontier
          </div> 
          <div id="pointsTitleSwitchButtonFutureHide" onClick={this.selectWestTitle} onMouseOver={this.hoverFutureTitle} onMouseOut={this.unHoverFutureTitle}>
            future
          </div> 
          <div id="pointsLevelLabel">
            level {this.state.level}
          </div>
          <div id="pointsLevelTitleWest">
            westward newcomer
          </div>
          <div id="pointsNumberContainer">
            <div id="pointsNumberValue">
              {this.state.userPoints}
            </div>
            <div id="pointsNumberDisplay">
              prestige
            </div>
          </div>
          {/* NOT READY YET */}
          {/* <div id="pointsRankingDisplay">
            top x%
          </div> */}
          {/* NOT READY YET */}
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
            {this.state.user.Planet}
            <Link to={window.location.pathname}>
              <div id="earthMini" onMouseOver={this.hoverEarth} onMouseOut={this.unHoverEarth} onClick={this.changePlanetEarth}></div>
            </Link>
            <Link to={window.location.pathname}>
              <div id="marsMini" onMouseOver={this.hoverMars} onMouseOut={this.unHoverMars} onClick={this.changePlanetMars}></div>
            </Link>
          </div>
          <div id="nextLevelLabel">
            next level
          </div>
          <div id="nextLevelPointsNumberDisplay">
            XX points
          </div>
          <div id="nextLevelLabel">
            at level 11
          </div>
          <div id="nextLevelTitleContainer">
            <div id="nextLevelTitleLockLeft"></div>
            <div id="nextLevelTitle">
              frontiersman
            </div>
            <div id="nextLevelTitleLockRight"></div>
          </div>
          {/* <div id="nextLevelPointsRankingDisplay">
            enter top x%
          </div> */}
        </div>
      </div>
      );
   }
}