import React from 'react';
import { Link  } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ProblemSolutionsMenu from './ProblemSolutionsMenu.jsx';
// Not used yet, would like to develop later
// import ProjectParentChildrenUnitsContainer from '../../containers/ProjectParentChildrenUnitsContainer.jsx';
import SubProblemContainer from '../../containers/SubProblemContainer.jsx';
import SubProjectParentUnit from './SubProjectParentUnit.jsx';
// import TutorialProjectContent from '../tutorials/TutorialProjectContent.jsx';
import {Config} from '../../config.js';
import $ from 'jquery';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

configureAnchors({offset: -20, scrollDuration: 700});

export default class ProblemTitle extends React.Component {
  
  constructor(props){
        super(props);

        this.state = {
            problemTitle: this.props.problemTitle
        }
    };

    // componentDidMount(){
    //   var self = this;

    //       //set Problem Data
    //       self.setState({
    //           problemTitle: this.props.problemTitle
    //       })
    //       alert(this.props.problemTitle)
    // }

  componentWillReceiveProps(nextProps){
      var self = this;
          self.setState({
              problemTitle: nextProps.problemTitle
          })
    }


   render() {
     
      if (0) {
        return (
          <div id="problemIntro">
            <h1 id="problemTitle">{this.state.problemTitle}</h1>
          </div>
      );
      }

       else if (1) {  
           return (

            <div id="problemIntro">
                <div id="problemTypeLabelGreen">goal</div>
                <h1 id="problemTitleGreen">{this.state.problemTitle}</h1>
            </div>
      );

       } else {
           return (

            <div id="problemIntro">
                <div id="problemTypeLabelRed">problem</div>
                <h1 id="problemTitleRed">{this.state.problemTitle}</h1>
            </div>
      );
    }
}}

 