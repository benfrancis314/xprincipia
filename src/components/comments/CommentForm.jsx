import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class CommentForm extends React.Component {

constructor(){
  super();

  this.state= {
    comment: '',
  }

  this.postComment = this.postComment.bind(this);
};

postComment() {
  //Read field items into component state
  this.state.comment = document.getElementById('commentTextArea').value
// Ajax post comment request
axios.post( Config.API + '/auth/comments/create', {
  type:'5',
// Questions has "probID here"
  suggestionID: this.props.params.suggID,
  username: cookie.load('userName'),
  description : this.state.comment,
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
      return (
        <div>
          <div id="discussMenuEnd">
            Comments
          </div>
          <div id="answerFormComponent">
            <form id="answerForm">
                <fieldset id="fieldSetNoBorderPadding">
                    {/*<legend>Comments</legend>*/}
                        <textarea name="answerText" required="required" id="commentTextArea" placeholder="Discuss this suggestion or view the current discussion of your peers. " autoFocus ></textarea>
                        <input type="button" value="Add" onClick={this.postComment} id="addAnswerGreen"/>
                </fieldset>
            </form>
          </div>
        </div>

      );
   }
}