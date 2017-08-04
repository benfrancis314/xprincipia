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
                    Introduction
                </div>
            </Link>
          <div id="introductionContainer">
                <div id="introductionWelcome">
                    <span id="introductionCapital">W</span>elcome to <span id="introductionBig">XPrincipia: </span><span id="introductionBigBlue">The Open Frontier of Research</span><span id="introductionBig"></span>
                </div>
                <div id="introductionProse">
                    Here anyone, <span id="blueOpen">regardless of background </span>or class, may openly contribute to and <span id="blueOpen">join today's cutting edge </span>of 
                    scientific <span id="blueOpen">research </span>and technology <span id="blueOpen">development</span>.
                    <br />
                    <br />
                    {/*Consider italicizing "the first time"*/}
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
                    <span id="blueOpen">Welcome to XPrincipia.</span>
                    
                </div>
                <div id="introductionProse">
                    Join our effort to make humanity a spacefaring civilization
                </div>
                <div id="introductionProjectHeader1">
                    <div id="introductionProjectTitle">
                        Interstellar Civilization
                    </div>
                </div>
                <div id="introductionProjectsProse">
                    For the first time in history, <span id="iOpen">choose </span> to evolve our species:
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