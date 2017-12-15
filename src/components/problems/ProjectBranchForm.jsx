import React from 'react';
import ReactDOM from 'react-dom';
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
    }

    this.postBranch = this.postBranch.bind(this);
  };

componentDidMount() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }      

  postBranch() {
    //Read field items into component state
    this.state.title = document.getElementById('problemTitleForm').value
    this.state.summary = document.getElementById('problemSummaryForm').value
  
    var self = this
    axios.post( Config.API + '/auth/breakdowns/create', {
      username: cookie.load('userName'),
      title : this.state.title,
      description : this.state.summary,
      parentID: this.props.params.probID,
      parentTitle : this.props.parentTitle,
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
            <Link to={`/project/${this.props.params.probID}/subprojects`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
            </Link>
          <div id="SBButtonNoHover">
            new breakdown
          </div>
          <div id="createProblemBox">
              <form id="createForm">
                <fieldset id="fieldSetNoBorder">
                    <label htmlFor="problemTitleForm" id="problemTitleFormLabel">breakdown title<br />
                      <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleForm" />
                    </label><br />

                  <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">concept or distinction<br />
                      <textarea name="problemSummary" maxLength="150" 
                      placeholder="What is the concept behind this breakdown or what makes it distinct? (250 character max)" id="problemSummaryForm"/>
                      </label><br />

                  <input type="button" value="Create" onClick={this.postBranch} id="submitProblem"/>
                </fieldset>
              </form>
          </div>
        </div>

      );
   }
}

