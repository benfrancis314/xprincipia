import React from 'react';
import SolutionUnit from '../solutions/SolutionUnit.jsx';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProblemSolutionsMenu extends React.Component {
  constructor(){
        super();

        this.state = {
            solutions: [],
            probID: [],
            promptWord: '',
        }

    };
    componentDidMount(){
        var self = this;
        if (window.location.pathname.includes('private')) {
            self.setState({
                promptWord: 'your',
            })
        } else {
            self.setState({
                promptWord: 'the',
            })
        }
        axios.get( Config.API + '/solutions/problemID?id='+this.props.probID).then(function (response) {
            self.setState({
                solutions: response.data,
            })
        })
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        if (window.location.pathname.includes('private')) {
            self.setState({
                promptWord: 'your',
            })
        } else {
            self.setState({
                promptWord: 'the',
            })
        }
        axios.get( Config.API + '/solutions/problemID?id='+nextProps.probID).then(function (response) {
            self.setState({
                solutions: response.data,
                probID: nextProps.probID
            })
        })
    }

    showSolutionForm() {
        $(document).ready(function() {
            $('#solutionFormContainerHide').attr('id','solutionFormContainerShow');
            $('#proposalsPromptContainerShow').attr('id','proposalsPromptContainerHide');
        });
    }

   render() {
    
    if (this.state.solutions === undefined || this.state.solutions.length == 0) {
        return (
            <div id="proposalsPromptContainerShow">
                {/* <a href='#proposalForm'> */}
                    <div id="noProposalsPromptFlare"><br /></div>
                    <div id="noProposalsPrompt" onClick={this.showSolutionForm}>
                        <span id="blue">propose </span>{this.state.promptWord} <span id="blue">first </span>idea
                    </div>
                {/* </a> */}
            </div>
        );
    } else {
      return (
        <div>
            <SolutionUnit solutions={this.state.solutions} probID={this.props.probID}/>
        </div>

      );
   }}
}