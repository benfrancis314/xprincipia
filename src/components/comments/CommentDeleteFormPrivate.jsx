import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class CommentDeleteForm extends React.Component {

  constructor(){
  super();

  this.state= {
    comment: '',
  }

    this.deleteComment = this.deleteComment.bind(this);
  };

deleteComment() {

////Delete comment
      axios.delete( Config.API + '/auth/comments/delete?id='+this.props.params.commentID, {
        params: {
          id: this.props.params.commentID,
          username: cookie.load('userName')
        }
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
            <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend>Delete Comment</legend>
                          <div>Are you sure you would like to delete this comment?</div>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestion/${this.props.params.suggID}/comments`}>
                            <div onClick={this.deleteComment} id="deleteButton">Delete</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestion/${this.props.params.suggID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
            </div>
        );
    } else {
      return (
        <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend>Delete Comment</legend>
                          <div>Are you sure you would like to delete this comment?</div>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/suggestion/${this.props.params.suggID}/comments`}>
                            <div onClick={this.deleteComment} id="deleteButton">Delete</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/suggestion/${this.props.params.suggID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
        </div>

      );
   }
}
