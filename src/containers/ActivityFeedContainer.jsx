import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

// import ReactGA from 'react-ga';

export default class WelcomeUserUnit extends React.Component {
   
    hoverFeedText() {
        $(document).ready(function() {
                $('#feedTitle').html("select filter").fadeIn(7500);
                $('#feedTitle').attr('id','feedTitleHover');
        });
    }
    unHoverFeedText() {
            $(document).ready(function() {
                    $('#feedTitleHover').html("discovery's past");
                    $('#feedTitleHover').attr('id','feedTitle');
            });
    }

	render() {
		return (
        <div id="feedContainer">
            <div id="feedTitle">
                discovery's past
            </div>
            <div id="feedUnitContainer">
                <div id="feedListDiv">
                    <ul id="feedUnitList"> 
                        {this.props.problems.map(this.renderItem)} 
                    </ul>	 
                    {/* Interesting concept to try, although change current style */}
                    {/* <div id="textBoxBottom">
                        <br />
                    </div>               */}
                </div>
                <div id="feedOptionsButton">
                    <img src={require('../assets/feedCircle1.svg')} id="feedCircleImg" onMouseOver={this.hoverFeedText} onMouseOut={this.unHoverFeedText} width="60" height="60" alt="User avatar, DNA Helix" />
                </div>
            </div>
            <div id="feedBottom">
                <br />
            </div>
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
        <li key={problem.ID} id="feedListUnit">
            <Link to={{pathname: '/project/'+problem.ID +'/subprojects'}} onClick={()=>{this.handleClick()}}>
                <div id="feedUnits">               
                    <div id="blueFeed">project by {problem.OriginalPosterUsername}</div>
                    <div id="whiteFeed">{problem.Title}</div>
                    <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
                </div>
            </Link>
        </li>
      );
   }
}

// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }
function dateTime(str) {
    if(str != undefined){
       var result = str.substring(0,10);
       return result
    }
}
