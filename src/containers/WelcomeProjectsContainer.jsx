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
            $('#leaderBoardCapTop').html("leaderboards").fadeIn(7500);
            $('#leaderBoardCapTop').attr('id','leaderBoardCapTopHover');
    });
  }
  unHoverLeaderBoardText() {
    if(this.state.leaderboardType == 'users') {
        $(document).ready(function() {
                $('#leaderBoardCapTopHover').html("top members");
                $('#leaderBoardCapTopHover').attr('id','leaderBoardCapTop');
        });
    } else if (this.state.leaderboardType == 'proposals') {
      $(document).ready(function() {
        $('#leaderBoardCapTopHover').html("top proposals");
        $('#leaderBoardCapTopHover').attr('id','leaderBoardCapTop');
      });
    } else {
      $(document).ready(function() {
        $('#leaderBoardCapTopHover').html("top projects");
        $('#leaderBoardCapTopHover').attr('id','leaderBoardCapTop');
      });
    }
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
            
      if(this.state.leaderboardType == 'users') {
        $(document).ready(function() {
          $('#leaderBoardSelectShow').attr('id','leaderBoardSelect');
          $('#leaderBoardCapTopClick').html("top members");
          $('#leaderBoardCapTopClick').attr('id','leaderBoardCapTop');
          $('#leaderBoardFilterButtonClick').attr('id','leaderBoardFilterButton');
          $('#leaderBoardFilterExitLeftShow').attr('id','leaderBoardFilterExitLeft');
          $('#leaderBoardFilterExitRightShow').attr('id','leaderBoardFilterExitRight');
        });
      } else if (this.state.leaderboardType == 'proposals') {
        $(document).ready(function() {
          $('#leaderBoardSelectShow').attr('id','leaderBoardSelect');
          $('#leaderBoardCapTopClick').html("top proposals");
          $('#leaderBoardCapTopClick').attr('id','leaderBoardCapTop');
          $('#leaderBoardFilterButtonClick').attr('id','leaderBoardFilterButton');
          $('#leaderBoardFilterExitLeftShow').attr('id','leaderBoardFilterExitLeft');
          $('#leaderBoardFilterExitRightShow').attr('id','leaderBoardFilterExitRight');
        });
      } else {
        $(document).ready(function() {
          $('#leaderBoardSelectShow').attr('id','leaderBoardSelect');
          $('#leaderBoardCapTopClick').html("top projects");
          $('#leaderBoardCapTopClick').attr('id','leaderBoardCapTop');
          $('#leaderBoardFilterButtonClick').attr('id','leaderBoardFilterButton');
          $('#leaderBoardFilterExitLeftShow').attr('id','leaderBoardFilterExitLeft');
          $('#leaderBoardFilterExitRightShow').attr('id','leaderBoardFilterExitRight');
        });
      }             
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
          $('#logoNameGuide').html('<span id="xBlue">x</span>principia');             
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
        this.unHoverLeaderBoardText = this.unHoverLeaderBoardText.bind(this);
        this.hideLeaderBoardSelect = this.hideLeaderBoardSelect.bind(this);
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
      $(document).ready(function() {
        $('#leaderBoardSelectShow').attr('id','leaderBoardSelect');
        $('#leaderBoardCapTopClick').html("top members");
        $('#leaderBoardCapTopClick').attr('id','leaderBoardCapTop');
        $('#leaderBoardFilterButtonClick').attr('id','leaderBoardFilterButton');
        $('#leaderBoardFilterExitLeftShow').attr('id','leaderBoardFilterExitLeft');
        $('#leaderBoardFilterExitRightShow').attr('id','leaderBoardFilterExitRight');
      });
    };

    selectProjects () {
      var self = this;
      axios.get( Config.API + '/problems/filter/byvote').then(function (response) {
          self.setState({
            leaderboardType: 'projects',  
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
      $(document).ready(function() {
        $('#leaderBoardSelectShow').attr('id','leaderBoardSelect');
        $('#leaderBoardCapTopClick').html("top projects");
        $('#leaderBoardCapTopClick').attr('id','leaderBoardCapTop');
        $('#leaderBoardFilterButtonClick').attr('id','leaderBoardFilterButton');
        $('#leaderBoardFilterExitLeftShow').attr('id','leaderBoardFilterExitLeft');
        $('#leaderBoardFilterExitRightShow').attr('id','leaderBoardFilterExitRight');
      });
    };

    selectProposals () {
      var self = this;
      axios.get( Config.API + '/solutions/filter/byvote').then(function (response) {
          self.setState({
            leaderboardType: 'proposals',  
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
      $(document).ready(function() {
        $('#leaderBoardSelectShow').attr('id','leaderBoardSelect');
        $('#leaderBoardCapTopClick').html("top proposals");
        $('#leaderBoardCapTopClick').attr('id','leaderBoardCapTop');
        $('#leaderBoardFilterButtonClick').attr('id','leaderBoardFilterButton');
        $('#leaderBoardFilterExitLeftShow').attr('id','leaderBoardFilterExitLeft');
        $('#leaderBoardFilterExitRightShow').attr('id','leaderBoardFilterExitRight');
      });
    };

   
   render() {
      return (
        <div>
          {/* <Link to="/demo">
            <div id="welcomeTutorialVideoButton" onClick={this.privateAlert} onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                <img src={require('../assets/videoPlay3.svg')} id="welcomeVideoLogo" width="22" height="22" alt="Video player symbol, link to tutorial"/>
            </div>
          </Link> */}    

          <div id="welcomeUnitsContainer">
            <div id="welcomeContainerTitle">
                <span id="welcomeContainerTitleBlue">centralized </span><span id="welcomeContainerTitleWhite">projects</span>
            </div> 
            <div id="width87">
                <WelcomeUnit problems={this.state.problems} />
            </div>
          </div>

          <div id="welcomeUserUnitsContainer">
              {this.props.children}
              
              <div id="welcomeRightContainer">
                <div id="SPListDiv">
                    <div id="featuredContainer">
                      {randomFeatured()}
                      {/* <div id="featuredProjectButton">
                            the three world reality
                      </div> */}
                    </div>
                    <div id="leaderBoardFilterContainer">
                      <div id="leaderBoardFilterButton" onMouseOver={this.hoverLeaderBoardText} onMouseOut={this.unHoverLeaderBoardText} onClick={this.showLeaderBoardSelect}>
                      </div>
                      <img src={require('../assets/redX.svg')} id="leaderBoardFilterExitLeft" width="25" height="25" onClick={this.hideLeaderBoardSelect} />
                      <img src={require('../assets/redX.svg')} id="leaderBoardFilterExitRight" width="25" height="25" onClick={this.hideLeaderBoardSelect} />
                    </div>
                    <div id="leaderBoardSelect">
                      <div id="leaderBoardOption" onClick={this.selectProjects}>
                        projects
                      </div>
                      <div id="leaderBoardOption" onClick={this.selectProposals}>
                        proposals
                      </div>
                      <div id="leaderBoardOption" onClick={this.selectUsers}>
                        members
                      </div>
                    </div>

                    <div id="leaderBoardCapTop">
                        top projects
                    </div>
                    <div id="visibleLeaderboardProjects">
                      <LeaderboardUnit leaderboardType={this.state.leaderboardType} leaderboard={this.state.leaderboard} />
                    </div>
                </div>
              </div>
              
          </div>

          {randomImg()}
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


function randomFeatured() {
  if (Math.random() < 0.5) {
      return (
        <div>
          <div id="featuredProjectLabel">
            featured project
          </div>
          <Link to={'/project/23/subprojects'}>
            <div id="featuredProjectButton1">
                structure and dynamics
                <br />of the mind
            </div>
          </Link>
        </div>
      );
  } else {
    return (
    
      <div>
        <div id="featuredProjectLabel">
          featured project
        </div>
        <Link to={'/project/23/subprojects'}>
          <div id="featuredProjectButton3">
            {/* imitation human cognition 
            <br />
            artificial intelligence */}
            human based
            <br />
            general artificial intelligence
          </div>
        </Link>
      </div>
    );
  }
    // } else if (Math.random() < 1){
  //     return (
  //       <div>
  //         <div id="featuredProjectLabel">
  //           featured proposal
  //         </div>
  //         <Link to={'/project/7/proposal/2'}>
  //           <div id="featuredProjectButton2">
  //               the mental world
  //           </div>
  //         </Link>
  //       </div>
  //     );
}
