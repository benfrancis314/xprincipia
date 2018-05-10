import React from 'react';
import ReactDOM from 'react-dom';
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
    linkPath: '',
  }

    this.updateLearn = this.updateLearn.bind(this);
  };

  componentDidMount(){
      var self = this;
      ReactDOM.findDOMNode(this).scrollIntoView(); 
      if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
        })
      } else {
          self.setState({
              linkPath: '/project/',
          })
      }
        axios.get( Config.API + '/learnItems/ID?id='+this.props.params.learnItemID).then(function (response) {
          self.setState({
              learnItem: response.data
          })
          
          document.getElementById('resourceTitleForm').value = self.state.learnItem.Title;
          document.getElementById('resourceURLForm').value = self.state.learnItem.Url;
          document.getElementById('resourcesTextArea').value = self.state.learnItem.Description;

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
  componentWillReceiveProps(nextProps){
    var self = this;
    if (window.location.pathname.includes('private')) {
      self.setState({
          linkPath: '/project/private/',
      })
    } else {
        self.setState({
            linkPath: '/project/',
        })
    }
      axios.get( Config.API + '/learnItems/ID?id='+nextProps.params.learnItemID).then(function (response) {
        self.setState({
            learnItem: response.data
        })
        
        document.getElementById('resourceTitleForm').value = self.state.learnItem.Title;
        document.getElementById('resourceURLForm').value = self.state.learnItem.Url;
        document.getElementById('resourcesTextArea').value = self.state.learnItem.Description;

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

updateLearn() {
  //Read field items into component state
  var self = this
  self.state.learnItem.Title = document.getElementById('resourceTitleForm').value;
  self.state.learnItem.Url = document.getElementById('resourceURLForm').value;
  self.state.learnItem.Description = document.getElementById('resourcesTextArea').value;
  axios.put( Config.API + '/auth/learnItems/update?id='+this.props.params.learnItemID, {
      username: cookie.load('userName'),
      title: self.state.learnItem.Title,
      url: self.state.learnItem.Url,
      description : self.state.learnItem.Description,
    })
      .then(function (result) {
      })
      .catch(function (error) {
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
            <div id="discussFormContainer">
              <div id="suggestionFormComponent">
                  <form id="questionForm">
                      <fieldset id='fieldSetNoBorderPadding'>
                          {/*<legend>Add a Resource</legend>*/}
                              <input type="text" placeholder="title" id="resourceTitleForm"/>
                              <input type="text" placeholder="url | optional" id="resourceURLForm"/>
                              <textarea name="suggestionText" required="required" id="resourcesTextArea" placeholder="Please provide any additional information you'd like. " ></textarea>
                              <div id="discussFormButtonContainer">
                                <Link to={this.state.linkPath+this.props.params.probID+'/learn'}>
                                    <div id="returnButton">exit</div>
                                </Link>
                                <Link to={this.state.linkPath+this.props.params.probID+'/learn'}>
                                    <div onClick={this.updateLearn} id="editButton">edit</div>
                                </Link>
                              </div>
                      </fieldset>
                  </form>
              </div>
            </div>

      );
   }
}