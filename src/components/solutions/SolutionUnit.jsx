import React from 'react';
import { Link } from 'react-router';
import FullSolution from './FullSolution.jsx';
import $ from 'jquery';
import axios from 'axios';
import {Config} from '../../config.js';


export default class SolutionUnit extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: [],
            probID: []
        }

    };

  componentWillReceiveProps(nextProps){
	  var self = this
	  self.setState({
		  solutions: nextProps.solutions,
		  probID: nextProps.probID
	  })
  }


	render() {
		if (this.state.solutions === null) {
			alert("hey")
			return (
				<div>
					Hello
				</div>
			);
		} else {
			return (
				<div>
            		{/*x{this.state.probID}x*/}
					<ul> {this.state.solutions.map(this.renderItem)} </ul>
				</div>
			);
		}
	}

	renderItem(solution) {
		function toggleProposal() {
			$(document).ready(function() {
				$('#proposalToggleOff').attr('id','proposalToggleOn').hide().slideDown();
				$('#solutionUnit').attr('id','solutionUnitActive');				
			});
		};

		return (
			<li key={solution.ID}>
				<Link to={`/problem/${solution.ProblemID}/proposal/${solution.ID}`} >
					<div id="solutionUnit">
						<div id="solutionUnitContainer">
							<div id="solutionPercent">{floatToDecimal(solution.PercentRank)}</div>
							<div id="solutionUnitTitle">{solution.Title}</div>
						</div>
					</div>
				<div id="proposalToggleOff">
					{/*{React.cloneElement(<FullSolution probID={solution.ProblemID} solutionID={solution.ID}  />)}*/}
				</div>
				</Link>
			</li>);
	}
}


//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}