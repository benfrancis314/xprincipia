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
                    $('#feedTitleHover').html("discovery's past");
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
                    $('#feedTitleHover').html("discovery's past");
                    $('#feedTitleHover').attr('id','feedTitle');
                    $('#feedBottomBlue').attr('id','feedBottom');
            });
    }
    hoverLabel() {
        $(document).ready(function() {
                $('#feedTitle').html("new suggestions").fadeIn(7500);
                $('#feedTitle').attr('id','feedTitleHover');
                $('#feedBottom').attr('id','feedBottomBlue');
        });
    }
    unHoverLabel() {
            $(document).ready(function() {
                    $('#feedTitleHover').html("discovery's past");
                    $('#feedTitleHover').attr('id','feedTitle');
                    $('#feedBottomBlue').attr('id','feedBottom');
            });
    }

	render() {
        $(document).ready(function() {
            $('#feedTitleHover').html("discovery's past");
            $('#feedTitleHover').attr('id','feedTitle');
            $('#feedBottomBlue').attr('id','feedBottom');
        });
		return (
            <div id="feedUnitContainer">
                <div id="feedListDiv">
                    <ul id="feedUnitList"> 
                        {this.props.suggestions.map(this.renderItem)}
                    </ul>	 
                </div>
                <div id="feedOptionsBar">
                    <div id="feedListType" onMouseOver={this.hoverLabel} onMouseOut={this.unHoverLabel}>
                        suggestions
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
	renderItem(suggestion) {
  

// For Google Analytics when working
    // function handleClick() {
    //     ReactGA.event({
    //         category: 'Project',
    //         action: 'Clicked Link',
    //     });
    // }
if (suggestion.Private === true) {
        return (
            <div key={suggestion.ID} id="nodisplay">
            </div>
        );
// We may want to show suggestions that are on proposals too
} else if (suggestion.ParentType === 1) {

      return (
        // //   If don't want to show proposal suggestions
        //         // <li key={suggestion.ID} id="nodisplay">
        //         // </li>
        // //   If we do want to show proposal suggestions
        //         <li key={suggestion.ID} id="feedListUnit">
        //         <Link to={{pathname: '/project/'+suggestion.ID +'/subprojects'}} onClick={()=>{this.handleClick()}}>
        //             <div id="feedUnits">               
        //                 <div id="blueFeed">project:<span id="feedCaps"> {suggestion.Username}</span></div>
        //                 <div id="whiteFeed">{suggestion.Description}</div>
        //                 <div id="feedDate">{dateTime(suggestion.CreatedAt)}</div>
        //             </div>
        //         </Link>
        //     </li>
        <div key={suggestion.ID} id="nodisplay">
        </div>
      
      );
} else 
      return (
        <li key={suggestion.ID} id="feedListUnit">
            <Link to={'/project/'+suggestion.ID +'/subprojects'}>
                <div id="feedUnits">  
                     {/* Used to say "suggestion on: ... " or "Q: ... " or just the title */}
                    <div id="blueFeedProse">project:<span id="feedCaps"> {suggestion.ParentTitle}</span></div>
                    <div id="whiteFeedProse">{suggestion.Description}</div>
                    <div id="feedDateProse">{dateTime(suggestion.CreatedAt)}</div>
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
