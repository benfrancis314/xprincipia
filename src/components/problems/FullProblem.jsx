import React from 'react';
import ReactDOM from 'react-dom';
import { Link  } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ProblemFollowButton from './ProblemFollowButton.jsx';
import ProblemSolutionsMenu from './ProblemSolutionsMenu.jsx';
import ProblemTitle from './ProblemTitle.jsx';
import ProjectVoteButton from './ProjectVoteButton.jsx';
import ProjectActivity from './ProjectActivity.jsx';
import SubProblemContainer from '../../containers/SubProblemContainer.jsx';
import SubProjectParentUnit from './SubProjectParentUnit.jsx';
import {Config} from '../../config.js';
import $ from 'jquery';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

// import ReactGA from 'react-ga';
// ReactGA.initialize('UA-104103231-1'); //Unique Google Analytics tracking number

configureAnchors({offset: -20, scrollDuration: 700});

export default class FullProblem extends React.Component {
  
  constructor(){
        super();

        this.state = {
            problemInfo: [],
            parentInfo: [],
            probID: [],
            // vote: false,
            // I don't think we use breakdown ID anymore
            breakdownID: '',
            breakdownOriginal: '',
            vote: false,
            voteID: '',
            voteTitle: '',
            voteAction: '',
            editID: '',
        }
        this.vote = this.vote.bind(this)
        this.hoverVoteNumber = this.hoverVoteNumber.bind(this)
        this.unHoverVoteNumber = this.unHoverVoteNumber.bind(this)
        this.showActivity = this.showActivity.bind(this)
        this.hideActivity = this.hideActivity.bind(this)
        this.showInfo = this.showInfo.bind(this)
        this.hideInfo = this.hideInfo.bind(this)
    };

    componentDidMount(){
      var self = this;
      // ReactDOM.findDOMNode(this).scrollIntoView();
      window.scrollTo(0,0);
      axios.get( Config.API + '/problems/ID?id='+this.props.params.probID).then(function (response) {
          if (response.data.OriginalPosterUsername === cookie.load('userName')) {
            self.setState({
              problemInfo: response.data,
              editID: 'editProjectButton',
            })
          } else {
            self.setState({
              problemInfo: response.data,
              editID: 'noDisplay',
            })
          }
      })
      axios.get( Config.API + "/vote/isVotedOn?type=0&typeID=" + this.props.params.probID + "&username=" + cookie.load("userName"))
            .then( function (response){
              if (response.data === true) {
                self.setState({
                  voteID: 'votedProblem',
                  voteTitle: 'voted',
                  voteAction: 'this.unVote',
                  vote: true,
                }) 
            } else {
              self.setState({
                voteID: 'voteProblem',
                voteTitle: 'vote',
                voteAction: 'this.submitVote',
                vote: false,
              }) 
            }
      })       
      axios.get( Config.API + '/breakdowns/byproblemnumber?parentID='+this.props.params.probID + '&parentNumber=1').then(function (response) {
          self.setState({
              breakdownOriginal: response.data.ID,
          })
      })   
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.probID !== nextProps.params.probID;
}

  componentWillReceiveProps(nextProps){
      var self = this;
      // window.scrollTo(0,0);
      axios.get( Config.API + '/problems/ID?id='+nextProps.params.probID).then(function (response) {
        if (response.data.OriginalPosterUsername === cookie.load('userName')) {
          self.setState({
            problemInfo: response.data,
            editID: 'editProjectButton',
          })
        } else {
          self.setState({
            problemInfo: response.data,
            editID: 'noDisplay',
          })
        }
    })
    axios.get( Config.API + "/vote/isVotedOn?type=0&typeID=" + nextProps.params.probID + "&username=" + cookie.load("userName"))
          .then( function (response){
            self.setState({
              vote: response.data
            })
      })       
    axios.get( Config.API + '/breakdowns/byproblemnumber?parentID='+nextProps.params.probID + '&parentNumber=1').then(function (response) {
      self.setState({
          breakdownOriginal: response.data.ID,
      })
    })   
  }


  vote() {
    if(this.state.vote === true ) {
          var self = this
          self.refs.probbtn.setAttribute("disabled", "disabled");
          axios.post( Config.API + '/auth/vote/create', {
              Type: 0,
              TypeID: this.state.problemInfo.ID,
              username : cookie.load("userName"),
            })
            .then(function (result) {
              return axios.get( Config.API + '/problems/ID?id='+self.props.params.probID).then(function (response) {
                    self.setState({
                        problemInfo: response.data,
                    })
                self.refs.probbtn.removeAttribute("disabled");
              })
              
            })
          .catch(function (error) {
              $(document).ready(function() {
                    if (error.response.data == '[object Object]') {
                      return (
                          $(document).ready(function() {
                            $('#notification').attr('id','notificationShow').hide().slideDown();
                            $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                            $('#notificationFeedbackShow').attr('id','notificationFeedback');
                            $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                          })
                        );
                    }  else if (error.response.data != '') {
                  }
              });
              self.refs.probbtn.removeAttribute("disabled");
          });

    } else {
          var self = this;
          // I believe something about the double click disable broke,
          // look at old versions to find the fix
          self.refs.probbtn.setAttribute("disabled", "disabled");
          axios.delete( Config.API + '/auth/vote/delete' ,{
            params: {
              type: 0,
              typeID: this.props.params.probID,
              username: cookie.load('userName')
            }})
            .then(function (result) {
                return axios.get( Config.API + '/problems/ID?id='+self.props.params.probID).then(function (response) {
                self.setState({
                    problemInfo: response.data,
                })
                // document.location = window.location.pathname 
                // Below is for double click problem, if needed
                self.refs.probbtn.removeAttribute("disabled");
            })
            })
          .catch(function (error) {
              $(document).ready(function() {
                // MOVED NOTIFICATION SHOW INTO ONLY FOR IF NOT LOGGED IN,
                // BECAUSE ERROR OCCURS TOO OFTEN
                    if (error.response.data == '[object Object]') {
                      return (
                        $(document).ready(function() {
                          $('#notification').attr('id','notificationShow').hide().slideDown();
                          $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                          $('#notificationFeedbackShow').attr('id','notificationFeedback');
                          $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                        })
                      );
                    }  else if (error.response.data != '') {
                    // $('#notificationContent').text(error.response.data);
                  }
              });
              self.refs.probbtn.removeAttribute("disabled");
          });
    }
  }

    hoverVoteNumber() {
      $(document).ready(function() {
            $('#voteProblem').attr('id','voteProblemHover');               
      });
    }
    unHoverVoteNumber() {
      $(document).ready(function() {
            $('#voteProblemHover').attr('id','voteProblem');              
        });
    }
    showActivity() {
      $(document).ready(function() {
            $('#projectActivityGroup').attr('id','projectActivityGroupShow');
            $('#projectActivityButton').attr('id','projectActivityButtonHide');
        });
    }
    hideActivity() {
      $(document).ready(function() {
            $('#projectActivityGroupShow').attr('id','projectActivityGroup');  
            $('#projectActivityButtonHide').attr('id','projectActivityButton');
      });
    }
    showInfo() {
      $(document).ready(function() {
            $('#projectInfoGroup').attr('id','projectInfoGroupShow');
            $('#projectInfoButton').attr('id','projectInfoButtonHide');
        });
    }
    hideInfo() {
      $(document).ready(function() {
        $('#projectInfoGroupShow').attr('id','projectInfoGroup'); 
        $('#projectInfoButtonHide').attr('id','projectInfoButton');  
      });
    }

   render() {
    return (

            <div id="maxContainerColumn">
            
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={2000}
              transitionEnter={false}
              transitionLeave={false}>
              <div id="vh1">
              <Link to={`/project/${this.props.params.probID}/flag`} activeClassName="activeProblemFlagButton">
                <div id="flagProblemButton">
                  <img src={require('../../assets/flag.svg')} id="flagProblemLogo" width="24" height="24" alt="Delete Button, Red X" />
                </div>
              </Link>
            <div id="problemColumn1">
              <SubProjectParentUnit probID={this.props.params.probID} parentID={this.state.problemInfo.ParentID} parentType={this.state.problemInfo.ParentType} />
              <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
              <div id="projectActionGroupShow">
                <div id="problemRow1">
                    <Link to={`/project/${this.props.params.probID}/discuss`} activeClassName="activeProblemOptionDiscuss">
                      <div id="SBButtonDiscuss">discuss</div>
                    </Link>
                    <div id="problemCenterColumn">
                      <Link to={`/project/${this.props.params.probID}/subprojects`}>
                        <div id={this.state.voteID} ref='probbtn' onClick={this.vote}>
                            {this.state.voteTitle}
                        </div>
                      </Link>
                      <a href='#proposals'>
                        <div id="SBButtonProposal" onClick={this.goToProposal}>proposals</div>
                      </a>
                      <ProblemFollowButton probID={this.props.params.probID} username={cookie.load('userName')} />
                    </div>
                    <Link to={`/project/${this.props.params.probID}/learn`} activeClassName="activeProblemOptionLearn">
                      <div id="SBButtonLearn">learn</div>
                    </Link>
                </div>
                <div id="projectCreator">
                  {this.state.problemInfo.OriginalPosterUsername}
                </div>
                <Link to={`/project/${this.props.params.probID}/edit`}>
                  <img src={require('../../assets/editBlue.svg')} id={this.state.editID} width="20" height="20" alt="Edit Button" />
                </Link>
              </div>
              <div id="projectMajorButtonRow">
                <div id="projectActivityButton" onClick={this.showActivity}>
                  activity
                </div>
                <div id="projectInfoButton" onClick={this.showInfo}>
                  brief
                </div>
              </div>
                <div id="projectMidColumnContainer">
                  <div id="projectMidColumnLeftStart">
                    <div id="projectActivityGroup">
                      <ProjectActivity probID={this.props.params.probID} />
                      <div id="projectHideButton2" onClick={this.hideActivity}>
                        <img src={require('../../assets/redX2.svg')} id="projectModuleClose2" width="22" height="22" alt="Project Tree Button, white tree"  onClick={this.hideParentList} />
                      </div>
                    </div>
                  </div>
                  <div id="projectMidColumnRightStart">
                    <div id="projectInfoGroup">
                      <div id="projectPercent" onClick={this.submitVote} onMouseOver={this.hoverVoteNumber} onMouseOut={this.unHoverVoteNumber}>
                        {this.state.problemInfo.Rank}
                      </div>
                      <div id="fullProblem">
                        <p id="problemSummary">
                          {this.state.problemInfo.Summary}
                        </p>
                      </div>
                      <div id="projectHideButton3" onClick={this.hideInfo}>
                        <img src={require('../../assets/redX2.svg')} id="projectModuleClose3" width="18" height="18" alt="Project Tree Button, white tree"  onClick={this.hideParentList} />
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              {React.cloneElement(this.props.children, {probID:this.props.params.probID, parentTitle: this.state.problemInfo.Title, gParentID: this.state.problemInfo.ParentID, gParentTitle: this.state.problemInfo.ParentTitle, ggParentID: this.state.problemInfo.GrandParentID, creator:this.state.problemInfo.OriginalPosterUsername, breakdownID:this.state.breakdownID})}
              <SubProblemContainer probID={this.props.params.probID} breakdownOriginal={this.state.breakdownOriginal} differentBreakdown={this.differentBreakdown} />
              </div>
              <ScrollableAnchor id={'proposals'}>
                <ProblemSolutionsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />
              </ScrollableAnchor>
    
            </ReactCSSTransitionGroup>
          </div>
      );
    }
}

 