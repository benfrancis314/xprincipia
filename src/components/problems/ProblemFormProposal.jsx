import React from 'react';
// Will be uesd with componentDidUpdate
// import ReactDOM from 'react-dom';import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProblemForm extends React.Component {

  constructor(){
    super();
    
    this.state= {
      title: '',
      summary: '',
      class: '',
      breakdownID: '',
      linkPath: '',
      privateCall: '',
      proposalCheck: '',
      proposalBoxID: '',
      proposalPath: '',
      private: '',
      parentID: '',
      userName: '',
    }

    this.postProblem = this.postProblem.bind(this);
    // this.checkLoginProblem = this.checkLoginProblem.bind(this);
    this.hideProblemForm = this.hideProblemForm.bind(this);
    this.radioChangeProject = this.radioChangeProject.bind(this);
    this.radioChangeGoal = this.radioChangeGoal.bind(this);
    this.radioChangeProblem = this.radioChangeProblem.bind(this);
  };    

  componentDidMount(){
    var self = this;
    axios.get( Config.API + '/breakdowns/byproblemnumber?parentID='+this.props.params.probID + '&parentNumber=1').then(function (response) {
        self.setState({
            breakdownID: response.data.ID,
        })
    })   
    if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
            privateCall: '/private',
            private: '1',
        })
    } else {
        self.setState({
            linkPath: '/project/',
            privateCall: '',
            private: '0',
        })
    }
    if (window.location.pathname.includes('proposal')) {
      self.setState({
          proposalCheck: '1',
          proposalBoxID: 'createProjectFormProposal',
          proposalPath: '/proposal/'+self.props.params.solutionID + '/subprojects',
          parentID: self.props.params.solutionID,
      })
    } else {
        self.setState({
            proposalCheck: '0',
            proposalBoxID: 'createProjectForm',
            proposalPath: '/subprojects',
            parentID: self.props.params.probID,
        })
    }
    if (cookie.load('userName')) {
        self.setState({
          userName: cookie.load('userName'),
        })
      }
      else {
        self.setState({
          userName: 'anonymous',
        })
      }
  }
  componentWillReceiveProps(nextProps) {
    var self = this;
    axios.get( Config.API + '/breakdowns/byproblemnumber?parentID='+nextProps.params.probID + '&parentNumber=1').then(function (response) {
        self.setState({
            breakdownID: response.data.ID,
        })
    })   
    if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
            privateCall: '/private',
            private: '1',
        })
    } else {
        self.setState({
            linkPath: '/project/',
            privateCall: '',
            private: '0',
        })
    }
    if (window.location.pathname.includes('proposal')) {
      self.setState({
          proposalCheck: '1',
          proposalBoxID: 'createProjectFormProposal',
          proposalPath: '/proposal/'+self.props.params.solutionID + '/subprojects',
          parentID: nextProps.params.solutionID,
      })
    } else {
        self.setState({
            proposalCheck: '0',
            proposalBoxID: 'createProjectForm',
            proposalPath: '/subprojects',
            parentID: self.props.params.probID,
        })
    }
    if (cookie.load('userName')) {
        self.setState({
          userName: cookie.load('userName'),
        })
      }
      else {
        self.setState({
          userName: 'anonymous',
        })
      }
  }

//   checkLoginProblem() {
//     if (cookie.load('userName')) {
//       this.postProblem()
//     } else {
//       $(document).ready(function() {
//         $('#notification').attr('id','notificationShow').hide().slideDown();
//         $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//         $('#notificationContent').html('please <span id="blue">login </span>to create a project');
//       });
//     }
//   }
  postProblem() {
    var self = this;
    self.refs.proposalprojectbtn.setAttribute("disabled", "disabled");
    //Read field items into component state
    this.state.title = document.getElementById('problemTitleForm').value
    this.state.summary = document.getElementById('problemSummaryForm').value
    
    if (document.getElementById('checkmark3ProposalActive')) {
      this.state.class = '2' 
    } else if (document.getElementById('checkmark2ProposalActive')) {
      this.state.class = '1' 
    } else {
      this.state.class = '0' 
    }
  
    axios.post( Config.API + '/auth/problems/create'+this.state.privateCall, {
      username: this.state.userName,
      title : this.state.title,
      summary : this.state.summary,
      parentType : this.state.proposalCheck,
      parentID: this.state.parentID,
      parentTitle : this.props.parentTitle,
    //   grandParentID : String(this.props.gParentID),
    //   grandParentTitle: this.props.gParentTitle,
    //   ggParentID : String(this.props.ggParentID),
      class : String(this.state.class),
      breakdownID: String(this.state.breakdownID),
      private: this.state.private,
    })
    .then(function (result) {
      document.getElementById(self.state.proposalBoxID).reset();
      if(document.getElementById("SPHeader")) {
        $(document).ready(function() {
          $('#problemFormContainerShow').attr('id','problemFormContainerHide');
          $('#SPUnitNewHide').attr('id','SPUnitNew');
        });
      } else {
          $(document).ready(function() {
            $('#problemFormContainerShow').attr('id','problemFormContainerHide');
            $('#noProjectsContainerHide').attr('id','noProjectsContainerShow');
          });
      }
    })
      .catch(function (error) {
          $(document).ready(function() {
              if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notification').attr('id','notificationShow').hide().slideDown();
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to create a project');
                  })
                );
              }  else if (error.response.data != '') {
            }
          });
      });
      self.refs.proposalprojectbtn.removeAttribute("disabled");
  }

  hideProblemForm() {
    if(document.getElementById("SPHeader")) {
        $(document).ready(function() {
          $('#problemFormContainerShow').attr('id','problemFormContainerHide');
          $('#SPUnitNewHide').attr('id','SPUnitNew');
        });
    } else {
        $(document).ready(function() {
          $('#problemFormContainerShow').attr('id','problemFormContainerHide');
          $('#noProjectsContainerHide').attr('id','noProjectsContainerShow');
        });
    }
  }
  radioChangeProject() {
      $('#checkmark1Proposal').attr('id','checkmark1ProposalActive');
      $('#checkmark2ProposalActive').attr('id','checkmark2Proposal');
      $('#checkmark3ProposalActive').attr('id','checkmark3Proposal');
  }
  radioChangeGoal() {
      $('#checkmark1ProposalActive').attr('id','checkmark1Proposal');
      $('#checkmark2Proposal').attr('id','checkmark2ProposalActive');
      $('#checkmark3ProposalActive').attr('id','checkmark3Proposal');
  }
  radioChangeProblem() {
      $('#checkmark1ProposalActive').attr('id','checkmark1Proposal');
      $('#checkmark2ProposalActive').attr('id','checkmark2Proposal');
      $('#checkmark3Proposal').attr('id','checkmark3ProposalActive');
  }


  render() {
      return (
        <div>
            <Link to={this.state.linkPath+this.props.params.probID+this.state.proposalPath}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" onClick={this.hideProblemForm}/>
            </Link>
            <div id="createProblemBox">
                <form id={this.state.proposalBoxID}>
                        <label htmlFor="problemTitleForm" id="problemTitleFormLabel">subproject title<br />
                        <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleForm" autoFocus/>
                        </label><br />


                        <div id="projectFormRadioContainer">
                        <div id="projectFormRadioColumn">
                            <div id='checkmark1ProposalActive' onClick={this.radioChangeProject}></div>
                            <div id="projectFormRadioRow1">
                            project
                            </div>    
                        </div>
                        <div id="projectFormRadioColumn">
                            <div id='checkmark2Proposal' onClick={this.radioChangeGoal}></div>
                            <div id="projectFormRadioRow2">
                            goal
                            </div>    
                        </div>
                        <div id="projectFormRadioColumn">
                            <div id='checkmark3Proposal' onClick={this.radioChangeProblem}></div>
                            <div id="projectFormRadioRow3">
                            problem
                            </div>    
                        </div>
                        </div>

                    <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">
                        synopsis
                        <br />
                        <textarea name="problemSummary" maxLength="500" 
                        placeholder="Please summarize this project or add any additional information you'd like. (500 ch)" id="problemSummaryForm"/>
                    </label>
                        <Link 
                        to={this.state.linkPath+this.props.params.probID+this.state.proposalPath} 
                        onClick={this.postProblem}>
                        <input type="button" ref='proposalprojectbtn' value="create" id="submitProblem"/>
                    </Link>
                </form>
            </div>
        </div>

      );
   }
}

