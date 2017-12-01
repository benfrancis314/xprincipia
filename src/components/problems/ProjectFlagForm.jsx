import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProjectEditForm extends React.Component {

  constructor(props){
    super(props);
    
    this.state= {
      // title: '',
      // summary: '',
    }

    // this.flagProject = this.updateProject.bind(this);
  };


//  flagProject() {
//     //Read field items into component state
//     this.state.title = document.getElementById('projectEditTitleForm').value
//     this.state.summary = document.getElementById('projectEditSummaryForm').value

//   var self = this;
//     axios.post( Config.API + '/auth/feedback/create', {
//     type: 0,
//     typeID: 2,
//     username: cookie.load('userName'),
//     reason: 0,
//     description : this.state.feedback,
//     })
//     .then(function (result) {
//       document.location = '/project/'+ self.props.params.probID + '/subprojects'
//     })
      // .catch(function (error) {
      //   // console.log(error.response.data)
      //     $(document).ready(function() {
      //         $('#notification').attr('id','notificationShow').hide().slideDown();
      //         if (error.response.data != '') {
      //           $('#notificationContent').text(error.response.data);
      //         }
      //         else if (error.response.data == '[object Object]') {
      //           return (
      //             $(document).ready(function() {
      //               $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
      //               $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
      //             })
      //           );
      //         } 
      //     });
      // });
  
//   }

render() {
  return (
    <div id="flagContainer">
      {/* <Link to={`/project/${this.props.params.probID}/subprojects`}>
        <img src={require('../../assets/redX.svg')} id="exitNotebookButton" width="30" height="30" alt="Close button, red X symbol" /> 
      </Link> */}
      <div>
      <div id="flagHeader">
        flag reasoning
      </div>

      <div id="projectFormRadioContainer">
        <div id="projectFormRadioColumn">
          <div id="projectFormRadioRow3">
            misplaced
             {/* <span id="gray">(default)</span> */}
          </div>
          <div id="projectFormRadioRow">
            <label id="projectRadioButtonContainer">
              <input type="radio" name="flagType" value="0"/>
              <span id="checkmark3"></span>
            </label>
          </div>
        </div>
        <div id="projectFormRadioColumn">
          <div id="projectFormRadioRow3">
            inaccurate
          </div>
          <div id="projectFormRadioRow">
            <label id="projectRadioButtonContainer">
              <input type="radio" name="flagType" value="1" />
              <span id="checkmark3"></span>
            </label>
          </div>
        </div>
        <div id="projectFormRadioColumn">
          <div id="projectFormRadioRow3">
            bad culture
          </div>
          <div id="projectFormRadioRow">
            <label id="projectRadioButtonContainer">
              <input type="radio" name="flagType" value="2" />
              <span id="checkmark3"></span>
            </label>
          </div>
        </div>
      </div>

      <form id="flagForm">
        <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed? " 
        autoFocus ></textarea>
        <br />
        <div onClick={this.postQuestion} id="flagButton">submit</div>
        <Link to={`/project/${this.props.params.probID}/subprojects`}>
          <div id="returnButton">exit</div>
        </Link>
      </form>
      </div>
    </div>
      );
   }
}

