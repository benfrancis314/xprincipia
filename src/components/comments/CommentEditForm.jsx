import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class CommentEditForm extends React.Component {

  constructor(){
  super();

  this.state= {
    comment: '',
  }

    this.updateComment = this.updateComment.bind(this);
  };

  componentWillMount(){
      var self = this;
        return axios.get( Config.API + '/auth/comments/ID?id='+this.props.params.commentID).then(function (response) {
          self.setState({
              comment: response.data
          })
          
          document.getElementById('commentEditTextArea').value = self.state.comment.Description;

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
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
                  })
                );
              } 
          });
      });
  }

updateComment() {
  //Read field items into component state
  this.state.comment = document.getElementById('commentEditTextArea').value

  var self = this
  axios.put( Config.API + '/auth/comments/update?id='+this.props.params.commentID, {
      type:'5',
      typeID: self.props.params.commentID,
      username: cookie.load('userName'),
      description : self.state.comment,
    })
      .then(function (result) {
        document.location = '/problem/' + self.props.params.probID + '/suggestion/' + self.props.params.suggID + '/comments'
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
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
                  })
                );
              } 
          });
      });
    }

  
  



   render() {
      return (
      <div id="questionFormComponent">
            <form id="questionForm">
                <fieldset id="redFieldset">
                    <legend id="redLegend">Edit Comment</legend>
                         <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                         <br />
                         <div onClick={this.updateComment} id="editButton">Submit</div>
                         <Link to={`/problem/${this.props.params.probID}/suggestion/${this.props.params.suggID}/comments`}>
                            <div id="returnButton">Exit</div>
                         </Link>
                </fieldset>
            </form>
      </div>

      );
   }
}