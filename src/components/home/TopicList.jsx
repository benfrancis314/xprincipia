import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class TopicList extends React.Component {
   
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
                    <div id="topicListTitle">
                        [ - -  TOPICS  - - ]
                    </div>
                    <div id="topicListBody">
                        <div id="topicListUnit">
                            anti-aging
                        </div>
                        <div id="topicListUnit">
                            lunar colonization
                            {/* <img id="topicIdeaArrow" /> */}
                        </div>
                        <div id="topicListUnit">
                            brain-computer interfaces
                        </div>
                        <Link to={'/topic/new'}>
                            <div id="newTopicButton">
                            </div>
                        </Link>
                    </div>
                </div>
            );
    }
}