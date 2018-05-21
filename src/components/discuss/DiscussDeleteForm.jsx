import React from 'react';
import ReactDOM from 'react-dom';
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
    linkPath: '',
    proposalPath: '',
    commentPath: '',
    deleteID: '',
  }

    this.deleteComment = this.deleteComment.bind(this);
  };

componentDidMount(){
    var self = this;
    ReactDOM.findDOMNode(this).scrollIntoView(); 
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
          deleteID: this.props.params.commentID
      })
    } else {
        self.setState({
            commentPath: '',
            deleteID: this.props.params.discussID
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
    var self = this
      axios.delete( Config.API + '/auth/comments/delete?id='+this.state.deleteID, {
        params: {
          id: this.state.deleteID,
          username: cookie.load('userName')
        }
    })
      .then(function (result) {
        document.location = self.state.linkPath+self.props.params.probID+self.state.proposalPath+'discuss'+self.state.commentPath
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
        </div>
        );
  }
}
