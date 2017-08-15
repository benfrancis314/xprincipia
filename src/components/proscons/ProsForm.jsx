import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

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
this.state.pro = document.getElementById('proTextArea').value

 axios.post( Config.API + '/auth/pros/create', {
    username: cookie.load('userName'),
    type:'1',
    typeID: this.props.params.solutionID,
    description : this.state.pro,
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
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
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
          Pros
        </div>
        <div id="suggestionFormComponent">
              <form id="suggestionForm">
                  <fieldset  id='fieldSetNoBorderPadding'>
                      {/*<legend>Pros</legend>*/}
                          <textarea name="suggestionText" required="required" id="proTextArea" placeholder="Add a pro towards the merit of this proposal. " autoFocus ></textarea>
                          {/*Replace with blueAdd button*/}
                          <input type="button" value="Add" onClick={this.postPro} id="addProsCons"/>
                  </fieldset>
              </form>
        </div>
      </div>

      );
   }
}
