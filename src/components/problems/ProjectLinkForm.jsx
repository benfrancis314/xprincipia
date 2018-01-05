import React from 'react';
// Will be uesd with componentDidUpdate
// import ReactDOM from 'react-dom';import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import ProjectLinkUnits from './ProjectLinkUnits.jsx';
import $ from 'jquery';

export default class ProjectLinkForm extends React.Component {

  constructor(){
    super();
    
    //ProblemForm structure in backend
    this.state= {
      title: '',
      summary: '',
      class: '',
      userproblems : [],
      searchText: [],
    }

    this.postProblem = this.postProblem.bind(this);
    this.queryProblem = this.queryProblem.bind(this);    
  };

// componentDidUpdate() {
//         ReactDOM.findDOMNode(this).scrollIntoView();
//   }      
queryProblem () {
    //get search text box data
   this.state.searchText = document.getElementById('problemTitleFormSearch').value

   var self = this
   return axios.get( Config.API + '/problems/search?q='+this.state.searchText).then(function (response) {
       self.setState({
         userproblems: response.data
       })
   })
 }
  postProblem() {
    
    //Read field items into component state
    this.state.title = document.getElementById('problemTitleForm').value
    this.state.summary = document.getElementById('problemSummaryForm').value
    if (document.getElementById('projectClass2').checked) {
      this.state.class = '2' 
    } else if (document.getElementById('projectClass1').checked) {
      this.state.class = '1' 
    } else {
      this.state.class = '0' 
    }
  
    var self = this
    axios.post( Config.API + '/auth/problems/create', {
      username: cookie.load('userName'),
      title : this.state.title,
      summary : this.state.summary,
      parentType : '0',
      parentID: this.props.params.probID,
      parentTitle : this.props.parentTitle,
      grandParentID : String(this.props.gParentID),
      grandParentTitle: this.props.gParentTitle,
      ggParentID : String(this.props.ggParentID),
      class : this.state.class,
      breakdownID : this.props.breakdownID,
    })
    .then(function (result) {
      //redirect back to the last page     
      document.location = '/project/'+self.props.params.probID+'/subprojects'
    })
      .catch(function (error) {
        // alert('why not working');
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to create a project');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
      });
  }

  render() {
      return (
        <div>
          <div id="createProblemBox">
              <form id="linkForm">
                <fieldset id="fieldSetNoBorderNoPaddingBottom">
                    <label htmlFor="problemTitleForm" id="problemTitleFormLabel">search existing projects<br />
                      <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleFormSearch" onKeyDown={this.queryProblem} autoFocus autoComplete="off" />
                    </label><br />

                </fieldset>
              </form>
              <ProjectLinkUnits problems={this.state.userproblems} />
          </div>
        </div>

      );
   }
}

