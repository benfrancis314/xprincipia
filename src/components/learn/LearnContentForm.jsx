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
            learnItem: []
        }
            this.postLearnItem = this.postLearnItem.bind(this);
        
    };
    postLearnItem() {
  //Read field items into component state
      this.state.learnItem = document.getElementById('learnContentTextArea').value


  //if User is on a solution post with type 1
  //solutionID will be available in props
  if (this.props.params.solutionID) {
      axios.post( Config.API + '/auth/learnItems/create', {
      type:'1',
      typeID: this.props.params.solutionID,
      username: cookie.load('userName'),
      description : this.state.learnItem
    })
      .then(function (result) {
        document.location = window.location.pathname 
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
      description : this.state.learnItem
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
          <Link to={`/project/${this.props.params.probID}/learn/content`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
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

                            <input type="button" value="Create" onClick={this.postLearnItem} id="addSuggestion"/>
                    </fieldset>
                </form>
            </div>
        </div>
      );
    }  
}
