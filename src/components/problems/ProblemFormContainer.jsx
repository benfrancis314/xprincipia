import React from 'react';
// Will be uesd with componentDidUpdate
// import ReactDOM from 'react-dom';import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProblemFormContainer extends React.Component {
    constructor(){
        super();

        this.state = {
        }
    };
  render() {
      return (
        <div>
            <Link to={`/project/${this.props.params.probID}/subprojects`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
            </Link>
            <div id="projectFormButtonContainer">
                <Link to={`/project/${this.props.params.probID}/create`} activeClassName="activeProjectFormButtonLeft">
                    <div id="projectFormButtonLeft">
                        new
                    </div>
                </Link>
                <Link to={`/project/${this.props.params.probID}/link`} activeClassName="activeProjectFormButtonRight">
                    <div id="projectFormButtonRight">
                        link
                    </div>
                </Link>
            </div>
            {React.cloneElement(this.props.children, {probID: this.props.probID, parentTitle: this.props.parentTitle})}
        </div>

      );
   }
}

