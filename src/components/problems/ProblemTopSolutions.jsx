import React from 'react';
import SolutionUnit from '../solutions/SolutionUnit.jsx';
import axios from 'axios';
import {Config} from '../../config.js';

export default class ProblemSolutionsMenu extends React.Component {
  constructor(){
        super();

        this.state = {
            solutions: [],
            probID: []
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
                probID: nextProps.probID
            })
        })
    }

   render() {
    
    if (this.state.solutions === undefined || this.state.solutions.length == 0) {
        return (
            <div id="fullWide">
                <a href='#proposalForm'>
                    <div id="noProposalsPromptFlare"><br /></div>
                    <div id="noProposalsPrompt">
                        <span id="blue">propose </span>the <span id="blue">first </span>idea
                    </div>
                </a>
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