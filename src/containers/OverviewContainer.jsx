import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6



export default class ErrorContainer extends React.Component {
   render() {
      return (
        <div id="overViewWide">
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={2000}
                transitionEnter={false}
                transitionLeave={false}>
            {/* Link this to current project (top of projects column) */}
            {/* <Link to={`/welcome`}> */}
                <img src={require('../assets/redX.svg')} id="overViewX" width="30" height="30" alt="Close button, red X symbol" />
            {/* </Link> */}
            <div id="overViewHeader">
                <img src={require('../assets/treeWhite1.svg')} width="50" height="50" alt="User avatar, DNA Helix" />
            </div>
            <div id="overViewContainer">
                <div id="overViewColumn">
                    <div id="overViewLineageLabel1">
                        grand parent
                    </div>
                    <div id="overViewAddButton">
                        <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="30" height="30" alt="User avatar, DNA Helix" />
                    </div>
                    <div id="overViewRowUnitTop1">
                        {/* <div id="overViewVoteButton">
                            &#9650;
                        </div> */}
                        <div id="overViewTitle">
                            human-based general artificial intelligence
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                    <div id="overViewRowUnit1">
                        <div id="overViewTitle">
                            rationalty-based general artificial intelligence
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                    <div id="overViewRowUnit1">
                        <div id="overViewTitle">
                            1Test Title3
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                </div>
                <div id="overViewColumn">
                    <div id="overViewLineageLabel2">
                        parent
                    </div>
                    <div id="overViewAddButton">
                        <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="30" height="30" alt="User avatar, DNA Helix" />
                    </div>
                    <div id="overViewRowUnitTop2">
                        <div id="overViewTitle">
                            Describing the human mind
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                    <div id="overViewRowUnit2">
                        <div id="overViewTitle">
                            Designing our artificial mind
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                    <div id="overViewRowUnit2">
                        <div id="overViewTitle">
                            Programming the artificial mind
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                </div>
                <div id="overViewColumn">
                    <div id="overViewLineageLabel3">
                        project
                    </div>
                    <div id="overViewAddButton">
                        <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="30" height="30" alt="User avatar, DNA Helix" />
                    </div>
                    <div id="overViewRowUnitTop3">
                        <div id="overViewTitle">
                            Information Flow
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                    <div id="overViewRowUnit3">
                        <div id="overViewTitle">
                            Consciousness
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                    <div id="overViewRowUnit3">
                        <div id="overViewTitle">
                            Unconscious
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                </div>
                <div id="overViewColumn">
                    <div id="overViewLineageLabel4">
                        children
                    </div>
                    <div id="overViewAddButton">
                        <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="30" height="30" alt="User avatar, DNA Helix" />
                    </div>
                    <div id="overViewRowUnitTop4">
                        <div id="overViewTitle">
                            Thoughts
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                    <div id="overViewRowUnit4">
                        <div id="overViewTitle">
                            Emotions
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                    <div id="overViewRowUnit4">
                        <div id="overViewTitle">
                            4Test Title3
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                </div>
                <div id="overViewColumn">
                    <div id="overViewLineageLabel5">
                        grand children
                    </div>
                    <div id="overViewAddButton">
                        <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="30" height="30" alt="User avatar, DNA Helix" />
                    </div>
                    <div id="overViewRowUnitTop5">
                        <div id="overViewTitle">
                            5Test Title1
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                    <div id="overViewRowUnit5">
                        <div id="overViewTitle">
                            5Test Title2
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                    <div id="overViewRowUnit5">
                        <div id="overViewTitle">
                            5Test Title3
                        </div>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </div>
                </div>
            </div>
            </ReactCSSTransitionGroup>
        </div>
      );
   }
}