import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class SolutionDeleteForm extends React.Component {

  constructor(props){
    super(props);

    this.state= {
      title: '',
      summary: '',
      description: '',
      references: '',
      solutionInfo: '',
    }

    this.deleteSolution = this.deleteSolution.bind(this);
  };

  deleteSolution() {
  
//   Delete proposal
   var self = this
    axios.delete( Config.API + '/auth/solutions/delete?id='+this.props.params.solutionID, {
        params: {
          id: this.props.params.solutionID,
          username: cookie.load('userName')
        }
      })
      .then(function (result) {
      document.location = '/project/'+ self.props.params.probID + '/subprojects'
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
      return (
      <div id="createSolutionBox">
          <form id="solutionDeleteForm">
            <fieldset id="editFormFieldset">
                <legend id="redLegend">Delete</legend>
                    <div>Are you sure you would like to delete this proposal?</div>
                    <br />
                    <div onClick={this.deleteSolution} id="deleteButton">Delete</div>
                      <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                        <div id="returnButton">Exit</div>
                    </Link>
            </fieldset>
          </form>
      </div>
      );
   }
}