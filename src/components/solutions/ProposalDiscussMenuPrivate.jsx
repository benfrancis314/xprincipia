import React from 'react';
// Will be uesd with componentDidUpdate
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class ProposalDiscussMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: []
        }

    };
    
    // Add back in when ready
    //     componentDidMount(){
    //     var self = this;
    //     return axios.get( Config.API + '/solutions/problemID?id='+this.props.params.probID).then(function (response) {
    //         self.setState({
    //             solutions: response.data
    //         })
    //     })
        
    // }
    

   render() {
      return (
        <div>
            <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
            </Link>
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
                <div id="proposalInteractDiscussMenu">
                    <div id="proposalsTitleRightSB">Discuss</div>
                            <div id="sidebarDiscussMenu">
                                <div id="discussGroup1">
                                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/questions`} activeClassName="activeWhiteBorder">
                                        <div id="SBDiscussButton">Questions</div>
                                    </Link>

                                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestions`} activeClassName="activeWhiteBorder">
                                        <div id="SBDiscussButton">Suggestions</div>
                                    </Link>

                                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/debates`} activeClassName="activeWhiteBorder">
                                        <div id="SBDiscussButton">Open Debate</div>
                                    </Link>
                                </div>
                            </div>
                            {React.cloneElement(this.props.children, {probID: this.props.params.probID})}
                    <div id="proposalsTitleRightSBEnd"><br /></div>
                </div>
            </ReactCSSTransitionGroup>
        </div>

      );
   }
}