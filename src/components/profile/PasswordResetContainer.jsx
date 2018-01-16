import React from 'react';
import { browserHistory } from 'react-router';

export default class Error404 extends React.Component {
   render() {
      return (
      <div id="passwordResetContainer">
          {this.props.children}
      </div>
      );
   }
}