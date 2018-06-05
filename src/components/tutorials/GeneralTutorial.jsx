import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ScrollableAnchor from 'react-scrollable-anchor';
import YouTube from 'react-youtube';


export default class Tutorial extends React.Component {

// Old hover function, not sure if I will end up using it
    // latinTranslate() {
    //     alert('success');
    //     $(document).ready(function() {
    //         $('#fullTutorialMotto').attr('id','fullTutorialMotto2').hide();
    //         $('#fullTutorialMotto2').html('Question Authority').fadeIn(5500);
    //     });
    // }

    hoverText() {
			$(document).ready(function() {
					$('#fullTutorialMotto').html("QUESTION AUTHORITY").fadeIn(7500);
					$('#fullTutorialMotto').attr('id','fullTutorialMotto2');
			});
	}
	unHoverText() {
			$(document).ready(function() {
					$('#fullTutorialMotto2').html("NULLIUS IN VERBA");
					$('#fullTutorialMotto2').attr('id','fullTutorialMotto');
			});
	}
    // Can't quite get the untranslate to work smoothly, so I'm leaving it out for now
    // latinUntranslate() {
    //     $(document).ready(function() {
    //         $('#fullTutorialMotto2').attr('id','fullTutorialMotto');
    //         $('#fullTutorialMotto').html('Nullius in verba'); 
    //     });
    // }

   render() {
    $(document).ready(function() {
        $('#introductionContainer').hide().slideDown(500);
    });

    const opts = {
        // OLD
        // height: '390',
        // width: '640',
        // CURRENT
        height: '487.5',
        width: '800',
        playerVars: { // https://developers.google.com/youtube/player_parameters 
            autoplay: 1
        }
    };
      return (
        
        <div id="fullWide">
            {/*I would prefer slide from side than fade transition*/}
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={2000}
                transitionEnter={false}
                transitionLeave={false}>
            <div id="fullTutorialHeader">
                <Link to="/welcome">
                    <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />            
                </Link>
            </div>
            <div id="demoVideoContainer">
                <YouTube
                    videoId="ohGhU4rg-PQ"
                    opts={opts}
                    onReady={this._onReady}
                />
            </div>
            {/* <div id="tutorialContainer">
                <div id="fullTutorialWelcome">
                    <span id="introductionCapital">XP</span>rincipia<span id="introductionCapital"> G</span>uide
                    <br />
                </div>
            </div> */}

            </ReactCSSTransitionGroup>
          </div>
      ); 
   }
}

function randomImg() {
    if (Math.random() < 0.125) {
    return <img src={require('../../assets/orionLogo.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.25){
    return <img src={require('../../assets/heroLogo.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.375){
    return <img src={require('../../assets/dragonConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.5){
    return <img src={require('../../assets/hunterConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.625){
    return <img src={require('../../assets/queenConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.75){
    return <img src={require('../../assets/pegasusConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.875){
    return <img src={require('../../assets/archerConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 1){
    return <img src={require('../../assets/greatBearConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    }
}
