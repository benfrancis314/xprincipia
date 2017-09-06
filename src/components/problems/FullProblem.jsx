import React from 'react';
import { Link  } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ProblemSolutionsMenu from './ProblemSolutionsMenu.jsx';
// Not used yet, would like to develop later
// import ProjectParentChildrenUnitsContainer from '../../containers/ProjectParentChildrenUnitsContainer.jsx';
import SubProblemContainer from '../../containers/SubProblemContainer.jsx';
import SubProjectParentUnit from './SubProjectParentUnit.jsx';
import TutorialProjectContent from '../tutorials/TutorialProjectContent.jsx';
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
      window.scrollTo(0,0);
      axios.get( Config.API + '/problems/ID?id='+this.props.params.probID).then(function (response) {

          //set Problem Data
          self.setState({
              problemInfo: response.data
          })
    })

          
    axios.get( Config.API + "/auth/vote/isVotedOn?type=0&typeID=" + this.props.params.probID + "&username=" + cookie.load("userName"))
          .then( function (response){
            self.setState({
              vote: response.data
            })
      })       
  }

shouldComponentUpdate(nextProps, nextState) {
    // only render if probID has changed
    return this.state.probID !== nextProps.params.probID;
}

  componentWillReceiveProps(nextProps){
      var self = this;
      axios.get( Config.API + '/problems/ID?id='+nextProps.params.probID).then(function (response) {

          //set Problem Data
          self.setState({
              problemInfo: response.data
          })
    })

          
    axios.get( Config.API + "/auth/vote/isVotedOn?type=0&typeID=" + nextProps.params.probID + "&username=" + cookie.load("userName"))
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
     
       if (this.state.vote ===true && this.state.problemInfo.OriginalPosterUsername === cookie.load('userName')) {  
           return (

      <div id="maxContainerColumn">
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}>

        <div id="problemColumn1">
          <SubProjectParentUnit parentID={this.state.problemInfo.ParentID} />
          {/*<ProjectParentChildrenUnitsContainer parentID={this.state.problemInfo.ParentID} problemTitle={this.state.problemInfo.Title}/>*/}
          <div id="problemIntro">
            <h1 id="problemTitle">{this.state.problemInfo.Title}</h1>
          </div>
          <div id="problemRow1">
                <Link><button id="votedProblem" ref='btn' onClick={this.unVote}>
                    Voted
                </button></Link>
                <a href='#proposals'>
                  <div id="SBButtonDiscuss" onClick={this.goToProposal}>Proposals</div>
                </a>
                <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeBlue">
                    <div id="SBButtonDiscuss">Discuss</div>
                </Link>
                <Link to={`/project/${this.props.params.probID}/learn/resources`} activeClassName="activeBlue">
                  <div id="SBButtonLearn">Learn</div>
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
        
        <TutorialProjectContent />
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

        <div id="problemColumn1">
          <SubProjectParentUnit parentID={this.state.problemInfo.ParentID} />
          {/*<ProjectParentChildrenUnitsContainer parentID={this.state.problemInfo.ParentID} problemTitle={this.state.problemInfo.Title}/>*/}
          <div id="problemIntro">
            <h1 id="problemTitle">{this.state.problemInfo.Title}</h1>
          </div>
          <div id="problemRow1">
                <Link><div id="voteProblem" onClick={this.submitVote}>
                    Vote
                </div></Link>
                <a href='#proposals'>
                  <div id="SBButtonDiscuss" onClick={this.goToProposal}>Proposals</div>
                </a>
                <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeBlue">
                    <div id="SBButtonDiscuss">Discuss</div>
                </Link>
                <Link to={`/project/${this.props.params.probID}/learn/resources`} activeClassName="activeBlue">
                  <div id="SBButtonLearn">Learn</div>
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
        
        <TutorialProjectContent />
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

        <div id="problemColumn1">
          <SubProjectParentUnit parentID={this.state.problemInfo.ParentID} />
          {/*<ProjectParentChildrenUnitsContainer parentID={this.state.problemInfo.ParentID} problemTitle={this.state.problemInfo.Title}/>*/}
          <div id="problemIntro">
            <h1 id="problemTitle">{this.state.problemInfo.Title}</h1>
          </div>
          <div id="problemRow1">
                <Link><button id="votedProblem" ref='btn' onClick={this.unVote}>
                    Voted
                </button></Link>
                <a href='#proposals'>
                  <div id="SBButtonDiscuss" onClick={this.goToProposal}>Proposals</div>
                </a>
                <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeBlue">
                    <div id="SBButtonDiscuss">Discuss</div>
                </Link>
                <Link to={`/project/${this.props.params.probID}/learn/resources`} activeClassName="activeBlue">
                  <div id="SBButtonLearn">Learn</div>
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
        
        <TutorialProjectContent />
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

        <div id="problemColumn1">
          <SubProjectParentUnit parentID={this.state.problemInfo.ParentID} />
          {/*<ProjectParentChildrenUnitsContainer parentID={this.state.problemInfo.ParentID} problemTitle={this.state.problemInfo.Title}/>*/}
          <div id="problemIntro">
            <h1 id="problemTitle">{this.state.problemInfo.Title}</h1>
          </div>
          <div id="problemRow1">
                <Link><div id="voteProblem" onClick={this.submitVote}>
                    Vote
                </div></Link>
                <a href='#proposals'>
                  <div id="SBButtonDiscuss" onClick={this.goToProposal}>Proposals</div>
                </a>
                <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeBlue">
                    <div id="SBButtonDiscuss">Discuss</div>
                </Link>
                <Link to={`/project/${this.props.params.probID}/learn/resources`} activeClassName="activeBlue">
                  <div id="SBButtonLearn">Learn</div>
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
        
        <TutorialProjectContent />
        </ReactCSSTransitionGroup>
      </div>
      );

       }
}}

 