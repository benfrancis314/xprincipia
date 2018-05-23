import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link } from 'react-router';

export default class UserPassions extends React.Component {
constructor(props){
  super(props);

  this.state= {
    passions: '',
  }

  this.postPassions = this.postPassions.bind(this);
};
componentDidMount() {
    document.getElementById('passionsTextArea').value = this.props.user.Passions;
}

componentWillReceiveProps(nextProps) {
    document.getElementById('passionsTextArea').value = this.props.user.Passions;
}

postPassions() {
  //Read field items into component state

  this.state.passions = document.getElementById('passionsTextArea').value
  
  var self = this;
  axios.put( Config.API + '/auth/users/updatePassions?username='+cookie.load('userName'), {
    passions : self.state.passions
  })
  .then(function (result) {
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
      return (
        <div id="passionsFormContainer">
              <div id="passionsHeader">
                  intellectual passions
              </div>
              <form id="suggestionForm">
                  <textarea onChange={this.postPassions}  name="feedbackText" required="required" id="passionsTextArea" placeholder="What are your passions, your fields of interest, or your driving motivations? " autoFocus ></textarea>
                  <Link to={window.location.pathname}>
                    <input type="button" value="auto saving" onClick={this.postPassions} id="addSuggestion"/>
                  </Link>
              </form>
        </div>
      )
    }
}
