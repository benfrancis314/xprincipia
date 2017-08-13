import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

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

      axios.post( Config.API + '/auth/suggestions/create', {
      type:'0',
      typeID: this.props.params.probID,
      username: cookie.load('userName'),
      description : this.state.suggestion,
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


   render() {
      return (
      <div>
        <div id="discussMenuEnd">
          Suggestions
        </div>
        <div id="suggestionFormComponent">
              <form id="questionForm">
                  <fieldset  id='fieldSetNoBorderPadding'>
                      {/*<legend>Suggestions</legend>*/}
                          <textarea name="suggestionText" required="required" id="suggestionTextArea" placeholder="Give a suggestion you have about this project or view those given by your peers. " autoFocus ></textarea>
                          <input type="button" value="Add" onClick={this.postSuggestion} id="addSuggestion"/>
                  </fieldset>
              </form>
        </div>
      </div>

      );
   }
}
