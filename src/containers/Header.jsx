import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
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
           username: '',
           password: '',
        }
        this.queryProblem = this.queryProblem.bind(this);
        this.queryProblem = this.submitSearch.bind(this);
        this.postLogin = this.postLogin.bind(this);
    };

  componentWillMount() {
    this.state =  { userToken: cookie.load('userToken') };
  }

  postLogin() {
    var self = this
    //Read field items into component state
    this.state.username = document.getElementById('loginEmail').value
    this.state.password = document.getElementById('loginPassword').value

    return axios.post( Config.API + '/login', {
      username : this.state.username,
      password: this.state.password
    })
    .then(function (result) {
      self.setState({
        userToken: result.data.token
      })
      cookie.save('userToken', result.data.token );
      cookie.save('userName', self.state.username)
      
      // Store token/Username in db table
      return axios.post( Config.API + '/auth/saveToken',  {
        username : self.state.username,
        token : "Bearer " + self.state.userToken
      }, {headers: { Authorization: "Bearer " + self.state.userToken }}).then (function (response){
        document.location = "/welcome";
      })
    })
    .catch(function (error) {
      alert("I'm sorry, your username and password was not recognized. ")
  });
}


    queryProblem () {
        var self = this
        this.state.searchText = document.getElementById('exploreInput').value
        return axios.get( Config.API + '/problems/search?q='+this.state.searchText).then(function (response) {
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
            <input type="image" src={require('../assets/rightArrowWhite.svg')} onClick={this.postLogin} id="loginHeaderSubmitButton" alt="Submit login arrow, blue right arrow"/>
            <div id="registerHeaderButton">
                <Link to="/register">
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
