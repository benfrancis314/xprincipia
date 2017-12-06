import React from 'react';
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
      description : this.state.learnItem,
      parentTitle: this.props.parentTitle,
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
      description : this.state.learnItem,
      parentTitle: this.props.parentTitle,
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
            notes
          </div>
            <div id="suggestionFormComponent">
                <form id="suggestionForm">
                    <fieldset id='fieldSetNoBorderPadding'>
                        {/*<legend>Create a Lesson</legend>*/}
                            <textarea name="suggestionText" required="required" id="learnContentTextArea" 
                            placeholder="Create new notes for your project" ></textarea>
                            <input type="button" value="Create" onClick={this.postLearnItem} id="addSuggestion"/>
                    </fieldset>
                </form>
            </div>
        </div>
      );
    }  
}
