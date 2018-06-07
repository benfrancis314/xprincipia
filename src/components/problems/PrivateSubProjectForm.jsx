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
    }

    this.postProblem = this.postProblem.bind(this);
  };

// componentDidUpdate() {
//         ReactDOM.findDOMNode(this).scrollIntoView();
//   }      

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
  
    var self = this
    axios.post( Config.API + '/auth/problems/create/private', {
      username: cookie.load('userName'),
      parentID: this.props.params.probID,
      title : this.state.title,
      summary : this.state.summary,
      class : this.state.class,

    })
    .then(function (result) {
      //redirect back to the last page     
      // document.location = '/project/private/'+self.props.params.probID+'/subprojects'
      self.refs.btn.removeAttribute("disabled");
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
  }

  render() {
      return (
        <div>
          {/*ScrollableAnchor doesn't work right now, not sure why*/}
          {/*<ScrollableAnchor id={'newSubProject'}>*/}
            <Link to={`/project/private/${this.props.params.probID}/subprojects`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
            </Link>
          {/*</ScrollableAnchor>*/}
          <div id="SBButtonNoHover">
            new subproject
          </div>
          <div id="createProblemBox">
              <form id="createForm">
                <fieldset id="fieldSetNoBorder">
                  <label htmlFor="problemTitleForm" id="problemTitleFormLabel">Project Title<br />
                      <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleForm" autoFocus/>
                    </label><br />



                    <div id="projectFormRadioContainer">
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow1">
                          project
                           {/* <span id="gray"> | default</span> */}
                        </div>
                        <div id="projectFormRadioRow">
                          <label id="projectRadioButtonContainer">
                            <input type="radio" id="projectClass0"  name="projectType" value="0"/>
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

                  <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">Additional Information<br />
                      <textarea name="problemSummary" maxLength="350" 
                      placeholder="Please provide any additional information you'd like. (350 ch)" id="problemSummaryForm"/>
                      </label><br />
                  <Link to={`/project/private/${this.props.params.probID}/subprojects`}>
                      <input type="button" ref='btn' value="Create" onClick={this.postProblem} id="submitProblem"/>
                  </Link>
                </fieldset>
              </form>
          </div>
        </div>

      );
   }
}

