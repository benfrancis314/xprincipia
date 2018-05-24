import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class LearnContentFlagForm extends React.Component {

  constructor(){
    super();
    
    this.state= {
      parentType: '0',
      parentID: [],
      description: '',
      reason: '',
      submitUser: '',
      flagUser: '',
      linkPath: '',
    }

    this.flagLearn = this.flagLearn.bind(this);
  };
  componentDidMount(){
    var self = this;
    if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
        })
    } else {
        self.setState({
            linkPath: '/project/',
        })
    }
  }
  componentWillReceiveProps(){
    var self = this;
    if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
        })
    } else {
        self.setState({
            linkPath: '/project/',
        })
    }
  }

  flagLearn() {
  //Read field items into component state
  this.state.description = document.getElementById('questionTextArea').value
  if (document.getElementById('flagReason3').checked) {
    this.state.reason = '3'  
  } else if (document.getElementById('flagReason2').checked) {
    this.state.reason = '2' 
  } else if (document.getElementById('flagReason1').checked) {
    this.state.reason = '1' 
  } else {
    this.state.reason = '0' 
  }

  var self = this;
  axios.post( Config.API + '/auth/flags/create', {
    parentType: '7',
    parentID: this.props.params.learnItemID,
    submitUser: cookie.load('userName'),
    // flagUser: this.props.creator,
    reason: this.state.reason,
    description : this.state.description,
  })
  .then(function (result) {
    document.location = self.state.linkPath + self.props.params.probID + '/learn'
  })
    .catch(function (error) {
      console.log(error.response.data)
        $(document).ready(function() {
            $('#notification').attr('id','notificationShow').hide().slideDown();
            if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
            }
            else if (error.response.data == '[object Object]') {
              return (
                $(document).ready(function() {
                  $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                  $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                })
              );
            } 
        });
    });

}
  



   render() {
      return (
        <div id="flagContainer">
          <div>
          <div id="flagHeader">
            flag reasoning
          </div>

          <div id="projectFormRadioContainer">
            <div id="projectFormRadioColumn">
              <div id="projectFormRadioRow3">
                misplaced
                 {/* <span id="gray"> | default</span> */}
              </div>
              <div id="projectFormRadioRow">
                <label id="projectRadioButtonContainer">
                  <input type="radio" id="flagReason1" name="flagType" value="1"/>
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
                  <input type="radio" id="flagReason2" name="flagType" value="2" />
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
                  <input type="radio" id="flagReason3" name="flagType" value="3" />
                  <span id="checkmark3"></span>
                </label>
              </div>
            </div>
          </div>

          <form id="flagForm">
            <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" autoFocus ></textarea>
            <div id="discussFormButtonContainer">
                <Link to={this.state.linkPath+this.props.params.probID+'/learn'}>
                    <div id="returnButton">exit</div>
                </Link>
                <Link>
                    <div onClick={this.flagLearn} id="flagButton">submit</div>
                </Link>
            </div>
          </form>
          </div>
        </div>

      );
   }
}