import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class AnswerForm extends React.Component {

constructor(){
  super();

  this.state= {
    answer: '',
  }

  this.postAnswer = this.postAnswer.bind(this);
};

postAnswer() { 
  //Read field items into component state
  this.state.answer = document.getElementById('answerTextArea').value
// Ajax post answer request
axios.post( Config.API + '/auth/answers/create', {
  questionID: this.props.params.questID,
  username: cookie.load('userName'),
  description : this.state.answer,
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
          Answers
        </div>
        <div id="answerFormComponent">
          <form id="answerForm">
              {/*A*/}
              <fieldset id='fieldSetNoBorderPadding'>
              {/*B*/}
              {/*<fieldset id="greenBorder">*/}
                  {/*<legend>Answers</legend>*/}
                      <textarea name="answerText" required="required" id="answerTextArea" placeholder="Answer this question or view the answers of your peers. " autoFocus ></textarea>
                      <input type="button" value="Answer" onClick={this.postAnswer} id="addAnswerGreen" />
              </fieldset>
          </form>
        </div>
      </div>

      );
   }
}
