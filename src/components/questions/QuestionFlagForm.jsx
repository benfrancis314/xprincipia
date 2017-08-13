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
              $('#notificationContent').text(error.response.data);
              // alert( "Please login to add content. ");
              if (error.response.data == '[object Object]') {
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
              $('#notificationContent').text(error.response.data);
              // alert( "Please login to add content. ");
              if (error.response.data == '[object Object]') {
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

  }
  



   render() {
      return (
      <div id="questionFormComponent">
            <form id="flagForm">
                <fieldset>
                    <legend>Reason for Flag</legend>
                         <textarea name="questionText" required="required" id="questionFlagTextArea" 
                         placeholder="Optional: Is this flag due to bad culture, illogical content, 
                         or another reason?" autoFocus ></textarea>
                         <br />
                         <div onClick={this.postQuestion} id="flagButton">Submit</div>
                         <Link to='/problem/${question.TypeID}/questions'>
                            <div id="returnButton">Exit</div>
                         </Link>
                </fieldset>
            </form>
      </div>

      );
   }
}
