import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

// import ReactGA from 'react-ga';

export default class WelcomeUserUnit extends React.Component {
   
    hoverFeedText() {
        $(document).ready(function() {
                $('#feedTitle').html("select filter").fadeIn(7500);
                $('#feedTitle').attr('id','feedTitleHover');
                $('#feedBottom').attr('id','feedBottomBlue');
        });
    }
    unHoverFeedText() {
            $(document).ready(function() {
                    $('#feedTitleHover').html("new activity");
                    $('#feedTitleHover').attr('id','feedTitle');
                    $('#feedBottomBlue').attr('id','feedBottom');
            });
    }
    hoverAdd() {
        $(document).ready(function() {
                $('#feedTitle').html("new project").fadeIn(7500);
                $('#feedTitle').attr('id','feedTitleHover');
                $('#feedBottom').attr('id','feedBottomBlue');
        });
    }
    unHoverAdd() {
            $(document).ready(function() {
                    $('#feedTitleHover').html("new activity");
                    $('#feedTitleHover').attr('id','feedTitle');
                    $('#feedBottomBlue').attr('id','feedBottom');
            });
    }
    hoverLabel() {
        $(document).ready(function() {
                $('#feedTitle').html("new projects").fadeIn(7500);
                $('#feedTitle').attr('id','feedTitleHover');
                $('#feedBottom').attr('id','feedBottomBlue');
        });
    }
    unHoverLabel() {
            $(document).ready(function() {
                    $('#feedTitleHover').html("new activity");
                    $('#feedTitleHover').attr('id','feedTitle');
                    $('#feedBottomBlue').attr('id','feedBottom');
            });
    }

	render() {
        $(document).ready(function() {
            $('#feedTitleHover').html("new activity");
            $('#feedTitleHover').attr('id','feedTitle');
            $('#feedBottomBlue').attr('id','feedBottom');
        });
		return (
            <div id="feedUnitContainer">
                <div id="feedListDiv">
                    
                    <ul id="feedUnitList"> 
                        {this.props.problems.map(this.renderItem)}
                    </ul>	 
                </div>
                <div id="feedOptionsBar">
                    <div id="feedListType" onMouseOver={this.hoverLabel} onMouseOut={this.unHoverLabel}>
                        projects
                    </div>
                    <div id="feedOptionsButton">
                        <Link to="/welcome/filter" activeClassName="activeBlue">
                            {/* <a href='#proposals'> */}
                                <img src={require('../../assets/feedCircle1.svg')} id="feedCircleImg" onMouseOver={this.hoverFeedText} onMouseOut={this.unHoverFeedText} width="60" height="60" alt="User avatar, DNA Helix" />
                            {/* </a> */}
                        </Link>
                    </div>
                    <Link to="/welcome/create" activeClassName="activeBlue">
                        <div id="feedAddButton" onMouseOver={this.hoverAdd} onMouseOut={this.unHoverAdd}>
                            <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="35" height="35" alt="User avatar, DNA Helix" />
                        </div>
                    </Link>
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
    //   We do actually want to show projects on proposals here:
        // <li key={problem.ID} id="feedListUnit">
        //     <Link to={'/project/'+problem.ID +'/subprojects'}>
        //         <div id="feedUnits">               
        //             <div id="blueFeed">project by <span id="feedCaps">{problem.OriginalPosterUsername}</span></div>
        //             <div id="whiteFeed">{problem.Title}</div>
        //             <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
        //         </div>
        //     </Link>
        // </li>
        <div key={problem.ID} id="nodisplay">
        </div>
      
      
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
            <Link to={'/project/'+problem.ID +'/subprojects'}>
                <div id="feedUnits">               
                    <div id="blueFeed">project by <span id="feedCaps">{problem.OriginalPosterUsername}</span></div>
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
