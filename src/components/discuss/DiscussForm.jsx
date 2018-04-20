import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link } from 'react-router';


export default class QuestionForm extends React.Component {

  constructor(){
  super();

  this.state= {
    question: '',
    private: '',
    type: '',
  }

    this.postQuestion = this.postQuestion.bind(this);
  };
componentDidMount(){
    var self = this;
    if (window.location.pathname.includes('private')) {
        self.setState({
            private: '1',
        })
    }   else {
        self.setState({
            private: '0',
        })
    }
}

postQuestion() {
  //Read field items into component state
  var self = this;
  self.refs.btn.setAttribute("disabled", "disabled");
  this.state.question = document.getElementById('questionTextArea').value
  if (document.getElementById('projectClass2').checked) {
      this.state.type = '6' 
    } else if (document.getElementById('projectClass1').checked) {
      this.state.type = '3' 
    } else {
      this.state.type = '2' 
    }

  //if User is on a solution post with type 1
  //solutionID will be available in props
  if(this.props.params.solutionID){
    axios.post( Config.API + '/auth/questions/create', {
      type:'1',
      typeID: this.props.params.solutionID,
      username: cookie.load('userName'),
      description : this.state.question,
      parentTitle: this.props.parentTitle,
      private: this.state.private,
      parentID: this.props.params.probID,
  })
    .then(function (result) {
      // document.location = window.location.pathname 
      document.getElementById("questionForm").reset();
      self.refs.btn.removeAttribute("disabled");
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

      axios.post( Config.API + '/auth/comments/create', {
        type: this.state.type,
        typeID: this.props.params.probID,
        username: cookie.load('userName'),
        description : this.state.question,
        parentTitle : this.props.parentTitle,
        private: this.state.private,
    })
      .then(function (result) {
        document.getElementById("questionForm").reset();
        self.refs.btn.removeAttribute("disabled");
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
        return (
          <div id="discussFormContainer">

            <div id="projectFormRadioContainer">
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow1">
                  question <span id="grayLessSpacing">(default)</span>
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="projectClass0" name="projectType" value="0"/>
                    <span id="checkmark1"></span>
                  </label>
                </div>
              </div>
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow2">
                  suggestion
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="projectClass1" name="projectType" value="1" />
                    <span id="checkmark2"></span>
                  </label>
                </div>
              </div>
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow3">
                  debate
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="projectClass2" name="projectType" value="2" />
                    <span id="checkmark3"></span>
                  </label>
                </div>
              </div>
            </div>


            <div id="questionFormComponent">
              <form id="questionForm">
                <fieldset id='fieldSetNoBorderPadding'>
                  <textarea name="questionText" required="required" id="questionTextArea" placeholder="Ask a question you have about this project or view those asked by your peers. " ></textarea>
                  <Link to={window.location.pathname}>
                    <input type="button" ref='btn' value="Ask" onClick={this.postQuestion} id="askQuestion"/>
                  </Link>
                </fieldset>
              </form>
            </div>
          </div>

        );
   }
}
