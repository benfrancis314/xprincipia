import React from 'react';
import { Link  } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class PasswordResetStart extends React.Component {
  
    constructor(){
        super();
      
        this.state= {
          email: '',
        }
      
          this.checkEmail = this.checkEmail.bind(this);
        };
    checkEmail() {
        //Read field items into component state
      this.state.email = document.getElementById('resetEmailInput').value
      
      return axios.get( Config.API + '/users/checkemail?email='+this.state.email)
          .then(function (result) {
            alert('reset step 1 success');
            // alert(response.data);
          })
            .catch(function (error) {
                $(document).ready(function() {
                    $('#notification').attr('id','notificationShow').hide().slideDown();
                        return (
                          $(document).ready(function() {
                            $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                            $('#notificationLogin').attr('id','notificationLoginHide');
                            $('#notificationRegister').attr('id','notificationRegisterHide');
                            $('#notificationContent').html('this email is<span id="red"> not connected</span> to any account');
                          })
                        );
                });
            });
          }
 
    render() {
      return (
      <div id="passwordResetStartContainer">
        {/* <Link to={`/passwordreset/finish/5`} activeClassName="activeProblemOptionDiscuss"> */}
            <div id="passwordResetStartLabel">
                reset password
            </div>
        {/* </Link> */}
        <input type="text" name="problemTitle" required="required" maxLength="70" id="resetEmailInput" placeholder="email address" autofocus/>
        <input type="button" value="submit" onClick={this.checkEmail} id="resetEmailSubmit"/>
      </div>
      );
   }
}
