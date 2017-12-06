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
    }

    this.deleteProject = this.deleteProject.bind(this);
  };

  deleteProject() {
    
  //   Delete proposal
     var self = this
    alert('problemDeleteStart'); 
     axios.delete( Config.API + '/auth/problems/delete?id='+this.props.params.probID, {
          params: {
            id: this.props.params.probID,
            username: cookie.load('userName')
          }
        })
        .then(function (result) {
            document.location = '/welcome'
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

  render() {
    if (cookie.load('userName') === 'benfrancis')  {
    
    return (
        <div id="createSolutionBox">
          <form id="solutionDeleteForm">
            <fieldset id="editFormFieldset">
                <legend id="redLegend">Delete{this.props.params.probID}</legend>
                    <div>Are you sure you would like to delete this proposal?</div>
                    <br />
                    <div onClick={this.deleteProject} id="deleteButton">Delete</div>
                    <Link to={`/project/${this.props.params.probID}/subprojects`}>
                        <div id="returnButton">Exit</div>
                    </Link>
            </fieldset>
          </form>
      </div>
      );
    } else {
        return (
            <div id="createSolutionBox">
          <form id="solutionDeleteForm">
            <fieldset id="editFormFieldset">
                <legend id="redLegend">Delete</legend>
                    <div>CREDENTIAL ERROR: We apologize for the error, 
                      <br />
                      please inform us of the problem in the Feedback section in your personal quarters. </div>
                    <br />
                    <Link to={`/project/${this.props.params.probID}/subprojects`}>
                        <div id="returnButton">Exit</div>
                    </Link>
            </fieldset>
          </form>
      </div>
        )
    }
   }
}


