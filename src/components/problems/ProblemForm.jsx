import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

configureAnchors({offset: -50, scrollDuration: 1000});

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

  postProblem() {
    
    //Read field items into component state
    this.state.title = document.getElementById('problemTitleForm').value
    // this.state.field = document.getElementById('problemFieldForm').value
    this.state.summary = document.getElementById('problemSummaryForm').value
  
    var self = this
    axios.post( Config.API + '/auth/problems/create', {
      username: cookie.load('userName'),
      parentID: this.props.params.probID,
      title : this.state.title,
      summary : this.state.summary,
    })
    .then(function (result) {
      //redirect back to the last page     
      document.location = '/problem/'+self.props.params.probID+'/subproblems'
    })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
                  })
                );
              } 
          });
      });
  };

  render() {
      return (
        <div>
          <ScrollableAnchor id={'newSubProject'}>
            <Link to={`/problem/${this.props.params.probID}/subproblems`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
            </Link>
          </ScrollableAnchor>
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

