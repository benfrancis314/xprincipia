import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class QuestionFlagForm extends React.Component {

  constructor(){
  super();

  this.state= {
    question: '',
  }

    this.postQuestion = this.postQuestion.bind(this);
  };

postQuestion() {
  //Read field items into component state
  this.state.question = document.getElementById('questionTextArea').value

  //if User is on a solution post with type 1
  //solutionID will be available in props
  if(this.props.solutionID){
    axios.post( Config.API + '/auth/questions/create', {
    type:'1',
    typeID: this.props.solutionID,
    username: cookie.load('userName'),
    description : this.state.question,
  })
    .then(function (result) {
      document.location = window.location.pathname 
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

    //else post to problem
    //probID will be used
    else {
      axios.post( Config.API + '/auth/questions/create', {
      type:'0',
      typeID: this.props.probID,
      username: cookie.load('userName'),
      description : this.state.question,
    })
      .then(function (result) {
        document.location = window.location.pathname 
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
                  <input type="radio" name="flagType" value="0"/>
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
                  <input type="radio" name="flagType" value="1" />
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
                  <input type="radio" name="flagType" value="2" />
                  <span id="checkmark3"></span>
                </label>
              </div>
            </div>
          </div>

          <form id="flagForm">
            <textarea id="questionTextArea" name="questionText" placeholder="Help us understand this flag, if you would like. " 
            autoFocus ></textarea>
            <br />
            <div onClick={this.postQuestion} id="flagButton">submit</div>
            <Link to={`/project/${this.props.params.probID}/questions`}>
              <div id="returnButton">exit</div>
            </Link>
          </form>
          </div>
        </div>

      );
   }
}
