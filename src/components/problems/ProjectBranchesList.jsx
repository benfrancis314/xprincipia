import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class SubProblemUnit extends React.Component {

	hoverNewBranch() {
			$(document).ready(function() {
					$('#privateContainerMotto').html("NEW BREAKDOWN").fadeIn(7500);
					$('#privateContainerMotto').attr('id','privateContainerMottoWhite');
			});
	}
	unHoverNewBranch() {
			$(document).ready(function() {
					$('#privateContainerMottoWhite').html("PROJECT BREAKDOWN");
					$('#privateContainerMottoWhite').attr('id','privateContainerMotto');
			});
	}

  constructor(){
  super();
  this.state = {
	  branches: []
  }
  this.renderItem = this.renderItem.bind(this);  
  };

//   componentWillReceiveProps(nextProps){
// 	  var self = this
// 	  self.setState({problems: nextProps.problems})
//   }
componentWillReceiveProps(nextProps){
	var self = this;
	axios.get( Config.API + '/breakdowns/byproblem?parentID='+nextProps.probID).then(function (response) {
		self.setState({
			branches: response.data
		})
		// alert(response.data.length);
	})       
}


	render() {
		return (
			<div id="branchUnitList"> 
				<li>
					<img src={require('../../assets/leftArrow.svg')} id="branchArrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
				</li>
				<Link to={`/project/${this.props.probID}/create/breakdown`} activeClassName="activeBranchCreateButton">
					<li id="branchUnit">
						<div id="branchHeader" onMouseOver={this.hoverNewBranch} onMouseOut={this.unHoverNewBranch}>
							<img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="80" height="80" alt="User avatar, DNA Helix" />
						</div>
					</li>
				</Link>
                {this.state.branches.map(this.renderItem)}
				<li>
					<img src={require('../../assets/rightArrow.svg')} id="branchArrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
				</li>
			</div>
		);
	}
	renderItem(branch) {

    // Use if title is longer than certain amount
//  if (branch.Title.length > 50) {
    // if (1) {
return (
	<Link key={branch.ID} to={'/project/'+branch.ParentID +'/subprojects/'+branch.ParentID}>
		<li key={branch.ID} id="branchUnit">
			<div id="branchHeader">
				<div id="branchTitle">{branch.Title}</div>
			</div>
		</li>
	</Link>

);
// } else {
// 	return (
//         <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'}>
// 			<li key={problem.ID} id="SPUnit">
// 				<div id="SPHeader">
// 					<div id="SPTitle">{problem.Title}</div>
// 					<div id="SPPercent">{problem.Rank}</div>
// 				</div>
// 			</li>
// 		</Link>
// 	)};
  }
}

//convert float to Decimal
// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }