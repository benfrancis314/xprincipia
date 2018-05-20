import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProjectEditForm extends React.Component {

  constructor(props){
    super(props);
    
    //ProblemForm structure in backend
    this.state= {
      title: '',
      summary: '',
      linkPath: '',
    }

    this.updateProject = this.updateProject.bind(this);
  };

  componentDidMount() {
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
      axios.get( Config.API + '/problems/ID?id='+this.props.params.probID).then(function (response) {
        self.setState({
            problemInfo: response.data
      })

        document.getElementById('projectEditTitleForm').value = self.state.problemInfo.Title;
        document.getElementById('projectEditSummaryForm').value = self.state.problemInfo.Summary;
  
    })
      .catch(function (error) {
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

 updateProject() {
    //Read field items into component state
    this.state.title = document.getElementById('projectEditTitleForm').value
    this.state.summary = document.getElementById('projectEditSummaryForm').value

  var self = this;
  axios.put( Config.API + '/auth/problems/update?id='+this.props.params.probID, {
      username: cookie.load('userName'),
      title : self.state.title,
      summary : self.state.summary
    })
    .then(function (result) {
      document.location = self.state.linkPath+self.props.params.probID+'/subprojects';
    })
      .catch(function (error) {
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
        <div id="createProblemBox">
            <form id="createForm">
                <label htmlFor="problemTitleForm" id="problemTitleFormLabel">Title<br />
                    <input type="text" name="problemTitle" required="required" maxLength="70" id="projectEditTitleForm" autoFocus/>
                  </label><br />

                <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">synopsis<br />
                    <textarea name="problemSummary" required="required" maxLength="350" 
                    placeholder="Please provide any additional information you'd like. (500 ch)" id="projectEditSummaryForm">
                    </textarea>
                </label>
                <div id="discussFormButtonContainer">
                  <Link to={this.state.linkPath+this.props.params.probID+'/subprojects'}>
                    <div id="returnButton">exit</div>
                  </Link>
                  <Link to={this.state.linkPath+this.props.params.probID+'/subprojects'}>
                      <div onClick={this.updateProject} id="editButton">edit</div>
                  </Link>
                </div>     
            </form>
        </div>
      );
   }
}

