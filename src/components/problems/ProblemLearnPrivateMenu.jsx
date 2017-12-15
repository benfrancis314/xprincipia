import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class ProblemLearnPrivateMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: [],
            lessonNumber: '',
            resourceNumber: '',
        }

    };
    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/solutions/problemID?id='+this.props.params.probID).then(function (response) {
            self.setState({
                solutions: response.data
            })
        })
        axios.get( Config.API + '/learnItems/number?id='+this.props.params.probID).then(function (response) {
            self.setState({
                lessonNumber: response.data
            })
        })
        axios.get( Config.API + '/resources/number?id='+this.props.params.probID).then(function (response) {
            self.setState({
                resourceNumber: response.data
            })
        })
    }

// Removing this isn't stopping the scrolling from happening, not sure why
// componentDidUpdate() {
//         ReactDOM.findDOMNode(this).scrollIntoView();
//   }      

   render() {
      return (
        <div>
            <Link to={`/project/private/${this.props.params.probID}/subprojects`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
            </Link>
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
                <div id="projectInteractDiscussMenu">
                    <div id="proposalsTitleRightSB">notebook</div>
                    <div id="sidebarDiscussMenu">
                        <div id="discussGroup1">
                            <Link to={`/project/private/${this.props.params.probID}/notes`} activeClassName="activeWhiteBorder">
                                <div id="SBDiscussButton">
                                    notes
                                    <span id="greenSmall">  {this.state.lessonNumber}</span>
                                </div>
                            </Link>

                            <Link to={`/project/private/${this.props.params.probID}/resources`}  activeClassName="activeWhiteBorder">
                                <div id="SBDiscussButton">
                                    resources
                                    <span id="greenSmall">  {this.state.resourceNumber}</span>
                                </div>
                            </Link>

                            {/*<Link to={`/project/${this.props.params.probID}/learn/wiki`}  activeClassName="activeWhiteBorder">
                                <div id="SBDiscussButton">Wiki</div>
                            </Link>*/}
                        </div>
                    </div>
                    {/*Old*/}
                    {/*<div id="solutionsLearnHeader">
                        <Link to={`/project/${this.props.params.probID}/learn/content`} activeClassName="activeWhite">
                            <div id="contentLearnButtonRightSB">Lessons</div>
                        </Link>

                        <Link to={`/project/${this.props.params.probID}/learn/resources`}  activeClassName="activeWhite">
                            <div id="resourcesLearnButtonRightSB">Resources</div>
                        </Link>
                    </div>*/}

                    {React.cloneElement(this.props.children, {probID: this.state.probID, parentTitle: this.props.parentTitle})}
                    <div id="proposalsTitleRightSBEnd"><br /></div>
                </div>
            </ReactCSSTransitionGroup>
        </div>

      );
   }
}