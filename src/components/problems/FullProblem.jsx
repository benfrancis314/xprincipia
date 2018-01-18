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

configureAnchors({offset: -20, scrollDuration: 700});

export default class FullProblem extends React.Component {
  
  constructor(){
        super();

        this.state = {
            problemInfo: [],
            parentInfo: [],
            probID: [],
            vote: false,
            breakdownID: '',
            breakdownRerender: true,
        }
        this.submitVote = this.submitVote.bind(this)
        this.unVote = this.unVote.bind(this)
        this.differentBreakdown = this.differentBreakdown.bind(this)
        this.hoverVoteNumber = this.hoverVoteNumber.bind(this)
        this.unHoverVoteNumber = this.unHoverVoteNumber.bind(this)
        this.showActions = this.showActions.bind(this)
        this.hideActions = this.hideActions.bind(this)
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
          self.setState({
              problemInfo: response.data
          })
    })
    axios.get( Config.API + "/vote/isVotedOn?type=0&typeID=" + this.props.params.probID + "&username=" + cookie.load("userName"))
          .then( function (response){
            self.setState({
              vote: response.data
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
          self.setState({
              problemInfo: response.data
          })
    })
    axios.get( Config.API + "/vote/isVotedOn?type=0&typeID=" + nextProps.params.probID + "&username=" + cookie.load("userName"))
          .then( function (response){
            self.setState({
              vote: response.data
            })
      })       
  }


  submitVote() {
      var self = this
       axios.post( Config.API + '/auth/vote/create', {
           Type: 0,
           TypeID: this.state.problemInfo.ID,
           username : cookie.load("userName"),
        })
        .then(function (result) {
          return axios.get( Config.API + '/problems/ID?id='+self.props.params.probID).then(function (response) {
                self.setState({
                problemInfo: response.data,
                // vote: true,
            })
            document.location = window.location.pathname 
          })
          
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
      });
  }

unVote() {
      var self = this;
      self.refs.btn.setAttribute("disabled", "disabled");
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
            document.location = window.location.pathname 
            // Below is for double click problem, if needed
            // self.refs.btn.removeAttribute("disabled");
        })
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
      });
        
    }

    differentBreakdown(breakdown) {
      this.setState({
        breakdownID: breakdown,
        breakdownRerender: false
      })
      // this.refs.branch.changeBreakdownForm(breakdown);
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
    showActions() {
      $(document).ready(function() {
            $('#projectActionGroup').attr('id','projectActionGroupShow');
            $('#projectActionButton').attr('id','buttonHide1');      
        });
    }
    hideActions() {
      $(document).ready(function() {
            $('#projectActionGroupShow').attr('id','projectActionGroup');   
            $('#buttonHide1').attr('id','projectActionButton');              
        });
    }
    showActivity() {
      $(document).ready(function() {
            $('#projectActivityGroup').attr('id','projectActivityGroupShow');
            $('#projectActivityButton').attr('id','buttonHide2');  
            $('#projectActivityButton2').attr('id','buttonHide2');   
            $('#projectMidColumnLeft').attr('id','projectMidColumnLeftStart');          
            
            // MOVE BRIEF TO RIGHT
            // CHANGE BRIEF ID FROM projectHide5 TO projectInfoButton2
            if(document.getElementById('projectInfoGroupShow')) {
              $('#projectActivityButton3').attr('id','buttonHide4');
            } else {
              $('#buttonHide5').attr('id','projectInfoButton3');
              // HIDE CURRENT BRIEF BUTTON, projectInfoButton
              $('#projectInfoButton').attr('id','buttonHide3');
              $('#projectInfoButton2').attr('id','buttonHide3');
            }
        });
    }
    hideActivity() {
      $(document).ready(function() {
            $('#projectActivityGroupShow').attr('id','projectActivityGroup');  
            // $('#buttonHide4').attr('id','projectActivityButton2'); 
            $('#projectMajorButtonRowRight').attr('id','projectMajorButtonRow'); 
            //  WHEN HIDE ACTIVITY, NEED TO SWITCH BRIEF BUTTON BACK TOO
            $('#projectInfoButton3').attr('id','buttonHide5');
            // ALSO NEED TO MAKE LINEAR BUTTON VISIBLE AGAIN
            
            if(document.getElementById('projectInfoGroupShow')) {
              $('#buttonHide4').attr('id','projectActivityButton3');  
            }
            else {
              $('#buttonHide3').attr('id','projectInfoButton');
              // $('#buttonHide4').attr('id','projectActivityButton2'); 
              $('#buttonHide2').attr('id','projectActivityButton2');  
              $('#projectMidColumnLeftStart').attr('id','projectMidColumnLeft'); 
            }
        });
    }
    showInfo() {
      $(document).ready(function() {
            $('#projectInfoGroup').attr('id','projectInfoGroupShow');
            $('#projectInfoButton').attr('id','buttonHide3');   
            $('#projectInfoButton2').attr('id','buttonHide3');                 
            // $('#projectMidColumnRight').attr('id','projectMidColumnRightStart');
            $('#projectMajorButtonRow').attr('id','projectMajorButtonRowRight');             
            $('#projectInfoButton3').attr('id','buttonHide5'); 
            
            

            if(document.getElementById('projectActivityGroupShow')) {
              
            } else {
              $('#buttonHide4').attr('id','projectActivityButton3');
              // HIDE CURRENT BRIEF BUTTON, projectInfoButton
              $('#projectActivityButton').attr('id','buttonHide4');
              $('#projectActivityButton2').attr('id','buttonHide4');
              $('#projectMidColumnRight').attr('id','projectMidColumnRightStart');
            }

        });
    }
    hideInfo() {
      $(document).ready(function() {
            $('#projectInfoGroupShow').attr('id','projectInfoGroup');   
            // $('#buttonHide5').attr('id','projectInfoButton2');              
            $('#projectMidColumnRightStart').attr('id','projectMidColumnRight');             
        

        // USE IF STATEMENT, IF ACTIVITY LABEL IS ON SCREEN, THEN ... :
              if (document.getElementById('projectActivityGroupShow')) {
                // ... MAKE INFO BUTTON APPEAR TO RIGHT, NOT LINEAR
                $('#buttonHide5').attr('id','projectInfoButton3');  
              }
              else {
                $('#buttonHide3').attr('id','projectInfoButton2'); 
                $('#buttonHide4').attr('id','projectActivityButton');
                $('#projectActivityButton3').attr('id','buttonHide4'); 
                $('#buttonHide2').attr('id','projectActivityButton2'); 

              }
              // WHEN HIDE INFO, IF ACTIVITY IS NOT OPEN, CLOSE LEFT AND OPEN LINEAR ACTIVITY

              });
    }

   render() {
     
      if (cookie.load('userName') === 'benfrancis') {
        
        return (

          <div id="maxContainerColumn">
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
            <Link to={`/project/${this.props.params.probID}/tree`} activeClassName="activeProblemTreeButton">
              <div id="treeProblemButton">
                <img src={require('../../assets/treeWhite1.svg')} id="treeProblemLogo" width="30" height="30" alt="Project Tree Button, white tree" />
              </div>
            </Link>
            <Link to={`/project/${this.props.params.probID}/flag`} activeClassName="activeProblemFlagButton">
              <div id="flagProblemButton">
                <img src={require('../../assets/flag.svg')} id="flagProblemLogo" width="24" height="24" alt="Delete Button, Red X" />
              </div>
            </Link>
          <div id="problemColumn1">
            <SubProjectParentUnit parentID={this.state.problemInfo.ParentID} parentType={this.state.problemInfo.ParentType} />
            <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
            <div id="projectActionGroup">
              <div id="problemRow1">
                  <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeProblemOptionDiscuss">
                        <div id="SBButtonDiscuss">discuss</div>
                  </Link>
                  <div id="problemCenterColumn">
                    <Link><div id="voteProblem" onClick={this.submitVote}>
                        vote
                    </div></Link>
                    <a href='#proposals'>
                      <div id="SBButtonProposal" onClick={this.goToProposal}>proposals</div>
                    </a>
                    <ProblemFollowButton probID={this.props.params.probID} username={cookie.load('userName')} />
                  </div>
                  <Link to={`/project/${this.props.params.probID}/learn/resources`} activeClassName="activeProblemOptionLearn">
                    <div id="SBButtonLearn">learn</div>
                  </Link>
              </div>
              <div id="projectCreator">
                {this.state.problemInfo.OriginalPosterUsername}
              </div>
              <Link to={`/project/${this.props.params.probID}/edit`}>
                <img src={require('../../assets/editBlue.svg')} id="editProjectButton" width="20" height="20" alt="Edit Button" />
              </Link>
              <Link to={`/project/${this.props.params.probID}/delete`}>
                <img src={require('../../assets/redX.svg')} id="editProjectButton" width="20" height="20" alt="Edit Button" />
              </Link>
              <div id="projectHideButton1" onClick={this.hideActions}>
                <img src={require('../../assets/redX2.svg')} id="projectModuleClose1" width="18" height="18" alt="Project Tree Button, white tree"  onClick={this.hideParentList} />
              </div>
            </div>
            <div id="projectMajorButtonRow">
              <div id="projectActivityButton" onClick={this.showActivity}>
                activity
              </div>
              <div id="projectActionButton" onClick={this.showActions}>
                actions
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
                  <div id="buttonHide4" onClick={this.showActivity}>
                    activity
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
                  <div id="buttonHide5" onClick={this.showInfo}>
                    brief
                  </div>
                  </div>
                </div>
              </div>
            {React.cloneElement(this.props.children, {probID:this.props.params.probID, parentTitle: this.state.problemInfo.Title, gParentID: this.state.problemInfo.ParentID, gParentTitle: this.state.problemInfo.ParentTitle, ggParentID: this.state.problemInfo.GrandParentID, creator:this.state.problemInfo.OriginalPosterUsername, breakdownID:this.state.breakdownID})}
            {React.cloneElement(<SubProblemContainer probID={this.props.params.probID}  differentBreakdown={this.differentBreakdown} rerender={this.state.breakdownRerender} />)}
            <ScrollableAnchor id={'proposals'}>
              {React.cloneElement(<ProblemSolutionsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />)}
            </ScrollableAnchor>
  
          </ReactCSSTransitionGroup>
        </div>
      );
      }




       else if (this.state.vote ===true && this.state.problemInfo.OriginalPosterUsername === cookie.load('userName')) {  
           return (

            <div id="maxContainerColumn">
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={2000}
              transitionEnter={false}
              transitionLeave={false}>
              <Link to={`/project/${this.props.params.probID}/tree`} activeClassName="activeProblemTreeButton">
                <div id="treeProblemButton">
                  <img src={require('../../assets/treeWhite1.svg')} id="treeProblemLogo" width="30" height="30" alt="Project Tree Button, white tree" />
                </div>
              </Link>
              <Link to={`/project/${this.props.params.probID}/flag`} activeClassName="activeProblemFlagButton">
                <div id="flagProblemButton">
                  <img src={require('../../assets/flag.svg')} id="flagProblemLogo" width="24" height="24" alt="Delete Button, Red X" />
                </div>
              </Link>
            <div id="problemColumn1">
              <SubProjectParentUnit parentID={this.state.problemInfo.ParentID} parentType={this.state.problemInfo.ParentType} />
              <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
              <div id="projectActionGroup">
                <div id="problemRow1">
                    <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeProblemOptionDiscuss">
                          <div id="SBButtonDiscuss">discuss</div>
                    </Link>
                    <div id="problemCenterColumn">
                      <Link><div id="votedProblem" onClick={this.unVote}>
                          voted
                      </div></Link>
                      <a href='#proposals'>
                        <div id="SBButtonProposal" onClick={this.goToProposal}>proposals</div>
                      </a>
                      <ProblemFollowButton probID={this.props.params.probID} username={cookie.load('userName')} />
                    </div>
                    <Link to={`/project/${this.props.params.probID}/learn/resources`} activeClassName="activeProblemOptionLearn">
                      <div id="SBButtonLearn">learn</div>
                    </Link>
                </div>
                <div id="projectCreator">
                  {this.state.problemInfo.OriginalPosterUsername}
                </div>
                <Link to={`/project/${this.props.params.probID}/edit`}>
                  <img src={require('../../assets/editBlue.svg')} id="editProjectButton" width="20" height="20" alt="Edit Button" />
                </Link>
                <div id="projectHideButton1" onClick={this.hideActions}>
                  <img src={require('../../assets/redX2.svg')} id="projectModuleClose1" width="18" height="18" alt="Project Tree Button, white tree"  onClick={this.hideParentList} />
                </div>
              </div>
              <div id="projectMajorButtonRow">
                <div id="projectActivityButton" onClick={this.showActivity}>
                  activity
                </div>
                <div id="projectActionButton" onClick={this.showActions}>
                  actions
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
                    <div id="buttonHide4" onClick={this.showActivity}>
                      activity
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
                    <div id="buttonHide5" onClick={this.showInfo}>
                      brief
                    </div>
                    </div>
                  </div>
                </div>
              {React.cloneElement(this.props.children, {probID:this.props.params.probID, parentTitle: this.state.problemInfo.Title, gParentID: this.state.problemInfo.ParentID, gParentTitle: this.state.problemInfo.ParentTitle, ggParentID: this.state.problemInfo.GrandParentID, creator:this.state.problemInfo.OriginalPosterUsername, breakdownID:this.state.breakdownID})}
              {React.cloneElement(<SubProblemContainer probID={this.props.params.probID}  differentBreakdown={this.differentBreakdown} rerender={this.state.breakdownRerender} />)}
              <ScrollableAnchor id={'proposals'}>
                {React.cloneElement(<ProblemSolutionsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />)}
              </ScrollableAnchor>
    
            </ReactCSSTransitionGroup>
          </div>
      );

       } else if(this.state.vote ===false && this.state.problemInfo.OriginalPosterUsername === cookie.load('userName')) {
           return (
            <div id="maxContainerColumn">
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={2000}
              transitionEnter={false}
              transitionLeave={false}>
              <Link to={`/project/${this.props.params.probID}/tree`} activeClassName="activeProblemTreeButton">
                <div id="treeProblemButton">
                  <img src={require('../../assets/treeWhite1.svg')} id="treeProblemLogo" width="30" height="30" alt="Project Tree Button, white tree" />
                </div>
              </Link>
              <Link to={`/project/${this.props.params.probID}/flag`} activeClassName="activeProblemFlagButton">
                <div id="flagProblemButton">
                  <img src={require('../../assets/flag.svg')} id="flagProblemLogo" width="24" height="24" alt="Delete Button, Red X" />
                </div>
              </Link>
            <div id="problemColumn1">
              <SubProjectParentUnit parentID={this.state.problemInfo.ParentID} parentType={this.state.problemInfo.ParentType} />
              <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
              <div id="projectActionGroup">
                <div id="problemRow1">
                    <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeProblemOptionDiscuss">
                          <div id="SBButtonDiscuss">discuss</div>
                    </Link>
                    <div id="problemCenterColumn">
                      <Link><div id="voteProblem" onClick={this.submitVote}>
                          vote
                      </div></Link>
                      <a href='#proposals'>
                        <div id="SBButtonProposal" onClick={this.goToProposal}>proposals</div>
                      </a>
                      <ProblemFollowButton probID={this.props.params.probID} username={cookie.load('userName')} />
                    </div>
                    <Link to={`/project/${this.props.params.probID}/learn/resources`} activeClassName="activeProblemOptionLearn">
                      <div id="SBButtonLearn">learn</div>
                    </Link>
                </div>
                <div id="projectCreator">
                  {this.state.problemInfo.OriginalPosterUsername}
                </div>
                <Link to={`/project/${this.props.params.probID}/edit`}>
                  <img src={require('../../assets/editBlue.svg')} id="editProjectButton" width="20" height="20" alt="Edit Button" />
                </Link>
                <div id="projectHideButton1" onClick={this.hideActions}>
                  <img src={require('../../assets/redX2.svg')} id="projectModuleClose1" width="18" height="18" alt="Project Tree Button, white tree"  onClick={this.hideParentList} />
                </div>
              </div>
              <div id="projectMajorButtonRow">
                <div id="projectActivityButton" onClick={this.showActivity}>
                  activity
                </div>
                <div id="projectActionButton" onClick={this.showActions}>
                  actions
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
                    <div id="buttonHide4" onClick={this.showActivity}>
                      activity
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
                    <div id="buttonHide5" onClick={this.showInfo}>
                      brief
                    </div>
                    </div>
                  </div>
                </div>
              {React.cloneElement(this.props.children, {probID:this.props.params.probID, parentTitle: this.state.problemInfo.Title, gParentID: this.state.problemInfo.ParentID, gParentTitle: this.state.problemInfo.ParentTitle, ggParentID: this.state.problemInfo.GrandParentID, creator:this.state.problemInfo.OriginalPosterUsername, breakdownID:this.state.breakdownID})}
              {React.cloneElement(<SubProblemContainer probID={this.props.params.probID}  differentBreakdown={this.differentBreakdown} rerender={this.state.breakdownRerender} />)}
              <ScrollableAnchor id={'proposals'}>
                {React.cloneElement(<ProblemSolutionsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />)}
              </ScrollableAnchor>
    
            </ReactCSSTransitionGroup>
          </div>
      );

  } else if(this.state.vote ===true) {
      return ( 
        <div id="maxContainerColumn">
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}>
          <Link to={`/project/${this.props.params.probID}/tree`} activeClassName="activeProblemTreeButton">
            <div id="treeProblemButton">
              <img src={require('../../assets/treeWhite1.svg')} id="treeProblemLogo" width="30" height="30" alt="Project Tree Button, white tree" />
            </div>
          </Link>
          <Link to={`/project/${this.props.params.probID}/flag`} activeClassName="activeProblemFlagButton">
            <div id="flagProblemButton">
              <img src={require('../../assets/flag.svg')} id="flagProblemLogo" width="24" height="24" alt="Delete Button, Red X" />
            </div>
          </Link>
        <div id="problemColumn1">
          <SubProjectParentUnit parentID={this.state.problemInfo.ParentID} parentType={this.state.problemInfo.ParentType} />
          <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
          <div id="projectActionGroup">
            <div id="problemRow1">
                <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeProblemOptionDiscuss">
                      <div id="SBButtonDiscuss">discuss</div>
                </Link>
                <div id="problemCenterColumn">
                  <Link><div id="votedProblem" onClick={this.unVote}>
                      voted
                  </div></Link>
                  <a href='#proposals'>
                    <div id="SBButtonProposal" onClick={this.goToProposal}>proposals</div>
                  </a>
                  <ProblemFollowButton probID={this.props.params.probID} username={cookie.load('userName')} />
                </div>
                <Link to={`/project/${this.props.params.probID}/learn/resources`} activeClassName="activeProblemOptionLearn">
                  <div id="SBButtonLearn">learn</div>
                </Link>
            </div>
            <div id="projectCreator">
              {this.state.problemInfo.OriginalPosterUsername}
            </div>
            <div id="projectHideButton1" onClick={this.hideActions}>
              <img src={require('../../assets/redX2.svg')} id="projectModuleClose1" width="18" height="18" alt="Project Tree Button, white tree"  onClick={this.hideParentList} />
            </div>
          </div>
          <div id="projectMajorButtonRow">
            <div id="projectActivityButton" onClick={this.showActivity}>
              activity
            </div>
            <div id="projectActionButton" onClick={this.showActions}>
              actions
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
                <div id="buttonHide4" onClick={this.showActivity}>
                  activity
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
                <div id="buttonHide5" onClick={this.showInfo}>
                  brief
                </div>
                </div>
              </div>
            </div>
          {React.cloneElement(this.props.children, {probID:this.props.params.probID, parentTitle: this.state.problemInfo.Title, gParentID: this.state.problemInfo.ParentID, gParentTitle: this.state.problemInfo.ParentTitle, ggParentID: this.state.problemInfo.GrandParentID, creator:this.state.problemInfo.OriginalPosterUsername, breakdownID:this.state.breakdownID})}
          <SubProblemContainer probID={this.props.params.probID}  differentBreakdown={this.differentBreakdown} rerender={this.state.breakdownRerender} />
          <ScrollableAnchor id={'proposals'}>
            <ProblemSolutionsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />
          </ScrollableAnchor>

        </ReactCSSTransitionGroup>
      </div>
      );

       }
  
  else if (this.state.vote ===false) {
      return (
      <div id="maxContainerColumn">
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}>
          <Link to={`/project/${this.props.params.probID}/tree`} activeClassName="activeProblemTreeButton">
            <div id="treeProblemButton">
              <img src={require('../../assets/treeWhite1.svg')} id="treeProblemLogo" width="30" height="30" alt="Project Tree Button, white tree" />
            </div>
          </Link>
          <Link to={`/project/${this.props.params.probID}/flag`} activeClassName="activeProblemFlagButton">
            <div id="flagProblemButton">
              <img src={require('../../assets/flag.svg')} id="flagProblemLogo" width="24" height="24" alt="Delete Button, Red X" />
            </div>
          </Link>
        <div id="problemColumn1">
          <SubProjectParentUnit parentID={this.state.problemInfo.ParentID} parentType={this.state.problemInfo.ParentType} />
          <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
          <div id="projectActionGroup">
            <div id="problemRow1">
                <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeProblemOptionDiscuss">
                      <div id="SBButtonDiscuss">discuss</div>
                </Link>
                <div id="problemCenterColumn">
                  <Link><div id="voteProblem" onClick={this.submitVote}>
                      vote
                  </div></Link>
                  <a href='#proposals'>
                    <div id="SBButtonProposal" onClick={this.goToProposal}>proposals</div>
                  </a>
                  <ProblemFollowButton probID={this.props.params.probID} username={cookie.load('userName')} />
                </div>
                <Link to={`/project/${this.props.params.probID}/learn/resources`} activeClassName="activeProblemOptionLearn">
                  <div id="SBButtonLearn">learn</div>
                </Link>
            </div>
            <div id="projectCreator">
              {this.state.problemInfo.OriginalPosterUsername}
            </div>
            <div id="projectHideButton1" onClick={this.hideActions}>
              <img src={require('../../assets/redX2.svg')} id="projectModuleClose1" width="18" height="18" alt="Project Tree Button, white tree"  onClick={this.hideParentList} />
            </div>
          </div>
          <div id="projectMajorButtonRow">
            <div id="projectActivityButton" onClick={this.showActivity}>
              activity
            </div>
            <div id="projectActionButton" onClick={this.showActions}>
              actions
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
                <div id="buttonHide4" onClick={this.showActivity}>
                  activity
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
                <div id="buttonHide5" onClick={this.showInfo}>
                  brief
                </div>
                </div>
              </div>
            </div>
          {React.cloneElement(this.props.children, {probID:this.props.params.probID, parentTitle: this.state.problemInfo.Title, gParentID: this.state.problemInfo.ParentID, gParentTitle: this.state.problemInfo.ParentTitle, ggParentID: this.state.problemInfo.GrandParentID, creator:this.state.problemInfo.OriginalPosterUsername, breakdownID:this.state.breakdownID})}
          {React.cloneElement(<SubProblemContainer probID={this.props.params.probID}  differentBreakdown={this.differentBreakdown} rerender={this.state.breakdownRerender} />)}
          <ScrollableAnchor id={'proposals'}>
            {React.cloneElement(<ProblemSolutionsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />)}
          </ScrollableAnchor>

        </ReactCSSTransitionGroup>
      </div>
      );

       }
}}

 