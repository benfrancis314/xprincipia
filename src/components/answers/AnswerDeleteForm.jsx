import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class AnswerDeleteForm extends React.Component {

  constructor(){
  super();

  this.state= {
    answer: '',
  }

    this.deleteAnswer = this.deleteAnswer.bind(this);
  };

deleteAnswer() {
      var self = this
      axios.delete( Config.API + '/auth/answers/delete?id='+this.props.params.answerID, {
        params: {
          id: this.props.params.questID,
          username: cookie.load('userName')
        }
    })
      .then(function (result) {
        document.location = '/project/'+ self.props.params.probID + '/question/' + self.props.params.questID + '/answers'
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
      <div id="questionFormComponent">
            <form id="questionForm">
                <fieldset id="redFieldset">
                    <legend>Delete Answer</legend>
                         <div>Are you sure you would like to delete this answer?</div>
                         <br />
                         <div onClick={this.deleteAnswer} id="deleteButton">Delete</div>
                         <Link to={`/project/${this.props.params.probID}/question/${this.props.params.questID}/answers`}>
                            <div id="returnButton">Exit</div>
                         </Link>
                </fieldset>
            </form>
      </div>

      );
   }
}
