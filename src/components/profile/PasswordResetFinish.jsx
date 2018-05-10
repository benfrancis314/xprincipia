import React from 'react';
import { Link  } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class PasswordResetFinish extends React.Component {
  
    constructor(){
        super();
      
        this.state= {
          password: '',
        }
      
          this.newPassword = this.newPassword.bind(this);
        };
    newPassword() {
        //Read field items into component state
      this.state.newPassword = document.getElementById('resetPasswordInput').value
      
      axios.put( Config.API + '/auth/users/resetPassword?reset_id='+this.props.params.passID+'&new_pass='+this.state.newPassword)
          .then(function (result) {
            $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationLogin').attr('id','notificationLoginHide');
                      $('#notificationRegister').attr('id','notificationRegisterHide');
                      $('#notificationContent').html('password reset<span id="blue"> complete</span>');
                    })
                  );
            });
          })
            .catch(function (error) {
                $(document).ready(function() {
                    $('#notification').attr('id','notificationShow').hide().slideDown();
                        return (
                          $(document).ready(function() {
                            $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                            $('#notificationLogin').attr('id','notificationLoginHide');
                            $('#notificationRegister').attr('id','notificationRegisterHide');
                            $('#notificationContent').html('we apologize for the inconvenience. <br /> please inform us of the mistake via<span id="blue"> feedback</span>');
                          })
                        );
                });
            });
          }
 
    render() {
      return (
      <div id="passwordResetFinishContainer">
        <div id="passwordResetFinishLabel">
            reset password
        </div>
        <input type="password" required="required" maxLength="70" id="resetPasswordInput" placeholder="new password" autoFocus/>
        <input type="button" value="complete" onClick={this.newPassword} id="newPasswordSubmit"/>
      </div>
      );
   }
}
