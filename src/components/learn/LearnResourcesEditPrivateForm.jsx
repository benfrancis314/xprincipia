import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class LearnResourcesEditForm extends React.Component {

  constructor(){
  super();

  this.state= {
    resource: '',
  }

    this.updateResource = this.updateResource.bind(this);
  };

  componentDidMount(){
      var self = this; ///TODO Change Resouces to resources when backend Changes
        return axios.get( Config.API + '/resources/ID?id='+this.props.params.resourceID).then(function (response) {
          self.setState({
              resource: response.data
          })
        
        document.getElementById('questionEditTextArea').value = self.state.resource.Description;

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

updateResource() {
  this.state.resource = document.getElementById('questionEditTextArea').value
  var self = this
  axios.put( Config.API + '/auth/resources/update?id='+this.props.params.resourceID, {
      type:'0',
      typeID: this.props.params.probID,
      username: cookie.load('userName'),
      description : self.state.resource,
    })
      .then(function (result) {
        // document.location = '/project/private/'+ self.props.params.probID + '/resources'
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
            Resources
          </div>
          <div id="questionFormComponent">
                <form id="questionForm">
                    <fieldset id="redFieldset">
                        <legend id="redLegend">Edit Resource</legend>
                            <textarea name="questionText" required="required" id="questionEditTextArea" autoFocus ></textarea>
                            <br />
                            <Link to={`/project/private/${this.state.resource.TypeID}/resources`}>
                              <div onClick={this.updateResource} id="editButton">Submit</div>
                            </Link>
                            <Link to={`/project/private/${this.state.resource.TypeID}/resources`}>
                              <div id="returnButton">Exit</div>
                            </Link>
                    </fieldset>
                </form>
          </div>
        </div>

      );
   }
}