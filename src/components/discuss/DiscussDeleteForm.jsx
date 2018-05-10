import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class DiscussDeleteForm extends React.Component {

  constructor(){
  super();

  this.state= {
    comment: '',
    comment: '',
    linkPath: '',
    proposalPath: '',
    commentPath: '',
  }

    this.deleteComment = this.deleteComment.bind(this);
  };

componentDidMount(){
var self = this;
    if (this.props.params.commentID) {
        axios.get( Config.API + '/comments/ID?id='+this.props.params.commentID).then(function (response) {
            self.setState({
                comment: response.data
            })
        }) 
    } else {
        axios.get( Config.API + '/comments/ID?id='+this.props.params.discussID).then(function (response) {
            self.setState({
                comment: response.data
            })
        }) 
    }
    if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
        })
    } else {
        self.setState({
            linkPath: '/project/',
        })
    }
    if (window.location.pathname.includes('proposal')) {
      self.setState({
          proposalPath: '/proposal/'+this.props.params.solutionID+'/',
      })
    } else {
        self.setState({
            proposalPath: '/',
        })
    }
    if (window.location.pathname.includes('comments')) {
      self.setState({
          commentPath: '/'+this.props.params.discussID+'/comments',
      })
    } else {
        self.setState({
            commentPath: '',
        })
    }
}
componentWillReceiveProps(nextProps){
var self = this;
    if (nextProps.params.commentID) {
        axios.get( Config.API + '/comments/ID?id='+nextProps.params.commentID).then(function (response) {
            self.setState({
                comment: response.data
            })
        }) 
    } else {
        axios.get( Config.API + '/comments/ID?id='+nextProps.params.discussID).then(function (response) {
            self.setState({
                comment: response.data
            })
        }) 
    }
    if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
        })
    } else {
        self.setState({
            linkPath: '/project/',
        })
    }
    if (window.location.pathname.includes('proposal')) {
      self.setState({
          proposalPath: '/proposal/'+nextProps.params.solutionID+'/',
      })
    } else {
        self.setState({
            proposalPath: '/',
        })
    }
    if (window.location.pathname.includes('comments')) {
      self.setState({
          commentPath: '/'+nextProps.params.discussID+'/comments',
      })
    } else {
        self.setState({
            commentPath: '',
        })
    }
}


deleteComment() {

////Delete comment
      axios.delete( Config.API + '/auth/comments/delete?id='+this.props.params.commentID, {
        params: {
          id: this.props.params.subcommentID,
          username: cookie.load('userName')
        }
    })
      .then(function (result) {
        document.location = this.state.linkPath+this.props.params.probID+this.state.proposalPath+'discuss'+this.state.commentPath
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
                    <Link to={this.state.linkPath+this.props.params.probID+this.state.proposalPath+'discuss'+this.state.commentPath}>
                        <div id="returnButton">exit</div>
                    </Link>
                    <Link>
                        <div onClick={this.deleteComment} id="deleteButton">delete</div>                          
                    </Link>
                </div>
            </form>
        </div>);
  }
}
