import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class IdeaList extends React.Component {
   
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
           newIdeaUnitTitle: '',
        }
        // this.queryProblem = this.queryProblem.bind(this);
    };

   render() {
    
            return (
                <div id="ideaListContainer">
                    <div id="ideaListTitle">
                        [ - -  IDEAS  - - ]
                    </div>
                    <div id="ideaListBody">
                        <input type="text" required="required" maxLength="70" id="ideaListUnit" placeholder="ADD A NEW IDEA" autoFocus/>
                        <Link to={'/idea'}>
                            <div id="ideaListUnit">
                                Nanorobots used for cleaning up mitochondria rust
                            </div>
                        </Link>
                        <Link to={'/idea'}>
                            <div id="ideaListUnit">
                                Genetic Engineering for fixing telomeric disintegration
                            </div>
                        </Link>
                        <Link to={'/idea'}>
                            <div id="ideaListUnit">
                                Pharmaceudical cocktail to address seven central problems
                            </div>
                        </Link>
                        {/* <div id="ideaListMore">
                        </div> */}
                    </div>
                </div>
            );
    }
}