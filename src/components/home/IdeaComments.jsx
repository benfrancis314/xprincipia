import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class IdeaComments extends React.Component {
   
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
                <div id="ideaCommentsBody">
                    <div id="ideaCommentsLabel">
                        [ - -  COMMENTS  - - ]
                    </div>
                    <textarea placeholder="What do you think? " id="ideaCommentForm" autoFocus />
                    <div id="ideaCommentFooter">
                        <input type="text" required="required" maxLength="70" id="ideaCommentAuthorForm" placeholder="Optional:  Author Name"/>
                        <div id="ideaCommentSubmit">
                            Comment
                        </div>
                    </div>
                    <div id="ideaCommentList">
                    {/* Comment 1 */}
                        <div id="ideaCommentUnit">
                            <div id="ideaCommentMetadata">
                                <div id="ideaCommentDate">
                                    11 - 30 - 2018
                                </div>
                                <div id="ideaCommentAuthor">
                                    jack.wilson
                                </div>
                            </div>
                            <div id="ideaCommentDescription">
                                Will the body's immune system attempt to destroy the nanobots?
                            </div>
                        </div>
                    {/* Comment 2 */}
                        <div id="ideaCommentUnit">
                            <div id="ideaCommentMetadata">
                                <div id="ideaCommentDate">
                                    11 - 30 - 2018
                                </div>
                                <div id="ideaCommentAuthor">
                                    hannah.jade
                                </div>
                            </div>
                            <div id="ideaCommentDescription">
                                How will these machines be made?
                            </div>
                        </div>
                        {/* Comment 3 */}
                        <div id="ideaCommentUnit">
                            <div id="ideaCommentMetadata">
                                <div id="ideaCommentDate">
                                    11 - 30 - 2018
                                </div>
                                <div id="ideaCommentAuthor">
                                    ben.francis
                                </div>
                            </div>
                            <div id="ideaCommentDescription">
                                To @jack.white: That is a good question. I think it likely will, and I will consider how this might be best overcome. 
                                To @hannah.hade: I'm not sure. Perhaps that will be the topic of another idea; one for what they will be, one for how they will be made. 
                                Perhaps that might even belong on a different topic about nanotechnology?
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}