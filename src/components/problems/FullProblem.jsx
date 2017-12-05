import React from 'react';
import ReactDOM from 'react-dom';
import { Link  } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ProblemFollowButton from './ProblemFollowButton.jsx';
import ProblemSolutionsMenu from './ProblemSolutionsMenu.jsx';
import ProblemTitle from './ProblemTitle.jsx';
// Not used yet, would like to develop later
// import ProjectParentChildrenUnitsContainer from '../../containers/ProjectParentChildrenUnitsContainer.jsx';
import SubProblemContainer from '../../containers/SubProblemContainer.jsx';
import SubProjectParentUnit from './SubProjectParentUnit.jsx';
// import TutorialProjectContent from '../tutorials/TutorialProjectContent.jsx';
import {Config} from '../../config.js';
import $ from 'jquery';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

configureAnchors({offset: -20, scrollDuration: 700});

export default class FullProblem extends React.Component {
  
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
      // ReactDOM.findDOMNode(this).scrollIntoView();

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
    // Removing cookie part for now, for testing
    // nextState =  { userToken: cookie.load('userToken') };
    return nextState.probID !== nextProps.params.probID;
}

// First draft of attempt, this one seems not to work
// componentWillUpdate (nextProps, nextState){
//         //  may need to use componentDidUpate instead, since it acts on DOM after rendering/the data is updated
//         // called as soon as shouldComponentUpdate returns as true
//     // perform any preparations for an upcoming update
//     // window.scrollTo(0,0);
//     // this still seems to cause the reload
// }

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
          return axios.get( Config.API + '/auth/problems/ID?id='+self.props.params.probID).then(function (response) {
          
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
            return axios.get( Config.API + '/auth/problems/ID?id='+self.props.params.probID).then(function (response) {
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
          {/*<ProjectParentChildrenUnitsContainer parentID={this.state.problemInfo.ParentID} problemTitle={this.state.problemInfo.Title}/>*/}
          <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
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
                <ProblemFollowButton />
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

            <div id="projectPercentGreen">{this.state.problemInfo.Rank}</div>
            <div id="fullProblem">
              <p id="problemSummary">
                {this.state.problemInfo.Summary}
              </p>
            </div>
              {this.state.problemInfo.grandParentID}
              {React.cloneElement(this.props.children, {parentTitle: this.state.problemInfo.Title, gParentID: this.state.problemInfo.ParentID, gParentTitle: this.state.problemInfo.ParentTitle, ggParentID: this.state.problemInfo.GrandParentID} )}
            </div>
          {React.cloneElement(<SubProblemContainer probID={this.props.params.probID} />)}
          <ScrollableAnchor id={'proposals'}>
            {React.cloneElement(<ProblemSolutionsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />)}
          </ScrollableAnchor>
        {/*<div id="tutorialProblemButtonDiv">
          <img src={require('../../assets/tutorial.svg')} id="tutorialProblemButton" width="50" height="50" alt="Back arrow, blue up arrow" />
        </div>*/}
        
        {/* <TutorialProjectContent /> */}
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
          {/*<ProjectParentChildrenUnitsContainer parentID={this.state.problemInfo.ParentID} problemTitle={this.state.problemInfo.Title}/>*/}
          <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
          <div id="problemRow1">
              <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeProblemOptionDiscuss">
                    <div id="SBButtonDiscuss">discuss</div>
              </Link>
              <div id="problemCenterColumn">
                <Link><div id="voteProblem" onClick={this.unVote}>
                    voted
                </div></Link>
                <a href='#proposals'>
                  <div id="SBButtonProposal" onClick={this.goToProposal}>proposals</div>
                </a>
                <ProblemFollowButton />
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

            <div id="projectPercentGreen">{this.state.problemInfo.Rank}</div>
            <div id="fullProblem">
              <p id="problemSummary">
                {this.state.problemInfo.Summary}
              </p>
            </div>
              {React.cloneElement(this.props.children)}
            </div>
          {React.cloneElement(<SubProblemContainer probID={this.props.params.probID} />)}
          <ScrollableAnchor id={'proposals'}>
            {React.cloneElement(<ProblemSolutionsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />)}
          </ScrollableAnchor>
        {/*<div id="tutorialProblemButtonDiv">
          <img src={require('../../assets/tutorial.svg')} id="tutorialProblemButton" width="50" height="50" alt="Back arrow, blue up arrow" />
        </div>*/}
        
        {/* <TutorialProjectContent /> */}
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
          {/*<ProjectParentChildrenUnitsContainer parentID={this.state.problemInfo.ParentID} problemTitle={this.state.problemInfo.Title}/>*/}
          <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
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
                <ProblemFollowButton />
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

            <div id="projectPercent">{this.state.problemInfo.Rank}</div>
            <div id="fullProblem">
              <p id="problemSummary">
                {this.state.problemInfo.Summary}
              </p>
            </div>
              {React.cloneElement(this.props.children)}
            </div>
          {React.cloneElement(<SubProblemContainer probID={this.props.params.probID} />)}
          <ScrollableAnchor id={'proposals'}>
            {React.cloneElement(<ProblemSolutionsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />)}
          </ScrollableAnchor>

        {/*<div id="tutorialProblemButtonDiv">
          <img src={require('../../assets/tutorial.svg')} id="tutorialProblemButton" width="50" height="50" alt="Back arrow, blue up arrow" />
        </div>*/}
        
        {/* <TutorialProjectContent /> */}
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
          {/*<ProjectParentChildrenUnitsContainer parentID={this.state.problemInfo.ParentID} problemTitle={this.state.problemInfo.Title}/>*/}
          <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
          <div id="problemRow1">
            <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeProblemOptionDiscuss">
                  <div id="SBButtonDiscuss">discuss</div>
            </Link>
            <div id="problemCenterColumn">
              <Link><div id="voteProblem" onClick={this.unVote}>
                  voted
              </div></Link>
              <a href='#proposals'>
                <div id="SBButtonProposal" onClick={this.goToProposal}>proposals</div>
              </a>
              <ProblemFollowButton />
            </div>
            <Link to={`/project/${this.props.params.probID}/learn/resources`} activeClassName="activeProblemOptionLearn">
              <div id="SBButtonLearn">learn</div>
            </Link>
        </div>
            <div id="projectCreator">
              {this.state.problemInfo.OriginalPosterUsername}
            </div>

            <div id="projectPercentGreen">{this.state.problemInfo.Rank}</div>
            <div id="fullProblem">
              <p id="problemSummary">
                {this.state.problemInfo.Summary}
              </p>
            </div>
              {React.cloneElement(this.props.children)}
            </div>
          {React.cloneElement(<SubProblemContainer probID={this.props.params.probID} />)}
          <ScrollableAnchor id={'proposals'}>
            {React.cloneElement(<ProblemSolutionsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />)}
          </ScrollableAnchor>

        {/*<div id="tutorialProblemButtonDiv">
          <img src={require('../../assets/tutorial.svg')} id="tutorialProblemButton" width="50" height="50" alt="Back arrow, blue up arrow" />
        </div>*/}
        
        {/* <TutorialProjectContent /> */}
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
          {/*<ProjectParentChildrenUnitsContainer parentID={this.state.problemInfo.ParentID} problemTitle={this.state.problemInfo.Title}/>*/}
          <ProblemTitle problemTitle={this.state.problemInfo.Title} problemClass={this.state.problemInfo.Class} />
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
                <ProblemFollowButton />
              </div>
              <Link to={`/project/${this.props.params.probID}/learn/resources`} activeClassName="activeProblemOptionLearn">
                <div id="SBButtonLearn">learn</div>
              </Link>
          </div>
            <div id="projectCreator">
              {this.state.problemInfo.OriginalPosterUsername}
            </div>

            <div id="projectPercent">{this.state.problemInfo.Rank}</div>
            <div id="fullProblem">
              <p id="problemSummary">
                {this.state.problemInfo.Summary}
              </p>
            </div>
              {React.cloneElement(this.props.children)}
            </div>
          {React.cloneElement(<SubProblemContainer probID={this.props.params.probID} />)}
          <ScrollableAnchor id={'proposals'}>
            {React.cloneElement(<ProblemSolutionsMenu probID={this.props.params.probID} projectTitle={this.state.problemInfo.Title} />)}
          </ScrollableAnchor>

        {/*<div id="tutorialProblemButtonDiv">
          <img src={require('../../assets/tutorial.svg')} id="tutorialProblemButton" width="50" height="50" alt="Back arrow, blue up arrow" />
        </div>*/}
        
        {/* <TutorialProjectContent /> */}
        </ReactCSSTransitionGroup>
      </div>
      );

       }
}}

 