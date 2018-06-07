import React from 'react';
import axios from 'axios'
import {Config} from '../../config.js';
import ProblemTopSolutions from './ProblemTopSolutions.jsx';
import SolutionForm from '../solutions/SolutionForm.jsx';
import $ from 'jquery';

export default class ProblemSolutionsMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: [],
        }
    };

    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/solutions/problemID?id='+this.props.probID).then(function (response) {
            self.setState({
                solutions: response.data,
            })
        })
    }

    componentWillReceiveProps (nextProps){
        var self = this;
        axios.get( Config.API + '/solutions/problemID?id='+nextProps.probID).then(function (response) {
            self.setState({
                solutions: response.data,
            })
        })
    }
    hoverNewProposal() {
        $(document).ready(function() {
            // $('#welcomeSearchFormLabel').attr('placeholder','CINEMATIC GUIDE');
            // $('#welcomeSearchFormLabel').attr('id','welcomeSearchFormLabelBlue');
            $('#proposalSectionHeader').html('new <span id="brightWhite">proposal</span>').fadeIn(7500);
            $('#proposalSectionHeader').attr('id','proposalSectionHeaderHover');
        });
      }
      unHoverNewProposal() {
          $(document).ready(function() {
              // Used to say SEARCH PROJECT TREES
              $('#proposalSectionHeaderHover').html('proposals');             
              $('#proposalSectionHeaderHover').attr('id','proposalSectionHeader');
          });
      }
    hideSolutionForm() {
        $(document).ready(function() {
            $('#solutionFormContainerShow').attr('id','solutionFormContainerHide');
            $('#proposalsPromptContainerHide').attr('id','proposalsPromptContainerShow');
        });
    }

   render() {

      return (
        <div id="projectInteractMenu">
            {/* <div id="proposalSectionHeader">proposals</div>
            <a href='#proposalForm'>
                <div id="addBlueX" onMouseOver={this.hoverNewProposal} onMouseOut={this.unHoverNewProposal}></div>
            </a> */}
            <ProblemTopSolutions probID={this.props.probID} />
            <div id="solutionFormContainerHide">
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol"  onClick={this.hideSolutionForm}/>
                <SolutionForm probID={this.props.probID} projectTitle={this.props.parentTitle} />
            </div>
        </div>

      );
   }
}