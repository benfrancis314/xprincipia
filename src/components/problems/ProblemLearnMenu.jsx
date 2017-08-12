import React from 'react';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class ProblemLearnMenu extends React.Component {
        

   render() {
      return (
        <div>
            <Link to={`/problem/${this.props.params.probID}/subproblems`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
            </Link>
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
                <div id="projectInteractMenu">
                    <div id="proposalsTitleRightSB">Learn</div>
                    <div id="sidebarDiscussMenu">
                        <div id="discussGroup1">
                            <Link to={`/problem/${this.props.params.probID}/learn/content`} activeClassName="activeWhiteBorder">
                                <div id="SBDiscussButton">Lessons</div>
                            </Link>

                            <Link to={`/problem/${this.props.params.probID}/learn/resources`}  activeClassName="activeWhiteBorder">
                                <div id="SBDiscussButton">Resources</div>
                            </Link>

                            <Link to={`/problem/${this.props.params.probID}/learn/wiki`}  activeClassName="activeWhiteBorder">
                                <div id="SBDiscussButton">Wiki</div>
                            </Link>
                        </div>
                    </div>
                    {/*Old*/}
                    {/*<div id="solutionsLearnHeader">
                        <Link to={`/problem/${this.props.params.probID}/learn/content`} activeClassName="activeWhite">
                            <div id="contentLearnButtonRightSB">Lessons</div>
                        </Link>

                        <Link to={`/problem/${this.props.params.probID}/learn/resources`}  activeClassName="activeWhite">
                            <div id="resourcesLearnButtonRightSB">Resources</div>
                        </Link>
                    </div>*/}

                    {this.props.children}
                </div>
            </ReactCSSTransitionGroup>
        </div>

      );
   }
}