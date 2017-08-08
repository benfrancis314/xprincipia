import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class FreeFormForm extends React.Component {

  constructor(){
  super();

  this.state= {
    freeForm: '',
  }

    this.postFreeForm = this.postFreeForm.bind(this);
  };

postFreeForm() {
  //Read field items into component state
  this.state.freeForm = document.getElementById('freeFormTextArea').value

      axios.post( Config.API + '/auth/freeForms/create', {
      type:'0',
      typeID: this.props.params.probID,
      username: cookie.load('userName'),
      description : this.state.freeForm,
    })
      .then(function (result) {
        document.location = window.location.pathname 
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
                    <legend>FreeForm Discussion</legend>
                         <textarea name="questionText" required="required" id="freeFormTextArea" placeholder="Engage in freeform discussion with your peers about this project. " autoFocus ></textarea>
                         <input type="button" value="Add" onClick={this.postFreeForm} id="askQuestion"/>
                </fieldset>
            </form>
      </div>

      );
   }
   }
