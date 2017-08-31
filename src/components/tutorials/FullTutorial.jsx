import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ScrollableAnchor from 'react-scrollable-anchor';


export default class Tutorial extends React.Component {

    latinTranslate() {
        $(document).ready(function() {
            $('#fullTutorialMotto').attr('id','fullTutorialMotto2').hide();
            $('#fullTutorialMotto2').html('Question Authority').fadeIn(2750);
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
            <div id="tutorialContainer">
                    <div id="introductionWelcome">
                        <span id="introductionCapital">XP</span>rincipia<span id="introductionCapital"> T</span>utorial
                        <br />
                    </div>
            </div>
                    <div id="fullTutorialContainer">
                        <div id="fullTutorialNumbers">
                            I
                        </div>
                        <div id="fullTutorialProseStart">
                            Welcome to the beginning of<span id="blueOpen"> your XPrincipia experience</span>.
                        </div>
                        <div id="fullTutorialProse">
                            Our goal is to<span id="blueOpen"> focus the human species </span>towards achieving its<span id="blueOpen"> best possible future</span>. 
                        </div>
                        <div id="fullTutorialProseBottom">
                            <span id="blueOpen">Four major projects are selected </span>to focus these efforts towards:
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
                        <div id="fullTutorialProseTop">
                            You may also<span id="blueOpen"> create your own independent project</span>. 
                        </div>
                        <div id="fullTutorialProseBottom">
                            With an open mind and perspective,<span id="blueOpen"> almost all projects </span>
                            help advance progress or civilization:
                        </div>
                        <div id="fullTutorialEmbed">
                            <div id="createWelcomeButtonBox">
                                <h1 id="createWelcomeButton">Create a Project</h1>
                            </div>
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
                                                    Relatable Science Project Title
                                                    <div id="SPPercent">24</div>
                                                </div>        
                                            </div>
                                        </li>
                                        <li id="welcomeUserProblemsUnit">
                                            <div id="welcomeUserProblemsHeader">
                                                <div id="welcomeUserProblemsTitle">
                                                    Blood Testing Project Title
                                                    <div id="SPPercent">24</div>
                                                </div>        
                                            </div>
                                        </li>
                                        <li id="welcomeUserProblemsUnit">
                                            <div id="welcomeUserProblemsHeader">
                                                <div id="welcomeUserProblemsTitle">
                                                    Social Work Project Title
                                                    <div id="SPPercent">17</div>
                                                </div>        
                                            </div>
                                        </li>
                                    </ul>	               
                                </div>
                            </div>
                        </div>
                        <div id="fullTutorialNumbers">
                            II
                        </div>
                        <div id="fullTutorialProseStart">
                            Each project is<span id="blueOpen"> broken down </span>into<span id="blueOpen"> more solvable sub projects</span>.
                        </div>
                        <div id="fullTutorialProseBottom">
                            This process is repeated,<span id="blueOpen"> creating a tree pattern</span>:
                        </div>
                        <div id="fullTutorialEmbed">
                            <div id="maxContainerColumn">
                            <div id="problemColumn1Wide">
                                <div id="parentButton">
                                    <span id='blue'>Parent: </span>Mars
                                </div>
                            <div id="problemIntro">
                                <h1 id="problemTitle">Colonizing Mars</h1>
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
                                <div id="SBButton">
                                    Create a Sub Project
                                </div>
                                </div>
                                <div id="sidebarSBProjects">
                                    <div id="SPwrapper">
                                        <ul id="SPUnitList"> 
                                            <li>
                                                <img src={require('../../assets/leftArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                                            </li>
                                            <li id="SPUnit">
                                                <div id="SPHeader">
                                                    <div id="SPTitle">Martian Colonial Architecture</div>
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
                        <div id="fullTutorialProseSingle">
                            Projects are then discussed by<span id="blueOpen"> asking questions</span>,<span id="blueOpen"> adding suggestions </span>and<span id="blueOpen"> engaging in open debate</span>:
                        </div>
                        <div id="fullTutorialEmbed">
                                <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
                                <div id="projectInteractDiscussMenu">
                                    <div id="proposalsTitleRightSB">Discuss</div>
                                            <div id="sidebarDiscussMenu">
                                                <div id="discussGroup1">
                                                    <Link activeClassName="activeWhiteBorder">
                                                        <div id="SBDiscussButton">Questions</div>
                                                    </Link>
                                                    <Link activeClassName="activeWhiteBorder">
                                                        <div id="SBDiscussButton">Suggestions</div>
                                                    </Link>
                                                    <Link activeClassName="activeWhiteBorder">
                                                        <div id="SBDiscussButton">Open Debate</div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div id="questionContainer">
                                                        <div id="discussMenuEnd">
                                                            Questions
                                                        </div>
                                                        <div id="questionFormComponent">
                                                            <form id="questionForm">
                                                                <fieldset id='fieldSetNoBorderPadding'>
                                                                        <textarea name="questionText" required="required" id="questionTextArea" placeholder="Ask a question you have about this project or view those asked by your peers. " autoFocus ></textarea>
                                                                        <input type="button" value="Ask" id="askQuestion"/>
                                                                </fieldset>
                                                            </form>
                                                        </div>
                                                        <div id="questionUnitContainer">
                                                            <ul>
                                                                <li id="questionUnit"> 
                                                                    <div id="suggestionContent">
                                                                        <div id="discussHeader">
                                                                            <span id="discussPercent">60%</span>
                                                                            nancy.lynn
                                                                        </div>
                                                                        <div id="suggestionText">
                                                                            <span id="blue">Q: </span>Test question 1
                                                                        </div>
                                                                    </div>
                                                                    <Link activeClassName="activeGlow">
                                                                        <div id="commentSBButtonUser">
                                                                                <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                                                                        </div>                
                                                                    </Link>
                                                                    <button type="button" id="suggestionVoted">
                                                                        Voted
                                                                    </button>
                                                                </li>
                                                                <li id="questionUnit"> 
                                                                    <div id="suggestionContent">
                                                                        <div id="discussHeader">
                                                                            <span id="discussPercent">40%</span>
                                                                            darrin.evans
                                                                        </div>
                                                                        <div id="suggestionText">
                                                                            <span id="blue">Q: </span>Test question 2
                                                                        </div>
                                                                    </div>
                                                                    <Link activeClassName="activeGlow">
                                                                        <div id="commentSBButtonUser">
                                                                                <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                                                                        </div>                
                                                                    </Link>
                                                                    <button type="button" id="suggestionVoted">
                                                                        Voted
                                                                    </button>
                                                                </li>
                                                            </ul>	               
                                                        </div>
                                            </div>
                                    <div id="proposalsTitleRightSBEnd"><br /></div>
                                </div>
                        </div>
                        <div id="fullTutorialNumbers">
                            III
                        </div>
                        <div id="fullTutorialProseStart">
                            The most important aspect of the site is<span id="blueOpen"> proposals</span>. 
                        </div>
                        <div id="fullTutorialProse">    
                            All ideas to<span id="blueOpen"> solve or achieve each project </span>can be represented by proposals. 
                        </div>
                        <div id="fullTutorialProseBottom">    
                            They may be<span id="blueOpen"> novel ideas from the community</span> or <span id="blueOpen"> already established ideas</span> from outside references:
                        </div>
                        <div id="fullTutorialEmbed">
                            <div id="projectInteractMenu">
                                <div id="solutionsTitleRightSB">Proposals</div>
                                <a href='#proposalForm'>
                                    <div>
                                        <img src={require('../../assets/blueAdd3.svg')} id="addBlueX" width="32" height="32" alt="Close button, red X symbol" />
                                    </div>
                                </a>
                                <ul> 
                                    <li>
                                        <Link >
                                            <div id="solutionUnit">
                                                <div id="solutionUnitContainer">
                                                    <div id="solutionPercent">25%</div>
                                                    <div id="solutionUnitTitle">SpaceX's Plan to Colonize Mars</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link >
                                            <div id="solutionUnit">
                                                <div id="solutionUnitContainer">
                                                    <div id="solutionPercent">25%</div>
                                                    <div id="solutionUnitTitle">NASA's Plan to Colonize Mars</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link >
                                            <div id="solutionUnit">
                                                <div id="solutionUnitContainer">
                                                    <div id="solutionPercent">25%</div>
                                                    <div id="solutionUnitTitle">Mars One's Plan to Colonize Mars</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link >
                                            <div id="solutionUnit">
                                                <div id="solutionUnitContainer">
                                                    <div id="solutionPercent">25%</div>
                                                    <div id="solutionUnitTitle">United Arab Emirate's Plan to Colonize Mars</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                                <div>
                                    {randomImg()}
                                    <div id="createSolutionBox">
                                        <ScrollableAnchor id={'proposalForm'}>
                                            <div id="proposalFormCreateTitle">
                                                    New Proposal
                                            </div>
                                        </ScrollableAnchor>

                                        <form id="createForm">
                                            <fieldset id="fieldSetSideBorder">
                                                <label htmlFor="solutionTitle" id="projectTitleProposalFormLabel">Project Title<br />
                                                <h1 id="proposalCreateProjectTitle">Colonize Mars</h1>
                                                </label><br />

                                                <label htmlFor="solutionTitle" id="solutionTitleFormLabel">Proposal Title<br />
                                                    <input type="text" name="solutionTitle" required="required" maxLength="140" id="solutionTitleForm" />
                                                </label><br />

                                                <label htmlFor="solutionSummary" id="solutionSummaryFormLabel">Summary<br />
                                                    <textarea name="solutionSummary" required="required" maxLength="400" placeholder="Please summarize your proposal here. (400 character max)" id="solutionSummaryForm"/>
                                                </label><br />

                                                <label htmlFor="solutionDescription" id="solutionDescriptionFormLabel">Description<br />
                                                    <textarea name="solutionDescription" required="required" placeholder="Please describe your proposal here." id="solutionDescriptionForm">
                                                    </textarea></label><br />

                                                <label htmlFor="solutionReferences" id="solutionReferenceFormLabel">References <span id="gray">(Optional)</span><br />
                                                    <textarea name="solutionReferences" placeholder="Please provide any references here." id="solutionReferencesForm">
                                                    </textarea></label><br />
                                                <input type="button" value="Create" id="submitSolution"/>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="fullTutorialProseTop">
                            Once created, each proposal<span id="blueOpen"> undergoes a pro-con analysis</span>. 
                        </div>
                        <div id="fullTutorialProseBottom">    
                            This process determines the best proposals and shows each user<span id="blueOpen"> how to improve their proposal</span>: 
                        </div>
                        <div id="fullTutorialEmbed">
                            X
                        </div>
                        <div id="fullTutorialNumbers">
                            IV
                        </div>
                        <div id="fullTutorialProseStart">
                            Finally, users may<span id="blueOpen"> further their knowledge </span>of each project for future contributions. 
                        </div>
                        <div id="fullTutorialProseBottom">
                            <span id="blueOpen">Learning resources </span>and<span id="blueOpen"> user-customized lessons </span>are created and openly available:
                        </div>
                        <div id="fullTutorialEmbed">
                            X
                        </div>
                        <div id="fullTutorialNumbers">
                            V
                        </div>
                        <div id="fullTutorialProseStart">
                            For all aspects of the site,<span id="blueOpen"> the best contributions are voted upon</span>. Those with the most 
                            votes rise to the top in a<span id="blueOpen"> process inspired by natural selection</span>. 
                        </div>
                        <div id="fullTutorialProse">
                            All work on XPrincipia belongs to the<span id="blueOpen"> public domain</span>. 
                        </div>
                        <div id="fullTutorialProse">
                            Through these processes,<span id="blueOpen"> sub projects towards the bottom of the tree </span>will develop 
                            quality proposals, allowing for higher level projects to be<span id="blueOpen"> achieved bottom-up</span>. 
                        </div>
                        <div id="fullTutorialProseBottom">
                            Future sections of XPrincipia will be designed towards<span id="blueOpen"> democratically implementing these ideas</span>. 
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
