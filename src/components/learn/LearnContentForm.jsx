import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import SideBarMore from '../SideBarMore.jsx';
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
      axios.post( Config.API + '/auth/learnItems/create', {
      type:'0',
      typeID: this.props.params.probID,
      username: cookie.load('userName'),
      description : this.state.learnItem,
    })
      .then(function (result) {
        document.location = window.location.pathname 
      })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              $('#notificationContent').text(error.response.data);
              // alert( "Please login to add content. ");
              if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
                  })
                );
              }
          });
      });
    }

   render() {
           return (
        <div>
            <div id="suggestionFormComponent">
                <form id="suggestionForm">
                    <fieldset id='fieldSetNoBorderPadding'>
                        {/*<legend>Create a Lesson</legend>*/}
                            <textarea name="suggestionText" required="required" id="learnContentTextArea" 
                            placeholder="Create a lesson to help others understand this project, promoting future advancement." autoFocus ></textarea>
                            <input type="button" value="Create" onClick={this.postLearnItem} id="addSuggestion"/>
                    </fieldset>
                </form>
            </div>
        </div>
      );
    }  
}
