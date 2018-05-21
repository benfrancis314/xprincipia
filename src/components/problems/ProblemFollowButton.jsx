import React from 'react';
import { Link  } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProblemFollowButton extends React.Component {
  

  constructor(){
    super();

    this.state = {
      tracked: '',
    }
    this.track = this.track.bind(this)
    this.unTrack = this.unTrack.bind(this)
    this.checkLoginTrack = this.checkLoginTrack.bind(this)
    this.checkLoginUntrack = this.checkLoginUntrack.bind(this)
};

componentDidMount(){
  var self = this;
axios.get( Config.API + "/tracker/istracked?trackerType=0&typeID=" + this.props.probID + "&username=" + this.props.username)
      .then( function (response){
        self.setState({
          tracked: response.data,
        })
  })       
}
componentWillReceiveProps(nextProps){
  var self = this;
  axios.get( Config.API + "/tracker/istracked?trackerType=0&typeID=" + nextProps.probID + "&username=" + nextProps.username)
        .then( function (response){
          self.setState({
            tracked: response.data,
          })
    })       
}
checkLoginTrack() {
  if (cookie.load('userName')) {
    this.track()
  } else {
    $(document).ready(function() {
      $('#notification').attr('id','notificationShow').hide().slideDown();
      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
      $('#notificationContent').html('please <span id="blue">login </span>to track this project');
    });
  }
}
checkLoginUntrack() {
  if (cookie.load('userName')) {
    this.unTrack()
  } else {
    $(document).ready(function() {
      $('#notification').attr('id','notificationShow').hide().slideDown();
      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
      $('#notificationContent').html('please <span id="blue">login </span>to track this project');
    });
  }
}
track() {
    var self = this
      axios.post( Config.API + '/auth/tracker/track', {
          typeID: this.props.probID,
          username : this.props.username,
          trackerType: '0',
      })
      .then(function (result) {
          // document.location = window.location.pathname 
      })
    .catch(function (error) {
        $(document).ready(function() {
            $('#notification').attr('id','notificationShow').hide().slideDown();

              if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationFeedbackShow').attr('id','notificationFeedback');
                    $('#notificationContent').html('Please <span id="blue">login </span>to track');
                  })
                );
              }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
            }
        });
    });
}
  
unTrack() {
  var self = this
    axios.delete( Config.API + '/auth/tracker/untrack?trackerType=0&typeID=' + this.props.probID + '&username=' + this.props.username)
    .then(function (result) {
        // document.location = window.location.pathname 
    })
  .catch(function (error) {
      $(document).ready(function() {
          $('#notification').attr('id','notificationShow').hide().slideDown();

            if (error.response.data == '[object Object]') {
              return (
                $(document).ready(function() {
                  $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                  $('#notificationFeedbackShow').attr('id','notificationFeedback');
                  $('#notificationContent').html('Please <span id="blue">login </span>to track');
                })
              );
            }  else if (error.response.data != '') {
            $('#notificationContent').text(error.response.data);
          }
      });
  });
}

   render() {
    if ((this.state.tracked === true) && (this.props.private == 1)) {
      return (
           <div>
             <Link to={window.location.pathname}>
               <div id="SBButtonFollowedPrivate" onClick={this.checkLoginUntrack}>
                 tracking
               </div>
             </Link>
           </div>
      );
   } else if (this.props.private == 1) {
       return (
           <div>
             <Link to={window.location.pathname}>
               <div id="SBButtonFollowPrivate" onClick={this.checkLoginTrack}>
                 track
               </div>
             </Link>
           </div>
           
       );
   }
    else if (this.state.tracked === true) {
       return (
            <div>
              <Link to={window.location.pathname}>
                <div id="SBButtonFollowed" onClick={this.checkLoginUntrack}>
                  tracking
                </div>
              </Link>
            </div>
       );
    } else {
        return (
            <div>
              <Link to={window.location.pathname}>
                <div id="SBButtonFollow" onClick={this.checkLoginTrack}>
                  track
                </div>
              </Link>
            </div>
            
        );
    }
    }
}
 