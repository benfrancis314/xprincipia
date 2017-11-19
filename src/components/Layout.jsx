import React from 'react';
import Footer from '../containers/Footer.jsx';
import Header from '../containers/Header.jsx';
import cookie from 'react-cookie';
import axios from 'axios';


export default class Layout extends React.Component {

  componentDidMount() {
    this.state =  { 
      userToken: cookie.load('userToken'),
    };
  }
  componentWillReceiveProps(nextState) {
    nextState =  { 
      userToken: cookie.load('userToken'),
    };
  }
  onLogin(userToken) {
    this.setState({ userToken });
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