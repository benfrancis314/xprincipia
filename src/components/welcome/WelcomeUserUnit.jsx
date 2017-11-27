import React from 'react';
import { Link } from 'react-router';
// import ReactGA from 'react-ga';

export default class WelcomeUserUnit extends React.Component {
   
	render() {
		return (
	    <div id="SPListDivUnitContainer">
            <ul id="welcomeUserProblemsUnitList"> 
                {this.props.problems.map(this.renderItem)} 
            </ul>	               
	    </div>
		);
	}
	renderItem(problem) {
  

// For Google Analytics when working
    // function handleClick() {
    //     ReactGA.event({
    //         category: 'Project',
    //         action: 'Clicked Link',
    //     });
    // }
if (problem.Private === true) {
        return (
            <div key={problem.ID} id="nodisplay">
            </div>
        );

} else if (problem.ParentType === 1) {

      return (
      
            <li key={problem.ID} id="nodisplay">
            </li>
      
      
      );

} else if (problem.Title === 'Interstellar Civilization') {

      return (
      
        <li key={problem.ID} id="nodisplay">
        </li>
      
      
      );

} else if (problem.Title === 'Evolving Humanity') {
      return (
        <li key={problem.ID} id="nodisplay">
        </li>
      
      );
} else if (problem.Title === 'Theoretical Knowledge') {
      return (
        <li key={problem.ID} id="nodisplay">
        </li>
      
      );
} else if (problem.Title === 'Technology Development') {
      return (
        <li key={problem.ID} id="nodisplay">
        </li>
      
      );
} else 
      return (
        <li key={problem.ID} id="welcomeUserProblemsUnit">
            <Link to={'/project/'+problem.ID +'/subprojects'}>
                <div id="welcomeUserProblemsHeader">
                    <div id="welcomeUserProblemsTitle">
                        <div id="welcomeProjectPercent">
                            {problem.Rank}
                        </div>
                        <div id="welcomeProblemsTitleText">
                            {problem.Title}
                        </div>
                    </div>
                </div>
            </Link>
        </li>
      );
   }
}

// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }
