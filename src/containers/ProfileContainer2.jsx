import React from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import {Config} from '../config.js';
import $ from 'jquery';
import PrivateProjectForm from '../components/problems/PrivateProjectForm.jsx';
import PrivateProjectsContainer from './PrivateProjectsContainer.jsx';
// import sphere from 'jquery.earth-3d';


export default class ProfileContainer extends React.Component {

privateAlert () {
    // alert('success');
    $(document).ready(function() {
        $('#privateAlert').attr('id','privateAlertShow').hide().slideDown();
    });
}
hideNotification() {
    $(document).ready(function() {
        $('#privateAlertShow').attr('id','privateAlert');
     });
    };

   render() {

      return (
        <div id="privateContainer">
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
                {/*<div id="privateTextBoxTop">
                    <br />
                </div>*/}
                <div id="privateContainerHeader">
                    <div id="privateUserName">
                        benfrancis
                    </div>
                    
                </div>
                <div id="privateContainerTitle">
                    Mind Temple
                </div>
                <div id="privateContainerSettingsButton">
                    {/*Settings*/}
                    <img src={require('../assets/gear.svg')} id="lockImg" width="30" height="30" alt="Gear logo, link to settings"/>
                </div>
                <div id="privateContainerMottoContainer">
                    <img src={require('../assets/lock.svg')} id="lockImg" width="25" height="25" onClick={this.privateAlert} alt="Lock logo, signifying this is private"/>
                    <div id="privateContainerMotto">
                        Organize your thoughts
                    </div>
                    <img src={require('../assets/lock.svg')} id="lockImg" width="25" height="25" onClick={this.privateAlert} alt="Lock logo, signifying this is private" />
                </div>
                {/*<div id="privateNewProject">
                    New Project
                </div>*/}
                {/*<PrivateProjectForm />*/}
                <PrivateProjectsContainer />
                {/*<div id="privateTextBoxBottom">
                    <br />
                </div>*/}
                {randomImg()}
                <br />
                <br />
            </ReactCSSTransitionGroup>
            <div id="privateAlert">
                <div id="privateAlertHeader">
                    <img src={require('../assets/lockBlue.svg')} id="lockAlert" width="30" height="30" onClick={this.privateAlert} alt="Logo logo, signifying this is private"/>
                </div>
                <div id="privateAlertContent">This space is entirely <span id="blue">private</span></div>
                <div id="privateAlertReturn" onClick={this.hideNotification}>Return</div>
            </div>
        </div>
      );
   }
}

function randomImg() {
    if (Math.random() < 0.125) {
      return <img src={require('../assets/orionLogo.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.25){
      return <img src={require('../assets/heroLogo.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.375){
      return <img src={require('../assets/dragonConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.5){
      return <img src={require('../assets/hunterConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.625){
      return <img src={require('../assets/queenConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.75){
      return <img src={require('../assets/pegasusConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.875){
      return <img src={require('../assets/archerConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.1){
      return <img src={require('../assets/greatBearConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    }
}