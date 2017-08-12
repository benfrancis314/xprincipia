import React from 'react';

export default class TutorialProjectContent extends React.Component {
   render() {
      return (
        <div>
        {randomImg()}
        <div id="introContainer">
          <div id="introBanner">
              <div id="introPrompt">Welcome to the
                  <span id="blue"> Project Center</span></div>
          </div>
        <div id="tutorialContent"> 
          {/*<div id="introProse">
                Where everyone can contribute to the scientific body of progress
          </div>*/}
          <div id="introProse">
              {/*<div id="introSummary">
                 Contribute to scientific progress
              </div>*/}
              <div id="tutorialProseDescriptions">
                 <span id="blue">Vote for this project</span> if you believe
                  it is the most important in its <span id="blue"> sub project level</span>.
                 <br />
                 <br />
                 Explore this project's <span id="blue">own sub projects </span>and<span id="blue"> create new ones.</span>
                 <br />
                 <br />
                 <span id="blue">Discuss</span> the project by <span id='blue'>asking questions</span>,
                  <span id='blue'>giving suggestions</span> or engaging in <span id='blue'>freeform discussion</span>. 
                 <br />
                 <br />
                 <span id="blue">Learn </span>about<span id='blue'> relevant subjects </span>and<span id="blue"> teach others.</span>
                 <br />
                 <br />
                 {/*A*/}
                 {/*When you are ready,<span id="blue"> visit the proposals </span>and
                <span id="blue"> vote for the best.</span>
                 <br />
                 <br />*/}
                 {/*B*/}

                 <span id="blue">Examine </span>each<span id="blue"> proposal</span>, <span id="blue">debate</span> its success 
                 and <span id="blue">vote</span> for the best. 

                 <br />
                 <br />
                 {/*End*/}
                 Finally, <span id="blue"> create your own proposal</span>. 
                 <br />
                 <br />
              </div>
        </div>
      </div>
      </div>
      </div>
      );
   }
}
function randomImg() {
if (Math.random() < 0.125) {
  return <img src={require('../../assets/orionLogo.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.25){
  return <img src={require('../../assets/heroLogo.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.375){
  return <img src={require('../../assets/dragonConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.5){
  return <img src={require('../../assets/hunterConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.625){
  return <img src={require('../../assets/queenConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.75){
  return <img src={require('../../assets/pegasusConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.875){
  return <img src={require('../../assets/archerConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.1){
  return <img src={require('../../assets/greatBearConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
}
}
