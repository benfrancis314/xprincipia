import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class AnswerFlagForm extends React.Component {

  constructor(){
    super();
    
    this.state= {
      parentType: '',
      parentID: [],
      description: '',
      reason: '',
      submitUser: '',
      flagUser: '',
    }

    this.flagAnswer = this.flagAnswer.bind(this);
  };

  flagQuestion() {
  //Read field items into component state
  this.state.description = document.getElementById('questionTextArea').value
  if (document.getElementById('flagReason3').checked) {
    this.state.reason = '3'  
  } else if (document.getElementById('flagReason2').checked) {
    this.state.reason = '2' 
  } else if (document.getElementById('flagReason1').checked) {
    this.state.reason = '1' 
  } else {
    this.state.reason = '0' 
  }

  var self = this;
  axios.post( Config.API + '/auth/flags/create', {
    parentType: '4',
    parentID: this.props.params.answerID,
    submitUser: cookie.load('userName'),
    // flagUser: this.props.creator,
    reason: this.state.reason,
    description : this.state.description,
  })
  .then(function (result) {
    document.location = '/project/'+ self.props.params.probID + '/questions' + self.props.params.questID + '/answers' 
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
                  $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                })
              );
            } 
        });
    });

}
  



   render() {
      return (
        <div id="flagContainer">
          <div>
          <div id="flagHeader">
            flag reasoning
          </div>

          <div id="projectFormRadioContainer">
            <div id="projectFormRadioColumn">
              <div id="projectFormRadioRow3">
                misplaced
                 {/* <span id="gray">(default)</span> */}
              </div>
              <div id="projectFormRadioRow">
                <label id="projectRadioButtonContainer">
                  <input type="radio" id="flagReason1" name="flagType" value="1"/>
                  <span id="checkmark3"></span>
                </label>
              </div>
            </div>
            <div id="projectFormRadioColumn">
              <div id="projectFormRadioRow3">
                inaccurate
              </div>
              <div id="projectFormRadioRow">
                <label id="projectRadioButtonContainer">
                  <input type="radio" id="flagReason2" name="flagType" value="2" />
                  <span id="checkmark3"></span>
                </label>
              </div>
            </div>
            <div id="projectFormRadioColumn">
              <div id="projectFormRadioRow3">
                bad culture
              </div>
              <div id="projectFormRadioRow">
                <label id="projectRadioButtonContainer">
                  <input type="radio" id="flagReason3" name="flagType" value="3" />
                  <span id="checkmark3"></span>
                </label>
              </div>
            </div>
          </div>

          <form id="flagForm">
            <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
            autoFocus ></textarea>
            <br />
            <div onClick={this.flagAnswer} id="flagButton">submit</div>
            <Link to={`/project/${this.props.params.probID}/question/${this.props.params.questID}/answers`}>
              <div id="returnButton">exit</div>
            </Link>
          </form>
          </div>
        </div>

      );
   }
}
