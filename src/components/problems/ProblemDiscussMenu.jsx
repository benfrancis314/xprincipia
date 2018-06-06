import React from 'react';
// Will be uesd with componentDidUpdate
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class ProblemDiscussMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            questionNumber: '',
            suggestionNumber: '',
            debateNumber: '',
            discussElements: [],
            linkPath: '',
        }

    };
    
    componentDidMount(){
        var self = this;
        if (window.location.pathname.includes('private')) {
            self.setState({
                linkPath: '/project/private/',
            })
        } else {
            self.setState({
                linkPath: '/project/',
            })
        }
    }     




   render() {
       
      return (
        <div>
            {/* <Link to={this.state.linkPath+`${this.props.params.probID}/subprojects`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
            </Link> */}
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
                {React.cloneElement(this.props.children, {probID: this.props.params.probID, parentTitle: this.props.parentTitle})}
            </ReactCSSTransitionGroup>
        </div>

      );
   }
}