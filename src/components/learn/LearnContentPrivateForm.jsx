import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class LearnContentForm extends React.Component {
constructor(props){
        super(props);

        this.state = {
            title: '',
            summary: '',
            description: '',
        }
            this.postLearnItem = this.postLearnItem.bind(this);
        
    };
    postLearnItem() {
      var self = this;
      self.refs.btn.setAttribute("disabled", "disabled");
  //Read field items into component state
      this.state.title = document.getElementById('lessonTitleForm').value
      this.state.summary = document.getElementById('learnContentSummary').value
      this.state.description = document.getElementById('learnContentTextArea').value


  //if User is on a solution post with type 1
  //solutionID will be available in props
  if (this.props.params.solutionID) {
      axios.post( Config.API + '/auth/learnItems/create', {
        type:'1',
        typeID: this.props.params.solutionID,
        username: cookie.load('userName'),
        title: this.state.title,
        summary: this.state.summary,
        description : this.state.description,
        parentTitle: this.props.parentTitle,
        private: '1',
    })
      .then(function (result) {
        document.getElementById("suggestionForm").reset();
        self.refs.btn.removeAttribute("disabled");
      })
      .catch(function (error) {
        alert('error')
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to add a suggestion');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
      });

    //else post to problem
    //probID will be used
  } else {
      axios.post( Config.API + '/auth/learnItems/create', {
        type:'0',
        typeID: this.props.params.probID,
        username: cookie.load('userName'),
        title: this.state.title,
        summary: this.state.summary,
        description : this.state.description,
        parentTitle: this.props.parentTitle,
        private: '1',
    })
      .then(function (result) {
        document.getElementById("suggestionForm").reset();
        self.refs.btn.removeAttribute("disabled");
      })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to create a lesson');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
      });
    }
    }

   render() {
           return (
        <div>
          <div id="discussMenuEnd">
            Lessons
          </div>
          <Link to={`/project/private/${this.props.params.probID}/learn/content`}>
                <img src={require('../../assets/redX.svg')} id="closeRedXNoMargin" width="30" height="30" alt="Close button, red X symbol" />
          </Link>
          <div id="suggestionFormComponent">
              <form id="suggestionForm">
                  <fieldset id='fieldSetNoBorderPadding'>
                    {/* <label htmlFor="problemTitleForm" id="problemTitleFormLabel">lesson title<br /> */}
                      <input type="text" name="problemTitle" placeholder="LESSON TITLE" required="required" maxLength="70" id="lessonTitleForm" />
                    {/* </label><br /> */}

                    <label htmlFor="problemTitleForm" id="problemTitleFormLabel">overview<br />
                    <textarea name="suggestionText" required="required" id="learnContentSummary" 
                    placeholder="Give an overview of your lesson." ></textarea>
                    </label><br />

                    <label htmlFor="problemTitleForm" id="problemTitleFormLabel">overview<br />
                    <textarea name="suggestionText" required="required" id="learnContentTextArea" 
                    placeholder="Create a lesson to help others understand this project, promoting future advancement." ></textarea>
                    </label><br />
                    <Link to={`/project/private/${this.props.params.probID}/learn/content`}>
                      <input type="button" ref='btn' value="Create" onClick={this.postLearnItem} id="addSuggestion"/>
                    </Link>
                  </fieldset>
              </form>
          </div>
        </div>
      );
    }  
}
