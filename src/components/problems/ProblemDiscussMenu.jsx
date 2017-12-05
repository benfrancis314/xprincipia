import React from 'react';
// Will be uesd with componentDidUpdate
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class ProblemDiscussMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: []
        }

    };
    
    // Is this necessary?
        componentDidMount(){
            // Not using this currently, keep in case we decide to switch back
            // ReactDOM.findDOMNode(this).scrollIntoView();
            // window.scrollBy(0, -70);
            var self = this;
        return axios.get( Config.API + '/solutions/problemID?id='+this.props.params.probID).then(function (response) {
            self.setState({
                solutions: response.data
            })
        })
    }

// Not using this currently, keep in case we decide to switch back
// componentDidUpdate() {
//         ReactDOM.findDOMNode(this).scrollIntoView();
//         window.scrollBy(0, -70);
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
                    <div id="proposalsTitleRightSB">DISCUSS</div>
                            <div id="sidebarDiscussMenu">
                                <div id="discussGroup1">
                                    <Link to={`/project/${this.props.params.probID}/questions`} activeClassName="activeWhiteBorder">
                                        <div id="SBDiscussButton">questions</div>
                                    </Link>

                                    <Link to={`/project/${this.props.params.probID}/suggestions`} activeClassName="activeWhiteBorder">
                                        <div id="SBDiscussButton">suggestions</div>
                                    </Link>

                                    <Link to={`/project/${this.props.params.probID}/freeforms`} activeClassName="activeWhiteBorder">
                                        <div id="SBDiscussButton">open debate</div>
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