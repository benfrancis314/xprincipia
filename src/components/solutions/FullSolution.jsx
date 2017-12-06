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
        this.dayMode = this.dayMode.bind(this);
    };
    //initialize the component with this state
    componentDidMount(){
        ReactDOM.findDOMNode(this).scrollIntoView();
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
 
  }   


  dayMode() {
    $(document).ready(function() {
        $('#fullSolution').attr('id','fullSolutionDay');
        $('#solutionTitle').attr('id','solutionTitleDay');
        $('#solutionCreator').attr('id','solutionCreatorDay');
        $('#solutionSummary').attr('id','solutionSummaryDay');
        $('#solutionDescription').attr('id','solutionDescriptionDay');
        $('#solutionReferences').attr('id','solutionReferencesDay');
    });
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
        
    if (this.state.solutionInfo.Class == '2') {
    
      return (
        <div id='fullSolutionContainer'>
            <div id="fullSolution">
                <div id="solutionIntro">
                    <Link to={`/project/${this.props.params.probID}/subprojects`}>
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
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
                {React.cloneElement(this.props.children, {solutionInfo: this.state.solutionInfo, parentTitle: this.props.parentTitle})}
            </div>
            {randomImg()}
        </div>
      );
   } else if (this.state.solutionInfo.Class == '1') {
    return (
        <div id='fullSolutionContainer'>
            <div id="fullSolution">
                <div id="solutionIntro">
                    <Link to={`/project/${this.props.params.probID}/subprojects`}>
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
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
                {React.cloneElement(this.props.children, {solutionInfo: this.state.solutionInfo, parentTitle: this.props.parentTitle})}
            </div>
            {randomImg()}
        </div>
      );
   } else {
    return (
        <div id='fullSolutionContainer'>
            <div id="fullSolution">
                <Link to={`/proposal/${this.props.params.probID}/${this.props.params.solutionID}/flag`} activeClassName="activeProposalFlagButton">
                    <div id="flagProposalButton">
                        <img src={require('../../assets/flag.svg')} id="dayProposalLogo" width="24" height="24" alt="Delete Button, Red X" />
                    </div>
                </Link>
                {/* <div id="proposalDayButton" onClick={this.dayMode}>
                    <img src={require('../../assets/moonDark.svg')} id="flagProblemLogo" width="24" height="24" alt="Delete Button, Red X" />
                </div> */}
                <div id="solutionIntro">
                    <Link to={`/project/${this.props.params.probID}/subprojects`}>
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
                    </Link>
                    <h1 id="solutionTitle" >{this.state.solutionInfo.Title}</h1>
                    <div id="proposalCreator">{this.state.solutionInfo.OriginalPosterUsername}</div>
                    {/*Commented out until functional*/}
                    {/*<div id="currentVersion">v.112</div>*/}
                    <p id="solutionSummary">
                        {this.state.solutionInfo.Summary}
                    </p>
                </div>
                {React.cloneElement(this.props.children, {solutionInfo: this.state.solutionInfo, parentTitle: this.props.parentTitle})}
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
