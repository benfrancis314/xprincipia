import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link } from 'react-router';

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
  var self = this;
  self.refs.btn.setAttribute("disabled", "disabled");

  this.state.answer = document.getElementById('answerTextArea').value
// Ajax post answer request
  axios.post( Config.API + '/auth/answers/create', {
  questionID: this.props.params.questID,
  username: cookie.load('userName'),
  description : this.state.answer,
  type: '2',
  typeID: this.props.params.probID,
  private: '1',
})
.then(function (result) {
  document.getElementById("answerForm").reset();
  self.refs.btn.removeAttribute("disabled");
})
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to answer this question');
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
                      <Link to={window.location.pathname}>
                          <input type="button" ref='btn' value="Answer" onClick={this.postAnswer} id="addAnswerGreen" />
                      </Link>
              </fieldset>
          </form>
        </div>
      </div>

      );
   }
}
