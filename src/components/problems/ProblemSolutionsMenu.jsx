import React from 'react';
import {Link} from 'react-router';
import axios from 'axios'
import {Config} from '../../config.js';
import ProblemTopSolutions from './ProblemTopSolutions.jsx';
import SolutionForm from '../solutions/SolutionForm.jsx'



export default class ProblemSolutionsMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: []
        }

    };

    getInitialState(){
        var self = this;
        window.scrollTo(0,0);
        return axios.get( Config.API + '/auth/solutions/problemID?id='+this.props.probID).then(function (response) {
            self.setState({
                solutions: response.data
            })
        })
    }

        componentDidMount(){
        var self = this;
        window.scrollTo(0,0);
        return axios.get( Config.API + '/auth/solutions/problemID?id='+this.props.probID).then(function (response) {
            self.setState({
                solutions: response.data
            })
        })
    }

    componentWillReceiveProps (nextProps){
        var self = this;
        window.scrollTo(0,0);
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
            <ProblemTopSolutions probID={this.props.probID} />
            <SolutionForm probID={this.props.probID} projectTitle={this.props.projectTitle}/>
        </div>

      );
   }
}