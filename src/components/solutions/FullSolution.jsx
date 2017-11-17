import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
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
          // solutionInfo.CreatedAt = dateTime(solutionInfo.CreatedAt)
          self.setState({
              solutionInfo : solutionInfo
          })

    })
}

// shouldComponentUpdate(nextProps, nextState) {
// //     // only render if solutionID has changed
//     return (this.state.solutionID !== nextProps.params.solutionID) 
//     // || (window.location.href.includes('question')))
// }
  //On recieving next props
  componentWillReceiveProps(nextProps){
    var self = this;
	    return axios.get( Config.API + '/auth/solutions/ID?id='+nextProps.params.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,
              solutionID: nextProps.params.solutionID,
		          probID: nextProps.params.probID
          })
        })
  }

componentDidUpdate() {
    if ((window.location.href.includes('#') == false) || (window.location.href.includes('question') == false)) {    
        // Need to stop refresh from happening when clicking on Discuss, etc. OR doesn't work here, but I think this is right track.
        return ReactDOM.findDOMNode(this).scrollIntoView();
    }
    // Previously, this created a feedback loop of updating that slowed the site when I used an IF/ELSE statement. Using an IF .. == false seems to avoid issue, but good to be aware of it being possible here. 
  }   

   render() {
    //    No longer used but would like to use this in the future.
    //    Problem is it toggles the solution units in order from first to last, not the one selected
        // function toggleProposal() {
        //     $(document).ready(function() {
        //         $('#proposalToggleOn').attr('id','proposalToggleOff');
        //         $('#solutionUnitActive').attr('id','solutionUnit');			
        //     });
        // };
        
    if (0) {
    

      return (
        <div id='fullSolutionContainer'>
            <div id="fullSolution">
                <div id="solutionIntro">
                    <Link to={`/project/${this.props.params.probID}/subprojects`}>
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
                    </Link>
                    <h1 id="solutionTitle" >{this.state.solutionInfo.Title}</h1>
                    <div id="proposalCreator">{this.state.solutionInfo.OriginalPosterUsername}</div>
                    {/*Commented out until functional*/}
                    {/*<div id="currentVersion">v.112</div>*/}
                    <p id="solutionSummary">
                        {this.state.solutionInfo.Summary}
                    </p>
                </div>
                {React.cloneElement(this.props.children, {solutionInfo: this.state.solutionInfo})}
            </div>
            {randomImg()}
        </div>
      );
   } else if (0) {
    return (
        <div id='fullSolutionContainer'>
            <div id="fullSolution">
                <div id="solutionIntro">
                    <Link to={`/project/${this.props.params.probID}/subprojects`}>
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
                    </Link>
                    <div id="solutionTitleLabelGreen">
                        plan
                    </div>
                    <h1 id="solutionTitleGreen">{this.state.solutionInfo.Title}</h1>
                    <div id="proposalCreator">{this.state.solutionInfo.OriginalPosterUsername}</div>
                    {/*Commented out until functional*/}
                    {/*<div id="currentVersion">v.112</div>*/}
                    <p id="solutionSummary">
                    {this.state.solutionInfo.Summary}
                    </p>
                </div>
                {React.cloneElement(this.props.children, {solutionInfo: this.state.solutionInfo})}
            </div>
            {randomImg()}
        </div>
      );
   } else {
    return (
        <div id='fullSolutionContainer'>
            <div id="fullSolution">
                <div id="solutionIntro">
                    <Link to={`/project/${this.props.params.probID}/subprojects`}>
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
                    </Link>
                    <div id="solutionTitleLabelRed">
                        solution
                    </div>
                    <h1 id="solutionTitleRed">{this.state.solutionInfo.Title}</h1>
                    <div id="proposalCreator">{this.state.solutionInfo.OriginalPosterUsername}</div>
                    {/*Commented out until functional*/}
                    {/*<div id="currentVersion">v.112</div>*/}
                    <p id="solutionSummary">
                    {this.state.solutionInfo.Summary}
                    </p>
                </div>
                {React.cloneElement(this.props.children, {solutionInfo: this.state.solutionInfo})}
            </div>
            {randomImg()}
        </div>
      );
   }
}
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
