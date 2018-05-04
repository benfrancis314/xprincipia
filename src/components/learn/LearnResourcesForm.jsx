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
        summary: '',  
        resource: '',
        private: '',
        type: '',
      }
      
      this.postResource = this.postResource.bind(this);
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

    postResource() {
  //Read field items into component state
  var self = this;
  self.refs.btn.setAttribute("disabled", "disabled");
  this.state.title = document.getElementById('resourceTitleForm').value
  this.state.summary = document.getElementById('resourcesTextArea').value
  this.state.resource = document.getElementById('resourceURLForm').value
  this.state.question = document.getElementById('questionTextArea').value
  if (document.getElementById('projectClass2').checked) {
    this.state.type = '8' 
  } else {
    this.state.type = '7' 
  }

      axios.post( Config.API + '/auth/resources/create', {
        type: this.state.type,
        typeID: this.props.params.probID,
        username: cookie.load('userName'),
        title: this.state.title,
        summary: this.state.summary,
        description : this.state.resource,
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
      });
    }

    componentDidMount(){
        var self = this;
            return axios.get( Config.API + '/resources/typeID?id='+this.props.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    resources: response.data
                })
            }) 
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
                              <input type="text" placeholder="url (optional)" id="resourceURLForm"/>
                              <textarea name="suggestionText" required="required" id="resourcesTextArea" placeholder="Please provide any additional information you'd like. " ></textarea>
                              {/* OLD Placeholder: "Please describe the resource or explain its purpose. " */}
                              <Link to={`/project/${this.props.params.probID}/learn/resources`}>
                                <input type="button" ref='btn' value="Add" onClick={this.postResource} id="addSuggestion"/>
                              </Link>
                      </fieldset>
                  </form>
              </div>
            </div>
      );
    }  
}
