import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class CommentForm extends React.Component {

constructor(props){
  super(props);

  this.state= {
    comment: '',
  }

  this.postComment = this.postComment.bind(this);
};

postComment() {
  //Read field items into component state
  this.state.comment = document.getElementById('commentTextArea').value

// Testing to see if this can be used to make comments elsewhere
  if (this.props.params.suggID) {
    axios.post( Config.API + '/auth/comments/create', {
      type:'5',
      // suggestionID: this.props.params.suggID,
      parentID: this.props.params.freeFormID,
      parentType: '3',
      username: cookie.load('userName'),
      description : this.state.comment
    })
    .then(function (result) {
      document.location = window.location.pathname 
    })
          .catch(function (error) {
              $(document).ready(function() {
                  $('#notification').attr('id','notificationShow').hide().slideDown();

                    if (error.response.data == '[object Object]') {
                      return (
                        $(document).ready(function() {
                          $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                          $('#notificationContent').html('Please <span id="blue">login </span>to add a comment');
                        })
                      );
                    }  else if (error.response.data != '') {
                  $('#notificationContent').text(error.response.data);
                  }
              });
          });
  } else if (this.props.params.freeFormID) {
        axios.post( Config.API + '/auth/comments/create', {
        type:'5',
        // suggestionID: this.props.params.suggID,
        parentID: this.props.params.freeFormID,
        parentType: '6',
        username: cookie.load('userName'),
        description : this.state.comment
      })
      .then(function (result) {
        document.location = window.location.pathname; 
      })
            .catch(function (error) {
                $(document).ready(function() {
                    $('#notification').attr('id','notificationShow').hide().slideDown();

                      if (error.response.data == '[object Object]') {
                        return (
                          $(document).ready(function() {
                            $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                            $('#notificationContent').html('Please <span id="blue">login </span>to add a comment');
                          })
                        );
                      }  else if (error.response.data != '') {
                    $('#notificationContent').text(error.response.data);
                    }
                });
            });
  } else {
    alert('comment form not working for suggestions or debate');
  }
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