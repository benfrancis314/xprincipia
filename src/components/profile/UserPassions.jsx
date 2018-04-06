import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class UserPassions extends React.Component {
constructor(){
  super();

  this.state= {
    passions: '',
  }

  this.postPassions = this.postPassions.bind(this);
};

postPassions() {
  //Read field items into component state
alert('post passions process begin')

  this.state.passions = document.getElementById('passionsTextArea').value
  
  var self = this;
  axios.put( Config.API + '/auth/users/updatePassions?username='+cookie.load('userName'), {
    passions : self.state.passions
  })
  .then(function (result) {
    alert('post passions process SUCCESS')
    // document.location = window.location.pathname 
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
    
    // if (this.props.params.username == cookie.load('userName')) {
      return (
        <div id="passionsFormContainer">
              <div id="passionsHeader">
                  philosophical passions
              </div>
              <form id="suggestionForm">
                  <textarea name="feedbackText" required="required" id="passionsTextArea" placeholder="What are your passions, your fields of interest, or your driving motivations? " autoFocus ></textarea>
                  <input type="button" value="submit" onClick={this.postPassions} id="addSuggestion"/>
              </form>
        </div>
      )
    }
    
  //   return (
  //     <div>
  //         [see other user's passions here]
  //     </div>
  //     );
  //  }
}
