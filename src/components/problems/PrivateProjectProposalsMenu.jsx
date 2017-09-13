import React from 'react';
import axios from 'axios'
import {Config} from '../../config.js';
import ProblemTopSolutionsPrivate from './ProblemTopSolutionsPrivate.jsx';
import SolutionPrivateForm from '../solutions/SolutionPrivateForm.jsx';

export default class ProblemSolutionsMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: [],
        }
    };

        componentDidMount(){
        var self = this;
        return axios.get( Config.API + '/solutions/problemID?id='+this.props.probID).then(function (response) {
            self.setState({
                solutions: response.data,
            })
        })
    }

    componentWillReceiveProps (nextProps){
        var self = this;
        return axios.get( Config.API + '/solutions/problemID?id='+this.props.probID).then(function (response) {
            self.setState({
                solutions: response.data,
            })
        })
    }

   render() {

      return (
        <div id="projectInteractMenu">
            <div id="solutionsTitleRightSB">Proposals</div>
            <a href='#proposalForm'>
                <div>
                    <img src={require('../../assets/blueAdd3.svg')} id="addBlueX" width="32" height="32" alt="Close button, red X symbol" />
                </div>
            </a>
            <ProblemTopSolutionsPrivate probID={this.props.probID} />
            <SolutionPrivateForm probID={this.props.probID} projectTitle={this.props.projectTitle} />
        </div>

      );
   }
}