import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class TopicBranches extends React.Component {
   
//   unHoverText() {
//       $(document).ready(function() {
//           $('#logoNameGuide').html('<span id="xBlue">x</span>principia');             
//           $('#logoNameGuide').attr('id','logoName');
//       });
//   }

    constructor(props){
        super(props);
        this.state = {
        //    problems : [],
           tutorial: '',
        }
        // this.queryProblem = this.queryProblem.bind(this);
    };

   render() {
    
            return (
                <div id="topicListContainer">
                    <div id="topicListUnit">
                        anti-aging
                    </div>
                    <div id="topicListUnit">
                        lunar colonization
                    </div>

                    {/* <ReactCSSTransitionGroup
                            transitionName="example"
                            transitionAppear={true}
                            transitionAppearTimeout={2000}
                            transitionEnter={false}
                            transitionLeave={false}> */}
                    {/* {this.props.children} */}
                    
                    {/* </ReactCSSTransitionGroup> */}
                    {/* <Link to="/introduction" activeClassName="activeIntroductionButton">
                            <div id="welcomeIntroductionLabel" onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                                {this.state.introductionTitle}
                            </div>
                        </Link> */}
                </div>
            );
    }
}