import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class LearnContentDeleteForm extends React.Component {

  constructor(){
  super();

  this.state= {
    learnItem: '',
  }

    this.deleteLearnItem = this.deleteLearnItem.bind(this);
  };

deleteLearnItem() {
//Delete question
      var self = this
      axios.delete( Config.API + '/auth/learnItems/delete?', {
        params: {
          id: this.props.params.learnItemID,
          username: cookie.load('userName')
        }
      })
      .then(function (result) {
        // document.location = '/project/private/'+ self.props.params.probID + '/notes'
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
            Notes
          </div>
          <div id="questionFormComponent">
                <form id="questionForm">
                    <fieldset>
                        <legend>delete note</legend>
                            <div>Are you sure you would like to delete this lesson?</div>
                            <br />
                            <Link to={`/project/private/${this.props.params.probID}/notes`}>
                                <div onClick={this.deleteLearnItem} id="deleteButton">Delete</div>
                            </Link>
                            <Link to={`/project/private/${this.props.params.probID}/notes`}>
                                <div id="returnButton">Exit</div>
                            </Link>
                    </fieldset>
                </form>
          </div>
        </div>

      );
   }
}
