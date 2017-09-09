import React from 'react';
import {Link} from 'react-router';
import ReactGA from 'react-ga';

export default class PrivateProjectUnit extends React.Component {

//   constructor(){
// Commented out until ready
//   super();
//   this.state = {
// 	  problems: []
//   }

//   };

// Commented out until ready
    //On recieving new props
//   componentWillReceiveProps(nextProps){
// 	  var self = this
// 	  self.setState({problems: nextProps.problems})
//   }


	render() {
		return (
	    <div id="SPwrapper">
			<ul id="SPUnitList"> 
				<li>
					<img src={require('../../assets/leftArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
				</li>
                {/*Commented out for testing*/}
				{/*{this.state.problems.map(this.renderItem)}*/}
                <li id="SPUnit">
                    <div id="SPHeaderPrivate">
                        <div id="SPTitle">DMT Theory</div>
                        <div id="SPPercent">1</div>
                    </div>
				</li>
                <li id="SPUnit">
                    <div id="SPHeaderPrivate">
                        <div id="SPTitle">Evolving Intelligence</div>
                        <div id="SPPercent">2</div>
                    </div>
				</li>
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
// Commented out until ready
        // <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'} onClick={handleClick}>
					// <li key={problem.ID} id="SPUnit">
						<div id="SPHeader">
							{/*<div id="SPTitle">{problem.Title}</div>*/}
							{/*<div id="SPPercent">{problem.Rank}</div>*/}
						</div>
					// </li>
				// </Link>

	);
  }
}

//convert float to Decimal
// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }