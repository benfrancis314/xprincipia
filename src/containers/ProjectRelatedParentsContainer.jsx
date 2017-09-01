import React from 'react';
// Will be uesd with componentDidUpdate
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import axios from 'axios';
import {Config} from '../config.js';
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
        var self = this;
        return axios.get( Config.API + '/solutions/problemID?id='+this.props.params.probID).then(function (response) {
            self.setState({
                solutions: response.data
            })
        })
        
    }

// Removing this isn't stopping the scrolling from happening, not sure why
componentDidUpdate() {
        ReactDOM.findDOMNode(this).scrollIntoView();
  }      

   render() {
      return (
        <div>
            <Link to={`/project/${this.props.params.probID}/subprojects`}>
                <img src={require('../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
            </Link>
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
                <div>
                    Related Instructions
                </div>
                <div>
                    Related Form
                </div>
                <div>
                    Related List
                </div>

            </ReactCSSTransitionGroup>
        </div>

      );
   }
}