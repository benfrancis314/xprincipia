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
        height: '390',
        width: '640',
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
                    videoId="URkZcTODs8c"
                    opts={opts}
                    onReady={this._onReady}
                />
            </div>
            <div id="tutorialContainer">
                <div id="fullTutorialWelcome">
                    <span id="introductionCapital">XP</span>rincipia<span id="introductionCapital"> G</span>uide
                    <br />
                </div>
            </div>
            {/* <div id="tutorialTableContents">
                <a href='#tutorialIndex1'>
                    <div id="tutorialIndexNumber">
                        I. Projects
                    </div>
                </a>
                <a href='#tutorialIndex2'>
                    <div id="tutorialIndexNumber">
                        II. Discuss
                    </div>
                </a>
                <a href='#tutorialIndex3'>
                    <div id="tutorialIndexNumber">
                        III. Proposals
                    </div>
                </a>
                <a href='#tutorialIndex4'>
                    <div id="tutorialIndexNumber">
                        IV. Learn
                    </div>
                </a>
                <a href='#tutorialIndex5'>
                    <div id="tutorialIndexNumber">
                        V. General
                    </div>
                </a>
            </div>
                    <div id="fullTutorialContainer">
                        <ScrollableAnchor id={'tutorialIndex1'}>
                            <div id="fullTutorialNumbers">
                                i. projects
                            </div>
                        </ScrollableAnchor>
                        <div id="fullTutorialProseStartSentence">
                            Welcome to<span id="blueOpen"> XPrincipia</span>.
                        </div>
                        <div id="fullTutorialProse">
                            Our goal is to<span id="blueOpen"> focus the human species </span>towards achieving its<span id="blueOpen"> best possible future</span>. 
                        </div>
                        <div id="fullTutorialProseBottom">
                            <span id="blueOpen">Four major projects are selected </span>to aim these efforts towards:
                        </div>
                        <div id="fullTutorialEmbed">
                            <div id="welcomeUnitsContainer">
                                <div id="width80">
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
                                                    Nanofabrication
                                                    <div id="SPPercent">25</div>
                                                </div>        
                                            </div>
                                        </li>
                                        <li id="welcomeUserProblemsUnit">
                                            <div id="welcomeUserProblemsHeader">
                                                <div id="welcomeUserProblemsTitle">
                                                    Genetic Diagnostics
                                                    <div id="SPPercent">24</div>
                                                </div>        
                                            </div>
                                        </li>
                                        <li id="welcomeUserProblemsUnit">
                                            <div id="welcomeUserProblemsHeader">
                                                <div id="welcomeUserProblemsTitle">
                                                    Elderly Care
                                                    <div id="SPPercent">19</div>
                                                </div>        
                                            </div>
                                        </li>
                                    </ul>	               
                                </div>
                            </div>
                        </div>
                        <ScrollableAnchor id={'tutorialIndex2'}>
                            <div id="fullTutorialNumbers">
                                ii. discuss
                            </div>
                        </ScrollableAnchor>
                        <div id="fullTutorialProseStart">
                            Each project is<span id="blueOpen"> broken down </span>into<span id="blueOpen"> more solvable sub projects</span>.
                        </div>
                        <div id="fullTutorialProseBottom">
                            This branching process is repeated,<span id="blueOpen"> creating a tree pattern</span>:
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
                                        This project details humanity's plan to colonize Mars. 
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
                                                    <div id="SPTitle">Martian Agriculture</div>
                                                    <div id="SPPercent">16</div>
                                                </div>
                                            </li>
                                            <li id="SPUnit">
                                                <div id="SPHeader">
                                                    <div id="SPTitle">Martian Life Support</div>
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
                                    <div id="proposalsTitleRightSB">discuss</div>
                                            <div id="sidebarDiscussMenu">
                                                <div id="discussGroup1">
                                                    <Link activeClassName="activeWhiteBorder">
                                                        <div id="SBDiscussButton">questions</div>
                                                    </Link>
                                                    <Link activeClassName="activeWhiteBorder">
                                                        <div id="SBDiscussButton">suggestions</div>
                                                    </Link>
                                                    <Link activeClassName="activeWhiteBorder">
                                                        <div id="SBDiscussButton">open debate</div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div id="questionContainer">
                                                        <div id="discussMenuEnd">
                                                            questions
                                                        </div>
                                                        <div id="questionFormComponent">
                                                            <form id="questionForm">
                                                                <fieldset id='fieldSetNoBorderPadding'>
                                                                        <textarea name="questionText" required="required" id="questionTextArea" placeholder="Ask a question you have about this project or view those asked by your peers. " ></textarea>
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
                                                                            <span id="blue">Q: </span>What is the timeline for creating a self-sustainable population?
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
                                                                            <span id="blue">Q: </span>How will the lower gravity affect archictural designs?
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
                        <ScrollableAnchor id={'tutorialIndex3'}>
                            <div id="fullTutorialNumbers">
                                iii. proposals
                            </div>
                        </ScrollableAnchor>
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
                                                    <div id="solutionPercent">33%</div>
                                                    <div id="solutionUnitTitle">SpaceX's Plan to Colonize Mars</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link >
                                            <div id="solutionUnit">
                                                <div id="solutionUnitContainer">
                                                    <div id="solutionPercent">33%</div>
                                                    <div id="solutionUnitTitle">NASA's Plan to Colonize Mars</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link >
                                            <div id="solutionUnit">
                                                <div id="solutionUnitContainer">
                                                    <div id="solutionPercent">33%</div>
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
                                                    <textarea name="solutionSummary" required="required" maxLength="400" placeholder="Please summarize your proposal here. (400 ch)" id="solutionSummaryForm"/>
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
                            Once created, each proposal undergoes a <span id="blueOpen"> pro-con analysis</span>. 
                        </div>
                        <div id="fullTutorialProseBottom">    
                            This process determines the best proposals and shows each user<span id="blueOpen"> how to develop their proposal</span>: 
                        </div>
                        <div id="fullTutorialEmbed">
                            <div id="fullWide">
                                <div id='fullSolutionContainer'>
                                    <div id="fullSolution">
                                        <div id="solutionIntro">
                                            
                                            <Link>
                                                <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
                                            </Link>
                                            <h1 id="solutionTitle">SpaceX's Plan to Colonize Mars</h1>
                                            <div id="proposalCreator">madelyn.sather</div>
                                            <p id="solutionSummary">
                                            It is SpaceX's goal to reduce the cost of space transportation and enable the human colonization of Mars.
                                            </p>
                                        </div>
                                        <div id="ProposalPercentFullGreen">
                                            35
                                        </div>
                                        <div id="voteVersionsMenu">
                                            <Link><div id="votedSolution">Voted</div></Link>
                                        </div>
                                        <div id="createDate">2017-08-2</div>
                                        <Link>
                                            <div id="proposalDevelopButton">
                                            Develop
                                            </div>
                                        </Link>

                                        <div id="prosConsMenu">
                                            <Link>
                                                <div id="prosButton">Pros</div>
                                            </Link>
                                            <Link>
                                                <div id="consButton">Cons</div>
                                            </Link>
                                        </div>
                                        <div id="proposalSubProjectsButton">
                                            Sub Projects
                                        </div>
                                        <div>
                                        <div id="suggestionContainer">
                                            <Link>
                                                <div >
                                                    <img src={require('../../assets/redX.svg')} id="closeRedX" width="35" height="35" alt="Close button, red X symbol" />
                                                </div>
                                            </Link>
                                        <div id="discussMenuEnd">
                                            Pros
                                        </div>
                                        <div id="suggestionFormComponent">
                                            <form id="suggestionForm">
                                                <fieldset  id='fieldSetNoBorderPadding'>
                                                    <textarea name="suggestionText" required="required" id="proTextArea" placeholder="Add a pro towards the merit of this proposal. " ></textarea>
                                                    <input type="button" value="Add" id="addProsCons"/>
                                                </fieldset>
                                            </form>
                                        </div>
                                        <ul>
                                            <li id="prosConsUnit">
                                                    <div id="suggestionContent">
                                                        <div id="discussHeader">
                                                            <span id="discussPercent">100%</span>
                                                            julie.chisolm
                                                        </div>
                                                        <div id="suggestionText">
                                                            The price of spaceflight has always been the limiting factor of human space colonization, so attacking the problem head on is best. 
                                                        </div>
                                                    </div>
                                                    <button type="button" id="suggestionVote">
                                                        Vote
                                                    </button> 
                                                <br /><br /> 
                                            </li>
                                        </ul>
                                        </div>    
                                        <div> 
                                            <div>
                                            <br />
                                            <div id="solutionFormLabel">Description</div>
                                            <p id="solutionDescription">
                                            Musk's Mars vision centers on a reusable rocket-and-spaceship combo that he's dubbed the Interplanetary Transport System (ITS). Both the booster and the spaceship will be powered by SpaceX's Raptor engine, still in development, which Musk said will be about three times stronger than the Merlin engines that power the company's Falcon 9 rocket.
                                            <br />
                                            <br />
                                            The booster, with its 42 Raptors, will be the most powerful rocket in history, by far. It will be capable of launching 300 metric tons (330 tons) to low Earth orbit (LEO), or 550 metric tons (600 tons) in an expendable variant, Musk said. 
                                            ITS rockets will launch the spaceships to Earth orbit, then come back down for a pinpoint landing about 20 minutes later.
                                            <br />
                                            <br />
                                            The ITS boosters will launch many spaceships and fuel tankers (which will top up the spaceships' tanks) to orbit over the course of their operational lives; the rockets will be designed to fly about 1,000 times each. The spaceships, meanwhile, will hang out in orbit, and then depart en masse when Earth and Mars align favorably. This happens once every 26 months. 
                                            <br />
                                            <br />
                                            Eventually Musk envisions 1,000 or more ITS spaceships, each carrying 100 or more people, leaving Earth orbit during each of these Mars windows. The architecture could conceivably get 1 million people to Mars within the next 50 to 100 years.
                                            <br />
                                            <br />
                                            The ships would also fly back from Mars, using their nine Raptor engines and methane-based propellant that was manufactured on the Red Planet. Each ITS ship would probably be able to make 12 to 15 deep-space journeys during its operational life and each fuel tanker could likely fly to Earth orbit 100 or so times.
                                            </p>
                                            </div>
                                            <div>
                                            <div id="solutionFormLabel">References</div>
                                            <p id="solutionReferences">
                                                https://www.space.com/37200-read-elon-musk-spacex-mars-colony-plan.html
                                            </p>
                                            </div>
                                            <br />
                                            <br />
                                            <p id="xp">XP</p>
                                            <br />
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ScrollableAnchor id={'tutorialIndex4'}>
                            <div id="fullTutorialNumbers">
                                iv. learn
                            </div>
                        </ScrollableAnchor>
                        <div id="fullTutorialProseStart">
                            Finally, users <span id="blueOpen"> are encouraged to learn </span>about each project. 
                        </div>
                        <div id="fullTutorialProseBottom">
                            <span id="blueOpen">The best resources </span>and<span id="blueOpen"> community-created lessons </span>are added and openly available:
                        </div>
                        <div id="fullTutorialEmbed">
                            <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
                            <div id="projectInteractDiscussMenu">
                                <div id="proposalsTitleRightSB">Learn</div>
                                <div id="sidebarDiscussMenu">
                                    <div id="discussGroup1">
                                        <Link activeClassName="activeWhiteBorder">
                                            <div id="SBDiscussButton">Lessons</div>
                                        </Link>
                                        <Link  activeClassName="activeWhiteBorder">
                                            <div id="SBDiscussButton">Resources</div>
                                        </Link>
                                    </div>
                                </div>
                                <div id="suggestionContainer">
                                    <div id="discussMenuEnd">
                                        Resources
                                    </div>
                                        <div id="suggestionFormComponent">
                                            <form id="questionForm">
                                                <fieldset id='fieldSetNoBorderPadding'>
                                                    <textarea name="suggestionText" required="required" id="resourcesTextArea" placeholder="Please enter the URL of your favorite resource to learn about this project." ></textarea>
                                                    <input type="button" value="Add" id="addSuggestion"/>
                                                </fieldset>
                                            </form>
                                        </div>
                                    <ul>
                                        <li id="questionUnit"> 
                                                <div id="suggestionContent">
                                                    <div id="discussHeader">
                                                        <span id="discussPercent">70%</span>
                                                        samarth.damania
                                                    </div>
                                                    <div id="learnResourcesLink">
                                                        <a target="_blank">
                                                            http://www.spacex.com/mars
                                                        </a>
                                                    </div>
                                                </div>
                                                <button type="button" id="suggestionVoteNoComments">
                                                    Vote
                                                </button>
                                        </li>
                                        <li id="questionUnit"> 
                                                <div id="suggestionContent">
                                                    <div id="discussHeader">
                                                        <span id="discussPercent">30%</span>
                                                        eric.albam
                                                    </div>
                                                    <div id="learnResourcesLink">
                                                        <a target="_blank">
                                                            http://www.spacex.com/sites/spacex/files/mars_presentation.pdf
                                                        </a>
                                                    </div>
                                                </div>
                                                <button type="button" id="suggestionVotedNoComments">
                                                    Voted
                                                </button>
                                        </li>
                                    </ul>
                                </div> 
                                <div id="proposalsTitleRightSBEnd"><br /></div>
                            </div>
                        </div>
                        <ScrollableAnchor id={'tutorialIndex5'}>
                            <div id="fullTutorialNumbers">
                                v. general
                            </div>
                        </ScrollableAnchor>
                        <div id="fullTutorialProseStart">
                           Everything on the site is<span id="blueOpen"> voted upon</span>. Whatever has the most 
                            votes rises to the top in a process inspired by <span id="blueOpen">natural selection</span>. 
                        </div>
                        <div id="fullTutorialProse">
                            All work created on XPrincipia belongs to the<span id="blueOpen"> public domain</span>. 
                        </div>
                        <div id="fullTutorialProse">
                            Through these processes,<span id="blueOpen"> sub projects towards the bottom of the tree </span>will develop 
                            quality proposals, allowing for higher level projects to be<span id="blueOpen"> achieved bottom-up</span>. 
                        </div>
                        <div id="fullTutorialProse">
                            Future sections of XPrincipia will be designed towards<span id="blueOpen"> democratically implementing these ideas</span>. 
                        </div>
                        <br /><br />
                        <div id="fullTutorialProseBottom">
                            Finally, we encourage you to break the rules.<br /><br /><span id="blueOpen"> Compete directly with others</span>,<span id="blueOpen"> create your own path</span><span id="blueOpen"> and think for yourself</span>. <br /><br />
                            With everyone working together in their own unique way,<span id="blueOpen"> more ideas will be tested and the best found</span>. 
                        </div>
                        <Link to="/welcome">
                            <div id="fullTutorialExplore">
                                Begin
                            </div>
                        </Link>
                        {randomImg()}
                        <div id="fullTutorialMotto" onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                            NULLIUS IN VERBA
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
