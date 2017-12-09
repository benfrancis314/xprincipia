import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import $ from 'jquery';
import NotebookSubUnit from './NotebookSubUnit.jsx';



export default class NotebookUnit extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            notebooks: [],
        }
        this.renderItem = this.renderItem.bind(this)
        this.testAlert = this.testAlert.bind(this)
        
    };

  componentWillReceiveProps(nextProps){
	  var self = this
	  self.setState({
		  notebooks: nextProps.notebooks,
	  })
  }

  testAlert(notebookID) {
      alert('testAlertNotebookUnit');
    //   alert(notebookID);
    //   this.props.switchNotebook(notebookID)
  }

  render() {
    return (
        <div id="fullWide">   
            <ul id="notebootUnitList">
                {this.state.notebooks.map(this.renderItem)}
            </ul>
        </div>
    );
}
    renderItem(notebook) {
        // $(document).ready(function() {
        //     $('#notebookID').attr('id','discussHoverTextShow'+notebook.ID);
        // });
        return (
            <li key={notebook.ID + '1'} id="notebookUnit"  onMouseOver={hoverThread}>
                {notebook.Title}
                <div id="notebookID">{notebook.ID}</div>
                {/* <NotebookSubUnit id={notebook.ID} testAlert={this.testAlert} title={notebook.Title}/> */}
            </li>
        );
    function hoverThread() {
        $(document).ready(function() {
            $('#notebookID').attr('id','discussHoverTextShow'+String(notebook.ID));
        });
    }
}
}