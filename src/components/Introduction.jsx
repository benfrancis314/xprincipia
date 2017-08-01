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
                    <span id="introductionCapital">W</span>elcome to <span id="introductionBig">XPrincipia</span>
                </div>
                <div id="introductionProse">
                    We are a center for collaborative <span id="blueOpen">human progress projects</span>, with the belief that many can achieve more than few.
                    <br />
                    <br />
                    With the <span id="blueOpen">advent of the internet</span>, we present an opportunity for <span id="blueOpen">anyone around the world</span> to contribute to the cutting edge of science and technology.
                    <br />
                    <br />
                    From this conviction, we have designed a web app to organize this collaboration, with the intent of iterating our functionality to suit <span id="blueOpen"> your needs</span>.
                    <br />
                    <br />
                    The collective works will belong in the <span id="blueOpen"> public domain</span>, for everyone to use. 
                    
                </div>
                <div id="introductionProse">
                    We have centered these efforts around <span id="blueOpen"> four core projects </span>we belive to be most important for humanity:
                </div>
                <div id="introductionProjectHeader1">
                    <div id="introductionProjectTitle">
                        Interstellar Civilization
                    </div>
                </div>
                <div id="introductionProjectsProse">
                    Here are the projects towards transitioning humanity into an interstellar civilization, spreading life throughout the universe and ensuring our long-term survival.
                </div>
                {/*Link each to the actual project - check url on active site*/}
                <div id="introductionProjectHeader2">
                    <div id="introductionProjectTitle">
                        Evolving Humanity
                    </div>
                </div>
                <div id="introductionProjectsProse">
                    Here are the projects towards intentionally evovling the human organism into a more perfect state, in both mind and body. 
                </div>
                <div id="introductionProjectHeader3">
                    <div id="introductionProjectTitle">
                        Theoretical Knowledge
                    </div>
                </div>
                <div id="introductionProjectsProse">
                    Here are the projects towards understanding and mastering our theoretical base of knowledge, ranging from the fundamental nature of reality to the dynamics of human societies. 
                </div>
                <div id="introductionProjectHeader4">
                    <div id="introductionProjectTitle">
                        Technology Development
                    </div>
                </div>
                <div id="introductionProjectsProse">
                    Here are the projects towards progressing our technologies, tools which have shaped our history so far, and will continue to shape our future, including advances such as artificial intelligence and nanostructures.
                </div>
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