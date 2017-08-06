import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import $ from 'jquery';
import RegisterUnit from './RegisterUnit.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class Introduction extends React.Component {

   render() {
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
                    <span id="introductionCapitalBlue">W</span><span id="blue">elcome to </span><span id="introductionCapitalBlue">XP</span><span id="blue">rincipia</span>
                    <br />
                </div>
                {/*Considering change to "The Open Frontier of Discovery/Science*/}
                <div id="introductionTitle">The Open Frontier of Research</div>
                <div id="introductionProse">
                    We find ourselves in the<span id="blueOpen"> age of great opportunity</span>, but equally the<span id="blueOpen"> age of great peril</span>. 
                    <br />
                    <br />
                    We find ourselves in the <span id="blueOpen">upturn of an era</span>, where the crescendos of science and discovery 
                    rest our collective future, as a species and civilization,
                    <span id="blueOpen"> upon their conclusion</span>. 
                    <br />
                    <br />
                    Upon this unique moment in time, we find ourselves <span id="blueOpen">looking ahead into the unknown</span> , 
                    in great need of<span id="blueOpen"> a great people to represent the best of our species</span>, who will take this 
                    challenge into their own hands and will. 
                    <br />
                    <br />
                    <span id="blueOpen">We call upon you</span>, and all alike with the <span id="blueOpen">spirit of 
                    discovery in heart</span>, to take up this challenge 
                    of all ages and shape the future of our species.
                    <br />
                    <br />
                    We call upon you for this adventure of all time, looking not at where you come from but <span id="blueOpen">upon 
                    where you will take us</span>. 
                    <br />
                    <br />
                    <span id="blueOpen">Join the frontier of all knowledge and all will of discovery</span>, the focus of where we are and 
                    where we would like to go. 
                    <br />
                    <br />
                    <span id="blueOpen">Each project along this trajectory </span>will be broken down with <span id="blueOpen">thought and efficiency</span>, for which 
                    proposals will be created with <span id="blueOpen">great creativity and determination</span>. 
                    <br />
                    <br />
                    Discussion and debate will be held with <span id="blueOpen">rigor and deterimation</span>, for which there will be tailored education, <span id="blueOpen">designed 
                    with patience and used with ambition</span>. 
                    <br />
                    <br />
                    Proposals are weighed by pro and con, and <span id="blueOpen">decisions made by democratic vote</span>.
                    <br />
                    <br />
                    In the end, <span id="blueOpen">an architecture will be built with the greatest works of our time held inside</span>, a blueprint 
                    designed for tomorrow. 
                    <br />
                    <br />
                    <span id="blueOpen">At no point in this process will we rest</span>, our eyes too focused upon what is at grasp ahead. 
                    <br />
                    <br />
                    We ask you <span id="blueOpen">to join this cause</span>, to explore this frontier and dedicate your will to advance our world,
                    with the knowledge that together <span id="blueOpen">we will not fail</span>.
                    
                </div>

                Join XPrincipia
                RegisterUnit

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
                {/*Link each to the actual project - check url on active site*/}
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
                {/*<div id="introductionProjectsProse">
                    Here are the projects towards progressing our technologies, tools which have shaped our history so far, and will continue to shape our future, including advances such as artificial intelligence and nanostructures.
                </div>*/}
                {/*Autofocus in register causes page-jump problem*/}
                {/*Moving inside introductionContainer through off width styles*/}
                {/*<RegisterUnit />*/}
            </div>

            </ReactCSSTransitionGroup>
          </div>
      );
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






// Previous Introduction

{/*Here anyone, <span id="blueOpen">regardless of background </span>or class, may openly contribute to and <span id="blueOpen">join today's cutting edge </span>of 
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
<span id="blueOpen">Welcome to XPrincipia.</span>*/}