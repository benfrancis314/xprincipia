import React from 'react';
import { Link } from 'react-router';


export default class SolutionUnit extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: [],
			probID: [],
			linkPath: '',
        }
		this.renderItem = this.renderItem.bind(this);
    };

  componentWillReceiveProps(nextProps){
	  var self = this
		if (window.location.pathname.includes('private')) {
			self.setState({
				linkPath: '/project/private/',
			})
		} else {
			self.setState({
				linkPath: '/project/',
			})
		}
		self.setState({
			solutions: nextProps.solutions,
			probID: nextProps.probID
		})
  }


	render() {
			return (
				<div>
					{this.state.solutions.map(this.renderItem)}
				</div>
			);
	}

	renderItem(solution) {

		// function scrollToProposal() {
		// 	document.getElementById('fullSolutionContainer').scrollIntoView()
		// }


		if (solution.Class === 2) {
			return (
					<Link key={solution.ID}
          // onClick={scrollToProposal.bind(this)}
		  to={this.state.linkPath+solution.ProblemID+'/proposal/'+solution.ID}>
						<div id="solutionUnitRed">
							<div id="solutionUnitContainer">
								<div id="solutionPercentRed">{floatToDecimal(solution.PercentRank)}</div>
								<div id="solutionUnitTitle">
									<div id="redProposal">solution</div>
									{solution.Title}
								</div>
							</div>
						</div>
						<div id="proposalToggleOff">
							{/* <FullSolution probID={solution.ProblemID} solutionID={solution.ID}  /> */}
						</div>
					</Link>
				);
			} else if (solution.Class === 1) {
			return (
					<Link key={solution.ID}
          // onClick={scrollToProposal.bind(this)}
          to={this.state.linkPath+solution.ProblemID+'/proposal/'+solution.ID}>
						<div id="solutionUnitGreen">
							<div id="solutionUnitContainer">
								<div id="solutionPercentGreen">{floatToDecimal(solution.PercentRank)}</div>
								<div id="solutionUnitTitle">
									<div id="greenProposal">plan</div>
									{solution.Title}
								</div>
							</div>
						</div>
						<div id="proposalToggleOff">
							{/*<FullSolution probID={solution.ProblemID} solutionID={solution.ID}  />*/}
						</div>
					</Link>
				);
			} else {
				return (
					<Link key={solution.ID}
          // onClick={scrollToProposal.bind(this)} 
          to={this.state.linkPath+solution.ProblemID+'/proposal/'+solution.ID}>
						<div id="solutionUnit">
							<div id="solutionUnitContainer">
								<div id="solutionPercent">{floatToDecimal(solution.PercentRank)}</div>
								<div id="solutionUnitTitle">{solution.Title}</div>
							</div>
						</div>
						<div id="proposalToggleOff">
							{/*<FullSolution probID={solution.ProblemID} solutionID={solution.ID}  />*/}
						</div>
					</Link>
				);
			}
		}
}


//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}
