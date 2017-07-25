import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import $ from 'jquery';
import RegisterUnit from './RegisterUnit.jsx';

export default class Introduction extends React.Component {

   render() {
      return (
        <div>
          <Link to={`/login`}>
            <div id="introductionButtonClicked" onClick={this.openIntroduction}>
              Introduction
            </div>
          </Link>  
          <div id="introductionContainer">
                <div id="introductionWelcome">
                    <span id="introductionCapital">W</span>elcome to <span id="blue">XPrincipia</span>
                </div>
                <br />
                <div id="introductionProse">
                    We are an open content <span id="blueOpen">research and development</span> center, with the belief that many can achieve more than few.
                    <br />
                    <br />
                    We present an opportunity for <span id="blueOpen">anyone</span>, around the world, to contribute to the cutting edge of science and technology, and <span id="blueOpen">human progress</span> in general. 
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
                {/*I like the register being here, but there's problems with the scrolling/lack of page jumps*/}
                {/*Moving inside introductionContainer through off width styles*/}
                <RegisterUnit />
            </div>

            
          </div>
      );
   }
}

