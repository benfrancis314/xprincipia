import React from 'react';
import {Link} from 'react-router';
import axios from 'axios'
import {Config} from '../../config.js';
import ProblemTopSolutions from './ProblemTopSolutions.jsx';
import SolutionForm from '../solutions/SolutionForm.jsx';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

configureAnchors({offset: -50, scrollDuration: 900});



export default class ProblemSolutionsMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: [],
            probID: []
        }

    };

    getInitialState(){
        var self = this;
        return axios.get( Config.API + '/auth/solutions/problemID?id='+this.props.probID).then(function (response) {
            self.setState({
                solutions: response.data,
                probID: this.props.probID
            })
        })
    }

        componentDidMount(){
        var self = this;
        return axios.get( Config.API + '/auth/solutions/problemID?id='+this.props.probID).then(function (response) {
            self.setState({
                solutions: response.data
            })
        })
    }

    componentWillReceiveProps (nextProps){
        var self = this;
        return axios.get( Config.API + '/auth/solutions/problemID?id='+this.props.probID).then(function (response) {
            self.setState({
                solutions: response.data
            })
        })
    }

   render() {
      return (
        <div id="projectInteractMenu">
            <div id="solutionsTitleRightSB">Proposals</div>
            {/*onClick scroll to proposal form*/}
            <a href='#proposals'>
                <div>
                    <img src={require('../../assets/blueAdd3.svg')} id="addBlueX" width="32" height="32" alt="Close button, red X symbol" />
                </div>
            </a>
            <ProblemTopSolutions probID={this.props.probID} />
            <ScrollableAnchor id={'proposalForm'}>
                <SolutionForm probID={this.props.probID} projectTitle={this.props.projectTitle}/>
            </ScrollableAnchor >
        </div>

      );
   }
}