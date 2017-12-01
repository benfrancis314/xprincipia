import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import {Config} from '../config.js';
import NotebookFull from '../components/profile/NotebookFull.jsx';
import NotebookUnit from '../components/profile/NotebookUnit.jsx';
import $ from 'jquery';


export default class NotebookContainer extends React.Component {
//   constructor(props){
//         super(props);

//         this.state = {
//             solutionInfo: [],
//             solutionID: [],
//             probID: []
//         }
//     };


// When mounting and getting the call, do an IF statement first,
// where IF there is the notebookContainerShow, THEN mount, otherwise don't.
// This will prevent it from always mounting and make the site faster


saveNotebook() {
    // Get this to automatically save a notebook if one is open
    this.refs.full.updateNotebook()
    // $(document).ready(function() {           
    //     $('#notebookContainerShow').attr('id','notebookContainer');
    // });

}

hideNotebook() {
    // Get this to automatically save a notebook if one is open
    this.refs.full.updateNotebook()
    $(document).ready(function() {           
        $('#notebookContainerShow').attr('id','notebookContainer');
    });
}

   render() {
    
      return (
        <div id="notebookContainerShow">
            <div id="notebookButtonRow">
                {/* <img src={require('../assets/save2.svg')} id="saveNotebookButton" onClick={this.saveNotebook.bind(this)} width="30" height="30" alt="Close button, red X symbol" /> */}
                <img src={require('../assets/redX.svg')} id="exitNotebookButton" onClick={this.hideNotebook.bind(this)} width="30" height="30" alt="Close button, red X symbol" />  
            </div>
            <div id="notebookContainerRow">
                <div id="notebookUnitContainer">
                <div id="notebookUnitHeader">
                    notebooks
                </div>
                <div id="notebookSavedLabel">
                    saved
                </div>
                <div id="notebookAddButton" 
                /* onMouseOver={this.hoverAdd} onMouseOut={this.unHoverAdd} */
                >
                    <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="35" height="35" alt="User avatar, DNA Helix" />
                </div>
                <NotebookUnit />
            </div>
                <NotebookFull ref="full" />
            </div>
        </div>
      );
    }
}