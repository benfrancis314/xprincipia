import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class QuestionDeleteForm extends React.Component {

  constructor(){
  super();

  this.state= {
    question: '',
  }

    this.deleteQuestion = this.deleteQuestion.bind(this);
  };

deleteQuestion() {
  
//Delete question
      var self = this
      axios.delete( Config.API + '/auth/questions/delete?id='+this.props.params.questID, {
        params: {
          id: this.props.params.questID,
          username: cookie.load('userName')
        }
      })
      .then(function (result) {
        // document.location = window.location.pathname 
      })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to<span id="red"> delete</span>');
                  })
                );
              } 
          });
      });
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
                        <fieldset>
                            <legend>Delete Question</legend>
                                <div>Are you sure you would like to delete this question?</div>
                                <br />
                                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/questions`}>
                                  <div onClick={this.deleteQuestion} id="deleteButton">Delete</div>
                                </Link>
                                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/questions`}>
                                    <div id="returnButton">Exit</div>
                                </Link>
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
                    <fieldset>
                        <legend>Delete Question</legend>
                            <div>Are you sure you would like to delete this question?</div>
                            <br />
                            <Link to={`/project/${this.props.params.probID}/questions`}>
                                <div onClick={this.deleteQuestion} id="deleteButton">Delete</div>
                            </Link>
                            <Link to={`/project/${this.props.params.probID}/questions`}>
                                <div id="returnButton">Exit</div>
                            </Link>
                    </fieldset>
                </form>
          </div>
        </div>
      );
    }
  }
}


