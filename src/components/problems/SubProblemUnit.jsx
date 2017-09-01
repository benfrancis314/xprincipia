import React from 'react';
import {Link} from 'react-router';
import ReactGA from 'react-ga';

export default class SubProblemUnit extends React.Component {

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

    return (

        <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'} onClick={handleClick}>
					<li key={problem.ID} id="SPUnit">
						<div id="SPHeader">
							<div id="SPTitle">{problem.Title}</div>
							<div id="SPPercent">{problem.Rank}</div>
							{/*<div>
								<img src={require('../assets/voteArrow.png')} id="SPVote" width="20" height="20" alt="Vote arrow, blue up arrow" />
							</div>*/}
						</div>
					</li>
				</Link>

	);
  }
}

//convert float to Decimal
// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }