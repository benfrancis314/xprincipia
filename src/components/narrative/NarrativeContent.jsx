import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6



export default class NarrativeContent extends React.Component {
   
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
    
    // STORYLINE 0 (Base storyline)
    // NODE I
                // A: Poetic intro
                // AHEAD OF YOU on a table in a gothic library untouched by human sight
                // Rest three objects, hovering one foot in height
                // Covered by a thin veil and the dark of night. 

                // You raise now a hand, and may examine each thing, 
                // Or leave the building and the mysteries it may bring. 

                // OBJECT I (Hover reveals)
                // The sheet is removed, and a small globe revelead;
                // Yet something is unsettling, which finally strikes you odd; 
                // This is not your planet, your Earth, your home; 
                // Yet upon it is moving life much like our own. 

                // OBJECT II (Hover reveals)
                // The second object comes into sight, 
                // A small amorphous blob, transparent and gyrating
                // There is horror as it turns to dust in a mutilating flash, 
                // Only to be reborn, and to resume its unconscious pulsating. 

                // OBJECT III (Hover reveals)
  

                // CONTINUE (Don't change storyline, do change node 1 to 2)


    // NODE II
                // "[Sir/Maam], what should the focus of the new branch be?"

                // You snap back to the attention of your immediate surroundings. 
                // There is a long oval table in a circular room walled with pure glass. 
                // Around you are 11 men and women, awaiting your decision. It will be final. 

                // I. SPACE COLONIZATION
                // II. ANTI-AGING
                // III. EARTH CONSERVATION
                
                




            return (
                // B: Fast-paced (Skip intro, move straight to part 2)
                <div id="narrativeQuoteFooter">
                    "Behold, humans being in an underground den ..."
                </div>  
            );
    }
}
