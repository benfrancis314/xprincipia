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

   render() {
    //    No longer used but would like to use this in the future.
    //    Problem is it toggles the solution units in order from first to last, not the one selected
        function toggleProposal() {
            $(document).ready(function() {
                $('#proposalToggleOn').attr('id','proposalToggleOff');
                $('#solutionUnitActive').attr('id','solutionUnit');			
            });
		};
      return (
        <div id='fullSolutionContainer'>
            <div id="fullSolution">
                <div id="solutionIntro">
                    
                    {/*When scroll is ready have this scroll to proposals*/}
                    <Link to={`/problem/${this.props.params.probID}/subproblems`}>
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
                    </Link>
                    <h1 id="solutionTitle" onClick={toggleProposal}>{this.state.solutionInfo.Title}</h1>
                    <div id="proposalCreator">{this.state.solutionInfo.OriginalPosterUsername}</div>
                    {/*Commented out until functional*/}
                    {/*<div id="currentVersion">v.112</div>*/}
                    <p id="solutionSummary">
                    {this.state.solutionInfo.Summary}
                    </p>
                </div>
                {/*{React.cloneElement(<FullSolutionContent probID={this.state.probID} solutionID={this.state.solutionID} /> )}*/}
                {React.cloneElement(this.props.children, {solutionInfo: this.state.solutionInfo})}
            </div>
            {randomImg()}
        </div>
      );
   }
}



 function dateTime(str){
     return str.substring(0,9)
 }

 function randomImg() {
if (Math.random() < 0.125) {
  return <img src={require('../../assets/orionLogo.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.25){
  return <img src={require('../../assets/heroLogo.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.375){
  return <img src={require('../../assets/dragonConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.5){
  return <img src={require('../../assets/hunterConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.625){
  return <img src={require('../../assets/queenConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.75){
  return <img src={require('../../assets/pegasusConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.875){
  return <img src={require('../../assets/archerConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.1){
  return <img src={require('../../assets/greatBearConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
}
}
