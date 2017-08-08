import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class FreeFormEditForm extends React.Component {

  constructor(){
  super();

  this.state= {
    freeForm: '',
  }

    this.updateFreeForm = this.updateFreeForm.bind(this);
  };

  componentWillMount(){
      var self = this;
        return axios.get( Config.API + '/auth/freeForms/ID?id='+this.props.params.freeFormID).then(function (response) {
          self.setState({
              freeForm: response.data
          })
          
          document.getElementById('freeFormEditTextArea').value = self.state.freeForm.Description;

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

updateFreeForm() {
  //Read field items into component state
  this.state.freeForm = document.getElementById('freeFormEditTextArea').value

  axios.put( Config.API + '/auth/freeForms/update?id='+this.props.params.freeFormID, {
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
                    <legend id="redLegend">Edit FreeForm Comment</legend>
                         <textarea name="questionText" required="required" id="freeFormEditTextArea" autoFocus ></textarea>
                         <br />
                         <Link to={`/problem/${this.state.resources.TypeID}/freeForms`}>
                            <div onClick={this.updateFreeForm} id="editButton">Submit</div>
                         </Link>
                         <Link to={`/problem/${this.state.resources.TypeID}/freeForms`}>
                            <div id="returnButton">Exit</div>
                         </Link>
                </fieldset>
            </form>
      </div>

      );
   }
}