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
      }
      
      this.postLearn = this.postLearn.bind(this);
      this.checkLoginLearn = this.checkLoginLearn.bind(this);

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
}

checkLoginLearn() {
  if (cookie.load('userName')) {
    this.postLearn()
  } else {
    $(document).ready(function() {
      $('#notification').attr('id','notificationShow').hide().slideDown();
      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
      $('#notificationContent').html('please <span id="blue">login </span>to contribute to the learn section');
    });
  }
}

postLearn() {
  //Read field items into component state
  var self = this;
  self.refs.btn.setAttribute("disabled", "disabled");
  this.state.title = document.getElementById('resourceTitleForm').value
  this.state.url = document.getElementById('resourceURLForm').value
  this.state.description = document.getElementById('resourcesTextArea').value
  if (document.getElementById('projectClass1').checked) {
    this.state.type = '8' 
  } else {
    this.state.type = '7' 
  }

      axios.post( Config.API + '/auth/learnItems/create', {
        type: this.state.type,
        typeID: this.props.params.probID,
        username: cookie.load('userName'),
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

   render() {
           return (
            <div id="discussFormContainer">
              <div id="projectFormRadioContainer">
                <div id="projectFormRadioColumn">
                  <div id="projectFormRadioRow1">
                    educational<span id="grayLessSpacing"> | default</span>
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
                    research
                  </div>
                  <div id="projectFormRadioRow">
                    <label id="projectRadioButtonContainer">
                      <input type="radio" id="projectClass1" name="projectType" value="1" />
                      <span id="checkmark2"></span>
                    </label>
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
                              <Link to={window.location.pathname}>
                                <input type="button" ref='btn' value="add" onClick={this.checkLoginLearn} id="addSuggestion"/>
                              </Link>
                      </fieldset>
                  </form>
              </div>
            </div>
      );
    }  
}
