import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class SuggestionEditForm extends React.Component {

  constructor(){
  super();

  this.state= {
    suggestion: '',
  }

    this.updateSuggestion = this.updateSuggestion.bind(this);
  };

  componentWillMount(){
      var self = this;
        return axios.get( Config.API + '/auth/suggestions/ID?id='+this.props.params.suggID).then(function (response) {
          self.setState({
              suggestion: response.data
          })
          
          document.getElementById('questionEditTextArea').value = self.state.suggestion.Description;

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

  updateSuggestion() {
    //Read field items into component state
    this.state.suggestion = document.getElementById('questionEditTextArea').value

    axios.put( Config.API + '/auth/suggestions/update?id='+this.props.params.suggID, {
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
                suggestions
              </div>
              <div id="questionFormComponent">
                    <form id="questionForm">
                        <fieldset id="redFieldset">
                            <legend id="redLegend">Edit Suggestion</legend>
                                <textarea name="questionText" required="required" id="questionEditTextArea" autoFocus ></textarea>
                                <br />
                                <Link to={`/project/${this.props.params.probID}/proposal/${this.state.suggestion.TypeID}/suggestions`}>
                                  <div onClick={this.updateSuggestion} id="editButton">Submit</div>
                                </Link>
                                <Link to={`/project/${this.props.params.probID}/proposal/${this.state.suggestion.TypeID}/suggestions`}>
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
            suggestions
          </div>
          <div id="questionFormComponent">
                <form id="questionForm">
                    <fieldset id="redFieldset">
                        <legend id="redLegend">Edit Suggestion</legend>
                            <textarea name="questionText" required="required" id="questionEditTextArea" autoFocus ></textarea>
                            <br />
                            <Link to={`/project/${this.state.suggestion.TypeID}/suggestions`}>
                              <div onClick={this.updateSuggestion} id="editButton">Submit</div>
                            </Link>
                            <Link to={`/project/${this.state.suggestion.TypeID}/suggestions`}>
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