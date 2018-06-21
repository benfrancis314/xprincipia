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
    radio1: '',
    radio2: '',
    radio3: '',
    userName: '',
  }

    this.postDiscuss = this.postDiscuss.bind(this);
    // USE IF AUTH SYSTEM DOESN'T WORK
    // this.checkLoginDiscuss = this.checkLoginDiscuss.bind(this);
    this.showDiscussForm = this.showDiscussForm.bind(this);
    this.hideDiscussForm = this.hideDiscussForm.bind(this);
    this.radioChangeQuestion = this.radioChangeQuestion.bind(this);
    this.radioChangeSuggestion = this.radioChangeSuggestion.bind(this);
    this.radioChangeDebate = this.radioChangeDebate.bind(this);
  };
componentDidMount(){
    var self = this;
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
        placeholder: "Ask a question, give a suggestion, or start a debate about this proposal. ",
      })
    } else if (this.props.currentType === 'question') {
      self.setState({
        prompt1: "ask",
        prompt2: "question",
        radio1: 'checkmark1DiscussActive',
        radio2: 'checkmark2Discuss',
        radio3: 'checkmark3Discuss',
        placeholder: 'Ask a question you have about this project. ',
      })
    } else if (this.props.currentType === 'suggestion') {
      self.setState({
        prompt1: "add",
        prompt2: "suggestion",
        radio1: 'checkmark1Discuss',
        radio2: 'checkmark2DiscussActive',
        radio3: 'checkmark3Discuss',
        placeholder: 'Give a suggestion for others to think about in the brainstorming process. ',
      })
    } else if (this.props.currentType === 'debate') {
      self.setState({
        prompt1: "start",
        prompt2: "debate",
        radio1: 'checkmark1Discuss',
        radio2: 'checkmark2Discuss',
        radio3: 'checkmark3DiscussActive',
        placeholder: 'Start a debate you think would be positively constructive to this project. ',
      })
    } else {
      self.setState({
        prompt1: "start",
        prompt2: "discussion",
        radio1: 'checkmark1DiscussActive',
        radio2: 'checkmark2Discuss',
        radio3: 'checkmark3Discuss',
        placeholder: 'Ask a question you have about this project. ',
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
componentWillReceiveProps(nextProps){
  var self = this;
  if (window.location.pathname.includes('private')) {
      self.setState({
          private: '1',
      })
  }   else {
      self.setState({
          private: '0',
      })
  }
  if (nextProps.params.solutionID) {
    self.setState({
      placeholder: "Ask a question, give a suggestion, or start a debate about this proposal. ",
      prompt1: "start",
      prompt2: "discussion",
      radio1: 'checkmark1DiscussActive',
      radio2: 'checkmark2Discuss',
      radio3: 'checkmark3Discuss',
    })
  } else if (nextProps.currentType === 'question') {
    self.setState({
      prompt1: "ask",
      prompt2: "question",
      radio1: 'checkmark1DiscussActive',
      radio2: 'checkmark2Discuss',
      radio3: 'checkmark3Discuss',
      placeholder: 'Ask a question you have about this project. ',
    })
  } else if (nextProps.currentType === 'suggestion') {
    self.setState({
      prompt1: "add",
      prompt2: "suggestion",
      radio1: 'checkmark1Discuss',
      radio2: 'checkmark2DiscussActive',
      radio3: 'checkmark3Discuss',
      placeholder: 'Give a suggestion for others to think about in the brainstorming process. ',
    })
  } else if (nextProps.currentType === 'debate') {
    self.setState({
      prompt1: "start",
      prompt2: "debate",
      radio1: 'checkmark1Discuss',
      radio2: 'checkmark2Discuss',
      radio3: 'checkmark3DiscussActive',
      placeholder: 'Start a debate you think would be positively constructive to this project. ',
    })
  } else {
    self.setState({
      prompt1: "start",
      prompt2: "discussion",
      radio1: 'checkmark1DiscussActive',
      radio2: 'checkmark2Discuss',
      radio3: 'checkmark3Discuss',
      placeholder: 'Ask a question you have about this project. ',
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
// checkLoginDiscuss() {
//   if (cookie.load('userName')) {
//     this.postDiscuss()
//   } else {
//     $(document).ready(function() {
//       $('#notification').attr('id','notificationShow').hide().slideDown();
//       $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//       $('#notificationContent').html('please <span id="blue">login </span>to join this discussion');
//     });
//   }
// }

postDiscuss() {
  //Read field items into component state
  var self = this;
  self.refs.btn.setAttribute("disabled", "disabled");
  this.state.question = document.getElementById('questionTextArea').value
  if (document.getElementById('checkmark3DiscussActive')) {
    this.state.type = '6' 
  } else if (document.getElementById('checkmark2DiscussActive')) {
    this.state.type = '3' 
  } else {
    this.state.type = '2' 
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
      parentType: '1',
  })
    .then(function (result) {
      document.getElementById("questionForm").reset();
      self.refs.btn.removeAttribute("disabled");
    })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to join this discussion');
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
        parentTitle : this.props.parentTitle,
        private: this.state.private,
        backupParentID: '0',
        parentType: '0',
    })
      .then(function (result) {
        document.getElementById("questionForm").reset();
        self.refs.btn.removeAttribute("disabled");
        $(document).ready(function() {
          $('#discussForm').attr('id','discussFormHide');
          $('#sidebarDiscussMenuHide').attr('id','sidebarDiscussMenu');
          $('#noDiscussContainerHide').attr('id','noDiscussContainerShow');
          $('#checkmark1DiscussActive').attr('id','checkmark1Discuss');
          $('#checkmark2DiscussActive').attr('id','checkmark2Discuss');
          $('#checkmark3DiscussActive').attr('id','checkmark3Discuss');
        });
      })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('please <span id="blue">login </span>to join this discussion');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
      });
    }

  }
  radioChangeQuestion() {
    // $(document).ready(function() {
      $('#checkmark1Discuss').attr('id','checkmark1DiscussActive');
      $('#checkmark2DiscussActive').attr('id','checkmark2Discuss');
      $('#checkmark3DiscussActive').attr('id','checkmark3Discuss');
      $('#questionTextArea').attr("placeholder", "Ask a question you have about this project. ");
    // });
  }
  radioChangeSuggestion() {
    // $(document).ready(function() {
      $('#checkmark1DiscussActive').attr('id','checkmark1Discuss');
      $('#checkmark2Discuss').attr('id','checkmark2DiscussActive');
      $('#checkmark3DiscussActive').attr('id','checkmark3Discuss');
      $('#questionTextArea').attr("placeholder", "Give a suggestion for others to think about in the brainstorming process. ");
    // });
  }
  radioChangeDebate() {
    // $(document).ready(function() {
      $('#checkmark1DiscussActive').attr('id','checkmark1Discuss');
      $('#checkmark2DiscussActive').attr('id','checkmark2Discuss');
      $('#checkmark3Discuss').attr('id','checkmark3DiscussActive');
      $('#questionTextArea').attr("placeholder", "Start a debate you think would be positively constructive to this project. ");
    // });
  }


  showDiscussForm() {
      $(document).ready(function() {
          $('#discussFormHide').attr('id','discussForm');
          $('#sidebarDiscussMenu').attr('id','sidebarDiscussMenuHide');
          $('#noDiscussContainerShow').attr('id','noDiscussContainerHide');
      });
      // this.state.newDiscussClickFunction
      // console.log(this.state.newDiscussClickFunction)

      if (this.props.currentType === 'question') {
        this.radioChangeQuestion()
      } else if (this.props.currentType === 'suggestion') {
        this.radioChangeSuggestion()
      } else if (this.props.currentType === 'debate') {
        this.radioChangeDebate()
      } else {
        this.radioChangeQuestion()
      }
  }
  hideDiscussForm() {
      // $(document).ready(function() {
        $('#discussForm').attr('id','discussFormHide');
        $('#sidebarDiscussMenuHide').attr('id','sidebarDiscussMenu');
        $('#noDiscussContainerHide').attr('id','noDiscussContainerShow');
        $('#checkmark1DiscussActive').attr('id','checkmark1Discuss');
        $('#checkmark2DiscussActive').attr('id','checkmark2Discuss');
        $('#checkmark3DiscussActive').attr('id','checkmark3Discuss');
      // });
  }

   render() {


    if (this.props.discuss === undefined || this.props.discuss.length == 0) {
      if (window.location.pathname.includes('proposal')) {
        var prompt3 = 'a'
        var prompt4 = 'new'
      }   else {
        var prompt3 = 'the'
        var prompt4 = 'first'
      }
      return (
        <div id="discussFormContainer">
          <div id="noDiscussContainerShow">
            <div id="noDiscussPromptFlare"><br /></div>
            <div id="noDiscussPrompt" onClick={this.showDiscussForm}>
                <span id="blue">{this.state.prompt1} </span>{prompt3} <span id="blue">{prompt4} </span>{this.state.prompt2}
            </div>
          </div>
          <div id="discussFormHide">
            <div id="discussFormHideButton" onClick={this.hideDiscussForm}>
              <img src={require('../../assets/redX2.svg')} id="projectModuleClose2" width="22" height="22" alt="Project Tree Button, white tree" />
            </div>
            <div id="projectFormRadioContainer">
              <div id="projectFormRadioColumn">
                <div id={this.state.radio1} onClick={this.radioChangeQuestion}></div>
                <div id="projectFormRadioRow1">
                  question
                </div>    
              </div>
              <div id="projectFormRadioColumn" onClick={this.radioChangeSuggestion}>
                <div id={this.state.radio2}></div>
                <div id="projectFormRadioRow2">
                  suggestion
                </div>
              </div>
              <div id="projectFormRadioColumn" onClick={this.radioChangeDebate}>
                <div id={this.state.radio3}></div>
                <div id="projectFormRadioRow3">
                  debate
                </div>     
              </div>
            </div>


            <div id="questionFormComponent">
              <form id="questionForm">
                <fieldset id='fieldSetNoBorderPadding'>
                  <textarea name="questionText" required="required" id="questionTextArea" placeholder={this.state.placeholder} ></textarea>
                  <Link to={window.location.pathname} onClick={this.postDiscuss}>
                    <input type="button" ref='btn' value="add" id="askQuestion"/>
                  </Link>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
        return (
            <div id="discussFormContainer">
              <div id="noDiscussContainerShow">
                <div id="noDiscussPromptFlare"><br /></div>
                <div id="noDiscussPrompt" onClick={this.showDiscussForm}>
                    <span id="blue">{this.state.prompt1} </span>a <span id="blue">new </span>{this.state.prompt2}
                </div>
              </div>
              <div id="discussFormHide">
                <div id="discussFormHideButton" onClick={this.hideDiscussForm}>
                  <img src={require('../../assets/redX2.svg')} id="projectModuleClose2" width="22" height="22" alt="Close discuss form" />
                </div>
                <div id="projectFormRadioContainer">
                  <div id="projectFormRadioColumn">
                    <div id={this.state.radio1} onClick={this.radioChangeQuestion}></div>
                    <div id="projectFormRadioRow1">
                      question
                    </div>    
                  </div>
                  <div id="projectFormRadioColumn" onClick={this.radioChangeSuggestion}>
                    <div id={this.state.radio2}></div>
                    <div id="projectFormRadioRow2">
                      suggestion
                    </div>
                    
                  </div>
                  <div id="projectFormRadioColumn" onClick={this.radioChangeDebate}>
                    <div id={this.state.radio3}></div>
                    <div id="projectFormRadioRow3">
                      debate
                    </div>     
                  </div>
                </div>


                <div id="questionFormComponent">
                  <form id="questionForm">
                    <fieldset id='fieldSetNoBorderPadding'>
                      <textarea name="questionText" required="required" id="questionTextArea" placeholder={this.state.placeholder} ></textarea>
                      <Link to={window.location.pathname} onClick={this.postDiscuss}>
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