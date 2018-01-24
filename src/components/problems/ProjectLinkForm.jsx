import React from 'react';
// Will be uesd with componentDidUpdate
// import ReactDOM from 'react-dom';import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import ProjectLinkUnits from './ProjectLinkUnits.jsx';
import $ from 'jquery';

export default class ProjectLinkForm extends React.Component {

  constructor(){
    super();
    
    //ProblemForm structure in backend
    this.state= {
      title: '',
      summary: '',
      class: '',
      userproblems : [],
      searchText: [],
    }

    this.queryProblem = this.queryProblem.bind(this);    
  };

// componentDidUpdate() {
//         ReactDOM.findDOMNode(this).scrollIntoView();
//   }      
queryProblem () {
    //get search text box data
   this.state.searchText = document.getElementById('problemTitleFormSearch').value

   var self = this
   return axios.get( Config.API + '/problems/search?q='+this.state.searchText).then(function (response) {
       self.setState({
         userproblems: response.data
       })
   })
 }

  render() {
      return (
        <div>
          {/* {this.props.breakdownID}x */}
          <div id="createProblemBox">
              <form id="linkForm">
                <fieldset id="fieldSetNoBorderNoPaddingBottom">
                    <label htmlFor="problemTitleForm" id="problemTitleFormLabel">search existing projects<br />
                      <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleFormSearch" onKeyDown={this.queryProblem} autoFocus autoComplete="off" />
                    </label><br />

                </fieldset>
              </form>
              <ProjectLinkUnits problems={this.state.userproblems} probID={this.props.probID} parentTitle={this.props.parentTitle} />
          </div>
        </div>

      );
   }
}

