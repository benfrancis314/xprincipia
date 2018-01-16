import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class LearnResourcesForm extends React.Component {
constructor(props){
        super(props);

        this.state = {
          title: '',
          summary: '',  
          resource: '',
        }
            this.postResource = this.postResource.bind(this);
        
    };
    postResource() {
  //Read field items into component state
  this.state.title = document.getElementById('resourceTitleForm').value
  this.state.summary = document.getElementById('resourcesTextArea').value
  this.state.resource = document.getElementById('resourceURLForm').value

  //if User is on a solution post with type 1
  //solutionID will be available in props
  if (this.props.params.solutionID) {
      axios.post( Config.API + '/auth/resources/create', {
        type:'1',
        typeID: this.props.params.solutionID,
        username: cookie.load('userName'),
        title: this.state.title,
        summary: this.state.summary,
        description : this.state.resource,
        parentTitle: this.props.parentTitle,
        private: '0',
    })
      .then(function (result) {
        document.location = window.location.pathname 
      })
      .catch(function (error) {
        alert('error')
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to add a suggestion');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
      });

    //else post to problem
    //probID will be used
  } else {
      axios.post( Config.API + '/auth/resources/create', {
        type:'0',
        typeID: this.props.params.probID,
        username: cookie.load('userName'),
        title: this.state.title,
        summary: this.state.summary,
        description : this.state.resource,
        parentTitle: this.props.parentTitle,
        private: '0',
    })
      .then(function (result) {
        document.location = window.location.pathname 
      })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to add a learning resource');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
      });
    }
    }

    componentDidMount(){
        var self = this;
            return axios.get( Config.API + '/resources/typeID?id='+this.props.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    resources: response.data
                })
            }) 
    }
   render() {
           return (
        <div>
          <div id="discussMenuEnd">
            Resources
          </div>
            <div id="suggestionFormComponent">
                <form id="questionForm">
                    <fieldset id='fieldSetNoBorderPadding'>
                        {/*<legend>Add a Resource</legend>*/}
                            <input type="text" placeholder="resource title" id="resourceTitleForm"/>
                            <input type="text" placeholder="URL" id="resourceURLForm"/>
                            <textarea name="suggestionText" required="required" id="resourcesTextArea" placeholder="Please describe the resource or explain its purpose. " ></textarea>
                            <input type="button" value="Add" onClick={this.postResource} id="addSuggestion"/>
                    </fieldset>
                </form>
            </div>
        </div>
      );
    }  
}
