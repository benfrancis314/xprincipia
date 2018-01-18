import React from 'react';
import { Link  } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import PrivateProjectProposalsMenu from './PrivateProjectProposalsMenu.jsx';
import ProblemFollowButton from './ProblemFollowButton.jsx';
import ProblemTitle from './ProblemTitle.jsx';
// Not used yet, would like to develop later
// import ProjectParentChildrenUnitsContainer from '../../containers/ProjectParentChildrenUnitsContainer.jsx';
import SubProjectPrivateContainer from '../../containers/SubProjectPrivateContainer.jsx';
import SubPrivateProjectParentUnit from './SubPrivateProjectParentUnit.jsx';
import TutorialProjectContent from '../tutorials/TutorialProjectContent.jsx';
import {Config} from '../../config.js';
import $ from 'jquery';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

configureAnchors({offset: -20, scrollDuration: 700});

export default class FullPrivateProblem extends React.Component {

privateAlertProject () {
    $(document).ready(function() {
        $('#privateAlertProject').attr('id','privateAlertProjectShow').hide().slideDown(500);
    });
}
hidePrivateNotificationProject() {
    $(document).ready(function() {
        $('#privateAlertProjectShow').attr('id','privateAlertProject');
     });
    };

  constructor(props){
        super(props);

        this.state = {
            problemInfo: [],
            parentInfo: [],
            probID: [],
            vote: false
        }
        this.submitVote = this.submitVote.bind(this)
        this.unVote = this.unVote.bind(this)
    };
    componentDidMount(){
      var self = this;
      window.scrollTo(0,0);
      axios.get( Config.API + '/problems/ID?id='+this.props.params.probID).then(function (response) {

          //set Problem Data
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
    // only render if probID has changed
    return nextState.probID !== nextProps.params.probID;
}

  componentWillReceiveProps(nextProps){
      var self = this;
      // window.scrollTo(0,0);
      axios.get( Config.API + '/problems/ID?id='+nextProps.params.probID).then(function (response) {

          //set Problem Data
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
          
            //set problem data
            self.setState({
                problemInfo: response.data,
                // vote: true,
            })
            document.location = window.location.pathname 
          })
          
        })
      .catch(function (error) {
        // console.log(error.response.data)
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
        }
      }
      )
      
        .then(function (result) {
            // alert('success')
            return axios.get( Config.API + '/problems/ID?id='+self.props.params.probID).then(function (response) {
            //set problem data
            self.setState({
                problemInfo: response.data,
            })
            document.location = window.location.pathname 
            // May not need this since it refreshes anyway
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


   render() {
    //  if (cookie.load("userName") !== this.state.problemInfo.OriginalPosterUsername) {
    //    return (
    //      <div id="privateProjectError">
    //        <span id="blue">This project appears to be private</span>
    //        <br />
    //        <br />
    //        We apologize for the error, please let us know the error in the
    //        <br />
    //        <Link to={`/profile/feedback`}>
    //         <span id="blueButton">FEEDBACK </span>
    //         section in your personal quarters. 
    //       </Link>
    //        <br />
    //      </div>
    //    )
    //  }
       
    if (this.state.vote ===true) {  
           return (
      <div id="fullWide">
        <div id="maxContainerColumn">
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>

          <div id="problemColumn1">
            <SubPrivateProjectParentUnit parentID={this.state.problemInfo.ParentID} parentType={this.state.problemInfo.ParentType} />
            {/*<ProjectParentChildrenUnitsContainer parentID={this.state.problemInfo.ParentID} problemTitle={this.state.problemInfo.Title}/>*/}
            <ProblemTitle problemTitle={this.state.problemInfo.Title} />            
            <div id="problemRow1">
                <Link to={`/project/private/${this.props.params.probID}/questions`} activeClassName="activeProblemOptionDiscuss">
                      <div id="SBButtonDiscuss">brainstorm</div>
                </Link>
                <div id="problemCenterColumn">
                  <Link><div id="voteProblem" onClick={this.submitVote}>
                      up
                  </div></Link>
                  {/* <Link><div id="voteProblem" onClick={this.unVote}>
                      down
                  </div></Link> */}
                  <a href='#proposals'>
                    <div id="SBButtonProposal" onClick={this.goToProposal}>proposals</div>
                  </a>
                  <ProblemFollowButton />
                </div>
                <Link to={`/project/private/${this.props.params.probID}/notes`} activeClassName="activeProblemOptionLearn">
                  <div id="SBButtonLearn">notebook</div>
                </Link>
            </div>
              <div id="privateFullSettingsButton" onClick={this.privateAlertProject}>
                  <img src={require('../../assets/lock2Blue.svg')} id="fullProblemLockLogo" width="18" height="18" alt="Gear logo, link to settings"/>
              </div>
              <Link to={`/project/private/${this.props.params.probID}/edit`}>
                <img src={require('../../assets/editBlue.svg')} id="editProjectButton" width="18" height="18" alt="Edit Button" />
              </Link>
              <Link to={`/project/private/${this.props.params.probID}/delete`}>
                <img src={require('../../assets/redX.svg')} id="editProjectButton" width="20" height="20" alt="Edit Button" />
              </Link>

              <div id="projectPercentGreen">{this.state.problemInfo.Rank}</div>
              <div id="fullProblem">
                <p id="problemSummary">
                  {this.state.problemInfo.Summary}
                </p>
              </div>
                {React.cloneElement(this.props.children, {parentTitle: this.state.problemInfo.Title, gParentID: this.state.problemInfo.ParentID, gParentTitle: this.state.problemInfo.ParentTitle, ggParentID: this.state.problemInfo.GrandParentID, creator:this.state.problemInfo.OriginalPosterUsername})}
              </div>
            {React.cloneElement(<SubProjectPrivateContainer probID={this.props.params.probID} />)}
            <ScrollableAnchor id={'proposals'}>
              {React.cloneElement(<PrivateProjectProposalsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />)}
            </ScrollableAnchor>
          {/*<div id="tutorialProblemButtonDiv">
            <img src={require('../../assets/tutorial.svg')} id="tutorialProblemButton" width="50" height="50" alt="Back arrow, blue up arrow" />
          </div>*/}
          
          {/*Need new tutorial for mind temple*/}
          {/*<TutorialProjectContent />*/}
          <br />
          <br />
          <br />
          <br />
          </ReactCSSTransitionGroup>
        </div>
        <div id="privateAlertProject">
          <div id="privateAlertHeader">
            <img src={require('../../assets/lock2Blue.svg')} id="lockAlert" width="30" height="30" onClick={this.privateAlertProject} alt="Logo logo, signifying this is private"/>
          </div>
          <div id="privateAlertContent">This project is entirely <span id="blue">private</span></div>
          <div id="privateAlertReturn" onClick={this.hidePrivateNotificationProject}>Return</div>
        </div>
      </div>
      );

       } else {
           return (
      <div id="fullWide">
        <div id="maxContainerColumn">
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>

          <div id="problemColumn1">
            <SubPrivateProjectParentUnit parentID={this.state.problemInfo.ParentID} parentType={this.state.problemInfo.ParentType} />
            {/*<ProjectParentChildrenUnitsContainer parentID={this.state.problemInfo.ParentID} problemTitle={this.state.problemInfo.Title}/>*/}
            <ProblemTitle problemTitle={this.state.problemInfo.Title} />            
            <div id="problemRow1">
                <Link to={`/project/private/${this.props.params.probID}/questions`} activeClassName="activeProblemOptionDiscuss">
                      <div id="SBButtonDiscuss">brainstorm</div>
                </Link>
                <div id="problemCenterColumn">
                  {/* <Link><div id="voteProblem" onClick={this.submitVote}>
                      up
                  </div></Link> */}
                  <Link><div id="voteProblem" onClick={this.unVote}>
                      down
                  </div></Link>
                  <a href='#proposals'>
                    <div id="SBButtonProposal" onClick={this.goToProposal}>proposals</div>
                  </a>
                  <ProblemFollowButton />
                </div>
                <Link to={`/project/private/${this.props.params.probID}/notes`} activeClassName="activeProblemOptionLearn">
                  <div id="SBButtonLearn">notebook</div>
                </Link>
            </div>
              <div id="privateFullSettingsButton" onClick={this.privateAlertProject}>
                  <img src={require('../../assets/lock2Blue.svg')} id="fullProblemLockLogo" width="18" height="18" alt="Gear logo, link to settings"/>
              </div>
              <Link to={`/project/private/${this.props.params.probID}/edit`}>
                <img src={require('../../assets/editBlue.svg')} id="editProjectButton" width="18" height="18" alt="Edit Button" />
              </Link>
              <Link to={`/project/${this.props.params.probID}/delete`}>
              <img src={require('../../assets/redX.svg')} id="editProjectButton" width="20" height="20" alt="Edit Button" />
            </Link>

              <div id="projectPercent">{this.state.problemInfo.Rank}</div>
              <div id="fullProblem">
                <p id="problemSummary">
                  {this.state.problemInfo.Summary}
                </p>
              </div>
              {React.cloneElement(this.props.children, {parentTitle: this.state.problemInfo.Title, gParentID: this.state.problemInfo.ParentID, gParentTitle: this.state.problemInfo.ParentTitle, ggParentID: this.state.problemInfo.GrandParentID, creator:this.state.problemInfo.OriginalPosterUsername})}
              </div>
            {React.cloneElement(<SubProjectPrivateContainer probID={this.props.params.probID} />)}
            <ScrollableAnchor id={'proposals'}>
              {React.cloneElement(<PrivateProjectProposalsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />)}
            </ScrollableAnchor>

          {/*<div id="tutorialProblemButtonDiv">
            <img src={require('../../assets/tutorial.svg')} id="tutorialProblemButton" width="50" height="50" alt="Back arrow, blue up arrow" />
          </div>*/}
          
          {/*Need new tutorial for mind temple*/}
          {/*<TutorialProjectContent />*/}
          <br />
          <br />
          <br />
          <br />
          </ReactCSSTransitionGroup>
          
        </div>
        <div id="privateAlertProject">
            <div id="privateAlertHeader">
                <img src={require('../../assets/lock2Blue.svg')} id="lockAlert" width="30" height="30" onClick={this.privateAlertProject} alt="Logo logo, signifying this is private"/>
            </div>
            <div id="privateAlertContent">This project is entirely <span id="blue">private</span></div>
            <div id="privateAlertReturn" onClick={this.hidePrivateNotificationProject}>Return</div>
        </div>

      </div>
      );
    }
}
}

 