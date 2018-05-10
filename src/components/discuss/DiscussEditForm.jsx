import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class DiscussEditForm extends React.Component {

  constructor(props){
  super(props);

  this.state= {
    comment: '',
    linkPath: '',
    proposalPath: '',
    commentPath: '',
  }

    this.updateComment = this.updateComment.bind(this);
  };

  componentDidMount(){
      var self = this;
      ReactDOM.findDOMNode(this).scrollIntoView(); 
      if (this.props.params.commentID) {
          axios.get( Config.API + '/comments/ID?id='+this.props.params.commentID).then(function (response) {
              self.setState({
                comment: response.data
              })
              document.getElementById('commentEditTextArea').value = self.state.comment.Description;
          }) 
      } else {
          axios.get( Config.API + '/comments/ID?id='+this.props.params.discussID).then(function (response) {
            self.setState({
              comment: response.data
            })
            document.getElementById('commentEditTextArea').value = self.state.comment.Description;
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
            document.getElementById('commentEditTextArea').value = self.state.comment.Description;
        }) 
    } else {
        axios.get( Config.API + '/comments/ID?id='+nextProps.params.discussID).then(function (response) {
          self.setState({
            comment: response.data
          })
          document.getElementById('commentEditTextArea').value = self.state.comment.Description;
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

updateComment() {
  //Read field items into component state
  this.state.comment = document.getElementById('commentEditTextArea').value

if (this.props.params.commentID) {
    var self = this
    axios.put( Config.API + '/auth/comments/update?id='+this.props.params.commentID, {
        username: cookie.load('userName'),
        description : self.state.comment,
      })
        .then(function (result) {
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
} else {
  var self = this
  axios.put( Config.API + '/auth/comments/update?id='+this.props.params.discussID, {
      username: cookie.load('userName'),
      description : self.state.comment,
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
}

  
  



   render() {
      return (
        <div id="questionFormComponent">
              <form id="questionForm">
                  <textarea name="questionText" required="required" id="commentEditTextArea" autoFocus ></textarea>
                  <div id="discussFormButtonContainer">
                    <Link to={this.state.linkPath+this.props.params.probID+this.state.proposalPath+'discuss'+this.state.commentPath}>
                        <div id="returnButton">exit</div>
                    </Link>
                    <Link to={this.state.linkPath+this.props.params.probID+this.state.proposalPath+'discuss'+this.state.commentPath}>
                        <div onClick={this.updateComment} id="editButton">edit</div>
                    </Link>
                  </div>
              </form>
        </div>
    );
}
}