import React from 'react';
import Footer from '../containers/Footer.jsx';
import Header from '../containers/Header.jsx';
import $ from 'jquery';
import {Config} from '../config.js';
import cookie from 'react-cookie';
import axios from 'axios';
import ReactGA from 'react-ga';


export default class Layout extends React.Component {
  constructor(){
    super();

    this.state = {
       notificationLayout: '',
    }
    this.resetNotifications = this.resetNotifications.bind(this)
    // this.goToStory = this.goToStory.bind(this)
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
// goToStory() {
//   if(window.location.pathname.includes('welcome')) {
//     window.location.pathname = '/story'
//   } else if (window.location.pathname.includes('subprojects')) {
//     $(document).ready(function() {
//       $('#projectKeyInputHide').attr('id','projectKeyInput').hide().slideDown();
//     })
//   }
// }

  render() {

      return (
      	<div id="fullWidth">
      		<Header notification={this.state.notificationLayout}/>
              {React.cloneElement(this.props.children, {resetNotifications: this.resetNotifications})}
          {/* <Footer /> */}
        </div>
      );
   }
}