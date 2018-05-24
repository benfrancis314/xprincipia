import React from 'react';
import { Link } from 'react-router';
// import ReactGA from 'react-ga';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-104103231-1'); //Unique Google Analytics tracking number


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
    

function handleClick1() {
    ReactGA.event({
        category: 'View Centralized',
        action: 'Future Civilization',
    });
  }
  function handleClick2() {
    ReactGA.event({
        category: 'View Centralized',
        action: 'Evolving Humanity',
    });
  }
  function handleClick3() {
    ReactGA.event({
        category: 'View Centralized',
        action: 'Describing Reality',
    });
  }
  function handleClick4() {
    ReactGA.event({
        category: 'View Centralized',
        action: 'Advancing Technology',
    });
  }


    if (problem.Title === 'future civilization') {

        return (
            <li key={problem.ID} id="welcomeProblemsUnit" onClick={()=>{handleClick1()}}>
                <Link to={'/project/'+problem.ID +'/subprojects'} >
                    {randomInterstellar()}
                </Link>
            </li>
        );

    } else if (problem.Title === 'evolving humanity') {
        return (
            <li key={problem.ID} id="welcomeProblemsUnit" onClick={()=>{handleClick2()}}>
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
            <li key={problem.ID} id="welcomeProblemsUnit" onClick={()=>{handleClick3()}}>
                <Link to={'/project/'+problem.ID +'/subprojects'}>
                    {randomReality()}
                </Link>
            </li>

        );
    } else if (problem.Title === 'advancing technology') {
        return (
            <li key={problem.ID} id="welcomeProblemsUnit" onClick={()=>{handleClick4()}}>
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
                future
                <br />
                civilization
            </div>
        </div>
      )
    } else if (Math.random() < 1){
      return (
        <div id="welcomeProblemsHeader1Jupiter">
            <div id="welcomeProblemsTitle">
                future 
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
