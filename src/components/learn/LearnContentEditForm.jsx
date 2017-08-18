import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class LearnContentEditForm extends React.Component {

  constructor(){
  super();

  this.state= {
    learnItem: '',
  }

    this.updateLearnItem = this.updateLearnItem.bind(this);
  };

  componentWillMount(){
      var self = this;
        return axios.get( Config.API + '/auth/learnItems/ID?id='+this.props.params.learnItemID).then(function (response) {
          self.setState({
              learnItem: response.data
          })
          
          document.getElementById('questionEditTextArea').value = self.state.learnItem.Description;

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

updateLearnItem() {
  //Read field items into component state
  this.state.learnItem = document.getElementById('questionEditTextArea').value
  var self = this
  axios.put( Config.API + '/auth/learnItems/update?id='+this.props.params.learnItemID, {
      type:'0',
      typeID: this.props.params.probID,
      username: cookie.load('userName'),
      description : self.state.learnItem,
    })
      .then(function (result) {
        document.location = '/problem/'+ self.props.params.probID + '/learn/content'
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
            Lessons
          </div>
          <div id="questionFormComponent">
                <form id="questionForm">
                    <fieldset id="redFieldset">
                        <legend id="redLegend">Edit Lesson</legend>
                            <textarea name="questionText" required="required" id="questionEditTextArea" autoFocus ></textarea>
                            <br />
                            <div onClick={this.updateLearnItem} id="editButton">Submit</div>
                              <Link to={`/problem/${this.state.learnItem.TypeID}/learn/content`}>
                              <div id="returnButton">Exit</div>
                            </Link>
                    </fieldset>
                </form>
          </div>
        </div>

      );
   }
}