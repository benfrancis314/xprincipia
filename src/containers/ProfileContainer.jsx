import React from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import EarthSphere from '../components/profile/EarthSphere.jsx';
import {Config} from '../config.js';
import $ from 'jquery';
// import earth3d from '../../node_modules/earth3d/jquery.earth-3d';


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
        }


        this.onLogout = this.onLogout.bind(this);
        this.onCreatedSolution = this.onCreatedSolution.bind(this)
        this.onVotedSolution = this.onVotedSolution.bind(this)
        this.onCreatedProblem = this.onCreatedProblem.bind(this)
        this.onFollowedProblem = this.onFollowedProblem.bind(this)

        this.goToAbout = this.goToAbout.bind(this)
    }

    
    

    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/auth/users/followedSolutions?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                followedSolutions: response.data,
                currentItems: response.data,
            })
        })
        axios.get( Config.API + '/auth/users/createdSolutions?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                createdSolutions: response.data,
            })
        })
        axios.get( Config.API + '/auth/users/createdProblems?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                createdProblems: response.data,
            })
        })
         axios.get( Config.API + '/auth/users/followedProblems?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                followedProblems: response.data,
            })
        })
        // $('#sphere').earth3d({
        //     dragElement: $('#locations') // where do we catch the mouse drag
        //   });
    }   
    // Experimental to try to fix logout issues
    componentWillMount() {
        this.state =  { 
          userToken: cookie.load('userToken'),
          // userName: cookie.load('userName')
        };
        // alert('mountProfile');
      }
      componentWillReceiveProps(nextState) {
        nextState =  { 
          userToken: cookie.load('userToken'),
          // userName: cookie.load('userName')
        };
        // alert('changeProfile');
      }
    onLogout() {
        // The usage of the "path" below seems not to logout cookies that have a different path.
        // Although I'm uncertain why those cookies have different paths, it is best to avoid the issue. 
        // cookie.remove('userToken', { path: '/' });
        // cookie.remove('userName', { path: '/' });
        alert('logoutBeforeRemove');
        cookie.remove('userToken');
        cookie.remove('userName');
        alert('logoutAfterRemove');
        document.location = "/welcome";
        alert('logoutAfterRefresh');
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
                        <div id="earth"></div>
                        <EarthSphere />
                    </div>
                    <div id="userOptions">
                        <br />
                        <Link to={`/profile/about`} activeClassName="activeBlue">
                            <div id="aboutXPButton">About XPrincipia</div>
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
                        <div id="earth"></div>
                        {/* <div id="sphere"></div> */}
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
                        <Link to={`/profile/feedback`} activeClassName="activeBlue">
                            <div id="userFeedbackButton">feedback</div>
                        </Link>
                        <Link to={`/profile/about`} activeClassName="activeBlue">
                            <div id="aboutXPButton">about xprincipia</div>
                        </Link>
                        <div id="logOutButton" onClick={this.onLogout}>Logout</div>
                    </div>
                </div>
                <div id="profileRight">
                    {React.cloneElement(this.props.children, {probID: this.state.probID})}
                </div>
            </div>
            {/* </ReactCSSTransitionGroup> */}
        </div>
      );
    }
   }
}
