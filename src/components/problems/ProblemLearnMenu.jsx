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
            solutions: []
        }

    };
    componentDidMount(){
        var self = this;
        return axios.get( Config.API + '/solutions/problemID?id='+this.props.params.probID).then(function (response) {
            self.setState({
                solutions: response.data
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
                            <Link to={`/project/${this.props.params.probID}/learn/content`} activeClassName="activeWhiteBorder">
                                <div id="SBDiscussButton">Lessons</div>
                            </Link>

                            <Link to={`/project/${this.props.params.probID}/learn/resources`}  activeClassName="activeWhiteBorder">
                                <div id="SBDiscussButton">Resources</div>
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