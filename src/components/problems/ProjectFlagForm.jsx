import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js'

export default class ProjectEditForm extends React.Component {

  render() {
      return (
        <div id="createProblemBox">
            <form id="createForm">
                <fieldset>
                    <legend>Flag Question</legend>
                         <div id="whiteOpen">What is the reason for this flag?</div>
                         <br />
                             <div id="radioFlag">
                            <label id="flagOptionLabel"><input type="radio" name="optradio" id="flagOption"/>Inaccurate Content</label>
                            </div>
                            <div id="radioFlag">
                            <label id="flagOptionLabel"><input type="radio" name="optradio" id="flagOption"/>Misplaced Content</label>
                            </div>
                            <div id="radioFlag">
                            <label id="flagOptionLabel"><input type="radio" name="optradio" id="flagOption"/>Bad Culture</label>
                            </div>
                            <textarea name="flagText" required="required" id="flagTextArea" placeholder="Please describe the reason for your flag. (Optional) " autoFocus ></textarea>
                            {/*Also give them option to describe it*/}
                          {/*After submit an alert "Thank you for helping keep XPrincipia organized and clean. Your flag will be reviewed."*/}
                          <div id="deleteButton">Submit</div>
                         <Link to={`/problem/${this.props.params.probID}/subproblems`}>
                            <div id="returnButton">Exit</div>
                         </Link>
                </fieldset>
            </form>
        </div>
      );
   }
}

