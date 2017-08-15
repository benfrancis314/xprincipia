import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class FullSolutionMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutionInfo: [],
        }

        this.submitVote = this.submitVote.bind(this)
    };
    //initialize the component with this state
    componentDidMount(){
      var self = this;
      return axios.get( Config.API + '/auth/solutions/ID?id='+this.props.params.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,
          })
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
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
                  })
                );
              } 
          });
      });
    }

  //On recieving new props
  componentWillReceiveProps(newProps){
    var self = this;
      return axios.get( Config.API + '/auth/solutions/ID?id='+newProps.params.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,  
          })
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
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
                  })
                );
              } 
          });
      });

  }
  submitVote() {
       axios.post( Config.API + '/auth/vote/create', {
           Type: 1,
           TypeID: this.state.solutionInfo.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            document.location = window.location.pathname;
            alert("Thank you, your vote has been recorded.");
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
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute content');
                  })
                );
              } 
          });
      });
  }
   render() {
      return (
      <div> 
            <div id="voteVersionsMenu">
                    <Link><div id="voteSolution" onClick={this.submitVote}>Vote</div></Link>
                    <Link to={`/fullsolution/${this.props.params.probID}/${this.props.params.solutionID}/versions`}>
                        <div id="versionsButton">
                                Versions
                        </div>
                    </Link>
              </div>
              <div id="createDate">{dateTime(this.state.solutionInfo.CreatedAt)}</div>
              <div id="prosConsMenu">
                <Link to={`/fullsolution/${this.props.params.probID}/${this.props.params.solutionID}/pros`}>
                    <div id="prosButton">Pros</div>
                </Link>
                <Link to={`/fullsolution/${this.props.params.probID}/${this.props.params.solutionID}/cons`}>
                    <div id="consButton">Cons</div>
                </Link>
              </div>
              {React.cloneElement(this.props.children, {probID: this.state.probID}, {solutionID: this.state.solutionID})}
        </div>
      );
   }
}


 
  function dateTime(str) {
     if(str != undefined){
        var result = str.substring(0,9);
        return result
     }
}