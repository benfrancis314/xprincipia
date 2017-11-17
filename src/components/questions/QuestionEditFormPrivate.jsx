import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class QuestionEditForm extends React.Component {

  constructor(){
  super();

  this.state= {
    question: '',
  }

    this.updateQuestion = this.updateQuestion.bind(this);
  };

  componentWillMount(){
      var self = this;
        return axios.get( Config.API + '/auth/questions/ID?id='+this.props.params.questID).then(function (response) {
          self.setState({
              question: response.data
          })
          
          document.getElementById('questionEditTextArea').value = self.state.question.Description;

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

updateQuestion() {
  //Read field items into component state
  this.state.question = document.getElementById('questionEditTextArea').value

  axios.put( Config.API + '/auth/questions/update?id='+this.props.params.questID, {
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
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
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
                            <legend id="redLegend">Edit Question</legend>
                                <textarea name="questionText" required="required" id="questionEditTextArea" autoFocus ></textarea>
                                <br />
                                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.state.question.TypeID}/questions`}>
                                    <div onClick={this.updateQuestion} id="editButton">Submit</div>
                                </Link>
                                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.state.question.TypeID}/questions`}>
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
                      <legend id="redLegend">Edit Question</legend>
                          <textarea name="questionText" required="required" id="questionEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.state.question.TypeID}/questions`}>
                              <div onClick={this.updateQuestion} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.state.question.TypeID}/questions`}>
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