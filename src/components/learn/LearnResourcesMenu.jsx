import React from 'react';
import {Link} from 'react-router';
import axios from 'axios'
import {Config} from '../../config.js'

export default class LearnResourcesMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: []
        }

    };

   render() {
      return (
        <div>
            {this.props.children}
        </div>

      );
   }
}