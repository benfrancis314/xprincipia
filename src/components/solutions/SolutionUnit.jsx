import React from 'react';
import { Link } from 'react-router';

export default class SolutionUnit extends React.Component {

//   constructor(props){
//         super(props);

//         this.state = {
//             solutions: []
//         }

//     };

//     getInitialState(){
//         var self = this;
//         window.scrollTo(0,0);
//         return axios.get( Config.API + '/solutions/problemID?id='+this.props.probID).then(function (response) {
//             self.setState({
//                 solutions: response.data
//             })
//         })
//     }


	render() {
		return (
	    <div>
			<ul> {this.props.solutions.map(this.renderItem)} </ul>
	    </div>

		);
	}

	renderItem(solution) {

    return (

        <li key={solution.ID}>
			<Link to={`/fullsolution/${solution.ProblemID}/${solution.ID}/full`}>
				<div id="solutionUnit">
					<div id="solutionUnitContainer">
						<div id="solutionPercent">{floatToDecimal(solution.PercentRank)}</div>
						<div id="solutionUnitTitle">{solution.Title}</div>
					</div>
				</div>
			</Link>
        </li>);
  }
}


//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}