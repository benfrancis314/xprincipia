import React from 'react';
import {Link} from 'react-router';
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




   render() {
      return (
        <div>
            <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
            </Link>
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
                    {React.cloneElement(this.props.children, {probID: this.props.params.probID})}
            </ReactCSSTransitionGroup>
        </div>

      );
   }
}
