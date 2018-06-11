import React from 'react';
import ReactDOM from 'react-dom';
import { Link , Redirect } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ProblemFollowButton from './ProblemFollowButton.jsx';
import ProblemForm from './ProblemForm.jsx';
import ProblemSolutionsMenu from './ProblemSolutionsMenu.jsx';
import ProblemTitle from './ProblemTitle.jsx';
import ProjectBreakdownSlogan from '../ProjectBreakdownSlogan.jsx';
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
            editDeleteMenuID: '',
            editID: '',
            deleteID: '',
            linkPath: '',
            voteTrackMenuID: '',
            discussNumber: '',
            learnNumber: '',
        }
        this.vote = this.vote.bind(this)
        this.voteUp = this.voteUp.bind(this)
        this.voteDown = this.voteDown.bind(this)
        this.checkLoginVote = this.checkLoginVote.bind(this)
        this.hoverVoteNumber = this.hoverVoteNumber.bind(this)
        this.unHoverVoteNumber = this.unHoverVoteNumber.bind(this)
        this.showActivity = this.showActivity.bind(this)
        this.hideActivity = this.hideActivity.bind(this)
        this.showSummary = this.showSummary.bind(this)
        this.hideSummary = this.hideSummary.bind(this)
    };

    componentDidMount(){
      var self = this;
      axios.get( Config.API + '/breakdowns/byproblemnumber?parentID='+this.props.params.probID + '&parentNumber=1').then(function (response) {
          self.setState({
              breakdownOriginal: response.data.ID,
          })
      }) 
      axios.get( Config.API + '/problems/ID?id='+this.props.params.probID).then(function (response) {
          if ((response.data.OriginalPosterUsername === cookie.load('userName')) && (response.data.Private == '1')) {
            self.setState({
              problemInfo: response.data,
              editID: 'editProjectButton',
              deleteID: 'deleteProjectButton',
              editDeleteMenuID: 'editDeleteMenu',
            })
          } else if (response.data.OriginalPosterUsername === cookie.load('userName')) {
            self.setState({
                problemInfo: response.data,
                editID: 'editProjectButton',
                deleteID: 'noDisplay',
                editDeleteMenuID: '',
              })
          } else {
            self.setState({
              problemInfo: response.data,
              editID: 'noDisplay',
              deleteID: 'noDisplay',
            })
          }
      })
      if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
            voteTrackMenuID: 'noDisplay',

        })
      } else {
          self.setState({
              linkPath: '/project/',
              voteTrackMenuID: 'voteTrackMenu',
          })
      }
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
      axios.get( Config.API + '/comments/bytype/discuss/number?problem_id='+this.props.params.probID+'&discuss=0').then(function (response) {
          self.setState({
              discussNumber: response.data
          })
      })  
      axios.get( Config.API + '/learnItems/bytype/combined/number?id='+this.props.params.probID).then(function (response) {
          self.setState({
              learnNumber: response.data
          })
      })
  }

//   shouldComponentUpdate(nextProps, nextState) {
//     return nextState.probID !== nextProps.params.probID;
// }

  componentWillReceiveProps(nextProps){
      var self = this;
      axios.get( Config.API + '/breakdowns/byproblemnumber?parentID='+nextProps.params.probID + '&parentNumber=1').then(function (response) {
          self.setState({
              breakdownOriginal: response.data.ID,
          })
      })  
      axios.get( Config.API + '/problems/ID?id='+nextProps.params.probID).then(function (response) {
        if ((response.data.OriginalPosterUsername === cookie.load('userName')) && (response.data.Private == '1')) {
          self.setState({
            problemInfo: response.data,
            editID: 'editProjectButton',
            deleteID: 'deleteProjectButton',
            editDeleteMenuID: 'editDeleteMenu',
          })
        } else if (response.data.OriginalPosterUsername === cookie.load('userName')) {
            self.setState({
              problemInfo: response.data,
              editID: 'editProjectButton',
              deleteID: 'noDisplay',
              editDeleteMenuID: 'editMenu',
            })
        } else {
          self.setState({
            problemInfo: response.data,
            editID: 'noDisplay',
            deleteID: 'noDisplay',
          })
        }
    })
    axios.get( Config.API + "/vote/isVotedOn?type=0&typeID=" + nextProps.params.probID + "&username=" + cookie.load("userName"))
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
      axios.get( Config.API + '/comments/bytype/discuss/number?problem_id='+nextProps.params.probID+'&discuss=0').then(function (response) {
          self.setState({
              discussNumber: response.data
          })
      })  
      axios.get( Config.API + '/learnItems/bytype/combined/number?id='+nextProps.params.probID).then(function (response) {
          self.setState({
              learnNumber: response.data
          })
      })
      if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
            voteTrackMenuID: 'noDisplay',
        })
      } else {
          self.setState({
              linkPath: '/project/',
              voteTrackMenuID: 'voteTrackMenu',
          })
      }
  }
  checkLoginVote() {
    if (cookie.load('userName')) {
      this.vote()
    } else {
      $(document).ready(function() {
        $('#notification').attr('id','notificationShow').hide().slideDown();
        $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
        $('#notificationContent').html('please <span id="blue">login </span>to vote on this project');
      });
    }
  }

  vote() {
    if(this.state.vote === true ) {
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

    } else {

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

        }
  }

  voteUp() {
    var self = this
    // self.refs.probbtn.setAttribute("disabled", "disabled");
    axios.get( Config.API + '/vote/privateUp?id='+this.props.params.probID+'&type=0').then(function (response) {
      // alert('vote up success');
    })
    .catch(function (error) {
        $(document).ready(function() {
            $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationFeedbackShow').attr('id','notificationFeedback');
                    $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                  })
                );
              }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
            }
        });
        // self.refs.probbtn.removeAttribute("disabled");
    });
}

voteDown() {
    var self = this;
    // self.refs.probbtn.setAttribute("disabled", "disabled");
    // I believe something about the double click disable broke,
    // look at old versions to find the fix
    // self.refs.btn.setAttribute("disabled", "disabled");
    axios.get( Config.API + '/vote/privateDown?id='+this.props.params.probID+'&type=0').then(function (response) {
        // alert('vote down success');
      })
    .catch(function (error) {
        $(document).ready(function() {
            $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationFeedbackShow').attr('id','notificationFeedback');
                    $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                  })
                );
              }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
            }
        });
        // self.refs.probbtn.removeAttribute("disabled");
    });
      
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

    showSummary() {
        $(document).ready(function() {
            $('#problemSummaryHide').attr('id','problemSummary');
            $('#problemSummaryHideButtonHide').attr('id','problemSummaryHideButtonShow');
            $('#problemSummaryPrompt').attr('id','problemSummaryPromptHide');
        });
    }
    hideSummary() {
        $(document).ready(function() {
          $('#problemSummary').attr('id','problemSummaryHide');
          $('#problemSummaryHideButtonShow').attr('id','problemSummaryHideButtonHide');
          $('#problemSummaryPromptHide').attr('id','problemSummaryPrompt');
        });
    }

   render() {
    return (
          <div id="fullProblemContainer">
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={2000}
              transitionEnter={false}
              transitionLeave={false}>
              <Link to={this.state.linkPath+this.props.params.probID+'/flag'} activeClassName="activeProblemFlagButton">
                <div id="flagProblemButton">
                  <img src={require('../../assets/flag.svg')} id="flagProblemLogo" width="24" height="24" alt="Delete Button, Red X" />
                </div>
              </Link>
              <SubProjectParentUnit probID={this.props.params.probID} parentTitle={this.state.problemInfo.ParentTitle} parentID={this.state.problemInfo.ParentID} parentType={this.state.problemInfo.ParentType} />
              <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
              <div id="projectMidColumnContainer">
                <div id="projectMidColumnLeftStart">
                  <div id="projectTreeContainer">
                    <div id="projectTreeContainerInner">
                      <div id="problemSummaryContainer">   
                        <div id={this.state.voteTrackMenuID}>
                          <Link to={this.state.linkPath+this.props.params.probID+'/subprojects'} onClick={this.checkLoginVote}>
                            <div id={this.state.voteID} ref='probbtn'>
                              <div id="voteProblemText">
                              <span id="greenVoteNumber">{this.state.problemInfo.Rank} </span>{this.state.voteTitle}
                              </div>
                            </div>
                          </Link>
                          <ProblemFollowButton probID={this.props.params.probID} username={cookie.load('userName')} />
                        </div> 
                        <div id={this.state.editDeleteMenuID}>
                          <Link to={this.state.linkPath+this.props.params.probID+'/edit'} activeClassName="activeProjectEditButton">
                            <img src={require('../../assets/editBlue.svg')} id={this.state.editID} width="20" height="20" alt="Edit Button" />
                          </Link>
                          <Link to={this.state.linkPath+this.props.params.probID+'/delete'} activeClassName="activeProjectDeleteButton">
                            <img src={require('../../assets/redX2.svg')} id={this.state.deleteID} width="24" height="24" alt="Delete Button, Red X" />
                          </Link>
                        </div>
                        <div id="problemSummary">
                          {/* <div id="problemSummaryHideButtonShow" onClick={this.hideSummary}>
                            <img src={require('../../assets/circle1Red.svg')} id="projectModuleClose2" width="17" height="17" alt="Close discuss form" />
                          </div> */}
                            {this.state.problemInfo.Summary}
                        </div>
                        <div id="problemSummaryPromptHide" onClick={this.showSummary}>
                          <span id="blue">view </span>synopsis
                        </div>
                      </div>
                      <ProjectBreakdownSlogan />
                      <div id="problemFormContainerHide">
                        <ProblemForm probID={this.props.params.probID} solutionID={this.props.params.solutionID} />
                      </div>
                      <SubProblemContainer problemInfo={this.state.problemInfo} probID={this.props.params.probID} breakdownOriginal={this.state.breakdownOriginal} differentBreakdown={this.differentBreakdown} />
                    </div>
                  </div>
                </div>
                <div id="projectRightContainer">
                  <div id="projectMidColumnRightStart">
                    <div id="projectInfoGroupShow">
                      <div id="projectRightMenu">
                        <div id="fullWide">
                        <Link to={this.state.linkPath+this.props.params.probID+'/subprojects'} activeClassName="activeProblemOptionProposal">
                          <div id="SBButtonProposal" onClick={this.goToProposal}>proposals</div>
                        </Link> 
                        </div>
                        <div id="fullWide">
                        <Link to={this.state.linkPath+this.props.params.probID+'/discuss'} activeClassName="activeProblemOptionDiscuss">    
                          <div id="SBButtonDiscuss">
                            discuss<span id="greenDiscussLearnNumber"> {this.state.discussNumber}</span>
                          </div>
                        </Link>
                        </div>
                        <div id="fullWide">
                        <Link to={this.state.linkPath+this.props.params.probID+'/learn'} activeClassName="activeProblemOptionLearn">
                          <div id="SBButtonLearn">learn <span id="greenDiscussLearnNumber">{this.state.learnNumber}</span></div>
                        </Link>
                        </div>
                      </div>
                      {React.cloneElement(this.props.children, {probID:this.props.params.probID, parentTitle: this.state.problemInfo.Title, parentID: this.state.problemInfo.ParentID, creator:this.state.problemInfo.OriginalPosterUsername, breakdownID:this.state.breakdownID})}
                    </div>
                  </div>
                </div>
              </div>
            </ReactCSSTransitionGroup>
          </div>
      );
    }
}

 