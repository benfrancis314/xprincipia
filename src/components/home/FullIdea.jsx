import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import IdeaComments from './IdeaComments.jsx';


export default class FullIdea extends React.Component {
   
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
                <div id="fullIdeaContainer">
                    <div id="fullIdeaBody">
                        <div id="fullIdeaHeader">
                            <Link to={'/home'}>
                                <div id="ideaCloseButton">
                                    Close
                                </div>
                            </Link>
                            <div id="fullIdeaTopicName">
                                <span id="blueMontserrat">>>>   TOPIC: </span>LUNAR COLONIZATION
                            </div>
                            <div id="fullIdeaMetaData">
                                <div id="fullIdeaAuthor">
                                    >>> Ben Francis
                                </div>
                                <div id="fullIdeaDate">
                                    >>> 11 - 29 - 2018
                                </div>
                            </div>
                        </div>      
                        <div id="fullIdeaTitle">
                            Cell Repair-Focused Medical Nanorobots
                        </div>
                        <div id="fullIdeaDescription">
                            Requirements:
                                <br />
                                1. Molecular computers
                        </div>
                    </div>
                    <IdeaComments />
                </div>
            );
    }
}