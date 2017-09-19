import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class AnswerEditForm extends React.Component {

  constructor(){
  super();

  this.state= {
    answer: '',
  }

    this.updateAnswer = this.updateAnswer.bind(this);
  };

  componentWillMount(){
      var self = this;
        return axios.get( Config.API + '/auth/answers/ID?id='+this.props.params.answerID).then(function (response) {
          self.setState({
              answer: response.data
          })
          
          document.getElementById('answerEditTextArea').value = self.state.answer.Description;

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

updateAnswer() {
  //Read field items into component state
  this.state.answer = document.getElementById('answerEditTextArea').value

  axios.put( Config.API + '/auth/answers/update?id='+this.props.params.answerID, {
      type:'4',
      typeID: this.props.params.questID,
      username: cookie.load('userName'),
      description : this.state.answer,
    })
      .then(function (result) {
        document.location = window.location.pathname 
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
            <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Answer</legend>
                          <textarea name="questionText" required="required" id="answerEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/question/${this.props.params.questID}/answers`}>
                            <div onClick={this.updateAnswer} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/question/${this.props.params.questID}/answers`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
        </div>
        );
    } else {
      return (
        <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Answer</legend>
                          <textarea name="questionText" required="required" id="answerEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/question/${this.props.params.questID}/answers`}>
                            <div onClick={this.updateAnswer} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/question/${this.props.params.questID}/answers`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
        </div>
      );
    }
  }
}