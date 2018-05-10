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
  }

    this.postComment = this.postComment.bind(this);
    this.postAnswer = this.postAnswer.bind(this);
  };
componentDidMount() {
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
    if (self.props.parentType == 'Question') {
      self.setState({
        placeholder: "Answer this question or respond with a comment. ",
      })
    }
    else if (self.props.params.solutionID) {
      self.setState({
        placeholder: "Respond with a comment or contribute to the pro/con analysis for this proposal. ",
      })
    } else {
      self.setState({
        placeholder: "Respond with a comment or contribute to the pro/con analysis for this project. ",
      })
    }
}
componentWillReceiveProps(nextProps) {
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
    if (self.props.parentType == 'Question') {
      self.setState({
        placeholder: "Answer this question or respond with a comment. ",
      })
    }
    else if (self.props.params.solutionID) {
      self.setState({
        placeholder: "Respond with a comment or contribute to the pro/con analysis for this proposal. ",
      })
    } else {
      self.setState({
        placeholder: "Respond with a comment or contribute to the pro/con analysis for this project. ",
      })
    }
}

postComment() {
  //Read field items into component state
  var self = this;
  self.refs.btn.setAttribute("disabled", "disabled");
  this.state.question = document.getElementById('questionTextArea').value
  if (document.getElementById('projectClass2').checked) {
      this.state.type = '10' 
    } else if (document.getElementById('projectClass1').checked) {
      this.state.type = '9' 
    } else {
      this.state.type = '5' 
    }

  if(this.props.params.solutionID){
    axios.post( Config.API + '/auth/comments/create', {
      type: this.state.type,
      typeID: this.props.params.probID,
      username: cookie.load('userName'),
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
        username: cookie.load('userName'),
        description : this.state.question,
        parentID: this.props.params.discussID,
        parentTitle : this.props.parentTitle,
        private: this.state.private,
        parentType: '5',
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
      if (document.getElementById('projectClass0').checked) {
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
          username: cookie.load('userName'),
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
        username: cookie.load('userName'),
        description : this.state.question,
        parentID: this.props.params.discussID,
        parentTitle : this.props.parentTitle,
        private: this.state.private,
        parentType: '5',

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




   render() {
        
    if (this.props.parentType == 'Question') {
      return (
        <div id="discussFormContainer">

        <div id="projectFormRadioContainer">
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow2">
              answer<span id="grayLessSpacing"> | default</span>
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="projectClass1" name="projectType" value="1" />
                <span id="checkmark2"></span>
              </label>
            </div>
          </div>
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow1">
              comment
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="projectClass0" name="projectType" value="0"/>
                <span id="checkmark1"></span>
              </label>
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
      );
    } else {
    return (
          <div id="discussFormContainer">

            <div id="projectFormRadioContainer">
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow1">
                  comment<span id="grayLessSpacing"> | default</span>
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="projectClass0" name="projectType" value="0"/>
                    <span id="checkmark1"></span>
                  </label>
                </div>
              </div>
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow2">
                  pro
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="projectClass1" name="projectType" value="1" />
                    <span id="checkmark2"></span>
                  </label>
                </div>
              </div>
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow3">
                  con
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="projectClass2" name="projectType" value="2" />
                    <span id="checkmark3"></span>
                  </label>
                </div>
              </div>
            </div>


            <div id="questionFormComponent">
              <form id="questionForm">
                <fieldset id='fieldSetNoBorderPadding'>
                  <textarea name="questionText" required="required" id="questionTextArea" placeholder={this.state.placeholder} ></textarea>
                  <Link to={window.location.pathname}>
                    <input type="button" ref='btn' value="add" onClick={this.postComment} id="askQuestion"/>
                  </Link>
                </fieldset>
              </form>
            </div>
          </div>

        );
      }
   }
}