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
        return axios.get( Config.API + '/comments/ID?id='+this.props.params.commentID).then(function (response) {
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
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });
  }

  updateComment() {
    //Read field items into component state
    this.state.comment = document.getElementById('commentEditTextArea').value
  
  if (this.props.params.subcommentID) {
      var self = this
      axios.put( Config.API + '/auth/comments/update?id='+this.props.params.subcommentID, {
          // type:'5',
          typeID: self.props.params.subcommentID,
          username: cookie.load('userName'),
          description : self.state.comment,
        })
          .then(function (result) {
            // document.location = '/project/private/' + self.props.params.probID + '/suggestion/' + self.props.params.suggID + '/comments'
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
  } else {
    var self = this
    axios.put( Config.API + '/auth/comments/update?id='+this.props.params.commentID, {
        // type:'5',
        typeID: self.props.params.commentID,
        username: cookie.load('userName'),
        description : self.state.comment,
      })
        .then(function (result) {
          // document.location = '/project/private/' + self.props.params.probID + '/suggestion/' + self.props.params.suggID + '/comments'
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
  }

  
  



   render() {
    // PROPOSAL SUGGESTIONS
    if ((this.props.params.solutionID) && (this.state.comment.ParentType == '3')){
      return (
        <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestion/${this.props.params.suggID}/comments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestion/${this.props.params.suggID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
        </div>);
  // PROPOSAL ANSWERS
  } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '4')) {
  return (
    <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/question/${this.props.params.questID}/answers/${this.props.params.answerID}/comments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/question/${this.props.params.questID}/answers/${this.props.params.answerID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
        </div>);
  // PROPOSAL COMMENTS
  } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '5')){
      return (
        <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/comment/${this.props.params.commentID}/subcomments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/comment/${this.props.params.commentID}/subcomments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
        </div>);
  // PROPOSAL DEBATE
  } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '6')){
      return (
          <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/debate/${this.props.params.freeFormID}/comments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/debate/${this.props.params.freeFormID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
          </div>);
  // PROPOSAL PROS
  } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '9')){
      return (
          <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/pros/${this.props.params.proID}/comments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/pros/${this.props.params.proID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
          </div>);
  // PROPOSAL CONS
  } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '10')){
      return (
            <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons/${this.props.params.conID}/comments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons/${this.props.params.conID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
            </div>);
      // SUGGESTIONS
       } else if  (this.state.comment.ParentType == '3'){
          return (
            <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/suggestion/${this.props.params.suggID}/comments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/suggestion/${this.props.params.suggID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
            </div>);
      // ANSWERS
      } else if (this.state.comment.ParentType == '4') {
      return (
            <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/question/${this.props.params.questID}/answers/${this.props.params.answerID}/comments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/question/${this.props.params.questID}/answers/${this.props.params.answerID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
            </div>);
      // COMMENTS
      } else if (this.state.comment.ParentType == '5') {
          return (
            <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/comment/${this.props.params.commentID}/subcomments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/comment/${this.props.params.commentID}/subcomments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
            </div>);
      // DEBATE
      } else if (this.state.comment.ParentType == '6') {
          return (
            <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/open/${this.props.params.freeFormID}/comments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/open/${this.props.params.freeFormID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
            </div>);
      // LESSONS
      } else if (this.state.comment.ParentType == '7') {
          return (
            <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/learn/content/${this.props.params.learnItemID}/comments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/learn/content/${this.props.params.learnItemID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
        </div>);
      // RESOURCES
      } else if (this.state.comment.ParentType == '8'){
          return (
            <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/learn/resources/${this.props.params.resourceID}/comments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/learn/resources/${this.props.params.resourceID}/comments`}>
                              <div id="returnButton">Exit</div>
                          </Link>
                  </fieldset>
              </form>
        </div>);
    } else {
      return (
        <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id="redFieldset">
                      <legend id="redLegend">Edit Comment</legend>
                          <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/suggestion/${this.props.params.suggID}/comments`}>
                              <div onClick={this.updateComment} id="editButton">Submit</div>
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
}