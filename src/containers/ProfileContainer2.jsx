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
                <div id="privateUserName">
                    {cookie.load('userName')}                    
                </div>
                <div id="privateContainerBanner">
                    <div id="privateContainerTitle">
                        Mind Temple
                    </div>
                    {/*<Link to={`/profile`}>*/}
                        <div id="privateContainerSettingsButton" onClick={this.privateAlert}>
                            {/*Settings*/}
                            <img src={require('../assets/lock2Blue.svg')} id="privateSettingsGear" width="20" height="20" alt="Gear logo, link to settings"/>
                        </div>
                    {/*</Link>*/}
                </div>
                <div id="privateContainerMottoContainer">
                    <div id="privateContainerMotto">
                         Organize your thoughts
                    </div>
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
                    <img src={require('../assets/lock2Blue.svg')} id="lockAlert" width="30" height="30" onClick={this.privateAlert} alt="Logo logo, signifying this is private"/>
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
      return <img src={require('../assets/orionLogo.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.25){
      return <img src={require('../assets/heroLogo.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.375){
      return <img src={require('../assets/dragonConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.5){
      return <img src={require('../assets/hunterConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.625){
      return <img src={require('../assets/queenConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.75){
      return <img src={require('../assets/pegasusConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.875){
      return <img src={require('../assets/archerConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.1){
      return <img src={require('../assets/greatBearConstellation.svg')} id="middleAlignOrionPrivate" width='70' height='100' alt="Back arrow, blue up arrow" />
    }
}