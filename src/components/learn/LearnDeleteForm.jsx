import React from 'react';
import ReactDOM from 'react-dom';
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
    linkPath: '',
  }

    this.deleteLearn = this.deleteLearn.bind(this);
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
  }
  componentWillReceiveProps(nextProps) {
    var self = this;
    // ReactDOM.findDOMNode(this).scrollIntoView(); 
    if (window.location.pathname.includes('private')) {
      self.setState({
          linkPath: '/project/private/',
      })
    } else {
        self.setState({
            linkPath: '/project/',
        })  
    } 
}



deleteLearn() {
//Delete question
      var self = this
      axios.delete( Config.API + '/auth/learnItems/delete?', {
        params: {
          id: this.props.params.learnItemID,
          username: cookie.load('userName')
        }
      })
      .then(function (result) {
        document.location = self.state.linkPath+self.props.params.probID+'/learn'
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
        <div id="questionFormComponent">
            <form id="questionForm">
                <div id="discussDeleteConfirm">confirm <span id="red">deletion</span></div>
                <div id="discussFormButtonContainer">
                    <Link to={this.state.linkPath+this.props.params.probID+'/learn'}>
                        <div id="returnButton">exit</div>
                    </Link>
                    <Link>
                        <div onClick={this.deleteLearn} id="deleteButton">delete</div>                          
                    </Link>
                </div>
            </form>
        </div>

      );
   }
}
