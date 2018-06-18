import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import {Link} from 'react-router';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ScrollableAnchor from 'react-scrollable-anchor';
import YouTube from 'react-youtube';


export default class ProfileTutorial extends React.Component {
    constructor(){
        super();
      
        this.state= {
          // feedback: '',
          user: [],
          userPoints: '',
          level: '',
          title1: '',
          title2: '',
        }
        this.changePlanetEarth = this.changePlanetEarth.bind(this)
        this.changePlanetMars = this.changePlanetMars.bind(this)
      };
      componentDidMount(){
        var self = this;
        axios.get( Config.API + '/users/byusername?username='+cookie.load('userName')).then(function (response) {
            if(response.data.Tier == '2') {
              self.setState({
                user: response.data,
                userPoints: response.data.Points,
                level: response.data.Level,
                title1: 'way',
                title2: 'farer',
              })
            } else {
              self.setState({
                user: response.data,
                userPoints: response.data.Points,
                level: response.data.Level,
                title1: 'new',
                title2: 'comer',
              })
            }
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
        axios.get( Config.API + '/users/updatePlanet?username='+cookie.load('userName')+'&planet='+0).then(function (response) {
        }) 
      }
      changePlanetMars() {
        axios.get( Config.API + '/users/updatePlanet?username='+cookie.load('userName')+'&planet='+1).then(function (response) {
        }) 
      }

   render() {
    $(document).ready(function() {
        $('#introductionContainer').hide().slideDown(500);
    });

    const opts = {
        // OLD
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters 
            autoplay: 1
        }
    };
      return (
        <div>
            <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={2000}
                    transitionEnter={false}
                    transitionLeave={false}>
            <div>
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={2000}
                    transitionEnter={false}
                    transitionLeave={false}>
                <div id="fullTutorialHeader">
                    <Link to="/profile/prestige">
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />            
                    </Link>
                </div>
                <div id="demoVideoContainerProfile">
                    <YouTube
                        videoId="xyEowRRqF9s"
                        opts={opts}
                        onReady={this._onReady}
                    />
                </div>
                {randomImg()}  
                </ReactCSSTransitionGroup>
            </div>
            <div id="pointsContainer">
                <div id="pointsBackgroundWest">
                    <div id="pointsLevelLabelGuide">
                        level {this.state.level}
                    </div>
                    <div id="pointsLevelTitleWest">
                        <span id="blue">{this.state.title1}</span>{this.state.title2}
                    </div>
                    <div id="pointsNumberContainer">
                        <div id="pointsNumberValue">
                        {this.state.userPoints}
                        </div>
                        <div id="pointsNumberDisplay">
                        prestige
                        </div>
                    </div>
                    <div id="userSymbolLabel">
                        insignia
                    </div>
                    <div id="userSymbolSelectContainer">
                        <Link to={window.location.pathname} onClick={this.changePlanetEarth}>
                        <div id="earthMini" onMouseOver={this.hoverEarth} onMouseOut={this.unHoverEarth}></div>
                        </Link>
                        <Link to={window.location.pathname} onClick={this.changePlanetMars}>
                        <div id="marsMini" onMouseOver={this.hoverMars} onMouseOut={this.unHoverMars}></div>
                        </Link>
                    </div>
                </div>
            </div>
            </ReactCSSTransitionGroup>
        </div>
      ); 
   }
}

function randomImg() {
    if (Math.random() < 0.125) {
    return <img src={require('../../assets/orionLogo.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.25){
    return <img src={require('../../assets/heroLogo.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.375){
    return <img src={require('../../assets/dragonConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.5){
    return <img src={require('../../assets/hunterConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.625){
    return <img src={require('../../assets/queenConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.75){
    return <img src={require('../../assets/pegasusConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.875){
    return <img src={require('../../assets/archerConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 1){
    return <img src={require('../../assets/greatBearConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    }
}
