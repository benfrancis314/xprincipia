import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class ProblemLearnMenu extends React.Component {
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
            <Link to={`/project/${this.props.params.probID}/subprojects`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
            </Link>
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
                <div id="projectInteractDiscussMenu">
                    <div id="proposalsTitleRightSB">Learn</div>
                    <div id="sidebarDiscussMenu">
                        <div id="discussGroup1">
                            <Link to={`/project/${this.props.params.probID}/learn/content/full`} activeClassName="activeWhiteBorder">
                                <div id="SBDiscussButton">
                                    Lessons
                                    <span id="greenSmall">  {this.state.lessonNumber}</span>
                                </div>
                            </Link>

                            <Link to={`/project/${this.props.params.probID}/learn/resources/full`}  activeClassName="activeWhiteBorder">
                                <div id="SBDiscussButton">
                                    Resources
                                    <span id="greenSmall">  {this.state.resourceNumber}</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {React.cloneElement(this.props.children, {probID: this.state.probID, parentTitle: this.props.parentTitle})}
                    <div id="proposalsTitleRightSBEnd"><br /></div>
                </div>
            </ReactCSSTransitionGroup>
        </div>

      );
   }
}