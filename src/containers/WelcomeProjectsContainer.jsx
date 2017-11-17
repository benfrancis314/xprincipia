import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
// import Sound from 'react-sound';
// Currently unused, may use later. Loading only loads part of page, currently looks weird
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import WelcomeUnit from '../components/welcome/WelcomeUnit.jsx';
import WelcomeUserUnit from '../components/welcome/WelcomeUserUnit.jsx';
import {Config} from '../config.js';
import $ from 'jquery';


export default class WelcomeContainer extends React.Component {
   
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
           userproblems : [],
           searchText: [],
           feedProjects: []
        }
        this.queryProblem = this.queryProblem.bind(this);
        // this.startSound = this.startSound.bind(this);
    };
     queryProblem () {
         //get search text box data
        this.state.searchText = document.getElementById('welcomeSearchFormLabel').value

        var self = this
        return axios.get( Config.API + '/problems/search?q='+this.state.searchText).then(function (response) {
            self.setState({
              userproblems: response.data
            })
        })
      .catch(function (error) {
        // console.log(error.response.data)
          // $(document).ready(function() {
          //     $('#notification').attr('id','notificationShow').hide().slideDown();
          //     if (error.response.data != '') {
          //       $('#notificationContent').text(error.response.data);
          //     }
          //     else if (error.response.data == '[object Object]') {
          //       return (
          //         $(document).ready(function() {
          //           $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
          //           $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
          //         })
          //       );
          //     } 
          // });
      });
        }
        // componentDidMount(){
        //   window.scrollTo(0,0);
        // }
        componentWillMount(){
        var self = this;
        // window.scrollTo(0,0);
        return axios.get( Config.API + '/problems/all').then(function (response) {
            self.setState({
                problems: response.data,
                userproblems: response.data,
                feedProjects: response.data
            })
        }) 
      .catch(function (error) {
        // console.log(error.response.data)
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
     }

    //  startSound () {
    //     var self = this;

    //     return  self.setState({ volume: 100 });
    //     }
   
   render() {
      return (
        <div>
          <div id="welcomeContainerBanner">
              <div id="welcomeContainerTitle">
                  XPrincipia Projects
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
              {React.cloneElement(this.props.children)}
              
              <div id="welcomeRightContainer">
                <div id="SPListDiv">
                {/* <div id="welcomeRightResults"> */}
                    <div id="leaderBoardCapTop">
                          leaderboard
                    </div>
                    <form id="welcomeSearchFormContainer">
                      {/* Used to say "SEARCH PROJECT TREES" */}
                      <input type="search" name="search" placeholder="SEARCH PROJECT TREES" id="welcomeSearchFormLabel"  onKeyDown={this.queryProblem} autoFocus autoComplete="off" />
                    </form>
                     {/* {this.props.children} */}
                  {/* </div> */}
                    
                    <WelcomeUserUnit problems={this.state.userproblems} />
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