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
    axios.post( Config.API + '/auth/problems/create/private', {
      username: cookie.load('userName'),
      parentID: this.props.params.probID,
      title : this.state.title,
      summary : this.state.summary,
      // Not sure if necessary
      // Private: false
    })
    .then(function (result) {
      //redirect back to the last page     
      document.location = '/project/private/'+self.props.params.probID+'/subprojects'
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
            <Link to={`/project/private/${this.props.params.probID}/subprojects`}>
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

                  <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">Additional Information<br />
                      <textarea name="problemSummary" required="required" maxLength="350" 
                      placeholder="Please provide any additional information you'd like. (250 character max)" id="problemSummaryForm"/>
                      </label><br />

                  <input type="button" value="Create" onClick={this.postProblem} id="submitProblem"/>
                </fieldset>
              </form>
          </div>
        </div>

      );
   }
}

