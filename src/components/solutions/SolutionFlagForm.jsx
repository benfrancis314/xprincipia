import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class EditSolutionForm extends React.Component {

  constructor(props){
    super(props);

    this.state= {
    }

  };
  componentDidMount(){
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  render() {
      return (
        <div id="flagContainer">
            <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
            </Link>
            <div>
            <div id="flagHeader">
                flag reasoning
            </div>

            <div id="projectFormRadioContainer">
                <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow3">
                    misplaced
                    {/* <span id="gray">(default)</span> */}
                </div>
                <div id="projectFormRadioRow">
                    <label id="projectRadioButtonContainer">
                    <input type="radio" name="flagType" value="0"/>
                    <span id="checkmark3"></span>
                    </label>
                </div>
                </div>
                <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow3">
                    inaccurate
                </div>
                <div id="projectFormRadioRow">
                    <label id="projectRadioButtonContainer">
                    <input type="radio" name="flagType" value="1" />
                    <span id="checkmark3"></span>
                    </label>
                </div>
                </div>
                <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow3">
                    bad culture
                </div>
                <div id="projectFormRadioRow">
                    <label id="projectRadioButtonContainer">
                    <input type="radio" name="flagType" value="2" />
                    <span id="checkmark3"></span>
                    </label>
                </div>
                </div>
            </div>

            <form id="flagForm">
                <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed? " 
                autoFocus ></textarea>
                <br />
                <div onClick={this.postQuestion} id="flagButton">submit</div>
                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                    <div id="returnButton">exit</div>
                </Link>
            </form>
            </div>
        </div>
      );
   }
}
