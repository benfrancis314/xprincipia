import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link } from 'react-router';

export default class ConsForm extends React.Component {

constructor(){
  super();

  this.state= {
    con: '',
  }

  this.postCon = this.postCon.bind(this);
};

postCon() {
  //Read field items into component state
this.state.con = document.getElementById('conTextArea').value

  axios.post( Config.API + '/auth/cons/create', {
      username: cookie.load('userName'),
      type:'1',
      typeID: this.props.params.solutionID,
      description : this.state.con,
      parentID: this.props.params.probID,
      private: '0',
    })
      .then(function (result) {
        document.getElementById("suggestionForm").reset();
        // scroll to cons again
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
          contra
        </div>
        <div id="suggestionFormComponent">
              <form id="suggestionForm">
                  <fieldset  id='fieldSetNoBorderPadding'>
                      {/*<legend>Pros</legend>*/}
                          <textarea name="suggestionText" required="required" id="conTextArea" placeholder="Describe a way this proposal could improve. " autoFocus ></textarea>
                          <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons`}>
                            <input type="button" value="Add" onClick={this.postCon} id="addProsCons"/>
                          </Link>
                  </fieldset>
              </form>
        </div>
      </div>

      );
   }
}
