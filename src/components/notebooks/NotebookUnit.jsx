import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import $ from 'jquery';


export default class NotebookUnit extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            notebooks: [],
        }

    };

  componentWillReceiveProps(nextProps){
	  var self = this
	  self.setState({
		  notebooks: nextProps.notebooks,
	  })
  }



  render() {
    return (
        <div id="fullWide">   
            <ul id="notebootUnitList">
                {this.state.problems.map(this.renderItem)}
            </ul>
        </div>
    );
}
    renderItem(notebook) {
        return (
            <li key={notebook.ID} id="notebookUnit">
                {notebook.Title}
            </li>
        );
    }
}