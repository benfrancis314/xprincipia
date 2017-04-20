import React from 'react';
import {  Link  } from 'react-router';
import img from '../assets/dnablackinvert.png';
import cookie from 'react-cookie';
import axios from 'axios';
import HeaderAvatar from '../components/HeaderAvatar.jsx';
import NotificationSuccess from '../components/NotificationSuccess.jsx';
import NotificationFailure from '../components/NotificationFailure.jsx';
import VoteSuccess from '../components/VoteSuccess.jsx';
import VoteFailure from '../components/VoteFailure.jsx';
import CreateSuccess from '../components/CreateSuccess.jsx';
import CreateFailure from '../components/CreateFailure.jsx';
import FollowSuccess from '../components/FollowSuccess.jsx';
import FollowFailure from '../components/FollowFailure.jsx';

export default class Header extends React.Component {

    constructor(props){
        super(props);

        this.state = {
           problems : [],
           searchText: [],
        }
        this.queryProblem = this.queryProblem.bind(this)
        this.queryProblem = this.submitSearch.bind(this)
    };

    queryProblem () {
        var self = this
        this.state.searchText = document.getElementById('exploreInput').value
        return axios.get('http://localhost:10000/auth/problems/search?q='+this.state.searchText).then(function (response) {
          console.log(response.data)
            self.setState({
              problems: response.data
            })
            document.location = '/welcome';
        })  
    }

    submitSearch(e) {
        // if (e.keyCode === 13)
        {
            // alert("This is not functional yet");
            document.location = '/search';
            
        }
        
    }

   render() {
      return (
      <div id="headerSection">
        <div id="header">
            <div id="explore">
                <form id="exploreFormHeader">
                    <input type="search" name="search"
                        placeholder="Explore" id="exploreHeaderInput"  onKeyDown={this.queryProblem}/>
                    <input onKeyPress={this.submitSearch}  id="submitExplore" />
                </form>
            </div>
            <div id="logo">
              <Link to="/welcome"><div>XPrincipia</div></Link>
            </div>
            <HeaderAvatar />
            <NotificationFailure />
            <NotificationSuccess />
            <CreateFailure />
            <CreateSuccess />
            <VoteFailure />
            <VoteSuccess />
            <FollowFailure />
            <FollowSuccess />
        </div>
      </div>
      );
   }
}
