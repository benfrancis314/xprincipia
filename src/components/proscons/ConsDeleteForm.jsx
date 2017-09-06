import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ConsDeleteForm extends React.Component {

  constructor(){
  super();

  this.state= {
    con: '',
  }

    this.deleteCon = this.deleteCon.bind(this);
  };

  deleteCon() {
  
  //Delete question
      var self = this
      axios.delete( Config.API + '/auth/cons/delete?id='+this.props.params.conID, {
        params: {
          id: this.props.params.conID,
          username: cookie.load('userName')
        }
      })
      .then(function (result) {
        document.location = '/proposal/'+ self.props.params.probID + '/' + self.props.params.solutionID + '/cons'
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
      <div id="questionFormComponent">
            <form id="questionForm">
                <fieldset>
                    <legend>Delete Con</legend>
                         <div>Are you sure you would like to delete this Con?</div>
                         <br />
                         <div onClick={this.deleteCon} id="deleteButton">Delete</div>
                         <Link to={`/proposal/${this.props.params.probID}/${this.props.solutionID}/cons`}>
                            <div id="returnButton">Exit</div>
                         </Link>
                </fieldset>
            </form>
      </div>

      );
   }
}
