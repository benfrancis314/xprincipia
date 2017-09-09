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
                <div id="privateTextBoxTop">
                    <br />
                </div>
                <div id="privateContainerHeader">
                    <div id="privateUserName">
                        {/*xprincipia*/}
                        {cookie.load('userName')}
                    </div>
                    
                </div>
                <div id="privateContainerMottoContainer">
                    <img src={require('../assets/lock.svg')} id="lockImg" width="30" height="30" onClick={this.privateAlert} alt="Logo logo, signifying this is private"/>
                    <div id="privateContainerMotto">
                        Organize your thoughts
                    </div>
                    <img src={require('../assets/lock.svg')} id="lockImg" width="30" height="30" onClick={this.privateAlert} alt="Logo logo, signifying this is private" />
                </div>
                <div id="privateContainerTitle">
                    Mind Temple
                </div>
                <div id="privateContainerSettingsButton">
                    Settings
                </div>
                {/*<div id="privateNewProject">
                    New Project
                </div>*/}
                <PrivateProjectForm />
                <PrivateProjectsContainer />
                <div id="privateTextBoxBottom">
                    <br />
                </div>
            </ReactCSSTransitionGroup>
            <div id="privateAlert">
                <div id="privateAlertHeader">
                    <img src={require('../assets/lockBlue.svg')} id="lockAlert" width="30" height="30" onClick={this.privateAlert} alt="Logo logo, signifying this is private"/>
                </div>
                <div id="notificationContent">This space is entirely <span id="blue">private</span></div>
                <div id="privateAlertReturn" onClick={this.hideNotification}>Return</div>
            </div>
        </div>
      );
   }
}
