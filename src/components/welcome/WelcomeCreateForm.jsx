import React from 'react';
import { Link } from 'react-router';
import axios from 'axios'
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class WelcomeCreateForm extends React.Component {

  constructor(){
    super();
    
    //ProblemForm structure in backend
    this.state= {
      title: '',
      summary: '',
      class: '',
    }

    this.postWelcomeProblem = this.postWelcomeProblem.bind(this);
    // this.toggle = this.toggle.bind(this);
  };

  postWelcomeProblem() {
    this.state.title = document.getElementById('problemCreateTitleForm').value
    this.state.summary = document.getElementById('problemCreateSummaryForm').value
    if (document.getElementById('projectClass2').checked) {
      this.state.class = '2' 
    } else if (document.getElementById('projectClass1').checked) {
      this.state.class = '1' 
    } else {
      this.state.class = '0' 
    }

    var self = this
    axios.post( Config.API + '/auth/problems/create', {
        username: cookie.load('userName'),
        parentID: '0',
        title : this.state.title,
        summary : this.state.summary,
        class : this.state.class,

      })
      .then(function (response) {
        // document.location = '/welcome' 
      })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to create a project');
                    })
                  );
                }  else if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
          });
      });
    };

  render() {
      return (
        <div>
          <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}>
            <Link to={`/welcome`}>
                <img src={require('../../assets/redX.svg')} id="closeRedXFeed" width="30" height="30" alt="Close button, red X symbol" />
            </Link>
            <div id="welcomeNewProjectHeader">
              new project
            </div>
            <div id="createProblemBox">
                <form id="welcomeCreateProjectForm">
                  <fieldset id="fieldSetNoBorder">
                    <label htmlFor="problemCreateTitleForm" id="problemTitleFormLabel">Project Title<br />
                        <input type="text" name="problemTitle" required="required" maxLength="70" id="problemCreateTitleForm" autoFocus/>
                      </label><br />


                      <div id="projectFormRadioContainer">
                        <div id="projectFormRadioColumn">
                          <div id="projectFormRadioRow1">
                            project
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

                    <label htmlFor="problemCreateSummaryForm" id="problemSummaryFormLabel">Additional Information<br />
                        <textarea name="problemSummary" maxLength="350" 
                        placeholder="Please provide any additional information you'd like. (350 character max)" id="problemCreateSummaryForm"/>
                        </label><br />
                    <Link to={`/welcome`}>
                        <input type="button" value="Create" onClick={this.postProblem} id="submitProblem"/>
                    </Link>
                  </fieldset>
                </form>
            </div>
          </ReactCSSTransitionGroup>
        </div>
      );
   }
}

