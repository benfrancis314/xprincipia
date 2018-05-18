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
    
    //ProblemForm structure in backend
    this.state= {
      title: '',
      summary: '',
      class: '',
      breakdownID: '',
      linkPath: '',
      private: '',
    }

    this.postProblem = this.postProblem.bind(this);
    this.checkLoginProblem = this.checkLoginProblem.bind(this);

  };

// componentDidUpdate() {
//         ReactDOM.findDOMNode(this).scrollIntoView();
//   }      

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
            private: '1',
        })
    } else {
        self.setState({
            linkPath: '/project/',
            private: '0',
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
            private: '1',
        })
    } else {
        self.setState({
            linkPath: '/project/',
            private: '0',
        })
    }
  }

  checkLoginProblem() {
    if (cookie.load('userName')) {
      this.postProblem()
    } else {
      $(document).ready(function() {
        $('#notification').attr('id','notificationShow').hide().slideDown();
        $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
        $('#notificationContent').html('please <span id="blue">login </span>to join this discussion');
      });
    }
  }
  postProblem() {
    var self = this;
    self.refs.btn.setAttribute("disabled", "disabled");
    //Read field items into component state
    this.state.title = document.getElementById('problemTitleForm').value
    this.state.summary = document.getElementById('problemSummaryForm').value
    if (document.getElementById('projectClass2').checked) {
      this.state.class = '2' 
    } else if (document.getElementById('projectClass1').checked) {
      this.state.class = '1' 
    } else {
      this.state.class = '0' 
    }
  
    axios.post( Config.API + '/auth/problems/create', {
      username: cookie.load('userName'),
      title : this.state.title,
      summary : this.state.summary,
      parentType : '0',
      parentID: this.props.params.probID,
      parentTitle : this.props.parentTitle,
      grandParentID : String(this.props.gParentID),
      grandParentTitle: this.props.gParentTitle,
      ggParentID : String(this.props.ggParentID),
      class : String(this.state.class),
      breakdownID: String(this.state.breakdownID),
      private: this.state.private,
    })
    .then(function (result) {
      self.refs.btn.removeAttribute("disabled");
      window.scrollTo(0,0);
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
      self.refs.btn.removeAttribute("disabled");
  }

  render() {
      return (
          <div id="createProblemBox">
              <form id="createProjectForm">
                    <label htmlFor="problemTitleForm" id="problemTitleFormLabel">subproject title<br />
                      <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleForm" autoFocus/>
                    </label><br />


                    <div id="projectFormRadioContainer">
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow1">
                          project<span id="grayLessSpacing"> | default</span>
                        </div>
                        <div id="projectFormRadioRow">
                          <label id="projectRadioButtonContainer">
                            <input type="radio" id="projectClass0" name="projectType" value="0"/>
                            <span id="checkmark1"></span>
                          </label>
                        </div>
                      </div>
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow2">
                          goal
                        </div>
                        <div id="projectFormRadioRow">
                          <label id="projectRadioButtonContainer">
                            <input type="radio" id="projectClass1" name="projectType" value="1" />
                            <span id="checkmark2"></span>
                          </label>
                        </div>
                      </div>
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow3">
                          problem
                        </div>
                        <div id="projectFormRadioRow">
                          <label id="projectRadioButtonContainer">
                            <input type="radio" id="projectClass2" name="projectType" value="2" />
                            <span id="checkmark3"></span>
                          </label>
                        </div>
                      </div>
                    </div>

                  <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">
                      synopsis
                      <br />
                      <textarea name="problemSummary" maxLength="500" 
                      placeholder="Please summarize this project or add any additional information you'd like. (500 ch)" id="problemSummaryForm"/>
                  </label>
                  <Link to={this.state.linkPath+this.props.params.probID+`/subprojects`}>
                      <input type="button" ref='btn' value="create" onClick={this.checkLoginProblem} id="submitProblem"/>
                  </Link>
              </form>
          </div>

      );
   }
}

