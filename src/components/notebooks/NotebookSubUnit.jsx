import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import $ from 'jquery';


export default class NotebookUnit extends React.Component {
    constructor(props){
        super(props);

        this.state = {
        }
        
    };

alert() {
    alert('subunit test')
}

  render() {
    return (
        <div id="fullWide"
        //  onClick={this.props.testAlert(this.props.id)}
         >   
            {this.props.title}
        </div>
    );
}
}