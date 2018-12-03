import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import TopicList from '../components/home/TopicList.jsx';
import IdeaList from '../components/home/IdeaList.jsx';
import IdeaForm from '../components/home/IdeaForm.jsx';
import SiteSuggestions from '../components/home/SiteSuggestions.jsx';
import Footer from '../containers/Footer.jsx';



export default class Home extends React.Component {
   
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
        this.goToStory = this.goToStory.bind(this)
    };

    goToStory() {
        if(window.location.pathname.includes('home')) {
          window.location.pathname = '/story'
        } else if (window.location.pathname.includes('subprojects')) {
          $(document).ready(function() {
            $('#projectKeyInputHide').attr('id','projectKeyInput').hide().slideDown();
          })
        }
    }

   render() {
    
            return (
                <div id="homeContainer">
                    {this.props.children}
                    {/* <ReactCSSTransijtionGroup
                            transitionName="example"
                            transitionAppear={true}
                            transitionAppearTimeout={2000}
                            transitionEnter={false}
                            transitionLeave={false}> */}
                    {/* {this.props.children} */}
                    <div id="topBanner">
                        {/* <Link to={'/home'}> */}
                            <div id="sloganBanner">
                                <span id="whiteMedium">SHARE </span>SCIENTIFIC IDEAS
                            </div>
                        {/* </Link> */}
                        {/* <div id="tutorialStartButton">
                            tutorial
                        </div> */}
                    </div>
                    
                    <div id="homeContainerColumns">
                        
                        <TopicList />
                        <IdeaList />
                        <IdeaForm />
                    </div>
                    {/* <SiteSuggestions /> */}
                    {/* <Footer /> */}
                    
                    {/* </ReactCSSTransitionGroup>  */}
                    {/* <div id="greekAcademyPhrase" onClick={this.goToStory}>
                        ἀγεωμέτρητος μηδεὶς εἰσίτω
                    </div> */}
                </div>
                
            );
    }
}


    {/* <Link to="/introduction" activeClassName="activeIntroductionButton">
                            <div id="welcomeIntroductionLabel" onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                                {this.state.introductionTitle}
                            </div>
                        </Link> */}