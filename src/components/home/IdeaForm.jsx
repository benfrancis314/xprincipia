import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class IdeaForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            author: '',
        }
        this.postIdea = this.postIdea.bind(this);
    };

    postIdea() {
        var self = this
        this.state.title = document.getElementById('ideaFormTitle').value
        this.state.description = document.getElementById('ideaFormDescription').value
        this.state.author = document.getElementById('ideaAuthorForm').value

        axios.post( Config.API + '/solutions/create', {
            title : this.state.title,
            description : this.state.description,
            // Sending "author" to summary field until backend is updatable 
            summary : this.state.author,
          })
          .then(function (result) {
            // What else do we want here?
            document.getElementById("ideaFormBody").reset();
          })
    }

   render() {
        return (
            <div id="ideaFormContainer">
                <form id="ideaFormBody">
                    <div id="ideaFormLabel">   
                        {/* NEW IDEA */}
                    </div>
                    <div id="ideaFormTopicName">
                        <span id="blueMontserrat">>>>   TOPIC: </span>LUNAR COLONIZATION
                    </div>
                    <div id="ideaForm">
                        <input type="text" required="required" maxLength="70" id="ideaFormTitle" placeholder="NEW IDEA TITLE"/>
                        <textarea placeholder="What is your idea? " id="ideaFormDescription"/>
                    </div>
                    <div id="ideaFormFooter">
                        <input type="text" required="required" maxLength="70" id="ideaAuthorForm" placeholder="Optional:  Author Name"/>
                        <div id="ideaFormSubmit" onClick={this.postIdea}>
                            ADD
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}