import React from 'react';
import {Link} from 'react-router';
import axios from 'axios'
import {Config} from '../../config.js';
import ProblemTopSolutions from './ProblemTopSolutions.jsx';
import SolutionForm from '../solutions/SolutionForm.jsx';
// import ScrollableAnchor from 'react-scrollable-anchor';
// import { configureAnchors } from 'react-scrollable-anchor';

// configureAnchors({offset: -50, scrollDuration: 900});



export default class ProblemSolutionsMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: [],
            probID: []
        }
        this.goToProposalForm = this.goToProposalForm.bind(this)

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

goToProposalForm() {
    window.scrollBy(0,500);
//   if (window.location.pathname.includes('questions') || window.location.pathname.includes('suggestions') || window.location.pathname.includes('freeforms') || window.location.pathname.includes('learn') )
//   {
//     window.scrollTo(0, 1900);
//   }
//   else if (window.location.pathname.includes('create')) {
//     window.scrollTo(0, 1380);
//   }
//   else {
//     window.scrollTo(0, 1400);
//   } 
}

   render() {

      return (
        <div id="projectInteractMenu">
            <div id="solutionsTitleRightSB">Proposals</div>
            {/*onClick scroll to proposal form*/}
            {/*<a href='#proposals'>*/}
                <div onClick={this.goToProposalForm}>
                    <img src={require('../../assets/blueAdd3.svg')} id="addBlueX" width="32" height="32" alt="Close button, red X symbol" />
                </div>
            {/*</a>*/}
            <ProblemTopSolutions probID={this.props.probID} />
            {/*<ScrollableAnchor id={'proposalForm'}>*/}
                <SolutionForm probID={this.props.probID} projectTitle={this.props.projectTitle}/>
            {/*</ScrollableAnchor >*/}
        </div>

      );
   }
}