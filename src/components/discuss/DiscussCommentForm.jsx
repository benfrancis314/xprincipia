import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link } from 'react-router';


export default class QuestionForm extends React.Component {

  constructor(){
  super();

  this.state= {
    question: '',
    private: '',
    type: '',
    placeholder: '',
    prompt1: '',
    prompt2: '',
    prompt3: '',
    prompt4: '',
    radio1: '',
    radio2: '',
    radio3: '',
    userName: '',
  }

    this.postComment = this.postComment.bind(this);
    this.postAnswer = this.postAnswer.bind(this);
    this.showDiscussCommentForm = this.showDiscussCommentForm.bind(this);
    this.hideDiscussCommentForm = this.hideDiscussCommentForm.bind(this);
    // this.checkLoginComment = this.checkLoginComment.bind(this);
    // this.checkLoginAnswer = this.checkLoginAnswer.bind(this);
  };
componentDidMount() {
    var self = this;
    self.setState({
        prompt1: "add",
        prompt2: "comment",
    })
    if (window.location.pathname.includes('private')) {
        self.setState({
            private: '1',
        })
    }   else {
        self.setState({
            private: '0',
        })
    }
    if (this.props.params.solutionID) {
      self.setState({
        placeholder: "Respond with a comment or contribute to the pro/con analysis for this proposal. ",
      })
    } else if (this.props.currentType === 'answer') {
      self.setState({
        prompt1: "ask",
        prompt2: "question",
        radio1: 'checkmark1DiscussComment',
        radio2: 'checkmark2DiscussCommentActive',
        radio3: 'checkmark3DiscussComment',
        placeholder: 'Give an answer to this question. ',
      })
    } else if (this.props.currentType === 'comment') {
      self.setState({
        prompt1: "add",
        prompt2: "comment",
        radio1: 'checkmark1DiscussCommentActive',
        radio2: 'checkmark2DiscussComment',
        radio3: 'checkmark3DiscussComment',
        placeholder: 'Add a comment. ',
      })
    } else if (this.props.currentType === 'answerCom') {
      self.setState({
        prompt1: "add",
        prompt2: "answer",
        radio1: 'checkmark1DiscussComment',
        radio2: 'checkmark2DiscussCommentActive',
        radio3: 'checkmark3DiscussComment',
        placeholder: 'Give an answer to this question. ',
      })
    } else if (this.props.currentType === 'pro') {
      self.setState({
        prompt1: "add",
        prompt2: "pro",
        radio1: 'checkmark1DiscussComment',
        radio2: 'checkmark2DiscussCommentActive',
        radio3: 'checkmark3DiscussComment',
        placeholder: 'Provide a pro in this pro-con analysis. ',
      })
    } else if (this.props.currentType === 'con') {
      self.setState({
        prompt1: "add",
        prompt2: "con",
        radio1: 'checkmark1DiscussComment',
        radio2: 'checkmark2DiscussComment',
        radio3: 'checkmark3DiscussCommentActive',
        placeholder: 'Provide a con in this pro-con analysis. ',
      })
    } else {
      // Assume proConCom
      self.setState({
        prompt1: "add",
        prompt2: "comment",
        radio1: 'checkmark1DiscussCommentActive',
        radio2: 'checkmark2DiscussComment',
        radio3: 'checkmark3DiscussComment',
        placeholder: 'Add a comment. ',
      })
    }
    if(this.props.discuss === undefined || this.props.discuss.length == 0) {
      self.setState({
        prompt1: "the",
        prompt2: "first",
      })
    } else {
      self.setState({
        prompt1: "a",
        prompt2: "new",
      })
    }
    if (cookie.load('userName')) {
      self.setState({
        userName: cookie.load('userName'),
      })
    }
    else {
      self.setState({
        userName: 'anonymous',
      })
    }
}
componentWillReceiveProps(nextProps) {
  var self = this;
  self.setState({
      prompt1: "add",
      prompt2: "comment",
  })
    if (window.location.pathname.includes('private')) {
        self.setState({
            private: '1',
        })
    }   else {
        self.setState({
            private: '0',
        })
    }
    // if (self.props.parentType == 'Question') {
    //   self.setState({
    //     placeholder: "Answer this question or respond with a comment. ",
    //     prompt1: "add",
    //     prompt2: "answer",
    //   })
    // }
    // else if (self.props.params.solutionID) {
    //   self.setState({
    //     placeholder: "Respond with a comment or contribute to the pro/con analysis for this proposal. ",
    //   })
    // } else {
    //   self.setState({
    //     placeholder: "Respond with a comment or contribute to the pro/con analysis for this project. ",
    //   })
    // }
    if (nextProps.params.solutionID) {
      self.setState({
        placeholder: "Respond with a comment or contribute to the pro/con analysis for this proposal. ",
      })
    } else if (nextProps.currentType === 'answer') {
      self.setState({
        prompt1: "ask",
        prompt2: "question",
        radio1: 'checkmark1DiscussComment',
        radio2: 'checkmark2DiscussCommentActive',
        radio3: 'checkmark3DiscussComment',
        placeholder: 'Give an answer to this question. ',
      })
    } else if (nextProps.currentType === 'comment') {
      self.setState({
        prompt1: "add",
        prompt2: "comment",
        radio1: 'checkmark1DiscussCommentActive',
        radio2: 'checkmark2DiscussComment',
        radio3: 'checkmark3DiscussComment',
        placeholder: 'Add a comment. ',
      })
    } else if (nextProps.currentType === 'answercom') {
      self.setState({
        prompt1: "add",
        prompt2: "answer",
        radio1: 'checkmark1DiscussComment',
        radio2: 'checkmark2DiscussCommentActive',
        radio3: 'checkmark3DiscussComment',
        placeholder: 'Give an answer to this question. ',
      })
    } else if (nextProps.currentType === 'pro') {
      self.setState({
        prompt1: "add",
        prompt2: "pro",
        radio1: 'checkmark1DiscussComment',
        radio2: 'checkmark2DiscussCommentActive',
        radio3: 'checkmark3DiscussComment',
        placeholder: 'Provide a pro in this pro-con analysis. ',
      })
    } else if (nextProps.currentType === 'con') {
      self.setState({
        prompt1: "add",
        prompt2: "con",
        radio1: 'checkmark1DiscussComment',
        radio2: 'checkmark2DiscussComment',
        radio3: 'checkmark3DiscussCommentActive',
        placeholder: 'Provide a con in this pro-con analysis. ',
      })
    } else {
      // Assume proConCom
      self.setState({
        prompt1: "add",
        prompt2: "comment",
        radio1: 'checkmark1DiscussCommentActive',
        radio2: 'checkmark2DiscussComment',
        radio3: 'checkmark3DiscussComment',
        placeholder: 'Add a comment. ',
      })
    }
    if(nextProps.discuss === undefined || nextProps.discuss.length == 0) {
      self.setState({
        prompt3: "the",
        prompt4: "first",
      })
    } else {
      self.setState({
        prompt3: "a",
        prompt4: "new",
      })
    }
    // MORE IF STATEMENTS

    // MORE IF STATEMENTS
    if (cookie.load('userName')) {
      self.setState({
        userName: cookie.load('userName'),
      })
    }
    else {
      self.setState({
        userName: 'anonymous',
      })
    }
}
// checkLoginComment() {
//   if (cookie.load('userName')) {
//     this.postComment()
//   } else {
//     $(document).ready(function() {
//       $('#notification').attr('id','notificationShow').hide().slideDown();
//       $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//       $('#notificationContent').html('please <span id="blue">login </span>to join this discussion');
//     });
//   }
// }
// checkLoginAnswer() {
//   if (cookie.load('userName')) {
//     this.postAnswer()
//   } else {
//     $(document).ready(function() {
//       $('#notification').attr('id','notificationShow').hide().slideDown();
//       $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//       $('#notificationContent').html('please <span id="blue">login </span>to join this discussion');
//     });
//   }
// }
postComment() {
  //Read field items into component state
  var self = this;
  self.refs.btn.setAttribute("disabled", "disabled");
  this.state.question = document.getElementById('questionTextArea').value
  if (document.getElementById('checkmark3DiscussCommentActive')) {
    this.state.type = '10' 
  } else if (document.getElementById('checkmark2DiscussCommentActive')) {
    this.state.type = '9' 
  } else {
    this.state.type = '5' 
  }

  if(this.props.params.solutionID){
    axios.post( Config.API + '/auth/comments/create', {
      type: this.state.type,
      typeID: this.props.params.probID,
      username: this.state.userName,
      description : this.state.question,
      parentTitle: this.props.parentTitle,
      private: this.state.private,
      backupParentID: this.props.params.solutionID,
      parentID: this.props.params.discussID,
      parentType: '5',
  })
    .then(function (result) {
      document.getElementById("questionForm").reset();
      self.refs.btn.removeAttribute("disabled");
      $('#discussCommentForm').attr('id','discussCommentFormHide');
      $('#sidebarDiscussCommentMenuHide').attr('id','sidebarDiscussCommentMenu');
      $('#noDiscussContainerHide').attr('id','noDiscussContainerShow');
    })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to ask a question');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
      });
    } else {
      axios.post( Config.API + '/auth/comments/create', {
        type: this.state.type,
        typeID: this.props.params.probID,
        username: this.state.userName,
        description : this.state.question,
        parentID: this.props.params.discussID,
        parentTitle : this.props.parentTitle,
        private: this.state.private,
        parentType: '5',
      })
        .then(function (result) {
          document.getElementById("questionForm").reset();
          self.refs.btn.removeAttribute("disabled");
          $('#discussCommentForm').attr('id','discussCommentFormHide');
          $('#sidebarDiscussCommentMenuHide').attr('id','sidebarDiscussCommentMenu');
          $('#noDiscussContainerHide').attr('id','noDiscussContainerShow');
        })
        .catch(function (error) {
            $(document).ready(function() {
                $('#notification').attr('id','notificationShow').hide().slideDown();

                  if (error.response.data == '[object Object]') {
                    return (
                      $(document).ready(function() {
                        $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                        $('#notificationContent').html('Please <span id="blue">login </span>to ask a question');
                      })
                    );
                  }  else if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
                }
            });
        });
      }
    }
    postAnswer() {
      //Read field items into component state
      var self = this;
      self.refs.btn.setAttribute("disabled", "disabled");
      this.state.question = document.getElementById('questionTextArea').value
      if (document.getElementById('checkmark1DiscussCommentActive')) {
        this.state.type = '5' 
      } else {
        this.state.type = '4' 
      }
    
      //if User is on a solution post with type 1
      //solutionID will be available in props
      // REDO THIS, IT DOESN'T MAKE SENSE
      if(this.props.params.solutionID){
        axios.post( Config.API + '/auth/comments/create', {
          type:'1',
          typeID: this.props.params.solutionID,
          username: this.state.userName,
          description : this.state.question,
          parentTitle: this.props.parentTitle,
          private: this.state.private,
          parentID: this.props.params.probID,
          parentType: '5',
      })
        .then(function (result) {
          // document.location = window.location.pathname 
          document.getElementById("questionForm").reset();
          self.refs.btn.removeAttribute("disabled");
          $('#discussCommentForm').attr('id','discussCommentFormHide');
          $('#sidebarDiscussCommentMenuHide').attr('id','sidebarDiscussCommentMenu');
          $('#noDiscussContainerHide').attr('id','noDiscussContainerShow');
        })
          .catch(function (error) {
              $(document).ready(function() {
                  $('#notification').attr('id','notificationShow').hide().slideDown();
    
                    if (error.response.data == '[object Object]') {
                      return (
                        $(document).ready(function() {
                          $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                          $('#notificationContent').html('Please <span id="blue">login </span>to ask a question');
                        })
                      );
                    }  else if (error.response.data != '') {
                  $('#notificationContent').text(error.response.data);
                  }
              });
              self.refs.btn.removeAttribute("disabled");
          });
        }

    //else post to problem
    //probID will be used
    else {

      axios.post( Config.API + '/auth/comments/create', {
        type: this.state.type,
        typeID: this.props.params.probID,
        username: this.state.userName,
        description : this.state.question,
        parentID: this.props.params.discussID,
        parentTitle : this.props.parentTitle,
        private: this.state.private,
        parentType: '5',
        backupParentID: '0',

    })
      .then(function (result) {
        document.getElementById("questionForm").reset();
        self.refs.btn.removeAttribute("disabled");
        $('#discussCommentForm').attr('id','discussCommentFormHide');
        $('#sidebarDiscussCommentMenuHide').attr('id','sidebarDiscussCommentMenu');
        $('#noDiscussContainerHide').attr('id','noDiscussContainerShow');
      })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to ask a question');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
          self.refs.btn.removeAttribute("disabled");
      });
    }

  }

  radioChangeAnswer() {
      $('#checkmark1DiscussCommentActive').attr('id','checkmark1DiscussComment');
      $('#checkmark2DiscussComment').attr('id','checkmark2DiscussCommentActive');
      $('#checkmark3DiscussCommentActive').attr('id','checkmark3DiscussComment');
      $('#questionTextArea').attr("placeholder", "Give an answer to this question. ");
  }
  radioChangeComment() {
      $('#checkmark1DiscussComment').attr('id','checkmark1DiscussCommentActive');
      $('#checkmark2DiscussCommentActive').attr('id','checkmark2DiscussComment');
      $('#checkmark3DiscussCommentActive').attr('id','checkmark3DiscussComment');
      $('#questionTextArea').attr("placeholder", "Add a comment. ");
  }
  radioChangePro() {
      $('#checkmark1DiscussCommentActive').attr('id','checkmark1DiscussComment');
      $('#checkmark2DiscussComment').attr('id','checkmark2DiscussCommentActive');
      $('#checkmark3DiscussCommentActive').attr('id','checkmark3DiscussComment');
      $('#questionTextArea').attr("placeholder", "Provide a pro in this pro-con analysis. ");
  }
  radioChangeCon() {
      $('#checkmark1DiscussCommentActive').attr('id','checkmark1DiscussComment');
      $('#checkmark2DiscussCommentActive').attr('id','checkmark2DiscussComment');
      $('#checkmark3DiscussComment').attr('id','checkmark3DiscussCommentActive');
      $('#questionTextArea').attr("placeholder", "Provide a con in this pro-con analysis. ");
  }


  showDiscussCommentForm() {
      $(document).ready(function() {
          $('#discussCommentFormHide').attr('id','discussCommentForm');
          $('#sidebarDiscussCommentMenu').attr('id','sidebarDiscussCommentMenuHide');
          $('#noDiscussContainerShow').attr('id','noDiscussContainerHide');
      });
      if (this.props.currentType === 'answer') {
        this.radioChangeAnswer()
      } else if (this.props.currentType === 'comment') {
        this.radioChangeComment()
      } else if (this.props.currentType === 'answerCom') {
        this.radioChangeAnswer()
      } else if (this.props.currentType === 'pro') {
        this.radioChangePro()
      } else if (this.props.currentType === 'con') {
        this.radioChangeCon()
      } else if (this.props.currentType === 'procon') {
        this.radioChangePro()
      } else if (this.props.currentType === 'proconcom') {
        this.radioChangeComment()
      } else {
        // this.radioChangeProConCom()
      }
  }
  hideDiscussCommentForm() {
        $('#discussCommentForm').attr('id','discussCommentFormHide');
        $('#sidebarDiscussCommentMenuHide').attr('id','sidebarDiscussCommentMenu');
        $('#noDiscussContainerHide').attr('id','noDiscussContainerShow');
  }


   render() {
        
    if (this.props.parentType == 'Question') {
      return (
        <div id="discussCommentFormContainer">
          <div id="noDiscussContainerShow">
            <div id="noDiscussPromptFlare"><br /></div>
            <div id="noDiscussPrompt" onClick={this.showDiscussCommentForm}>
                <span id="blue">{this.state.prompt1} </span>{this.state.prompt3} <span id="blue">{this.state.prompt4} </span>{this.state.prompt2}
            </div>
          </div>
          <div id="discussCommentFormHide">
            <div id="discussCommentFormHideButton" onClick={this.hideDiscussCommentForm}>
              <img src={require('../../assets/redX2.svg')} id="projectModuleClose2" width="22" height="22" alt="Project Tree Button, white tree" />
            </div>
            <div id="projectFormRadioContainer">
              <div id="projectFormRadioColumn">
                <div id={this.state.radio2} onClick={this.radioChangeAnswer}></div>
                <div id="projectFormRadioRow2">
                  answer
                </div>    
              </div>
              <div id="projectFormRadioColumn" onClick={this.radioChangeComment}>
                <div id={this.state.radio1}></div>
                <div id="projectFormRadioRow1">
                  comment
                </div>     
              </div>
            </div>
          


            <div id="questionFormComponent">
              <form id="questionForm">
                <fieldset id='fieldSetNoBorderPadding'>
                  <textarea name="questionText" required="required" id="questionTextArea" placeholder={this.state.placeholder} ></textarea>
                  <Link to={window.location.pathname}>
                    <input type="button" ref='btn' value="add" onClick={this.postAnswer} id="askQuestion"/>
                  </Link>
                </fieldset>
              </form>
            </div>
        </div>
      </div>
      );
    } else {
    return (
          <div id="discussCommentFormContainer">
            <div id="noDiscussContainerShow">
              <div id="noDiscussPromptFlare"><br /></div>
              <div id="noDiscussPrompt" onClick={this.showDiscussCommentForm}>
                  <span id="blue">{this.state.prompt1} </span>{this.state.prompt3} <span id="blue">{this.state.prompt4} </span>{this.state.prompt2}
              </div>
            </div>
            <div id="discussCommentFormHide">
              <div id="discussCommentFormHideButton" onClick={this.hideDiscussCommentForm}>
                <img src={require('../../assets/redX2.svg')} id="projectModuleClose2" width="22" height="22" alt="Project Tree Button, white tree" />
              </div>
              <div id="projectFormRadioContainer">
                <div id="projectFormRadioColumn">
                  <div id={this.state.radio1} onClick={this.radioChangeComment}></div>
                  <div id="projectFormRadioRow1">
                    comment
                  </div>    
                </div>
                <div id="projectFormRadioColumn" onClick={this.radioChangePro}>
                  <div id={this.state.radio2}></div>
                  <div id="projectFormRadioRow2">
                    pro
                  </div>
                  
                </div>
                <div id="projectFormRadioColumn" onClick={this.radioChangeCon}>
                  <div id={this.state.radio3}></div>
                  <div id="projectFormRadioRow3">
                    con
                  </div>     
                </div>
              </div>
            


              <div id="questionFormComponent">
                <form id="questionForm">
                  <fieldset id='fieldSetNoBorderPadding'>
                    <textarea name="questionText" required="required" id="questionTextArea" placeholder={this.state.placeholder} ></textarea>
                    <Link to={window.location.pathname} onClick={this.postComment}>
                      <input type="button" ref='btn' value="add" id="askQuestion"/>
                    </Link>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>

        );
      }
   }
}