import React from 'react';
import { Link } from 'react-router';


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

	if (solution.Title.includes('k')) {
    return (
			<li key={solution.ID}>
				<Link to={`/project/private/${solution.ProblemID}/proposal/${solution.ID}`} >
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
	} else if (solution.Title.includes('d')) {
    return (
		<li key={solution.ID}>
				<Link to={`/project/private/${solution.ProblemID}/proposal/${solution.ID}`} >
					<div id="solutionUnitGreen">
						<div id="solutionUnitContainer">
							<div id="solutionPercentGreen">{floatToDecimal(solution.PercentRank)}</div>
							<div id="solutionUnitTitle">
								<span id="greenProposal">plan</span>
								<br />
								{solution.Title}
							</div>
						</div>
					</div>
				<div id="proposalToggleOff">
					{/*{React.cloneElement(<FullSolution probID={solution.ProblemID} solutionID={solution.ID}  />)}*/}
				</div>
				</Link>
			</li>);
	} else {
		return (
			<li key={solution.ID}>
				<Link to={`/project/private/${solution.ProblemID}/proposal/${solution.ID}`} >
					<div id="solutionUnitRed">
						<div id="solutionUnitContainer">
							<div id="solutionPercentRed">{floatToDecimal(solution.PercentRank)}</div>
							<div id="solutionUnitTitle">
								<span id="redProposal">solution</span>
								<br />
								{solution.Title}
							</div>
						</div>
					</div>
				<div id="proposalToggleOff">
					{/*{React.cloneElement(<FullSolution probID={solution.ProblemID} solutionID={solution.ID}  />)}*/}
				</div>
				</Link>
			</li>);
	}
}
}


//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}