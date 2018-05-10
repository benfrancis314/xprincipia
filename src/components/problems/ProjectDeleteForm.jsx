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
      problemInfo: [],
      linkPath: '',
    }

    this.deleteProject = this.deleteProject.bind(this);
  };

  componentDidMount() {
    var self = this
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
    })
  }
  componentWillReceiveProps(nextProps) {
    var self = this
    if (window.location.pathname.includes('private')) {
      self.setState({
          linkPath: '/project/private/',
      })
    } else {
        self.setState({
            linkPath: '/project/',
        })
    }
    axios.get( Config.API + '/problems/ID?id='+nextProps.params.probID).then(function (response) {
      self.setState({
          problemInfo: response.data
      })
    })
  }


  deleteProject() {
    
  //   Delete proposal
     var self = this
     axios.delete( Config.API + '/auth/problems/delete?id='+this.props.params.probID, {
          params: {
            id: this.props.params.probID,
            username: cookie.load('userName')
          }
        })
        .then(function (result) {
            // document.location = '/welcome'
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
    if (cookie.load('userName') === this.state.problemInfo.OriginalPosterUsername)  {
    
    return (
        <div id="createSolutionBox">
          <form id="solutionDeleteForm">
              <div id="discussDeleteConfirm">confirm <span id="red">deletion</span></div>
              <div id="discussFormButtonContainer">
                  <Link to={this.state.linkPath+this.props.params.probID+'/subprojects'}>
                      <div id="returnButton">exit</div>
                  </Link>
                  <Link to={this.state.linkPath+this.props.parentID+'/subprojects'}>
                      <div onClick={this.deleteProject} id="deleteButton">delete</div>                          
                  </Link>
              </div>
          </form>
      </div>
      );
    } else {
        return (
          <div id="createSolutionBox">
              <form id="solutionDeleteForm">
                    <div id="discussDeleteConfirm">confirm <span id="red">deletion</span></div>
                        <div id="credentialErrorHeader">CREDENTIAL ERROR </div>
                        <div id="credentialErrorText">
                          We apologize for the error. 
                          <br />
                          Please inform us of the problem in the Feedback section in your <span id="blueOpen">Personal Quarters</span>. 
                        </div>
                        <Link to={`/project/${this.props.params.probID}/subprojects`}>
                            <div id="credentialErrorReturnButton">exit</div>
                        </Link>
              </form>
          </div>
        )
    }
   }
}


