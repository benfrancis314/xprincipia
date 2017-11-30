import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class QuestionForm extends React.Component {

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
  if(this.props.params.solutionID){
    axios.post( Config.API + '/auth/questions/create', {
    type:'1',
    typeID: this.props.params.solutionID,
    username: cookie.load('userName'),
    description : this.state.question,
  })
    .then(function (result) {
      document.location = window.location.pathname 
    })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to ask a question');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
      });
    }

    //else post to problem
    //probID will be used
    else {

      axios.post( Config.API + '/auth/questions/create', {
      type:'0',
      typeID: this.props.params.probID,
      username: cookie.load('userName'),
      description : this.state.question,
    })
      .then(function (result) {
        document.location = window.location.pathname 
      })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to ask a question');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
      });
    }

  }



   render() {
    if (this.props.params.solutionID){
        return (
          <div>
            <div id="discussMenuEnd">
              questions
            </div>
            <div id="questionFormComponent">
                <form id="questionForm">
                  <fieldset id='fieldSetNoBorderPadding'>
                    <textarea name="questionText" required="required" id="questionTextArea" placeholder="Ask a question you have about this project or view those asked by your peers. " ></textarea>
                    <input type="button" value="Ask" onClick={this.postQuestion} id="askQuestion"/>
                  </fieldset>
                </form>
            </div>
          </div>
        );
    } else {
        return (
          <div>
            <div id="discussMenuEnd">
              questions
            </div>
            <div id="questionFormComponent">
              <form id="questionForm">
                <fieldset id='fieldSetNoBorderPadding'>
                  <textarea name="questionText" required="required" id="questionTextArea" placeholder="Ask a question you have about this project or view those asked by your peers. " ></textarea>
                  <input type="button" value="Ask" onClick={this.postQuestion} id="askQuestion"/>
                </fieldset>
              </form>
            </div>
          </div>

        );
   }
}}
