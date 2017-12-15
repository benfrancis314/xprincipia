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
            solutions: [],
            questionNumber: '',
            suggestionNumber: '',
            debateNumber: '',
        }

    };
    
    componentDidMount(){
        // Not using this currently, keep in case we decide to switch back
        // ReactDOM.findDOMNode(this).scrollIntoView();
        // window.scrollBy(0, -70);
        var self = this;
    axios.get( Config.API + '/solutions/problemID?id='+this.props.params.probID).then(function (response) {
        self.setState({
            solutions: response.data
        })
    })
    axios.get( Config.API + '/questions/number?id='+this.props.params.probID).then(function (response) {
        self.setState({
            questionNumber: response.data
        })
    })
    axios.get( Config.API + '/suggestions/number?id='+this.props.params.probID).then(function (response) {
        self.setState({
            suggestionNumber: response.data
        })
    })
    axios.get( Config.API + '/freeForms/number?id='+this.props.params.probID).then(function (response) {
        self.setState({
            debateNumber: response.data
        })
    })
}
    

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
                    <div id="proposalsTitleRightSB">brainstorm</div>
                            <div id="sidebarDiscussMenu">
                                <div id="discussGroup1">
                                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/questions`} activeClassName="activeWhiteBorder">
                                        <div id="SBDiscussButton">
                                            questions
                                            <span id="greenSmall">  {this.state.questionNumber}</span>
                                        </div>
                                    </Link>

                                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestions`} activeClassName="activeWhiteBorder">
                                        <div id="SBDiscussButton">
                                            suggestions
                                            <span id="greenSmall">  {this.state.suggestionNumber}</span>
                                        </div>
                                    </Link>

                                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/debates`} activeClassName="activeWhiteBorder">
                                        <div id="SBDiscussButton">
                                            open brainstorm
                                            <span id="greenSmall">  {this.state.debateNumber}</span>
                                        </div>
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