import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import { Link } from 'react-router';

export default class UserPassions extends React.Component {
constructor(props){
  super(props);

  this.state= {
    passions: '',
  }

  this.postPassions = this.postPassions.bind(this);
};

   render() {
    return (
      <div id="passionsFormContainer">
              <div id="passionsHeader">
                  intellectual passions
              </div>
              <form id="suggestionForm">
                  <div id="passionsViewText">
                    {this.props.user.Passions}
                  </div>
              </form>
        </div>
      );
    }
}
