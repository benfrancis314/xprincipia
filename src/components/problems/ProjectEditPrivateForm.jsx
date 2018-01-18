import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProjectEditPrivateForm extends React.Component {

  constructor(props){
    super(props);
    
    //ProblemForm structure in backend
    this.state= {
      title: '',
      summary: '',
    }

    this.updateProject = this.updateProject.bind(this);
  };

  componentWillMount() {
      var self = this;
      return axios.get( Config.API + '/problems/ID?id='+this.props.params.probID).then(function (response) {
        //if parent ID is 0 then the problem is at the root of the tree
        // return id as the parentID for routing purposes
        //set other data
        self.setState({
            problemInfo: response.data
      })

        document.getElementById('projectEditTitleForm').value = self.state.problemInfo.Title;
        document.getElementById('projectEditSummaryForm').value = self.state.problemInfo.Summary;
  
    })
      .catch(function (error) {
        // console.log(error.response.data)
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
        // alert('success');
    //   document.location = '/project/private/'+ self.props.params.probID + '/subprojects'
      document.location = window.location.pathname 
    })
      .catch(function (error) {
        alert('failure');
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

                        <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">Additional Information<br />
                            <textarea name="problemSummary" required="required" maxLength="350" 
                            placeholder="Please provide any additional information you'd like. (250 character max.)" id="projectEditSummaryForm">
                            </textarea></label><br />

                          <br />
                          <Link to={`/project/private/${this.props.params.probID}/subprojects`}>
                              <div onClick={this.updateProject} id="editButtonProject">Submit</div>
                          </Link>
                          <Link to={`/project/private/${this.props.params.probID}/subprojects`}>
                            <div id="returnButtonProject">Exit</div>
                          </Link>
            </form>
        </div>
      );
   }
}

