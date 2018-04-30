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
            notifications: [],
            planet: '',
            user: [],
        }

        this.onCreatedSolution = this.onCreatedSolution.bind(this)
        this.onVotedSolution = this.onVotedSolution.bind(this)
        this.onCreatedProblem = this.onCreatedProblem.bind(this)
        this.onFollowedProblem = this.onFollowedProblem.bind(this)
    }

    
    

    componentDidMount(){
        var self = this;
        window.scrollTo(0,0);
        axios.get( Config.API + '/users/followedSolutions?username='+this.props.params.username).then(function (response) {
            self.setState({
                followedSolutions: response.data,
                currentItems: response.data,
            })
        })
        axios.get( Config.API + '/users/createdSolutions?username='+this.props.params.username).then(function (response) {
            self.setState({
                createdSolutions: response.data,
            })
        })
        axios.get( Config.API + '/notifications/new?username='+this.props.params.username).then(function (response) {
            self.setState({
                notifications: response.data,
            })
        }) 
         axios.get( Config.API + '/users/followedProblems?username='+this.props.params.username).then(function (response) {
            self.setState({
                followedProblems: response.data,
            })
        })
        axios.get( Config.API + '/notifications/new?username='+this.props.params.username).then(function (response) {
            self.setState({
                notifications: response.data,
            })
        }) 
        axios.get( Config.API + '/users/byusername?username='+this.props.params.username).then(function (response) {
            self.setState({
                user: response.data,
            })
        })
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

   render() {

    $(document).ready(function() {
        // $('#profileContainer').slideDown(700);
        $('#profileContainer').slideDown(300);
    });

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
                        <p id="userName">
                            {this.props.params.username}
                        </p>
                        {this.state.user.Planet}
                        {randomPlanet()}
                        {/* <div id="mercury"></div> */}
                    </div>
                    <div id="userOptions">
                        <br />
                        <Link to={`/user/${this.props.params.username}/messages`} activeClassName="activeMessagesButton">
                            <div id="userMessagesButton">
                                <img src={require('../assets/comments.svg')} id="profileSideMessagesButtonImg" width="20" height="20" />
                            </div>
                        </Link>
                        <Link to={`/user/${this.props.params.username}/activity`} activeClassName="activeBlue">
                            <div id="userProblemsSolutionsButton">activity</div>
                        </Link>
                        <Link to={`/user/${this.props.params.username}/passions`} activeClassName="activeBlue">
                            <div id="userProblemsSolutionsButton">passions</div>
                        </Link>
                    </div>
                </div>
                <div id="profileRight">
                    {React.cloneElement(this.props.children, {probID: this.state.probID})}
                </div>
            </div>
            </ReactCSSTransitionGroup>
        </div>);
   }
}

function randomPlanet() {
    if (Math.random() < 0.2) {
      return <div id="mercury"></div>
    } else if (Math.random() < 0.4){
      return <div id="venusAtmosphere"></div>
    } else if (Math.random() < 0.6){
      return <div id="mars"></div>
    } else if (Math.random() < 0.8){
      return <div id="moon"></div>
    // } else if (Math.random() < 0.75){
    //   return <div id="earthNight"></div>
    } else if (Math.random() < 0.9){
      return <div id="sun"></div>
    } else if (Math.random() < 1){
      return <div id="milkyWay"></div>
    }
    }
    
    