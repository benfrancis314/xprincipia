import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import {Config} from '../../config.js';
import FullSolutionContent from './FullSolutionContent.jsx';
import $ from 'jquery';


export default class FullSolution extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutionInfo: [],
            solutionID: [],
            probID: []
        }

        this.submitVote = this.submitVote.bind(this)
    };
    //initialize the component with this state
    componentDidMount(){
      var self = this;
      return axios.get( Config.API + '/solutions/ID?id='+this.props.params.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,
          })
          var solutionInfo = self.state.solutionInfo
          solutionInfo.CreatedAt = dateTime(solutionInfo.CreatedAt)
          self.setState({
              solutionInfo : solutionInfo
          })

    })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              $('#notificationContent').text(error.response.data);
              // alert( "Please login to add content. ");
              if (error.response.data == '[object Object]') {
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
  //On recieving next props
//   componentWillReceiveProps(nextProps){
//     var self = this;
// 	    return axios.get( Config.API + '/auth/solutions/ID?id='+nextProps.params.solutionID).then(function (response) {
//           self.setState({
//               solutionInfo: response.data,
//               solutionID: nextProps.params.solutionID,
// 		      probID: nextProps.params.probID
//           })
//         })
//   }
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
              $('#notificationContent').text(error.response.data);
              // alert( "Please login to add content. ");
              if (error.response.data == '[object Object]') {
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
        function toggleProposal() {
            $(document).ready(function() {
                $('#proposalToggleOn').attr('id','proposalToggleOff');
                $('#solutionUnitActive').attr('id','solutionUnit');			
            });
		};
      return (
        <div id="fullSolution">
            <div id="solutionIntro">
                <div onClick={toggleProposal}>
                    <img src={require('../../assets/redX.svg')} id="closeRedX" width="35" height="35" alt="Close button, red X symbol" />
                </div>
                <h1 id="solutionTitle" onClick={toggleProposal}>{this.state.solutionInfo.Title}</h1>
                <div id="proposalCreator">{this.state.solutionInfo.OriginalPosterUsername}</div>
                {/*<div id="currentVersion">v.112</div>*/}
                <p id="solutionSummary">
                {this.state.solutionInfo.Summary}
                </p>
            </div>
            {/*{React.cloneElement(<FullSolutionContent probID={this.state.probID} solutionID={this.state.solutionID} /> )}*/}
        </div>
      );
   }
}



 function dateTime(str){
     return str.substring(0,9)
 }
