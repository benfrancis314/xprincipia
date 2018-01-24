import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link } from 'react-router';

export default class SuggestionForm extends React.Component {

constructor(){
  super();

  this.state= {
    suggestion: '',
  }

  this.postSuggestion = this.postSuggestion.bind(this);
};

postSuggestion() {
  //Read field items into component state
this.state.suggestion = document.getElementById('suggestionTextArea').value

  //if User is on a solution post with type 1
  //solutionID will be available in props
  if (this.props.params.solutionID) {

      axios.post( Config.API + '/auth/suggestions/create', {
        type:'1',
        typeID: this.props.params.solutionID,
        username: cookie.load('userName'),
        description : this.state.suggestion,
        parentTitle: this.props.parentTitle,
        private: '1',
        parentID: this.props.params.probID,
    })
      .then(function (result) {
        // document.location = window.location.pathname 
        document.getElementById("questionForm").reset();
      })
      .catch(function (error) {
        alert('error')
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to add a suggestion');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
      });

    //else post to problem
    //probID will be used
  } else {

      axios.post( Config.API + '/auth/suggestions/create', {
        type:'0',
        typeID: this.props.params.probID,
        username: cookie.load('userName'),
        description : this.state.suggestion,
        parentTitle: this.props.parentTitle,
        private: '1',
    })
      .then(function (result) {
        // document.location = window.location.pathname 
        document.getElementById("questionForm").reset();
      })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to add a suggestion');
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
    if (this.props.params.solutionID){
      return (
      <div>
        <div id="discussMenuEnd">
          suggestions
        </div>
        <div id="suggestionFormComponent">
              <form id="questionForm">
                  <fieldset  id='fieldSetNoBorderPadding'>
                    <textarea name="suggestionText" required="required" id="suggestionTextArea" placeholder="Give a suggestion you have about this project or view those given by your peers. " ></textarea>
                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestions`}>
                      <input type="button" value="Add" onClick={this.postSuggestion} id="addSuggestion"/>
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
      suggestions
    </div>
    <div id="suggestionFormComponent">
          <form id="questionForm">
              <fieldset  id='fieldSetNoBorderPadding'>
                <textarea name="suggestionText" required="required" id="suggestionTextArea" placeholder="Give a suggestion you have about this project or view those given by your peers. " ></textarea>
                <Link to={`/project/private/${this.props.params.probID}/suggestions`}>
                  <input type="button" value="Add" onClick={this.postSuggestion} id="addSuggestion"/>
                </Link>
              </fieldset>
          </form>
    </div>
  </div>);
   }
  }
}
