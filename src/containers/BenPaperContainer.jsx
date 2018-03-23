import React from 'react';
import { browserHistory } from 'react-router';

export default class Error404 extends React.Component {
   render() {
      return (
      <div>
          <object id="benPaperContainer" data={require('../assets/TheMentalWorldXPrincipiaVersion.pdf')}></object>
      </div>
      );
   }
}
// function randomImg() {
//   if (Math.random() < 0.125) {
//     return <img src={require('../assets/orionLogo.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
//   } else if (Math.random() < 0.25){
//     return <img src={require('../assets/heroLogo.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
//   } else if (Math.random() < 0.375){
//     return <img src={require('../assets/dragonConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
//   } else if (Math.random() < 0.5){
//     return <img src={require('../assets/hunterConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
//   } else if (Math.random() < 0.625){
//     return <img src={require('../assets/queenConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
//   } else if (Math.random() < 0.75){
//     return <img src={require('../assets/pegasusConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
//   } else if (Math.random() < 0.875){
//     return <img src={require('../assets/archerConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
//   } else if (Math.random() < 0.1){
//     return <img src={require('../assets/greatBearConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
//   }
// }