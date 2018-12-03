import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class IdeaList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        //    problems : [],
           tutorial: '',
           siteSuggestion: '',
        }
        // this.queryProblem = this.queryProblem.bind(this);
        this.postSiteSuggestion = this.postSiteSuggestion.bind(this);
    };

    postSiteSuggestion() {
        //Read field items into component state
      this.state.siteSuggestion = document.getElementById('siteSuggestionForm').value
      
      
       axios.post( Config.API + '/auth/feedback/create', {
          username: cookie.load('userName'),
          description : this.state.feedback,
        })
        .then(function (result) {
          // alert("Thank you for your feedback. We will use this to improve your experience in the future. ")
          document.location = window.location.pathname 
        })
            .catch(function (error) {
                $(document).ready(function() {
                    $('#notification').attr('id','notificationShow').hide().slideDown();
      
                      if (error.response.data == '[object Object]') {
                        return (
                          $(document).ready(function() {
                            $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                            $('#notificationContent').html('Please <span id="blue">login </span>to contribute feedback. ');
                          })
                        );
                      }  else if (error.response.data != '') {
                    $('#notificationContent').text(error.response.data);
                    }
                });
            });
      
        
      }

   render() {
    
            return (
                <div id="siteSuggestionsContainer">
                    <div id="siteSuggestionsTitle">
                        WEBSITE
                        <br />
                        SUGGESTIONS
                    </div>
                    <textarea placeholder="Please give us suggestions on how to improve your experience. " id="siteSuggestionForm"/>
                </div>
            );
    }
}