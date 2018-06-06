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
            probID: [],
            proposalTypeID: '',
            proposalTypeName: '',
            linkPath: '',
            flagID: '',
        }
        // this.dayMode = this.dayMode.bind(this);
    };
    //initialize the component with this state
    componentDidMount(){
        // ReactDOM.findDOMNode(this).scrollIntoView();
        var self = this;
        axios.get( Config.API + '/solutions/ID?id='+this.props.params.solutionID).then(function (response) {
            if (response.data.Class == '2') {
                self.setState({
                    solutionInfo: response.data,
                    proposalTypeID: 'Red',
                    proposalTypeName: 'solution',
                })
            } else if (response.data.Class == '1') {
                self.setState({
                    solutionInfo: response.data,
                    proposalTypeID: 'Green',
                    proposalTypeName: 'plan',
                })
            } else {
                self.setState({
                    solutionInfo: response.data,
                    proposalTypeID: '',
                    proposalTypeName: '',
                })
            }
        })
        if (window.location.pathname.includes('private')) {
            self.setState({
                linkPath: '/project/private/',
            })
        } else {
            self.setState({
                linkPath: '/project/',
            })
        }
}

  //On recieving next props
  componentWillReceiveProps(nextProps){
    var self = this;
	    axios.get( Config.API + '/solutions/ID?id='+nextProps.params.solutionID).then(function (response) {
            if (response.data.Class == '2') {
                self.setState({
                    solutionInfo: response.data,
                    proposalTypeID: 'Red',
                    proposalTypeName: 'solution',
                })
            } else if (response.data.Class == '1') {
                self.setState({
                    solutionInfo: response.data,
                    proposalTypeID: 'Green',
                    proposalTypeName: 'plan',
                })
            } else {
                self.setState({
                    solutionInfo: response.data,
                    proposalTypeID: '',
                    proposalTypeName: '',
                })
            }
        })
        if (window.location.pathname.includes('private')) {
            self.setState({
                linkPath: '/project/private/',
                flagID: 'noDisplay',
            })
        } else {
            self.setState({
                linkPath: '/project/',
                flagID: 'flagProposalButton',
            })
        }
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
            
      return (
        <div id='fullSolutionContainer'>
            <div id="fullSolution">
                <Link to={this.state.linkPath+this.props.params.probID+'/proposal/'+this.props.params.solutionID+'/flag'} activeClassName="activeProposalFlagButton">
                    <div id={this.state.flagID}>
                        <img src={require('../../assets/flag.svg')} id="dayProposalLogo" width="24" height="24" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <div id="solutionIntro">
                    <Link to={this.state.linkPath+this.props.params.probID+'/subprojects'}>
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
                    </Link>
                    <div id={'solutionTitleLabel'+this.state.proposalTypeID}>
                        {this.state.proposalTypeName}
                    </div>
                    <h1 id={'solutionTitle'+this.state.proposalTypeID}>
                        {this.state.solutionInfo.Title}
                    </h1>
                    <div id="proposalCreator">
                        {this.state.solutionInfo.OriginalPosterUsername}
                    </div>
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
    } else if (Math.random() < 1){
      return <img src={require('../../assets/greatBearConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    }
}
