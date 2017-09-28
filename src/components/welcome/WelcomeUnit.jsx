import React from 'react';
import { Link } from 'react-router';
// import ReactGA from 'react-ga';

export default class WelcomeUnit extends React.Component {
   
	render() {
		return (
	    <div id="SPWelcomeListDiv">
			<ul id="welcomeProblemsUnitList"> 
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
    
    if (problem.Title === 'Interstellar Civilization') {

        return (
            <li key={problem.ID} id="welcomeProblemsUnit">
                <Link to={{pathname: '/project/'+problem.ID +'/subprojects'}} onClick={()=>{this.handleClick()}}>
                    <div id="welcomeProblemsHeader1">
                        <div id="welcomeProblemsTitle">
                            {problem.Title}
                        </div>
                    </div>
                </Link>
            </li>
        );

    } else if (problem.Title === 'Evolving Humanity') {
        return (
            <li key={problem.ID} id="welcomeProblemsUnit">
            <Link to={{pathname: '/project/'+problem.ID +'/subprojects'}} onClick={()=>{this.handleClick()}}>
                    <div id="welcomeProblemsHeader2">
                        <div id="welcomeProblemsTitle">
                            {problem.Title}
                        </div>
                    </div> 
                </Link>
            </li>

        
        );
    } else if (problem.Title === 'Theoretical Knowledge') {
        return (
            <li key={problem.ID} id="welcomeProblemsUnit">
            <Link to={{pathname: '/project/'+problem.ID +'/subprojects'}} onClick={()=>{this.handleClick()}}>
                    <div id="welcomeProblemsHeader3">
                        <div id="welcomeProblemsTitle">
                            {problem.Title}
                        </div>
                    </div>
                </Link>
            </li>

        );
    } else if (problem.Title === 'Technology Development') {
        return (
            <li key={problem.ID} id="welcomeProblemsUnit">
                <Link to={{pathname: '/project/'+problem.ID +'/subprojects'}} onClick={()=>{this.handleClick()}}>
                    <div id="welcomeProblemsHeader4">
                        <div id="welcomeProblemsTitle">
                            {problem.Title}
                        </div>
                    </div>
                </Link>
            </li>
            

        );
    } else 
        return (
            <li key={problem.ID} id="nodisplay"></li>
        );
    }
}
