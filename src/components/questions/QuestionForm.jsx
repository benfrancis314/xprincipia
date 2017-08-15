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
    }

  



   render() {
      return (
      <div>
        <div id="discussMenuEnd">
          Questions
        </div>
        <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id='fieldSetNoBorderPadding'>
                      {/*<legend id="questionLegend">Questions</legend>*/}
                          <textarea name="questionText" required="required" id="questionTextArea" placeholder="Ask a question you have about this project or view those asked by your peers. " autoFocus ></textarea>
                          <input type="button" value="Ask" onClick={this.postQuestion} id="askQuestion"/>
                  </fieldset>
              </form>
        </div>
      </div>

      );
   }
}
