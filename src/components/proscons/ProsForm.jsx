import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link } from 'react-router';


export default class ProsForm extends React.Component {

constructor(){
  super();

  this.state= {
    pro: '',
  }

  this.postPro = this.postPro.bind(this);
};

postPro() {
  //Read field items into component state
  var self = this;
  self.refs.btn.setAttribute("disabled", "disabled");
  this.state.pro = document.getElementById('proTextArea').value

 axios.post( Config.API + '/auth/pros/create', {
    username: cookie.load('userName'),
    type:'1',
    typeID: this.props.params.solutionID,
    description : this.state.pro,
    parentID: this.props.params.probID,
    private: '0',
  })
  .then(function (result) {
    document.getElementById("suggestionForm").reset();
    self.refs.btn.removeAttribute("disabled");
  })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationFeedbackShow').attr('id','notificationFeedback');
                      $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                    })
                  );
                }  else if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
          });
      });
} 


   render() {
      return (
      <div>
        <div id="discussMenuEnd">
        pro
        </div>
        <div id="suggestionFormComponent">
              <form id="suggestionForm">
                  <fieldset  id='fieldSetNoBorderPadding'>
                          <textarea name="suggestionText" required="required" id="proTextArea" placeholder="Describe something that gives merit to this proposal. " autoFocus ></textarea>
                          {/*Replace with blueAdd button*/}
                          <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/pros`}>
                            <input type="button" ref='btn' value="Add" onClick={this.postPro} id="addProsCons"/>
                          </Link>
                  </fieldset>
              </form>
        </div>
      </div>

      );
   }
}
