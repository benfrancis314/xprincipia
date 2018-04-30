import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
// import Sound from 'react-sound';
// Currently unused, may use later. Loading only loads part of page, currently looks weird
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import WelcomeUnit from '../components/welcome/WelcomeUnit.jsx';
import LeaderboardUnit from '../components/welcome/LeaderboardUnit.jsx';
import {Config} from '../config.js';
import $ from 'jquery';


export default class WelcomeContainer extends React.Component {
   
  hoverLeaderBoardText() {
    $(document).ready(function() {
            $('#leaderBoardCapTop').html("categories").fadeIn(7500);
            $('#leaderBoardCapTop').attr('id','leaderBoardCapTopHover');
    });
  }
  unHoverLeaderBoardText() {
    $(document).ready(function() {
            $('#leaderBoardCapTopHover').html("player leaderboard");
            $('#leaderBoardCapTopHover').attr('id','leaderBoardCapTop');
    });
  }
  showLeaderBoardSelect() {
    $(document).ready(function() {
            $('#leaderBoardSelect').attr('id','leaderBoardSelectShow');
            $('#leaderBoardCapTopHover').attr('id','leaderBoardCapTopClick');
            $('#leaderBoardFilterButton').attr('id','leaderBoardFilterButtonClick');
            $('#leaderBoardFilterExitLeft').attr('id','leaderBoardFilterExitLeftShow');
            $('#leaderBoardFilterExitRight').attr('id','leaderBoardFilterExitRightShow');
    });
  }
  hideLeaderBoardSelect() {
    $(document).ready(function() {
            $('#leaderBoardSelectShow').attr('id','leaderBoardSelect');
            $('#leaderBoardCapTopClick').html("player leaderboard");
            $('#leaderBoardCapTopClick').attr('id','leaderBoardCapTop');
            $('#leaderBoardFilterButtonClick').attr('id','leaderBoardFilterButton');
            $('#leaderBoardFilterExitLeftShow').attr('id','leaderBoardFilterExitLeft');
            $('#leaderBoardFilterExitRightShow').attr('id','leaderBoardFilterExitRight');
    });
}

  hoverText() {
    $(document).ready(function() {
        // $('#welcomeSearchFormLabel').attr('placeholder','CINEMATIC GUIDE');
        // $('#welcomeSearchFormLabel').attr('id','welcomeSearchFormLabelBlue');
        $('#logoName').html("cinematic guide").fadeIn(7500);
        $('#logoName').attr('id','logoNameGuide');
    });
  }
  unHoverText() {
      $(document).ready(function() {
          // Used to say SEARCH PROJECT TREES
          $('#logoNameGuide').html('XPrincipia');            
          $('#logoNameGuide').attr('id','logoName');
      });
  }
  goToStory() {
    document.location = "/shortstory"
  }

    constructor(props){
        super(props);

        this.state = {
           problems : [],
           leaderboardType: '',
           leaderboard : [],
           searchText: [],
           feedProjects: []
        }
        this.selectUsers = this.selectUsers.bind(this);
        this.selectProjects = this.selectProjects.bind(this);
        this.selectProposals = this.selectProposals.bind(this);
        // this.startSound = this.startSound.bind(this);
    };

    componentDidMount(){
      var self = this;
      axios.get( Config.API + '/problems/filter/byvote').then(function (response) {
          self.setState({
              leaderboardType: 'projects',
              leaderboard: response.data,
              feedProjects: response.data
          })
      }) 
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });
      axios.get( Config.API + '/problems/all').then(function (response) {
        self.setState({
            problems: response.data,
        })
    }) 
     }
  //  componentWillReceiveProps (nextProps){

  //  }

    //  startSound () {
    //     var self = this;

    //     return  self.setState({ volume: 100 });
    //     }

    selectUsers () {
      var self = this;
      axios.get( Config.API + '/users/list').then(function (response) {
          self.setState({
            leaderboardType: 'users',  
            leaderboard: response.data,
          })
      }) 
        .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });
    };

    selectProjects () {
      var self = this;
      axios.get( Config.API + '/problems/filter/byvote').then(function (response) {
          self.setState({
              problems: response.data,
          })
      }) 
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });
    };

    selectProposals () {
      var self = this;
      axios.get( Config.API + '/problems/all').then(function (response) {
          self.setState({
              problems: response.data,
          })
      }) 
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });
    };


   
   render() {
      return (
        <div>
          <div id="welcomeContainerBanner">
              <div id="welcomeContainerTitle">
                  {/* OLD */}
                  XPrincipia Projects
                  {/* NEW */}
                  {/* critical projects */}
              </div>     
              <Link to="/demo">
                <div id="welcomeTutorialVideoButton" onClick={this.privateAlert} onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                    <img src={require('../assets/videoPlay3.svg')} id="welcomeVideoLogo" width="22" height="22" alt="Video player symbol, link to tutorial"/>
                </div>
              </Link>
          </div>
          {/* <div id="privateContainerMottoContainer">
              <div id="privateContainerMotto">
                    ORGANIZE YOUR THOUGHTS
              </div>
          </div> */}

          {/* Get rid of if not using */}
          <div id="welcomeUnitsContainer">
            <div id="width80">
                <WelcomeUnit problems={this.state.problems} />
            </div>
          </div>
          
          {/*<div id="chatBoxOpenButtonContainer">*/}
            {/*<Link to="/chatbox" activeClassName="activeChat">
              <div id="chatBoxOpenButton">
                Live Debate
              </div>
            </Link>*/}
          {/*</div>*/}

          
          
        
          {/* Old */}
          {/* <div id="welcomeFormComponent">
              <form id="privateSearchForm">
                <input type="search" name="search" placeholder="Search all projects" id="privateExploreInput"  onKeyDown={this.queryProblem} autoFocus/>
              </form>
          </div> */}
          <div id="welcomeUserUnitsContainer">
              {this.props.children}
              
              <div id="welcomeRightContainer">
                <div id="SPListDiv">
                {/* <div id="welcomeRightResults"> */}
                    <div id="featuredContainer">
                      <div id="featuredProjectLabel">
                        featured
                      </div>
                      <div id="featuredProjectButton">
                            the three world reality
                      </div>
                    </div>
                    <div id="leaderBoardFilterContainer">
                      <div id="leaderBoardFilterButton" onMouseOver={this.hoverLeaderBoardText} onMouseOut={this.unHoverLeaderBoardText} onClick={this.showLeaderBoardSelect}>
                      </div>
                      <img src={require('../assets/redX.svg')} id="leaderBoardFilterExitLeft" width="25" height="25" onClick={this.hideLeaderBoardSelect} />
                      <img src={require('../assets/redX.svg')} id="leaderBoardFilterExitRight" width="25" height="25" onClick={this.hideLeaderBoardSelect} />
                    </div>
                    <div id="leaderBoardSelect">
                      <div id="leaderBoardOption" onClick={this.selectUsers}>
                        members
                      </div>
                      <div id="leaderBoardOption" onClick={this.selectProjects}>
                        projects
                      </div>
                      <div id="leaderBoardOption" onClick={this.selectProposals}>
                        proposals
                      </div>
                    </div>

                    {/* <div id="leaderBoardTitleContainer"> */}
                    <div id="leaderBoardCapTop">
                        members leaderboard
                    </div>
                    {/* </div> */}
                    {/* <form id="welcomeSearchFormContainer">
                      <input type="search" name="search" placeholder="SEARCH PROJECT TREES" id="welcomeSearchFormLabel" onKeyDown={this.queryProblem} 
                      autoComplete="off" />
                    </form> */}
                    
                    {/* <div id="invisibleLeaderboardUsers">
                      *Users list here*
                    </div> */}
                    <div id="visibleLeaderboardProjects">
                      <LeaderboardUnit leaderboardType={this.state.leaderboardType} leaderboard={this.state.leaderboard} />
                    </div>
                  {/* <div id="leaderBoardCapBottom">
                  </div> */}
                </div>
              </div>
              
          </div>

          {/*<div id="tutorialWelcomeButtonDiv">
            <img src={require('../assets/tutorial.svg')} id="tutorialWelcomeButton" width="50" height="50" alt="Back arrow, blue up arrow" />
          </div>*/}
          {randomImg()}
          {/* <TutorialWelcomeContent /> */}
          {/*</ReactCSSTransitionGroup>*/}
        </div>
      );
   }
}
function randomImg() {
  if (Math.random() < 0.125) {
    return <img src={require('../assets/orionLogo.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
  } else if (Math.random() < 0.25){
    return <img src={require('../assets/heroLogo.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
  } else if (Math.random() < 0.375){
    return <img src={require('../assets/dragonConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
  } else if (Math.random() < 0.5){
    return <img src={require('../assets/hunterConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
  } else if (Math.random() < 0.625){
    return <img src={require('../assets/queenConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
  } else if (Math.random() < 0.75){
    return <img src={require('../assets/pegasusConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
  } else if (Math.random() < 0.875){
    return <img src={require('../assets/archerConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
  } else if (Math.random() < 1){
    return <img src={require('../assets/greatBearConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
  }
}