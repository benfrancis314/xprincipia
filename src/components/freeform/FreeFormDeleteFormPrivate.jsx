import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
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
      if (this.props.params.solutionID){
        return (
            <div>
              <div id="discussMenuEnd">
                debates
              </div>
              <div id="questionFormComponent">
                    <form id="questionForm">
                        <fieldset>
                            <legend>Delete Debate Point</legend>
                                <div>Are you sure you would like to delete this debate point?</div>
                                <br />
                                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/debates`}>
                                    <div onClick={this.deleteFreeform} id="deleteButton">Delete</div>
                                </Link>
                                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/debates`}>
                                    <div id="returnButton">Exit</div>
                                </Link>
                        </fieldset>
                    </form>
              </div>
            </div>
        );
    } else {
      return (
        <div>
            <div id="discussMenuEnd">
              debates
            </div>
            <div id="questionFormComponent">
                  <form id="questionForm">
                      <fieldset>
                          <legend>Delete Debate Point</legend>
                              <div>Are you sure you would like to delete this debate point?</div>
                              <br />
                              <Link to={`/project/private/${this.props.params.probID}/open`}>
                                  <div onClick={this.deleteFreeform} id="deleteButton">Delete</div>
                              </Link>
                              <Link to={`/project/private/${this.props.params.probID}/open`}>
                                  <div id="returnButton">Exit</div>
                              </Link>
                      </fieldset>
                  </form>
            </div>
          </div>
      );
    }
  }
}
