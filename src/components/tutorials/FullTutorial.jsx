import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class Tutorial extends React.Component {

    latinTranslate() {
        $(document).ready(function() {
            $('#fullTutorialMotto').attr('id','fullTutorialMotto2');
            $('#fullTutorialMotto2').hide().html('Question Authority').fadeIn(1000);
        });
    }
    latinUntranslate() {
        $(document).ready(function() {
            $('#fullTutorialMotto2').attr('id','fullTutorialMotto');
            $('#fullTutorialMotto').html('Nullius in verba'); 
        });
    }

   render() {
    $(document).ready(function() {
        $('#introductionContainer').hide().slideDown(500);
    });

      return (
        <div id="fullWide">
            {/*I would prefer slide from side than fade transition*/}
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={2000}
                transitionEnter={false}
                transitionLeave={false}>
            <Link to="/welcome">
                <div id="welcomeIntroductionButtonActive">
                    Explore
                </div>
            </Link>
            <div id="introductionContainer">
                    <div id="introductionWelcome">
                        <span id="introductionCapital">W</span>elcome to <span id="introductionCapital"> XP</span>rincipia
                        <br />
                    </div>
            </div>
                    <div id="fullTutorialContainer">
                        <div id="fullTutorialProse">
                            Welcome to the beginning of your XPrincipia experience.
                        </div>
                        <div id="fullTutorialProse">
                            Our goal is to focus the human species towards achieving its best possible future. 
                        </div>
                        <div id="fullTutorialProse">
                            Four major projects are selected to focus our efforts towards. 
                        </div>
                        <div id="fullTutorialEmbed">
                            <div id="welcomeUnitsContainer">
                                <div id="SPListDiv">
                                    <ul id="welcomeProblemsUnitList"> 
                                        <li id="welcomeProblemsUnit">
                                            <div id="welcomeProblemsHeader1">
                                                <div id="welcomeProblemsTitle">
                                                    Interstellar Civilization
                                                </div>
                                            </div>
                                        </li>
                                        <li id="welcomeProblemsUnit">
                                            <div id="welcomeProblemsHeader2">
                                                <div id="welcomeProblemsTitle">
                                                    Evolving Humanity
                                                </div>
                                            </div>
                                        </li>
                                        <li id="welcomeProblemsUnit">
                                            <div id="welcomeProblemsHeader3">
                                                <div id="welcomeProblemsTitle">
                                                    Theoretical Knowledge
                                                </div>
                                            </div>
                                        </li>
                                        <li id="welcomeProblemsUnit">
                                            <div id="welcomeProblemsHeader4">
                                                <div id="welcomeProblemsTitle">
                                                    Technology Development
                                                </div>
                                            </div>
                                        </li>
                                    </ul>     
                                </div>
                            </div>
                        </div>
                        <div id="fullTutorialProse">
                            You may also create your own indpendent project. With an open mind, most projects 
                            do work towards advancing progess or civilization.
                        </div>
                        <div id="fullTutorialEmbed">
                            <div id="welcomeFormComponent">
                                <form id="exploreWelcomeForm">
                                    <input type="search" name="search" placeholder="Search all projects" id="exploreInput" />
                                </form>
                            </div>
                            <div id="welcomeUserUnitsContainer">
                                <div id="SPListDiv">
                                    <ul id="welcomeUserProblemsUnitList"> 
                                        <li id="welcomeUserProblemsUnit">
                                            <div id="welcomeUserProblemsHeader">
                                                <div id="welcomeUserProblemsTitle">
                                                    Science Project Title
                                                    <div id="SPPercent">24</div>
                                                </div>        
                                            </div>
                                        </li>
                                        <li id="welcomeUserProblemsUnit">
                                            <div id="welcomeUserProblemsHeader">
                                                <div id="welcomeUserProblemsTitle">
                                                    Social Work Title
                                                    <div id="SPPercent">17</div>
                                                </div>        
                                            </div>
                                        </li>
                                    </ul>	               
                                </div>
                            </div>
                        </div>
                        <div id="fullTutorialProse">
                            Each project is broken down into more solvable sub projects. This process is repeated, 
                            creating a tree pattern. 
                        </div>
                        <div id="fullTutorialEmbed">
                            <div id="maxContainerColumn">
                            <div id="problemColumn1">
                                <div id="parentButton">
                                    <span id='blue'>Parent: </span>XPrincipia Projects
                                </div>
                            <div id="problemIntro">
                                <h1 id="problemTitle">XPrincipia</h1>
                            </div>
                            <div id="problemRow1">
                                    <Link><div id="voteProblem">
                                        Vote
                                    </div></Link>
                                    <a>
                                    <div id="SBButtonDiscuss">Proposals</div>
                                    </a>
                                    <Link activeClassName="activeBlue">
                                        <div id="SBButtonDiscuss">Discuss</div>
                                    </Link>
                                    <Link activeClassName="activeBlue">
                                    <div id="SBButtonLearn">Learn</div>
                                    </Link>
                                </div>
                                <div id="projectCreator">
                                xprincipia
                                </div>

                                <div id="projectPercent">30</div>
                                <div id="fullProblem">
                                <p id="problemSummary">
                                    What are the best methods to colonize Mars?
                                </p>
                                </div>
                                {/*What should be here?*/}
                                {/*{React.cloneElement(this.props.children)}*/}
                                </div>
                                <div id="sidebarSBProjects">
                                    <div id="SPwrapper">
                                        <ul id="SPUnitList"> 
                                            <li>
                                                <img src={require('../../assets/leftArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                                            </li>
                                            <li id="SPUnit">
                                                <div id="SPHeader">
                                                    <div id="SPTitle">SP 1 (Martian Architecture?)</div>
                                                    <div id="SPPercent">20</div>
                                                </div>
                                            </li>
                                            <li id="SPUnit">
                                                <div id="SPHeader">
                                                    <div id="SPTitle">SP 2</div>
                                                    <div id="SPPercent">16</div>
                                                </div>
                                            </li>
                                            <li id="SPUnit">
                                                <div id="SPHeader">
                                                    <div id="SPTitle">SP 3</div>
                                                    <div id="SPPercent">13</div>
                                                </div>
                                            </li>
                                            <li>
                                                <img src={require('../../assets/rightArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="fullTutorialProse">
                            Projects are then discussed by asking questions, adding suggestions and engaging in open debate. 
                        </div>
                        <div id="fullTutorialEmbed">
                            X
                        </div>
                        <div id="fullTutorialProse">
                            The most important aspect of the site is<span id="blue"> proposals</span>. All ideas to solve or 
                            achieve the project can be represented by proposals. They may be novel from the user or be promoting 
                            an already established idea. 
                        </div>
                        <div id="fullTutorialEmbed">
                            X
                        </div>
                        <div id="fullTutorialProse">
                            Once created, they may undergo a pro-con analysis. This determines the best proposals and shows 
                            each proposal how it may improve. 
                        </div>
                        <div id="fullTutorialEmbed">
                            X
                        </div>
                        <div id="fullTutorialProse">
                            Finally, users may further their knowledge of each project for future contributions. 
                            Learning resources and user-customized lessons are created and openly available. 
                        </div>
                        <div id="fullTutorialEmbed">
                            X
                        </div>
                        <div id="fullTutorialProse">
                            For all aspects of the site, the best contributions are voted upon. Those with the most 
                            votes rise to the top in a process inspired by natural selection. 
                        </div>
                        <div id="fullTutorialProse">
                            All work on XPrincipia belongs in the public domain. 
                        </div>
                        <div id="fullTutorialProse">
                            Through these processes, sub projects towards the bottom of the tree will develop 
                            quality proposals, allowing for higher level projects to be achieved bottom-up. 
                        </div>
                        <div id="fullTutorialProse">
                            Future sections of XPrincipia will be designed towards democratically implementing these ideas. 
                        </div>
                        <div id="fullTutorialExplore">
                            Explore
                        </div>
                        {randomImg()}
                        <div id="fullTutorialMotto" onMouseOver={this.latinTranslate} onMouseOut={this.latinUntranslate}>
                            Nullius in verba
                        </div>
                    </div>
            
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
    } else if (Math.random() < 0.1){
    return <img src={require('../../assets/greatBearConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
    }
}
