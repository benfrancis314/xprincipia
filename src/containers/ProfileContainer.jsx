import React from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import EarthSphere from '../components/profile/EarthSphere.jsx';
import {Config} from '../config.js';
import $ from 'jquery';


export default class ProfileContainer extends React.Component {
    constructor(){
        super();

        this.state = {
            followedSolutions: [],
            createdSolutions: [],
            votedProblems: [],
            createdProblems: [],
            currentItems:[],
            currentType: 'solution',
            notifications: [],
            user: [],
            planetID: '',
        }


        this.onLogout = this.onLogout.bind(this);
        this.onCreatedSolution = this.onCreatedSolution.bind(this)
        this.onVotedSolution = this.onVotedSolution.bind(this)
        this.onCreatedProblem = this.onCreatedProblem.bind(this)
        this.onFollowedProblem = this.onFollowedProblem.bind(this)

        this.goToAbout = this.goToAbout.bind(this)

        this.resetNotificationsProfile = this.resetNotificationsProfile.bind(this)
    }

    
    

    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/users/followedSolutions?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                followedSolutions: response.data,
                currentItems: response.data,
            })
        })
        axios.get( Config.API + '/users/createdSolutions?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                createdSolutions: response.data,
            })
        })
        axios.get( Config.API + '/users/createdProblems?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                createdProblems: response.data,
            })
        })
        axios.get( Config.API + '/users/followedProblems?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                followedProblems: response.data,
            })
        })
        axios.get( Config.API + '/notifications/new?username='+cookie.load("userName")).then(function (response) {
            self.setState({
                notifications: response.data,
            })
        }) 
        axios.get( Config.API + '/users/byusername?username='+cookie.load('userName')).then(function (response) {
            if(response.data.Planet == 1) {
                self.setState({
                    user: response.data,
                    planetID: 'mars',
                })
            } else {
                self.setState({
                    user: response.data,
                    planetID: 'earth',
                })
            }
        })
    }   
    componentWillReceiveProps(nextProps){
        var self = this;
        axios.get( Config.API + '/users/followedSolutions?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                followedSolutions: response.data,
                currentItems: response.data,
            })
        })
        axios.get( Config.API + '/users/createdSolutions?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                createdSolutions: response.data,
            })
        })
        axios.get( Config.API + '/users/createdProblems?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                createdProblems: response.data,
            })
        })
        axios.get( Config.API + '/users/followedProblems?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                followedProblems: response.data,
            })
        })
        axios.get( Config.API + '/notifications/new?username='+cookie.load("userName")).then(function (response) {
            self.setState({
                notifications: response.data,
            })
        }) 
        axios.get( Config.API + '/users/byusername?username='+cookie.load('userName')).then(function (response) {
            if(response.data.Planet == 1) {
                self.setState({
                    user: response.data,
                    planetID: 'mars',
                })
            } else {
                self.setState({
                    user: response.data,
                    planetID: 'earth',
                })
            }
        })
    }   

    onLogout() {
        cookie.remove('userToken', { path: '/' });
        cookie.remove('userName', { path: '/' });
        // Logging out twice because it requires two logouts to work currently,
        // Note sure why. Long term problem is not addressed by this
        // cookie.remove('userToken', { path: '/' });
        // cookie.remove('userName', { path: '/' });
        document.location = "/welcome";
    }
    onCreatedSolution() {
        var self = this;
        self.setState({
            currentItems: this.state.createdSolutions,
            currentType: 'solution',
        })
    }
    onVotedSolution() {
        var self = this;
        self.setState({
            currentItems: this.state.followedSolutions,
            currentType: 'solution',
        })
    }
    onCreatedProblem() {
        var self = this;
        self.setState({
            currentItems: this.state.createdProblems,
            currentType: 'problem',
        })
    }
    onFollowedProblem() {
        var self = this;
        self.setState({
            currentItems: this.state.followedProblems,
            currentType: 'problem',
        })
    }
    goToAbout() {
        window.location.href='http://www.xprincipia.com'
    }

    resetNotificationsProfile(props) {
        var self = this;
        this.props.resetNotifications();
        axios.get( Config.API + '/notifications/clear?username='+cookie.load("userName")).then(function (response) {
            self.setState({
                notifications: [],
            })
        }) 
    }

   render() {
    // Currently does it twice and is glitchy, would like to add back in later
    // with ideally scrolling in from left
    // $(document).ready(function() {
    //     $('#profileContainer').hide().slideDown(1500);
    // });

    $(document).ready(function() {
        // $('#profileContainer').slideDown(700);
        $('#profileContainer').slideDown(300);
    });

    if (cookie.load('userName') == null) {
        return (
        <div id="profileContainer">
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={3000}
            transitionEnter={false}
            transitionLeave={false}>
            <div id="profileBox">
                <div id="profileLeft">
                    <div id="userInformation">
                        <br />
                        <br />
                        <br />
                        {/* xxx */}
                        <div id={this.state.planetID}></div>
                        {/* <EarthSphere /> */}
                    </div>
                    <div id="userOptions">
                        <br />
                        <Link to={`/profile/about`} activeClassName="activeBlue">
                            <div id="aboutXPButton">about xprincipia</div>
                        </Link>
                    </div>
                </div>
                <div id="profileRight">
                    {React.cloneElement(this.props.children, {probID: this.state.probID})}
                </div>
            </div>
            </ReactCSSTransitionGroup>
        </div>);
    } else {
     return (
        <div id="profileContainer">

            {/* <div onClick={this.resetNotificationsProfile}>
                XXXX
            </div>
            <div onClick={this.props.resetNotifications}>
                YYYY
            </div> */}

            {/* <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={3000}
            transitionEnter={false}
            transitionLeave={false}> */}
            <div id="profileBox">
                <div id="profileLeft">
                    <div id="userInformation">
                        <p id="userName">{cookie.load('userName')}</p>
                        <Link to={`/profile/points`} activeClassName="activePoints">
                            <div id="profileLevelButton">
                                westward newcomer
                            </div>
                            <div id="profilePointsButton">
                                {this.state.user.Points}
                            </div>
                        </Link>
                        <div id="earthContainer">
                            <div id={this.state.planetID}></div>
                        </div>
                    </div>
                    <div id="userOptions">
                        <div id="profileNotificationsMessagesButtons">
                            <Link to={`/profile/notifications`} activeClassName="activeRed">
                                <div id="profileSideNotificationsButton">
                                    !
                                </div>
                            </Link>
                            <Link to={`/messages`} activeClassName="activeMessagesButton">
                                <div id="profileSideMessagesButton">
                                    <img src={require('../assets/comments.svg')} id="profileSideMessagesButtonImg" width="20" height="20" />
                                </div>
                            </Link>
                        </div>
                                
                        {/* <Link to={`/mindtemple`} activeClassName="activeBlue">
                            <div id="userProblemsSolutionsButton">private projects</div>
                        </Link> */}
                        <Link to={`/profile`} activeClassName="activeBlue">
                            <div id="userProblemsSolutionsButton">activity</div>
                        </Link>
                        <Link to={`/profile/passions`} activeClassName="activeBlue">
                            <div id="userProblemsSolutionsButton">passions</div>
                        </Link>
                        <div id="profileNotificationsMessagesButtons">
                            <Link to={`/profile/feedback`} activeClassName="activeBlue">
                                <div id="userFeedbackButton">feedback</div>
                            </Link>
                            <Link to={`/profile/about`} activeClassName="activeBlue">
                                <div id="aboutXPButton">about xp</div>
                            </Link>
                        </div>
                        <Link to ={`/welcome`}>
                            <div id="logOutButton" onClick={this.onLogout}>logout</div>
                        </Link>
                    </div>
                </div>
                <div id="profileRight">
                    {/* x{this.state.notifications.length}x */}
                    {React.cloneElement(this.props.children, {probID: this.state.probID, resetNotifications: this.resetNotificationsProfile, notifications: this.state.notifications})}
                </div>
            </div>
            {/* </ReactCSSTransitionGroup> */}
        </div>
      );
    }
   }
}
