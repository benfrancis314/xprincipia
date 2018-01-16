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
      parentID: this.props.params.suggID,
      parentType: '3',
      username: cookie.load('userName'),
      description : this.state.comment,
      typeID: this.props.params.probID,
      private: '0',
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
    } else if (this.props.params.answerID) {
      axios.post( Config.API + '/auth/comments/create', {
      type:'5',
      parentID: this.props.params.answerID,
      backupParentID: this.props.params.questID,
      parentType: '4',
      username: cookie.load('userName'),
      description : this.state.comment,
      typeID: this.props.params.probID,
      private: '0',
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
  } else if (this.props.params.freeFormID) {
        axios.post( Config.API + '/auth/comments/create', {
        type:'5',
        parentID: this.props.params.freeFormID,
        parentType: '6',
        username: cookie.load('userName'),
        description : this.state.comment,
        typeID: this.props.params.probID,
        private: '0',
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
    } else if (this.props.params.learnItemID) {
      axios.post( Config.API + '/auth/comments/create', {
      type:'5',
      parentID: this.props.params.learnItemID,
      parentType: '7',
      username: cookie.load('userName'),
      description : this.state.comment,
      typeID: this.props.params.probID,
      private: '0',
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
    } else if (this.props.params.resourceID) {
      axios.post( Config.API + '/auth/comments/create', {
      type:'5',
      parentID: this.props.params.resourceID,
      parentType: '8',
      username: cookie.load('userName'),
      description : this.state.comment,
      typeID: this.props.params.probID,
      private: '0',
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
  } else if (this.props.params.proID) {
    axios.post( Config.API + '/auth/comments/create', {
    type:'5',
    parentID: this.props.params.proID,
    parentType: '9',
    username: cookie.load('userName'),
    description : this.state.comment,
    typeID: this.props.params.probID,
    private: '0',
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
    } else if (this.props.params.conID) {
      axios.post( Config.API + '/auth/comments/create', {
      type:'5',
      parentID: this.props.params.conID,
      parentType: '10',
      username: cookie.load('userName'),
      description : this.state.comment,
      typeID: this.props.params.probID,
      private: '0',
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
    } else if (this.props.params.commentID) {
        axios.post( Config.API + '/auth/comments/create', {
        type:'5',
        parentID: this.props.params.commentID,
        parentType: '5',
        username: cookie.load('userName'),
        description : this.state.comment,
        typeID: this.props.params.probID,
        private: '0',
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
    alert('comment form not working for suggestions or debate or comments');
  }
}


   render() {
     if(this.props.params.suggID) {
      return (
        <div>
          <div id="discussMenuEnd">
            comments
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
    } else if(this.props.params.answerID) {
      return (
      <div>
        <div id="discussMenuEnd">
          comments
        </div>
        <div id="answerFormComponent">
          <form id="answerForm">
              <fieldset id="fieldSetNoBorderPadding">
                  {/*<legend>Comments</legend>*/}
                      <textarea name="answerText" required="required" id="commentTextArea" placeholder="Discuss this answer or view the current discussion of your peers. " autoFocus ></textarea>
                      <input type="button" value="Add" onClick={this.postComment} id="addAnswerGreen"/>
              </fieldset>
          </form>
        </div>
      </div>);
    } else if(this.props.params.freeFormID) {
      return (
      <div>
        <div id="discussMenuEnd">
          arguments
        </div>
        <div id="answerFormComponent">
          <form id="answerForm">
              <fieldset id="fieldSetNoBorderPadding">
                  {/*<legend>Comments</legend>*/}
                      <textarea name="answerText" required="required" id="commentTextArea" placeholder="Give logical arguments to help advance this debate. " autoFocus ></textarea>
                      <input type="button" value="Add" onClick={this.postComment} id="addAnswerGreen"/>
              </fieldset>
          </form>
        </div>
      </div>);
    } else if(this.props.params.learnItemID) {
      return (
      <div>
        <div id="discussMenuEnd">
          comments
        </div>
        <div id="answerFormComponent">
          <form id="answerForm">
              <fieldset id="fieldSetNoBorderPadding">
                  {/*<legend>Comments</legend>*/}
                      <textarea name="answerText" required="required" id="commentTextArea" placeholder="Discuss this lesson or view the current discussion of your peers. " autoFocus ></textarea>
                      <input type="button" value="Add" onClick={this.postComment} id="addAnswerGreen"/>
              </fieldset>
          </form>
        </div>
      </div>);
    } else if(this.props.params.resourceID) {
      return (
      <div>
        <div id="discussMenuEnd">
          comments
        </div>
        <div id="answerFormComponent">
          <form id="answerForm">
              <fieldset id="fieldSetNoBorderPadding">
                  {/*<legend>Comments</legend>*/}
                      <textarea name="answerText" required="required" id="commentTextArea" placeholder="Discuss this resource or view the current discussion of your peers. " autoFocus ></textarea>
                      <input type="button" value="Add" onClick={this.postComment} id="addAnswerGreen"/>
              </fieldset>
          </form>
        </div>
      </div>);
    } else if(this.props.params.proID) {
      return (
      <div>
        <div id="discussMenuEnd">
          comments
        </div>
        <div id="answerFormComponent">
          <form id="answerForm">
              <fieldset id="fieldSetNoBorderPadding">
                  {/*<legend>Comments</legend>*/}
                      <textarea name="answerText" required="required" id="commentTextArea" placeholder="Discuss this pro or view the current discussion of your peers. " autoFocus ></textarea>
                      <input type="button" value="Add" onClick={this.postComment} id="addAnswerGreen"/>
              </fieldset>
          </form>
        </div>
      </div>);
    } else if(this.props.params.conID) {
      return (
      <div>
        <div id="discussMenuEnd">
          comments
        </div>
        <div id="answerFormComponent">
          <form id="answerForm">
              <fieldset id="fieldSetNoBorderPadding">
                  {/*<legend>Comments</legend>*/}
                      <textarea name="answerText" required="required" id="commentTextArea" placeholder="Discuss this con or view the current discussion of your peers. " autoFocus ></textarea>
                      <input type="button" value="Add" onClick={this.postComment} id="addAnswerGreen"/>
              </fieldset>
          </form>
        </div>
      </div>);
        } else if(this.props.params.commentID) {
          return (
          <div>
            <div id="discussMenuEnd">
              comments
            </div>
            <div id="answerFormComponent">
              <form id="answerForm">
                  <fieldset id="fieldSetNoBorderPadding">
                      {/*<legend>Comments</legend>*/}
                          <textarea name="answerText" required="required" id="commentTextArea" placeholder="Discuss this comment or view the current discussion of your peers. " autoFocus ></textarea>
                          <input type="button" value="Add" onClick={this.postComment} id="addAnswerGreen"/>
                  </fieldset>
              </form>
            </div>
          </div>);
    } else {
        return (
          <div>
            <div id="discussMenuEnd">
              comments
            </div>
            <div id="answerFormComponent">
              <form id="answerForm">
                  <fieldset id="fieldSetNoBorderPadding">
                      {/*<legend>Comments</legend>*/}
                          <textarea name="answerText" required="required" id="commentTextArea" placeholder="Discuss or view the current discussion of your peers. " autoFocus ></textarea>
                          <input type="button" value="Add" onClick={this.postComment} id="addAnswerGreen"/>
                  </fieldset>
              </form>
            </div>
          </div>
        );
    }
  
   }
}

// Give logical arguments to help reach new conclusions in this debate. 
// Give logical arguments to help progress this debate. 
// Give logical arguments to help advance this debate. 