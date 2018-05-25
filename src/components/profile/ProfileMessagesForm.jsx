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
      user1: '',
      user2: '',
      message: '',
    }

    this.postMessage = this.postMessage.bind(this);
  };

  postMessage() {
    var self = this;
    // self.refs.messagebtn.setAttribute("disabled", "disabled");

    this.state.user1 = cookie.load('userName')
    this.state.user2 = document.getElementById('problemTitleForm').value
    this.state.message = document.getElementById('problemSummaryForm').value
    axios.post( Config.API + '/auth/messages/create', {
        username: cookie.load('userName'),
        user1 : this.state.user1,
        user2 : this.state.user2,
        description : this.state.message,
      })
      axios.post( Config.API + '/auth/conversations/create', {
        username: cookie.load('userName'),
        user1 : this.state.user1,
        user2 : this.state.user2,
      })
      
      .then(function (response) {
        document.getElementById("welcomeCreateProjectForm").reset();
        // self.refs.messagebtn.removeAttribute("disabled");

        // Direct them to their new conversation they just created
      })
      .catch(function (error) {

        // May want to redirect them if there is an error, 
        // If error is because conversation already exi

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
          // self.refs.messagebtn.removeAttribute("disabled");
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
                    <label htmlFor="problemTitleForm" id="problemTitleFormLabel">recipient<br />
                        <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleForm" autoFocus/>
                      </label><br />

                    <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">message<br />
                        <textarea name="problemSummary" required="required" maxLength="350" 
                        placeholder="Start a dialogue with a fellow member." id="problemSummaryForm"/>
                        </label>
                    <Link to={window.location.pathname} onClick={this.postMessage}>
                      <input ref='messagebtn' value="send" id="submitProblem"/>
                    </Link>
                  </fieldset>
                </form>
            </div>
          </ReactCSSTransitionGroup>
        </div>
      );
   }
}

