import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import $ from 'jquery';
import {Config} from '../../config.js';
import {OnUnload} from 'react-window-mixins';


export default class NotebookFull extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            solutionInfo: [],
        }

    this.updateNotebook = this.updateNotebook.bind(this);
    // var OnUnload = require("react-window-mixins").OnUnload;
    
    };
    //initialize the component with this state
    componentWillMount(){
      var self = this;
      return axios.get( Config.API + '/solutions/ID?id='+5).then(function (response) {
          self.setState({
              solutionInfo: response.data,
          })
          document.getElementById('notebookFullTitle').value = self.state.solutionInfo.Title;
          document.getElementById('notebookFullContent').value = self.state.solutionInfo.Description;
          document.getElementById('notebookFullResources').value = self.state.solutionInfo.References;

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
  updateNotebook() {
    //Read field items into component state
    this.state.title = document.getElementById('notebookFullTitle').value
    this.state.description = document.getElementById('notebookFullContent').value
    this.state.references = document.getElementById('notebookFullResources').value

  var self = this;
  axios.put( Config.API + '/auth/solutions/update?id='+5, {
      username: cookie.load('userName'),
      title : self.state.title,
      summary : self.state.summary,
      description : self.state.description,
      references: self.state.references
    })
    .then(function (result) {
        // alert('sucess');
    //  document.location = '/project/' + self.props.params.probID + '/proposal/' + self.props.params.solutionID
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
// ON UNMOUNT, SAVE PROJECT
componentWillUnmount() {
    //Read field items into component state
    this.state.title = document.getElementById('notebookFullTitle').value
    this.state.description = document.getElementById('notebookFullContent').value
    this.state.references = document.getElementById('notebookFullResources').value

  var self = this;
  axios.put( Config.API + '/auth/solutions/update?id='+5, {
      username: cookie.load('userName'),
      title : self.state.title,
      summary : self.state.summary,
      description : self.state.description,
      references: self.state.references
    })
    .then(function (result) {
        alert('sucess');
    //  document.location = '/project/' + self.props.params.probID + '/proposal/' + self.props.params.solutionID
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
        <div id="notebookFullContainer">
            <input id="notebookFullTitle" placeholder="notes title"></input>
            <textarea id="notebookFullContent" placeholder="Brainstorm or record your thoughts" autoFocus ></textarea>
            <textarea placeholder="sources" id="notebookFullResources"></textarea>
            {/* <div id="noteBookSaveButton">
                save
            </div> */}
            <div onClick={this.updateNotebook} id="notebookFullTimeStamp">
            {/* Update each time saved */}
                updated: [timestamp] save
            </div>
        </div>
      );
    }
}