import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

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
    })
      .then(function (result) {
        document.location = window.location.pathname 
        // scroll to cons again
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
          Cons
        </div>
        <div id="suggestionFormComponent">
              <form id="suggestionForm">
                  <fieldset  id='fieldSetNoBorderPadding'>
                      {/*<legend>Pros</legend>*/}
                          <textarea name="suggestionText" required="required" id="conTextArea" placeholder="Add a con towards the merit of this proposal. " autoFocus ></textarea>
                          {/*Replace with blueAdd button*/}
                          <input type="button" value="Add" onClick={this.postCon} id="addProsCons"/>
                  </fieldset>
              </form>
        </div>
      </div>

      );
   }
}
