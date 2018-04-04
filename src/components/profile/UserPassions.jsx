import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class UserPassions extends React.Component {
constructor(){
  super();

  this.state= {
    feedback: '',
  }

  this.postFeedback = this.postFeedback.bind(this);
};

postFeedback() {
  //Read field items into component state
this.state.feedback = document.getElementById('addSuggestion').value


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
    
    if (this.props.params.username == cookie.load('userName')) {
      return (
        <div id="passionsFormContainer">
              <div id="passionsHeader">
                  philosophical passions
              </div>
              <form id="suggestionForm">
                  <textarea name="feedbackText" required="required" id="passionsTextArea" placeholder="What are your passions, your fields of interest, or your driving motivations? " autoFocus ></textarea>
                  <input type="button" value="submit" onClick={this.postFeedback} id="addSuggestion"/>
              </form>
        </div>
      )
    }
    
    return (
      <div>
          [see other user's passions here]
      </div>
      );
   }
}
