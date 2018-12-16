import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6



export default class NarrativeContainer extends React.Component {
   
//   unHoverText() {
//       $(document).ready(function() {
//           $('#logoNameGuide').html('<span id="xBlue">x</span>principia');             
//           $('#logoNameGuide').attr('id','logoName');
//       });
//   }


    constructor(props){
        super(props);
        this.state = {
           currentTopic: '',
           ideaRefresh: '',
           newIdeaTitle: '',
        }
        this.goToStory = this.goToStory.bind(this);
        this.romanNumeralTranslator = this.romanNumeralTranslator.bind(this);
    };

    // GET USERS NARRATIVE NUMBERS
        // ONE FOR THEIR STORYLINE
        // ONE FOR THEIR NODE WITHIN THE STORYLINE
        // MAKE NODE DIAGRAMS FOR IT

    goToStory() {
        if(window.location.pathname.includes('home')) {
          window.location.pathname = '/story'
        } else if (window.location.pathname.includes('subprojects')) {
          $(document).ready(function() {
            $('#projectKeyInputHide').attr('id','projectKeyInput').hide().slideDown();
          })
        }
    }


    romanNumeralTranslator() {
    }

   render() {
    
            return (
                <div id="narrativeContainerHeader">
                    <div id="narrativeContainerBookmark"> 
                        BOOK I : ACT I : SCENE I : PART I
                    </div>
                    <div id="userEditButton">
                        YOU
                    </div>
                </div>
            );
    }
}
