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
      // field: '',
      summary: '',
    }

    this.postProblem = this.postProblem.bind(this);
  };

// componentDidUpdate() {
//         ReactDOM.findDOMNode(this).scrollIntoView();
//   }      

  postProblem() {
    
    //Read field items into component state
    this.state.title = document.getElementById('problemTitleForm').value
    this.state.summary = document.getElementById('problemSummaryForm').value
  
    var self = this
    axios.post( Config.API + '/auth/problems/create', {
      username: cookie.load('userName'),
      parentType : '0',
      parentID: this.props.params.probID,
      title : this.state.title,
      summary : this.state.summary,
      // Not sure if necessary
      // Private: false
    })
    .then(function (result) {
      //redirect back to the last page     
      document.location = '/project/'+self.props.params.probID+'/subprojects'
    })
      .catch(function (error) {
        // alert('why not working');
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
  }

  render() {
      return (
        <div>
          {/*ScrollableAnchor doesn't work right now, not sure why*/}
          {/*<ScrollableAnchor id={'newSubProject'}>*/}
            <Link to={`/project/${this.props.params.probID}/subprojects`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
            </Link>
          {/*</ScrollableAnchor>*/}
          <div id="SBButtonNoHover">
            New Sub Project
          </div>
          <div id="createProblemBox">
              <form id="createForm">
                <fieldset id="fieldSetNoBorder">
                  <label htmlFor="problemTitleForm" id="problemTitleFormLabel">Project Title<br />
                      <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleForm" autoFocus/>
                    </label><br />


                    {/* <div id="projectFormRadioContainer">
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow1">
                          project
                        </div>
                        <div id="projectFormRadioRow">
                          <label id="projectRadioButtonContainer">
                            <input type="radio" checked="checked" name="radio" />
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
                            <input type="radio" name="radio" />
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
                            <input type="radio" name="radio" />
                            <span id="checkmark3"></span>
                          </label>
                        </div>
                      </div>
                    </div> */}


                    <div id="projectFormRadioContainer">
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow1">
                          project
                        </div>
                         <br />
                        {/* <div id="projectFormRadioRow"> */}
                          {/* <label id="projectRadioButtonContainer"> */}
                            <input type="radio" checked="checked" name="project" id="problemRadioInput" />
                            {/* <span id="checkmark1"></span> */}
                          {/* </label> */}
                        {/* </div> */}
                      </div>
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow2">
                          goal
                        </div>
                        <br />
                        {/* <div id="projectFormRadioRow"> */}
                          {/* <label id="projectRadioButtonContainer"> */}
                            <input type="radio" name="project" id="problemRadioInput" />
                            {/* <span id="checkmark2"></span> */}
                          {/* </label> */}
                        {/* </div> */}
                      </div>
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow3">
                          problem
                        </div>
                        {/* <div id="projectFormRadioRow"> */}
                          {/* <label id="projectRadioButtonContainer"> */}
                          <br />
                            <input type="radio" name="project" id="problemRadioInput" />
                            {/* <span id="checkmark3"></span> */}
                          {/* </label> */}
                        {/* </div> */}
                      </div>
                    </div>


                  {/* <select id ="dropDownProblemForm" name="problemType">
                    <option id="dropDownProject" value="project">project</option>
                    <option id="dropDownGoal" value="goal">goal</option>
                    <option id="dropDownProblem" value="problem">problem</option>
                  </select> */}




                  <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">Additional Information<br />
                      <textarea name="problemSummary" required="required" maxLength="350" 
                      placeholder="Please provide any additional information you'd like. (350 character max)" id="problemSummaryForm"/>
                      </label><br />

                  <input type="button" value="Create" onClick={this.postProblem} id="submitProblem"/>
                </fieldset>
              </form>
          </div>
        </div>

      );
   }
}

