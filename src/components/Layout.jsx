import React from 'react';
import Footer from '../containers/Footer.jsx';
import Header from '../containers/Header.jsx';
import cookie from 'react-cookie';
import axios from 'axios';


export default class Layout extends React.Component {

  componentDidMount() {
    this.state =  { 
      userToken: cookie.load('userToken'),
      // userName: cookie.load('userName')
    };
        // alert('mountLayout');

  }
  // componentWillMount() {
  //   this.state =  { 
  //     userToken: cookie.load('userToken'),
  //     // userName: cookie.load('userName')
  //   };
  //   alert('mountLayout');
  // }
  componentWillReceiveProps(nextState) {
    nextState =  { 
      userToken: cookie.load('userToken'),
      // userName: cookie.load('userName')
    };
    // alert('changeLayout');
  }
  onLogin(userToken) {
    this.setState({ userToken });
    // I'm removing all of the "path" variables, because they seem to be causing problems. 
    // cookie.save('userToken', this.state.userToken, { path: '/' });
    cookie.save('userToken', this.state.userToken);
  }

  render() {
      return (
      	<div>
      		<Header />
        	<div id="main">
          		{this.props.children}
        	</div>
          <Footer />
        </div>
      );
   }
}