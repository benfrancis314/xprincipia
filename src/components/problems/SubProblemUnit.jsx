import React from 'react';
import {Link} from 'react-router';
import ReactGA from 'react-ga';
import $ from 'jquery';

export default class SubProblemUnit extends React.Component {

	hoverText() {
			$(document).ready(function() {
					$('#privateContainerMotto').html("NEW SUB PROJECT").fadeIn(7500);
					$('#privateContainerMotto').attr('id','privateContainerMottoBlue');
			});
	}
	unHoverText() {
			$(document).ready(function() {
					$('#privateContainerMottoBlue').html("PROJECT BREAKDOWN");
					$('#privateContainerMottoBlue').attr('id','privateContainerMotto');
			});
	}

  constructor(){
  super();
  this.state = {
	  problems: []
  }

  };


		// Not sure what this is used for
    // componentDidMount(){
    //   var self = this;
	  // if (self.props.problem != null ){
		//   self.setState({problems: this.props.problems})
	  // }
    //   return
    // }

    //On recieving new props
  componentWillReceiveProps(nextProps){
	  var self = this
	  self.setState({problems: nextProps.problems})
  }


	render() {
		return (
	    <div id="SPwrapper">
			<ul id="SPUnitList"> 
				<li>
					<img src={require('../../assets/leftArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
				</li>
				<Link to={`/project/${this.props.probID}/create`} activeClassName="activePrivateCreateButton">
						<li id="SPUnit">
								<div id="SPHeader" onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
										<img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="80" height="80" alt="User avatar, DNA Helix" />
								</div>
						</li>
				</Link>
				{this.state.problems.map(this.renderItem)}
				<li>
					<img src={require('../../assets/rightArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
				</li>
			</ul>
		</div>
		);
	}
	renderItem(problem) {

				function handleClick() {
					ReactGA.event({
							category: 'Project',
							action: 'Clicked Link',
					});
					// alert('success');
    }
if (problem.ParentType === 1) {
        return (
            <div key={problem.ID} id="nodisplay">
            </div>
        );

// Ensure to copy this so that it works for Goals and Problems too
// This makes text smaller if problem length is larger
} else if (problem.Title.length > 50) {
return (
	<Link key={problem.ID} to={'/project/private/'+problem.ID +'/subprojects'} onClick={handleClick}>
		<li key={problem.ID} id="SPUnit">
			<div id="SPHeader">
				<div id="SPTitleSmall">{problem.Title}</div>
				<div id="SPPercent">{problem.Rank}</div>
			</div>
		</li>
	</Link>

);
} else if (problem.Title.includes('s')) {
    return (
        <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'} onClick={handleClick}>
			<li key={problem.ID} id="SPUnit">
				<div id="SPHeader">
					<div id="SPTitle">{problem.Title}</div>
					<div id="SPPercent">{problem.Rank}</div>
				</div>
			</li>
		</Link>

	);
} else if (problem.Title.includes('e')) {
    return (
        <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'} onClick={handleClick}>
			<li key={problem.ID} id="SPUnit">
				<div id="SPHeaderGreen">
					<div id="SPTitleGreen">
						<span id="green">goal</span>
						<br />
						{problem.Title}
					</div>
					<div id="SPPercent">{problem.Rank}</div>
				</div>
			</li>
		</Link>
	);
} else {
	return (
        <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'} onClick={handleClick}>
			<li key={problem.ID} id="SPUnit">
				<div id="SPHeaderRed">
					<div id="SPTitleRed">
						<span id="red">problem</span>
						<br />
						{problem.Title}
					</div>
					<div id="SPPercent">{problem.Rank}</div>
				</div>
			</li>
		</Link>
	)};
  }
}

//convert float to Decimal
// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }