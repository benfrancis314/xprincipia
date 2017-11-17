import React from 'react';
import { Link } from 'react-router';
import axios from 'axios'
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class ProfileMessagesForm extends React.Component {

  constructor(){
    super();
    
    //ProblemForm structure in backend
    this.state= {
      member1: '',
      member2: '',
      message: '',
    }

    this.postMessage = this.postMessage.bind(this);
    // this.toggle = this.toggle.bind(this);
  };

  postMessage() {
    this.state.member1 = document.getElementById('problemTitleForm').value
    this.state.member2 = cookie.load('userName')
    this.state.message = document.getElementById('problemSummaryForm').value
    return axios.post( Config.API + '/auth/problems/create', {
        // username: cookie.load('userName'),
        // parentID: this.props.params.probID,
        member1 : this.state.member1,
        member2 : this.state.member2,
        message : this.state.message,
      })
      .then(function (response) {
        document.location = '/messages' 
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
            <div id="messagesHeader">
                conversations
            </div>
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
            <Link to={`/messages`}>
                <img src={require('../../assets/redX.svg')} id="closeRedXFeed" width="40" height="40" alt="Close button, red X symbol" />
            </Link>
            {/* <div id="welcomeNewProjectHeader">
              new message
            </div> */}
            <div id="createProblemBox">
                <form id="welcomeCreateProjectForm">
                  <fieldset id="fieldSetNoBorder">
                    <label htmlFor="problemTitleForm" id="problemTitleFormLabel">Recipient<br />
                        <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleForm" autoFocus/>
                      </label><br />

                    <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">Message<br />
                        <textarea name="problemSummary" required="required" maxLength="350" 
                        placeholder="Start a dialogue with a fellow member." id="problemSummaryForm"/>
                        </label><br />

                    <input type="button" value="send" onClick={this.postMessage} id="submitProblem"/>
                  </fieldset>
                </form>
            </div>
          </ReactCSSTransitionGroup>
        </div>
      );
   }
}

