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

// If using GA, add this to each project button: onClick={()=>{this.handleClick()}}
    
    if (problem.Title === 'Interstellar Civilization') {

        return (
            <li key={problem.ID} id="welcomeProblemsUnit">
                <Link to={'/project/'+problem.ID +'/subprojects'} >
                    <div id="welcomeProblemsHeader1">
                        <div id="welcomeProblemsTitle">
                            interstellar 
                            <br />
                            civilization
                        </div>
                    </div>
                </Link>
            </li>
        );

    } else if (problem.Title === 'Evolving Humanity') {
        return (
            <li key={problem.ID} id="welcomeProblemsUnit">
                <Link to={'/project/'+problem.ID +'/subprojects'}>
                    <div id="welcomeProblemsHeader2">
                        <div id="welcomeProblemsTitle">
                            evolving
                            <br />
                            humanity
                        </div>
                    </div> 
                </Link>
            </li>

        
        );
    } else if (problem.Title === 'theoretical knowledge') {
        return (
            <li key={problem.ID} id="welcomeProblemsUnit">
                <Link to={'/project/'+problem.ID +'/subprojects'}>
                    <div id="welcomeProblemsHeader3">
                        <div id="welcomeProblemsTitle">
                            describing
                            <br />
                            reality
                        </div>
                    </div>
                </Link>
            </li>

        );
    } else if (problem.Title === 'Technology Development') {
        return (
            <li key={problem.ID} id="welcomeProblemsUnit">
                <Link to={'/project/'+problem.ID +'/subprojects'}>
                    <div id="welcomeProblemsHeader4">
                        <div id="welcomeProblemsTitle">
                            technology
                            <br />
                            development
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
