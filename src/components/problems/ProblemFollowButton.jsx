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

track() {
    var self = this
      axios.post( Config.API + '/auth/tracker/track', {
          typeID: this.props.probID,
          username : this.props.username,
          trackerType: '0',
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
                    $('#notificationFeedbackShow').attr('id','notificationFeedback');
                    $('#notificationContent').html('Please <span id="blue">login </span>to vote');
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
        document.location = window.location.pathname 
    })
  .catch(function (error) {
      $(document).ready(function() {
          $('#notification').attr('id','notificationShow').hide().slideDown();

            if (error.response.data == '[object Object]') {
              return (
                $(document).ready(function() {
                  $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                  $('#notificationFeedbackShow').attr('id','notificationFeedback');
                  $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                })
              );
            }  else if (error.response.data != '') {
            $('#notificationContent').text(error.response.data);
          }
      });
  });
}

   render() {
       if (this.state.tracked === true) {
       return (
            <div>
              <Link>
                <div id="SBButtonFollowed" onClick={this.unTrack}>
                  tracking
                </div>
              </Link>
            </div>
       );
    } else {
        return (
            <div>
              <Link>
                <div id="SBButtonFollow" onClick={this.track}>
                  track
                </div>
              </Link>
            </div>
            
        );
    }
    }
}
 