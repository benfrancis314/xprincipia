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

// Testing to see if this can be used to make comments elsewhere
  if (this.props.params.proID) {
    //   axios.post( Config.API + '/auth/comments/create', {
    //   type:'5',
    //   suggestionID: this.props.params.suggID,
    //   username: cookie.load('userName'),
    //   description : this.state.comment
    // })
    //   .then(function (result) {
    //     document.location = window.location.pathname 
    //   })
    //   .catch(function (error) {
    //     alert('error')
    //       $(document).ready(function() {
    //           $('#notification').attr('id','notificationShow').hide().slideDown();

    //             if (error.response.data == '[object Object]') {
    //               return (
    //                 $(document).ready(function() {
    //                   $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
    //                   $('#notificationContent').html('Please <span id="blue">login </span>to add a suggestion');
    //                 })
    //               );
    //             }  else if (error.response.data != '') {
    //           $('#notificationContent').text(error.response.data);
    //           }
    //       });
    //   });

    //else post to problem
    //probID will be used
  } else {
        axios.post( Config.API + '/auth/comments/create', {
        type:'5',
        suggestionID: this.props.params.suggID,
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
                        <textarea name="answerText" required="required" id="commentTextArea" placeholder="Comment upon and further develop your suggestion" autoFocus ></textarea>
                        <input type="button" value="Add" onClick={this.postComment} id="addAnswerGreen"/>
                </fieldset>
            </form>
          </div>
        </div>

      );
   }
}