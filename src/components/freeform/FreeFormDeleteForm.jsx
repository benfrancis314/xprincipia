import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {browserHistory } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class FreeFormDeleteForm extends React.Component {

  constructor(){
  super();

  this.state= {
    freeForm: '',
  }

    this.deleteFreeform = this.deleteFreeform.bind(this);
  };

deleteFreeform() {
//Delete question
    var self = this
    axios.delete( Config.API + '/auth/freeForm/delete?id='+this.props.params.freeFormID, {
      params: {
        id: this.props.params.freeFormID,
        username: cookie.load('userName')
      }
    })
    .then(function (result) {
      document.location = '/problem/'+ self.props.params.probID + '/freeforms'
    })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              $('#notificationContent').text(error.response.data);
              // alert( "Please login to add content. ");
              if (error.response.data == '[object Object]') {
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
  
  



   render() {
      return (
      <div id="questionFormComponent">
            <form id="questionForm">
                <fieldset>
                    <legend>Delete Free Form</legend>
                         <div>Are you sure you would like to delete this Discussion Item?</div>
                         <br />
                         <div onClick={this.deleteFreeform} id="deleteButton">Delete</div>
                         <Link to={`/problem/${this.state.freeForm.TypeID}/freeForms`}>
                            <div id="returnButton">Exit</div>
                         </Link>
                </fieldset>
            </form>
      </div>

      );
   }
}
