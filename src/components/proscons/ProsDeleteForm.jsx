import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProsDeleteForm extends React.Component {

  constructor(){
  super();

  this.state= {
    pro: '',
  }

    this.deletePro = this.deletePro.bind(this);
  };

  deletePro() {
  
  //Delete question
      var self = this
      axios.delete( Config.API + '/auth/pros/delete?id='+this.props.params.proID, {
        params: {
          id: this.props.params.questID,
          username: cookie.load('userName')
        }
      })
      .then(function (result) {
        document.location = '/proposal/'+ self.props.params.probID + '/' + self.props.params.solutionID + '/pros'
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
                    <legend>Delete Pro</legend>
                         <div>Are you sure you would like to delete this Pro?</div>
                         <br />
                         <div onClick={this.deletePro} id="deleteButton">Delete</div>
                         <Link to={`/proposal/${this.props.params.probID}/${this.props.solutionID}/pros`}>
                            <div id="returnButton">Exit</div>
                         </Link>
                </fieldset>
            </form>
      </div>

      );
   }
}
