import React from 'react';
import Footer from '../containers/Footer.jsx';
import Header from '../containers/Header.jsx';
import {Config} from '../config.js';
import cookie from 'react-cookie';
import axios from 'axios';


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


  render() {
      return (
      	<div>
          {/* <div onClick={this.resetNotifications}>
            {this.state.notificationLayout}
          </div> */}
      		<Header notification={this.state.notificationLayout}/>
        	<div id="main">
              {React.cloneElement(this.props.children, {resetNotifications: this.resetNotifications})}
        	</div>
          <Footer />
        </div>
      );
   }
}