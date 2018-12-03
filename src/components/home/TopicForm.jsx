import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class TopicForm extends React.Component {

    constructor(){
        super();
        
        this.state= {
          title: '',
        }
    
        this.postTopic = this.postTopic.bind(this);
      };  

      postTopic() {
          var self = this;
          this.state.title = document.getElementById('newTopicFormTitle').value
          
          axios.post( Config.API + '/auth/problems/create', {
            title : this.state.title,
            // Summary here only because it is required by current backend
            summary: "xxx",
          })
          .then(function (result) {
                document.getElementById("newTopicForm").reset();
          })
          .catch(function (error) {
                alert(error.response.data);
        });
      }


   render() {
    
            return (
                <div id="newTopicFormContainer">
                    <Link to={'/home'}>
                        <div id="newTopicClose">
                            x
                        </div>
                    </Link>
                    <form id="newTopicForm">
                        <input type="text" required="required" maxLength="70" id="newTopicFormTitle" placeholder="NEW TOPIC" />
                    </form>
                    <div id="newTopicCreate" onClick={this.postTopic}>
                        ADD
                    </div>
                </div>
            );
    }
}