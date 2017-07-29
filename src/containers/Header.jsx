import React from 'react';
import {  Link  } from 'react-router';
import axios from 'axios';
import HeaderAvatar from '../components/HeaderAvatar.jsx';
// Notifications currently unused, may be used for notifications in future
// import NotificationSuccess from '../components/NotificationSuccess.jsx';
// import NotificationFailure from '../components/NotificationFailure.jsx';
import {Config} from '../config.js'

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
        return axios.get( Config.API + '/auth/problems/search?q='+this.state.searchText).then(function (response) {
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

if (this.state.userToken === undefined ){
      return (
        <div id="header">
            <div id="logo">
              <Link to="/welcome"><div id="logoName">XPrincipia</div></Link>
            </div>
            
            {/*Login in header here*/}
            <input type="text" name="email" required="required" maxLength="30" placeholder="Username" id="loginHeaderEmail" autoFocus />
            <input type="password" name="password" required="required" maxLength="30" placeholder="Password" id="loginHeaderPassword" />            
            
            {/*Need logo here, arrow signaling "Submit"*/}
            <div id="loginHeaderSubmitButton"> 
                <img src={require('../assets/rightArrowWhite.svg')} width="10" height="10" alt="Submit login arrow, blue right arrow" />
            </div>
            <div id="registerHeaderButton">
                <Link to="/welcome">
                    Register
                </Link>
            </div>
        </div>
      );
    } else {
        return (
            <div id="header">
                <div id="logo">
                <Link to="/welcome"><div id="logoName">XPrincipia</div></Link>
                </div>
                {/*<div id="explore">
                    <form id="exploreFormHeader">
                        <input type="search" name="search"
                            placeholder="Explore" id="exploreHeaderInput"  
                            onKeyDown={this.queryProblem} />
                        <input onKeyPress={this.submitSearch}  id="submitExplore" />
                    </form>
                </div>*/}
                <HeaderAvatar />
            </div>
      );  

 }}
}
