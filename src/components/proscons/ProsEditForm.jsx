import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProsEditForm extends React.Component {

  constructor(){
  super();

  this.state= {
    pro: '',
  }

    this.updatePro = this.updatePro.bind(this);
  };

  componentWillMount(){
      var self = this;
        return axios.get( Config.API + '/auth/pros/ID?id='+this.props.params.proID).then(function (response) {
          self.setState({
              pro: response.data
          })
          
          document.getElementById('proEditTextArea').value = self.state.pro.Description;

    })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data !== '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data === '[object Object]') {
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

updatePro() {
  //Read field items into component state
  this.state.pro = document.getElementById('proEditTextArea').value

  var self = this
  axios.put( Config.API + '/auth/pros/update?id='+this.props.params.proID, {
      type:'1',
      typeID: this.props.params.solutionID,
      username: cookie.load('userName'),
      description : this.state.pro,
    })
      .then(function (result) {
        document.location = '/fullsolution/' + self.props.params.probID + '/' + self.props.params.solutionID + '/pros'
      })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data !== '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data === '[object Object]') {
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
                    <legend id="redLegend">Edit Pro</legend>
                         <textarea name="questionText" required="required" id="proEditTextArea" autoFocus ></textarea>
                         <br />
                         <div onClick={this.updatePro} id="editButton">Submit</div>
                         <Link to={`/fullsolution/${this.props.params.probID}/${this.props.params.solutionID}/pros`}>
                          <div id="returnButton">Exit</div>
                         </Link>
                </fieldset>
            </form>
      </div>

      );
   }
}