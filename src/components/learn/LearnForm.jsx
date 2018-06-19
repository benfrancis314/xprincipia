import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link } from 'react-router';

export default class LearnResourcesForm extends React.Component {
  constructor(props){
      super(props);

      this.state = {
        title: '',
        url: '',  
        description: '',
        private: '',
        type: '',
        placeholder: '',
        prompt1: '',
        prompt2: '',
        prompt3: '',
        prompt4: '',
        radio1: '',
        radio2: '',
        userName: '',
      }
      
      this.postLearn = this.postLearn.bind(this);
      // this.checkLoginLearn = this.checkLoginLearn.bind(this);
      this.showLearnForm = this.showLearnForm.bind(this);
      this.hideLearnForm = this.hideLearnForm.bind(this);
      this.radioChangeEducational = this.radioChangeEducational.bind(this);
      this.radioChangeResearch = this.radioChangeResearch.bind(this);
  };

componentDidMount(){
  var self = this;
  if (window.location.pathname.includes('private')) {
      self.setState({
          private: '1',
      })
  } else {
      self.setState({
          private: '0',
      })
  }
  if (this.props.currentType === 'educational') {
    self.setState({
      prompt1: "add",
      prompt2: "educational",
      prompt5: "resource",
      radio1: 'checkmark1DiscussActive',
      radio2: 'checkmark2Discuss',
      placeholder: 'Add a resource allowing others to learn more about this project. ',
    })
  } else if (this.props.currentType === 'suggestion') {
    self.setState({
      prompt1: "add",
      prompt2: "research",
      prompt5: "material",
      radio1: 'checkmark1Discuss',
      radio2: 'checkmark2DiscussActive',
      placeholder: 'Add a work of research to allow others to learn the current state of this project. ',
    })
  } else {
    self.setState({
      prompt1: "add",
      prompt2: "educational",
      prompt5: "resource",
      radio1: 'checkmark1DiscussActive',
      radio2: 'checkmark2Discuss',
      placeholder: 'Add a resource allowing others to learn more about this project. ',
    })
  }
  if (this.props.learnItems === undefined || this.props.learnItems.length == 0) {
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
componentDidReceiveProps(nextProps){
  var self = this;
  if (window.location.pathname.includes('private')) {
      self.setState({
          private: '1',
      })
  } else {
      self.setState({
          private: '0',
      })
  }
  if (nextProps.currentType === 'educational') {
    self.setState({
      prompt1: "add",
      prompt2: "educational",
      prompt5: "resource",
      radio1: 'checkmark1DiscussActive',
      radio2: 'checkmark2Discuss',
      placeholder: 'Add a resource allowing others to learn more about this project. ',
    })
  } else if (nextProps.currentType === 'suggestion') {
    self.setState({
      prompt1: "add",
      prompt2: "research",
      prompt5: "material",
      radio1: 'checkmark1Discuss',
      radio2: 'checkmark2DiscussActive',
      placeholder: 'Add a work of research to allow others to learn the current state of this project. ',
    })
  } else {
    self.setState({
      prompt1: "add",
      prompt2: "educational",
      prompt5: "resource",
      radio1: 'checkmark1DiscussActive',
      radio2: 'checkmark2Discuss',
      placeholder: 'Add a resource allowing others to learn more about this project. ',
    })
  }
  if (nextProps.learnItems === undefined || nextProps.learnItems.length == 0) {
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

// checkLoginLearn() {
//   if (cookie.load('userName')) {
//     this.postLearn()
//   } else {
//     $(document).ready(function() {
//       $('#notification').attr('id','notificationShow').hide().slideDown();
//       $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//       $('#notificationContent').html('please <span id="blue">login </span>to contribute to the learn section');
//     });
//   }
// }

postLearn() {
  //Read field items into component state
  var self = this;
  self.refs.btn.setAttribute("disabled", "disabled");
  this.state.title = document.getElementById('resourceTitleForm').value
  this.state.url = document.getElementById('resourceURLForm').value
  this.state.description = document.getElementById('resourcesTextArea').value
  if (document.getElementById('checkmark2DiscussActive')) {
    this.state.type = '8' 
  } else {
    this.state.type = '7' 
  }

      axios.post( Config.API + '/auth/learnItems/create', {
        type: this.state.type,
        typeID: this.props.params.probID,
        username: this.state.userName,
        title: this.state.title,
        url: this.state.url,
        description : this.state.description,
        parentTitle: this.props.parentTitle,
        private: this.state.private,
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
                      $('#notificationContent').html('Please <span id="blue">login </span>to add a learning resource');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
          self.refs.btn.removeAttribute("disabled");
      });
    }

    radioChangeEducational() {
      // $(document).ready(function() {
        $('#checkmark1Discuss').attr('id','checkmark1DiscussActive');
        $('#checkmark2DiscussActive').attr('id','checkmark2Discuss');
        $('#resourcesTextArea').attr("placeholder", "Add a resource allowing others to learn more about this project. ");
      // });
    }
    radioChangeResearch() {
      // $(document).ready(function() {
        $('#checkmark1DiscussActive').attr('id','checkmark1Discuss');
        $('#checkmark2Discuss').attr('id','checkmark2DiscussActive');
        $('#resourcesTextArea').attr("placeholder", "Add a work of research to allow others to learn the current state of this project. ");
      // });
    }
  
    showLearnForm() {
        $(document).ready(function() {
            $('#discussFormHide').attr('id','discussForm');
            $('#sidebarDiscussMenu').attr('id','sidebarDiscussMenuHide');
            $('#noDiscussContainerShow').attr('id','noDiscussContainerHide');
        });
        // this.state.newDiscussClickFunction
        // console.log(this.state.newDiscussClickFunction)
  
        if (this.props.currentType === 'educational') {
          this.radioChangeEducational()
        } else if (this.props.currentType === 'research') {
          this.radioChangeResearch()
        } else {
          this.radioChangeEducational()
        }
    }
    hideLearnForm() {
        // $(document).ready(function() {
          $('#discussForm').attr('id','discussFormHide');
          $('#sidebarDiscussMenuHide').attr('id','sidebarDiscussMenu');
          $('#noDiscussContainerHide').attr('id','noDiscussContainerShow');
          $('#checkmark1DiscussActive').attr('id','checkmark1Discuss');
          $('#checkmark2DiscussActive').attr('id','checkmark2Discuss');
        // });
    }

   render() {
     if (this.props.learnItems === undefined || this.props.learnItems.length == 0) {
           return (
            <div id="discussFormContainer">
              <div id="noDiscussContainerShow">
                  <div id="noDiscussPromptFlare"><br /></div>
                  <div id="noLearnPrompt" onClick={this.showLearnForm}>
                      <span id="blue">{this.state.prompt1} </span>{this.state.prompt3} <span id="blue">{this.state.prompt4} <br /></span><span id="blue">{this.state.prompt2} </span>{this.state.prompt5}
                  </div>
              </div>
              <div id="discussFormHide">
                <div id="discussFormHideButton" onClick={this.hideLearnForm}>
                  <img src={require('../../assets/redX2.svg')} id="projectModuleClose2" width="22" height="22" alt="Project Tree Button, white tree" />
                </div>
                <div id="projectFormRadioContainer">
                  <div id="projectFormRadioColumn">
                    <div id={this.state.radio1} onClick={this.radioChangeEducational}></div>
                    <div id="projectFormRadioRow1">
                      educational
                    </div>    
                  </div>
                  <div id="projectFormRadioColumn" onClick={this.radioChangeResearch}>
                    <div id={this.state.radio2}></div>
                    <div id="projectFormRadioRow2">
                      research
                    </div>
                  </div>
                </div>


              <div id="suggestionFormComponent">
                  <form id="questionForm">
                      <fieldset id='fieldSetNoBorderPadding'>
                          {/*<legend>Add a Resource</legend>*/}
                              <input type="text" placeholder="title" id="resourceTitleForm"/>
                              <input type="text" placeholder="url | optional" id="resourceURLForm"/>
                              <textarea name="suggestionText" required="required" id="resourcesTextArea" placeholder="Please provide any additional information you'd like. " ></textarea>
                              {/* OLD Placeholder: "Please describe the resource or explain its purpose. " */}
                              <Link to={window.location.pathname} onClick={this.postLearn}>
                                <input type="button" ref='btn' value="add" id="addSuggestion"/>
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
