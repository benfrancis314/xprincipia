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

hideNotebook() {
    // Get this to automatically save a notebook if one is open
    this.refs.child.updateNotebook()
    $(document).ready(function() {           
        $('#notebookContainerShow').attr('id','notebookContainer');
    });
}

   render() {
    
      return (
        <div id="notebookContainer" >
            <img src={require('../assets/redX.svg')} id="exitNotebookButton" onClick={this.hideNotebook.bind(this)} width="30" height="30" alt="Close button, red X symbol" />  
            <div id="notebookContainerRow">
                <NotebookUnit />
                <NotebookFull ref="child" />
            </div>
        </div>
      );
    }
}