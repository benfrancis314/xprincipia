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
        document.location = '/problem/'+ self.props.params.probID + '/questions'
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
      <div id="questionFormComponent">
            <form id="questionForm">
                <fieldset>
                    <legend>Delete Question</legend>
                         <div>Are you sure you would like to delete this question?</div>
                         <br />
                          <div onClick={this.deleteQuestion} id="deleteButton">Delete</div>
                         <Link to={`/problem/${this.props.params.probID}/questions`}>
                            <div id="returnButton">Exit</div>
                         </Link>
                </fieldset>
            </form>
      </div>

      );
   }
}


