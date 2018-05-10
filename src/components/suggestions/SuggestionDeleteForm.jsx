import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class SuggestionDeleteForm extends React.Component {

  constructor(){
  super();

  this.state= {
    suggestion: '',
  }

    this.deleteSuggestion = this.deleteSuggestion.bind(this);
  };

deleteSuggestion() {
//Delete question
    var self = this
    axios.delete( Config.API + '/auth/suggestions/delete?id='+this.props.params.suggID, {
      params: {
        id: this.props.params.suggID,
        username: cookie.load('userName')
      }
    })
    .then(function (result) {
        // document.location = window.location.pathname 
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
                Suggestions
              </div>
              <div id="questionFormComponent">
                    <form id="questionForm">
                        <fieldset>
                            <legend>Delete Suggestion</legend>
                                <div>Are you sure you would like to delete this suggestion?</div>
                                <br />
                                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestions`}>
                                    <div onClick={this.deleteSuggestion} id="deleteButton">Delete</div>
                                </Link>                                
                                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestions`}>
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
            Suggestions
          </div>
          <div id="questionFormComponent">
                <form id="questionForm">
                    <fieldset>
                        <legend>Delete Suggestion</legend>
                            <div>Are you sure you would like to delete this suggestion?</div>
                            <br />
                            <Link to={`/project/${this.props.params.probID}/suggestions`}>
                                <div onClick={this.deleteSuggestion} id="deleteButton">Delete</div>
                            </Link>
                            <Link to={`/project/${this.props.params.probID}/suggestions`}>
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



