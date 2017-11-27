import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import $ from 'jquery';


export default class NotebookUnit extends React.Component {
//   constructor(props){
//         super(props);

//         this.state = {
//             solutionInfo: [],
//             solutionID: [],
//             probID: []
//         }
//     };






   render() {
    

      return (
        <div id="notebookUnitContainer">
            <div id="notebookUnitHeader">
                notebooks
            </div>
            <div>
                plus button
            </div>
            <div id="notebootUnitList">
                <div id="notebookUnit">
                    Ending Aging Notes
                </div>
                <div id="notebookUnit">
                    Artificial Intelligence Notes
                </div>
            </div>
        </div>
      );
    }
}