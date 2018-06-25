import React from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import {Config} from '../../config.js';
import $ from 'jquery';
import ErProjectsContainer from './ErProjectsContainer.jsx';
// import sphere from 'jquery.earth-3d';


export default class ProfileContainer extends React.Component {

privateAlert () {
    // alert('success');
    $(document).ready(function() {
        $('#privateAlert').attr('id','privateAlertShow').hide().slideDown(600);
    });
}
hidePrivateNotification() {
    $(document).ready(function() {
        $('#privateAlertShow').attr('id','privateAlert');
     });
    };

   render() {

      return (
        <div id="erContainer">
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
                {/*<div id="privateTextBoxTop">
                    <br />
                </div>*/}
                <Link to={`/profile`}>
                    <div id="erContainerHeader">
                        <span id="erRed">er </span>initiative               
                    </div>
                </Link>
                {/*<div id="privateNewProject">
                    New Project
                </div>*/}
                {/*<PrivateProjectForm />*/}
                <ErProjectsContainer />
                {/*<div id="privateTextBoxBottom">
                    <br />
                </div>*/}
                {this.props.children}
                {randomImg()}
                <br />
                <br />
            </ReactCSSTransitionGroup>
        </div>
      );
   }
}

function randomImg() {
    if (Math.random() < 0.125) {
      return <img src={require('../../assets/orionLogo.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.25){
      return <img src={require('../../assets/heroLogo.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.375){
      return <img src={require('../../assets/dragonConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.5){
      return <img src={require('../../assets/hunterConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.625){
      return <img src={require('../../assets/queenConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.75){
      return <img src={require('../../assets/pegasusConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.875){
      return <img src={require('../../assets/archerConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 1){
      return <img src={require('../../assets/greatBearConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    }
}