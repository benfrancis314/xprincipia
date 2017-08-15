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

    this.flagProject = this.updateProject.bind(this);
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
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
                  })
                );
              } 
          });
      });
  }

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
//       document.location = '/problem/'+ self.props.params.probID + '/subproblems'
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
      //               $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
      //             })
      //           );
      //         } 
      //     });
      // });
  
//   }

  render() {
      return (
        <div id="createProblemBox">
            <form id="createForm">
                <fieldset>
                    <legend>Flag Question</legend>
                         <div id="whiteOpen">What is the reason for this flag?</div>
                         <br />
                             <div id="radioFlag">
                            <label id="flagOptionLabel"><input type="radio" name="optradio" id="flagOption"/>Inaccurate Content</label>
                            </div>
                            <div id="radioFlag">
                            <label id="flagOptionLabel"><input type="radio" name="optradio" id="flagOption"/>Misplaced Content</label>
                            </div>
                            <div id="radioFlag">
                            <label id="flagOptionLabel"><input type="radio" name="optradio" id="flagOption"/>Bad Culture</label>
                            </div>
                            <textarea name="flagText" required="required" id="flagTextArea" placeholder="Please describe the reason for your flag. (Optional) " autoFocus ></textarea>
                            {/*Also give them option to describe it*/}
                          {/*After submit an alert "Thank you for helping keep XPrincipia organized and clean. Your flag will be reviewed."*/}
                          <div id="deleteButton">Submit</div>
                         <Link to={`/problem/${this.props.params.probID}/subproblems`}>
                            <div id="returnButton">Exit</div>
                         </Link>
                </fieldset>
            </form>
        </div>
      );
   }
}

