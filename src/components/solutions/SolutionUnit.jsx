import React from 'react';
import { Link } from 'react-router';
import FullSolutionContainer from '../../containers/FullSolutionContainer.jsx';
import $ from 'jquery';


export default class SolutionUnit extends React.Component {

	render() {
		if (this.props.solutions === null) {
			alert("hey")
			return (
				<div>
					Hello
				</div>
			);
		} else {
			return (
				<div>
					<ul> {this.props.solutions.map(this.renderItem)} </ul>
				</div>
			);
		}
	}

	renderItem(solution) {
		function toggleProposal() {
			$(document).ready(function() {
				// $('#proposalToggleOff').toggle();
				$('#proposalToggleOff').attr('id','proposalToggleOn').hide().slideDown();
				$('#solutionUnit').attr('id','solutionUnitActive');				
				// alert('working');
			});
		};

    return (

        <li key={solution.ID}>
				<div id="solutionUnit" onClick={toggleProposal} >
					<div id="solutionUnitContainer">
						<div id="solutionPercent">{floatToDecimal(solution.PercentRank)}</div>
						<div id="solutionUnitTitle">{solution.Title}</div>
					</div>
				</div>
			{React.cloneElement(<FullSolutionContainer probID={solution.ProblemID} solutionID={solution.ID}  />)}
        </li>);
  }
}


//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}