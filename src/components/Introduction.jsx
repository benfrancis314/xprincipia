import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import axios from 'axios';
import {Config} from '../config.js';

export default class Introduction extends React.Component {

  constructor(){
    super();

    this.state= {
      username: '',
      password: '',
    }

  };

  componentWillMount() {
    this.state =  { userToken: cookie.load('userToken') };
  }

   render() {
      return (
        <div id="introductionContainer">
            <span id="introductionCapital">W</span>elcome to <span id="blue">XPrincipia</span>
        </div>
      );
   }
}

