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
      <div>
        <div id="discussMenuEnd">
          FreeForm
        </div>
        <div id="questionFormComponent">
              <form id="questionForm">
                  <fieldset id='fieldSetNoBorderPadding'>
                      {/*<legend>FreeForm Discussion</legend>*/}
                          <textarea name="questionText" required="required" id="freeFormTextArea" placeholder="Engage in freeform discussion with your peers about this project. " autoFocus ></textarea>
                          <input type="button" value="Add" onClick={this.postFreeForm} id="askQuestion"/>
                  </fieldset>
              </form>
        </div>
      </div>

      );
   }
   }
