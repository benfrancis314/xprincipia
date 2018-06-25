import React from 'react';
import Footer from '../containers/Footer.jsx';
import HeaderEr from '../containers/HeaderEr.jsx';
import {Config} from '../config.js';
import cookie from 'react-cookie';
import axios from 'axios';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-104103231-1'); //Unique Google Analytics tracking number


export default class Layout extends React.Component {
  constructor(){
    super();

    this.state = {
       notificationLayout: '',
    }
    this.resetNotifications = this.resetNotifications.bind(this)
};

  componentDidMount(){
    var self = this;
        return axios.get( Config.API + '/notifications/number?username='+cookie.load("userName")).then(function (response) {
            self.setState({
                notificationLayout: response.data,
            })
        }) 
}

resetNotifications() {
  this.setState({
      notificationLayout: '0'
    })
  axios.get( Config.API + '/notifications/clear?username='+cookie.load("userName")).then(function (response) {
  }) 
    // alert('resetNotifications');
    // When we get it working, instead of setting it to 0, set it to real value:
  // var self = this;
  //   return axios.get( Config.API + '/notifications/number?username='+cookie.load("userName")).then(function (response) {
  //     self.setState({
  //         notification: response.data,
  //     })
  // }) 
}
handleClick() {
  ReactGA.event({
      // Replace with "Created project", "voted question", etc. 
      category: 'Navigation',
      // Replace action with project ID, etc. for various things
      action: 'Clicked Link',
  });
  // alert('click');
}

  render() {
      return (
      	<div id="positionRelativeEr">
          {/* <div onClick={this.resetNotifications}>
            {this.state.notificationLayout}
          </div> */}
      		<HeaderEr notification={this.state.notificationLayout}/>
        	<div id="main">
              {React.cloneElement(this.props.children, {resetNotifications: this.resetNotifications})}
        	</div>
          {/* Need better font for this */}
          <div id="greekAcademyPhrase" onClick={()=>{this.handleClick()}}>
            ἀγεωμέτρητος μηδεὶς εἰσίτω
          </div>
            {/* English pronounciation */}
            {/* Ageōmétrētos mēdeìs eisítō */}
          <Footer />
        </div>
      );
   }
}