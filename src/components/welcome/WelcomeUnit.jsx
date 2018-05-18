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
    
    if (problem.Title === 'interstellar civilization') {

        return (
            <li key={problem.ID} id="welcomeProblemsUnit">
                <Link to={'/project/'+problem.ID +'/subprojects'} >
                    {randomInterstellar()}
                </Link>
            </li>
        );

    } else if (problem.Title === 'evolving humanity') {
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
    } else if (problem.Title === 'describing reality') {
        return (
            <li key={problem.ID} id="welcomeProblemsUnit">
                <Link to={'/project/'+problem.ID +'/subprojects'}>
                    {randomReality()}
                </Link>
            </li>

        );
    } else if (problem.Title === 'advancing technology') {
        return (
            <li key={problem.ID} id="welcomeProblemsUnit">
                <Link to={'/project/'+problem.ID +'/subprojects'}>
                    <div id="welcomeProblemsHeader4">
                        <div id="welcomeProblemsTitle">
                            advancing
                            <br />
                            technology
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

function randomInterstellar() {
    if (Math.random() < 0.5) {
      return (
        <div id="welcomeProblemsHeader1">
            <div id="welcomeProblemsTitle">
                interstellar 
                <br />
                civilization
            </div>
        </div>
      )
    } else if (Math.random() < 1){
      return (
        <div id="welcomeProblemsHeader1Jupiter">
            <div id="welcomeProblemsTitle">
                interstellar 
                <br />
                civilization
            </div>
        </div>
      );
    }
}

function randomReality() {
    if (Math.random() < 0.5) {
        return (
            <div id="welcomeProblemsHeader3">
                <div id="welcomeProblemsTitle">
                    describing
                    <br />
                    reality
                </div>
            </div>
        );
    } else if (Math.random() < 1){
        return (
            <div id="welcomeProblemsHeader3Lion">
                <div id="welcomeProblemsTitle">
                    describing
                    <br />
                    reality
                </div>
            </div>
        );
    }
}