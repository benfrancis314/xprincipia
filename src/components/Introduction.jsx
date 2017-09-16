import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import IntroductionRegister from './IntroductionRegister'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class Introduction extends React.Component {

   render() {
    $(document).ready(function() {
        $('#introductionContainer').hide().slideDown(500);
    });
      return (
        <div id="fullWide">
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
                {/*Considering change to "The Open Frontier of Discovery/Science*/}
                {/*Not currently using*/}
                {/*<div id="introductionTitle">The Open Frontier of Research</div>*/}
                <div id="introductionProse">
                    <span id="introductionCapitalProse">within the near future,</span> technologies will<span id="blueOpen"> radically reshape our world</span>.
                    <br />
                    <br />
                    <span id="introductionCapitalProse">human spaceflight, genetic engineering, artificial intelligence</span> and many other advancements will pair to propel humanity towards a new state of civilization,<span id="blueOpen"> possibly within our lifetimes</span>.  
                    <br />
                    <br />
                    <span id="introductionCapitalProse">to reach these goals,</span> we believe as much of the human population as possible should be working<span id="blueOpen"> towards their achievement</span>. 
                    <br />
                    <br />
                    <span id="introductionCapitalProse">XPrincipia </span>is designed as a system<span id="blueOpen"> to allow this process to occur</span>. 
                    <br />
                    <br />
                    <span id="introductionCapitalProse">our goal </span>is to allow anyone to<span id="blueOpen"> contribute directly towards this cause</span>. 
                    <br />
                    <br />
                    <span id="introductionCapitalProse">we organize this process </span>by allowing users to work together in projects, creating proposals to solve these problems<span id="blueOpen"> and achieve these goals</span>. 
                    <br />
                    <br />
                    <span id="introductionCapitalProse">in this process, </span>you are also given a centralized location for your own work, currently in the form of<span id="blueOpen"> a private Mind Temple</span>. 
                    <br />
                    <br />
                    <span id="introductionCapitalProse">if you would like </span>to join this mission or access your Mind Temple, please<span id="greenOpen"> register </span>and<span id="blueOpen"> begin exploring</span>. 
                </div>

                <IntroductionRegister />
                <Link to="/welcome">
                    <div id="introductionExploreButton">
                        Explore
                    </div>
                </Link>

                <div id="introductionProjectsProse"> 
                    Help humanity reach the stars
                </div>
                <Link to={`/project/7/subprojects`}>
                    <div id="introductionProjectHeader1">
                        <div id="introductionProjectTitle">
                            Interstellar Civilization
                        </div>
                    </div>
                </Link>
                
                <div id="introductionProjectsProse">
                    Purposely evolve the human body and mind
                </div>
                {/*Link each to the actual project - check url on active site*/}
                <Link to={`/project/8/subprojects`}>
                    <div id="introductionProjectHeader2"> 
                        <div id="introductionProjectTitle">
                            Evolving Humanity
                        </div>
                    </div>
                </Link>
                <div id="introductionProjectsProse">
                    Seek to understand our universe
                </div>
                <Link to={`/project/9/subprojects`}>
                    <div id="introductionProjectHeader3">
                        <div id="introductionProjectTitle">
                            Theoretical Knowledge
                        </div>
                    </div>
                </Link>
                <div id="introductionProjectsProse">
                    {/*Design the tools needed for all scopes of our ambitions:*/}
                    Design technologies to change the world
                </div>
                <Link to={`/project/10/subprojects`}>
                    <div id="introductionProjectHeader4">
                        <div id="introductionProjectTitle">
                            Technology Development
                        </div>
                    </div>
                </Link>
                {/*<div id="introductionProjectsProse">
                    Here are the projects towards progressing our technologies, tools which have shaped our history so far, and will continue to shape our future, including advances such as artificial intelligence and nanostructures.
                </div>*/}
            </div>
            
            {randomImg()}

            </ReactCSSTransitionGroup>
          </div>
      );
   }
}

function randomImg() {
if (Math.random() < 0.125) {
  return <img src={require('../assets/orionLogo.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.25){
  return <img src={require('../assets/heroLogo.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.375){
  return <img src={require('../assets/dragonConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.5){
  return <img src={require('../assets/hunterConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.625){
  return <img src={require('../assets/queenConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.75){
  return <img src={require('../assets/pegasusConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.875){
  return <img src={require('../assets/archerConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.1){
  return <img src={require('../assets/greatBearConstellation.svg')} id="middleAlignOrionIntro" width='70' height='100' alt="Back arrow, blue up arrow" />
}
}


// Draft 1

/*Welcome to XPrincipia: The Open Frontier of Research.

Here anyone, regardless of background or class, may openly contribute to and join today’s cutting edge of scientific research and technology development. 

For the first time, we allow every impassioned person with internet access to explore the frontier of modern projects towards advancing our human civilization into its proper future. 

Included along this frontier are the projects driving humanity towards becoming an interstellar civilization and perfecting our biological organism out of choice; included here are the aims of completing our theoretical understanding of the universe we find ourselves in and of developing the technologies needed for all scopes of these ambitions. 

These goals sit high in challenge and in so need not only institutions nor the private sector in work towards them, but rather the force of all prepared and willing minds towards their achievement. 

For the first time, we allow <blue>every</> skilled craftsman to directly contribute towards the aims of each challenging project. 

For the first time, we invite <blue>you</>, wherever you may come from, to create and breakdown new projects, to design and discover your own proposals towards each aim and to debate those of your peers, with perfection in mind by all. 

For the first time, we unveil a system attempting to truly and absolutely democratize science and human progress, utilizing the advent of the internet and the growing ambition of our generations, culminating in this moment. 

For the unlearnt or virtuously determined mind, we provide a new way to learn, allowing peer to teach peer with focus upon mastering each project for future achievement. 

For all of the collected works and every waiting decision, <blue>your vote</> determines the most important projects, the best proposals and the most valuable points of discussion. 

The entire architecture of XPrincipia, constantly shifting at democratic will, is up to you.

Our success, and the fruit it may bare, is up to us all. 

Welcome to XPrincipia.

(Register)

(Explore -> [Takes to Welcome page])*/






// Draft 2 - Lincoln Inspiration

/*Here anyone, <span id="blueOpen">regardless of background </span>or class, may openly contribute to and <span id="blueOpen">join today's cutting edge </span>of 
scientific <span id="blueOpen">research </span>and technology <span id="blueOpen">development</span>.
<br />
<br />
For <span id="blueOpen">the first time</span>, we allow every impassioned person with internet access to <span id="blueOpen">explore the frontier </span>of modern projects 
towards <span id="blueOpen">advancing our human civilization </span>into its <span id="blueOpen">greatest future</span>. 
<br />
<br />
Included along this frontier are the projects driving humanity towards <span id="blueOpen">becoming a spacefaring civilization </span>and <span id="blueOpen">perfecting our 
biological organism</span>, out of choice. Included here are the aims of <span id="blueOpen">completing our theoretical understanding </span>of the universe we 
find ourselves in and of <span id="blueOpen">designing the technologies needed </span>for all scopes of these ambitions. 
<br />
<br />
These goals sit high in challenge and thus <span id="blueOpen">need more than just our institutions and private sector </span>in work towards them; 
rather, the force of <span id="blueOpen">all prepared and willing minds </span>will be needed if our aim is their achievement. 
<br />
<br />
For the first time, we allow <span id="blueOpen">every skilled craftsman </span>to directly contribute towards the ambitions 
of each project, no matter how demanding. 
<br />
<br />
For the first time, <span id="blueOpen">we invite you</span>, wherever you may come from, to <span id="blueOpen">create and breakdown projects </span>new and old, 
to <span id="blueOpen">design and discover your own proposals </span>towards each aim and to <span id="blueOpen">debate those of your peers</span>, with perfection in mind by all. 
<br />
<br />
For the first time, we <span id="blueOpen">unveil a system </span>attempting to truly and absolutely <span id="blueOpen">democratize science</span> and human progress, utilizing the advent of 
the internet and the growing ambition of our generations, <span id="blueOpen">culminating in this moment</span>.
<br />
<br />
For the apprenticed or virtuously determined mind, we provide a <span id="blueOpen">new way to learn</span>, allowing <span id="blueOpen">peer to teach peer </span>with focus upon mastering 
each project for future achievement.
<br />
<br />
For all of the collected works and <span id="blueOpen">every waiting decision</span>, <span id="blueOpen">your vote </span>determines the most important projects, 
the best proposals and the most valuable points of discussion.
<br />
<br />
The <span id="blueOpen">entire architecture and works</span>of XPrincipia, constantly shifting at <span id="blueOpen">democratic will</span>, is up to you.
<br />
<br />
<br />
Our success, and the <span id="blueOpen">fruit it may bare</span>, is up to us all.
<br />
<br />
<span id="blueOpen">Welcome to XPrincipia.</span>*/



// Draft 3 - Kennedy Inspiration

          /*<div id="introductionContainer">
                <div id="introductionWelcome">
                    <span id="introductionCapital">W</span>elcome to <span id="introductionCapital"> XP</span>rincipia
                    <br />
                </div>
                Considering change to "The Open Frontier of Discovery/Science
                Not currently using
                <div id="introductionTitle">The Open Frontier of Research</div>
                <div id="introductionProse">
                    <span id="introductionCapitalProse">W</span>e find ourselves in an<span id="blueOpen"> age of great opportunity</span>, but equally in an<span id="blueOpen"> age of great peril</span>. 
                    <br />
                    <br />
                    We find ourselves in the <span id="blueOpen">upturn of an era</span> where the <span id='blueOpen'>advances of science and technology </span>
                    hold our collective future,<span id="blueOpen"> as a species and civilization</span>,
                    upon their conclusion. 
                    <br />
                    <br />
                    Upon this unique moment in time, we find ourselves <span id="blueOpen">looking ahead into the unknown</span>, 
                    in great need of<span id="blueOpen"> a great people to represent the best of our species</span>, who will take our 
                    challenges into their own hands and will. 
                    <br />
                    <br />
                    A
                    <span id="blueOpen">We call upon you</span>, and everyone with the <span id="blueOpen">spirit of 
                    discovery in heart</span>, to take up this challenge 
                    of all ages and <span id="blueOpen">shape the future of our species</span>.
                    B
                    <span id="blueOpen">We call upon you</span> to take up this mission, to solve each problem we encounter and<span id="blueOpen"> shape the future of our species</span>.
                    <br />
                    <br />
                    We call upon you for this <span id="blueOpen">adventure of all time</span>, looking not at where you come from but <span id="blueOpen"> 
                    where you will take us</span>. 
                    <br />
                    <br />
                    <span id="blueOpen">Join the frontier of all knowledge</span> and<span id="blueOpen"> will of discovery</span>, the focus of where we are and 
                    where we choose to go. 
                    <br />
                    <br />
                    <span id="blueOpen">Each project along this path </span>will be broken down with <span id="blueOpen">thought and efficiency</span>, for which 
                    <span id="blueOpen"> new proposals will be created </span>to achieve or solve each project.
                    <br />
                    <br />
                    <span id="blueOpen">Discussion and debate </span>will be held with <span id="blueOpen">rigor and deterimation</span>, and 
                    <span id="blueOpen"> targeted education </span>will be <span id='blueOpen'>designed with patience </span>and <span id="blueOpen">used with ambition</span>. 
                    <br />
                    <br />
                    Proposals are<span id='blueOpen'> weighed by pro and con</span>, and the best will be<span id="blueOpen"> determined by democratic vote</span>.
                    <br />
                    <br />
                    In the end, <span id="blueOpen">an architecture will be built with the greatest works of our time </span>held inside and a<span id='blueOpen'> blueprint 
                    designed for a better tomorrow</span>. 
                    <br />
                    <br />
                    <span id="blueOpen">At no point in this process will we rest</span>, our eyes focused upon what is at grasp ahead. 
                    <br />
                    <br />
                    We ask you to<span id="blueOpen"> join this cause</span>, to explore this frontier and dedicate your will to advance our world,
                    with the knowledge that<span id="blueOpen"> together we will not fail</span>.     
                </div>

                <IntroductionRegister />

                <div id="introductionProse"> 
                    Join the effort to make humanity into a spacefaring civilization
                </div>
                <div id="introductionProjectHeader1">
                    <div id="introductionProjectTitle">
                        Interstellar Civilization
                    </div>
                </div>
                <div id="introductionProjectsProse">
                    Choose to evolve our species into a more perfect state of being:
                </div>
                <div id="introductionProjectHeader2">
                    <div id="introductionProjectTitle">
                        Evolving Humanity
                    </div>
                </div>
                <div id="introductionProjectsProse">
                    Complete our oldest endeavor, to fully understand the world we find ourselves in:
                </div>
                <div id="introductionProjectHeader3">
                    <div id="introductionProjectTitle">
                        Theoretical Knowledge
                    </div>
                </div>
                <div id="introductionProjectsProse">
                    Design the tools needed for all scopes of our ambitions:
                    Shape our world with tools, the force that has always driven it:
                </div>
                <div id="introductionProjectHeader4">
                    <div id="introductionProjectTitle">
                        Technology Development
                    </div>
                </div>
            </div>*/



// Draft 4
{/*<div id="introductionProse">
                    <span id="introductionCapitalProse">W</span>e find ourselves in an<span id="blueOpen"> age of great opportunity</span>, but equally in an<span id="blueOpen"> age of great peril</span>. 
                    <br />
                    <br />
                    We find ourselves in the <span id="blueOpen">upturn of an era</span> where the <span id='blueOpen'>advances of science and technology </span>
                    hold our collective future,<span id="blueOpen"> as a species and civilization</span>,
                    upon their conclusion. 
                    <br />
                    <br />
                    Upon this unique moment in time, we find ourselves <span id="blueOpen">looking ahead into the unknown</span>, 
                    in great need of<span id="blueOpen"> a great people to represent the best of our species</span>, who will take our 
                    challenges into their own hands and will. 
                    <br />
                    <br />
                    A
                    <span id="blueOpen">We call upon you</span>, and all pioneers with the <span id="blueOpen">spirit of 
                    discovery in heart</span>, to take up this challenge 
                    of all ages and <span id="blueOpen">shape the future of our species</span>.
                    B
                    <br />
                    <br />
                    We call upon you for this <span id="blueOpen">adventure of all time</span>, looking not at where you come from but <span id="blueOpen"> 
                    where you will take us</span>. 
                    <br />
                    <br />
                    <span id="blueOpen">Join the frontier of all knowledge</span> and<span id="blueOpen"> will of discovery</span>, the focus of where we are and 
                    where we choose to go. 
                    <br />
                    <br />
                    <span id="blueOpen">Each project along this path </span>will be broken down with <span id="blueOpen">thought and efficiency</span>, for which 
                    <span id="blueOpen"> new proposals will be created </span>to achieve or solve each project.
                    <br />
                    <br />
                    <span id="blueOpen">Discussion and debate </span>will be held with <span id="blueOpen">rigor and deterimation</span> and 
                    <span id="blueOpen"> targeted education </span>will be <span id='blueOpen'>designed with patience </span>and <span id="blueOpen">used with ambition</span>. 
                    <br />
                    <br />
                    Proposals will<span id='blueOpen'> weighed by pro and con</span> and the best<span id="blueOpen"> determined by democratic vote</span>.
                    <br />
                    <br />
                    In the end, <span id="blueOpen">an architecture will be built with the greatest works of our time </span>held inside and a<span id='blueOpen'> blueprint 
                    designed for a better tomorrow</span>. 
                    <br />
                    <br />
                    We ask you to<span id="blueOpen"> join this cause</span>, to explore this frontier and dedicate your will to<span id="blueOpen"> advance our world</span>.
                    <br />
                    <br />
                    Though challenges stand ahead,<span id="blueOpen"> together we cannot fail</span>.     

                </div>*/}