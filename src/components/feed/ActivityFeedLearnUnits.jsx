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
                $('#feedTitle').html("new lessons").fadeIn(7500);
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
                        {this.props.lessons.map(this.renderItem)}
                    </ul>	 
                </div>
                <div id="feedOptionsBar">
                    <div id="feedListType" onMouseOver={this.hoverLabel} onMouseOut={this.unHoverLabel}>
                        learn
                    </div>
                    <div id="feedOptionsButton">
                        <Link to="/welcome/filter" activeClassName="activeBlue">
                            {/* <a href='#proposals'> */}
                                <img src={require('../../assets/feedCircle1.svg')} id="feedCircleImg" onMouseOver={this.hoverFeedText} onMouseOut={this.unHoverFeedText} width="60" height="60" alt="User avatar, DNA Helix" />
                            {/* </a> */}
                        </Link>
                    </div>
                </div>
            </div>
		);
	}
	renderItem(lesson) {
  

// For Google Analytics when working
    // function handleClick() {
    //     ReactGA.event({
    //         category: 'Project',
    //         action: 'Clicked Link',
    //     });
    // }
if (lesson.Private === true) {
        return (
            <div key={lesson.ID} id="nodisplay">
            </div>
        );
// We may want to show questions that are on proposals too
} else if (lesson.ParentType === 1) {

      return (
        <div key={lesson.ID} id="nodisplay">
        </div>
        // Setup for questions on solutions too, may need new field for its secondary parent, the project of the solution
        // <li key={question.ID} id="feedListUnit">
        //     <Link to={'/project/'+question.ID +'/subprojects'}>
        //         <div id="feedUnits">               
        //             <div id="blueFeed">project:<span id="feedCaps"> {question.ParentTitle}</span></div>
        //             <div id="whiteFeed">{question.Description}</div>
        //             <div id="feedDate">{dateTime(question.CreatedAt)}</div>
    //         </div>
        //     </Link>
        // </li>
      
      );
} else 
      return (
        <li key={lesson.ID} id="feedListUnit">
            <Link to={'/project/'+lesson.TypeID +'/lesson'}>
                <div id="feedUnits">  
                    <div id="blueFeedProse">{lesson.ParentTitle}</div>
                    <div id="whiteFeed">{lesson.Title}</div>
                    <div id="feedDateDiscussProse">{dateTime(lesson.CreatedAt)}</div>
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
