import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link } from 'react-router';

export default class UserPassions extends React.Component {
constructor(){
  super();

  this.state= {
    passions: '',
  }

  this.postPassions = this.postPassions.bind(this);
};
// componentDidMount() {
//   var self = this;
//   // CHANGE TO GET CALL FOR PASSIONS
//   axios.get( Config.API + '/problems/ID?id='+this.props.params.probID).then(function (response) {
//     self.setState({
//         passions: response.data
//   })

//     document.getElementById('passionsTextArea').value = self.state.passions;
// })
//   .catch(function (error) {
//     // console.log(error.response.data)
//       $(document).ready(function() {
//           $('#notification').attr('id','notificationShow').hide().slideDown();
//           if (error.response.data != '') {
//             $('#notificationContent').text(error.response.data);
//           }
//           else if (error.response.data == '[object Object]') {
//             return (
//               $(document).ready(function() {
//                 $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//                 $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
//               })
//             );
//           } 
//       });
//   });
// }

postPassions() {
  //Read field items into component state

  this.state.passions = document.getElementById('passionsTextArea').value
  
  var self = this;
  axios.put( Config.API + '/auth/users/updatePassions?username='+cookie.load('userName'), {
    passions : self.state.passions
  })
  .then(function (result) {
    // document.location = window.location.pathname 
  })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to contribute feedback. ');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
      });

  
}


   render() {
    
    if (this.props.params.username == cookie.load('userName')) {
      return (
        <div id="passionsFormContainer">
              <div id="passionsHeader">
                  philosophical passions
              </div>
              <form id="suggestionForm">
                  <textarea name="feedbackText" required="required" id="passionsTextArea" placeholder="What are your passions, your fields of interest, or your driving motivations? " autoFocus ></textarea>
                  <Link to={window.location.pathname}>
                    <input type="button" value="submit" onClick={this.postPassions} id="addSuggestion"/>
                  </Link>
              </form>
        </div>
      )
    }
    
    return (
      <div id="passionsFormContainer">
              <div id="passionsHeader">
                  philosophical passions
              </div>
              <form id="suggestionForm">
                  <div id="passionsTextArea">
                    {this.state.passions}
                  </div>
              </form>
        </div>
      );
   }
}
