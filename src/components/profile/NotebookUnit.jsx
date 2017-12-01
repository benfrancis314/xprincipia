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
        <div id="fullWide">   
            <ul id="notebootUnitList">
                <li id="notebookUnit">
                    Ending Aging Notes
                </li>
                <li id="notebookUnit">
                    Artificial Intelligence Notes
                </li>
            </ul>
        </div>
      );
    }
}