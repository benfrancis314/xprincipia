import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ReactGA from 'react-ga';
ReactGA.initialize('UA-104103231-1'); //Unique Google Analytics tracking number


export default class IdeaForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            author: '',
            topicTitle: '',
        }
        this.postIdea = this.postIdea.bind(this);
        this.newIdeaTitleChange = this.newIdeaTitleChange.bind(this);
    };

    componentDidMount() {
        var self = this;
        axios.get( Config.API + '/problems/ID?id='+this.props.currentTopic).then(function (response) {
            self.setState({
                topicTitle: response.data.Title
            })
        })    
    }

    componentWillReceiveProps(nextProps) {
        var self = this;
        axios.get( Config.API + '/problems/ID?id='+nextProps.currentTopic).then(function (response) {
            self.setState({
                topicTitle: response.data.Title
            })
        })    
    }

    postIdea() {
        var self = this
        this.state.title = document.getElementById('ideaFormTitle').value
        this.state.description = document.getElementById('ideaFormDescription').value
        // Testing for if user input an author name
        var authorName = document.getElementById('ideaAuthorForm').value
        if (authorName.length == 0) {
            this.state.author = 'Anonymous'
        }
        else {
            this.state.author = authorName
        }
        

        axios.post( Config.API + '/solutions/create', {
            title : this.state.title,
            description : this.state.description,
            // Sending "author" to summary field until backend is updatable 
            username : this.state.author,
            problemID: this.props.currentTopic,
            parentTitle: this.state.topicTitle,
          })
          .then(function (result) {
            // What else do we want here?
            document.getElementById("ideaFormBody").reset();
            document.getElementById('ideaListUnitNew').value = "";
            self.props.resetTopic()
          })          
    }

    newIdeaTitleChange(event) {
        document.getElementById('ideaListUnitNew').value = document.getElementById('ideaFormTitle').value;
    }


   render() {

    function gaIdeaFormTitle() {
        ReactGA.event({
            category: 'Idea',
            action: 'Idea Form',
            label: 'Click Title',
        });
    }
    function gaIdeaFormDescription() {
        ReactGA.event({
            category: 'Idea',
            action: 'Idea Form',
            label: 'Click Description',
        });
    }
    function gaIdeaFormAuthor() {
        ReactGA.event({
            category: 'Idea',
            action: 'Idea Form',
            label: 'Click Author',
        });
    }
    
        return (
            <div id="ideaFormContainer">
                <form id="ideaFormBody">
                    <div id="ideaFormLabel">   
                        {/* NEW IDEA */}
                    </div>
                    <div id="ideaFormTopicName">
                        <span id="blueMontserrat">>>>   TOPIC: </span>{this.state.topicTitle}
                    </div>
                    <div id="ideaForm">
                        <input onClick={gaIdeaFormTitle} onChange={this.newIdeaTitleChange} type="text" required="required" maxLength="70" id="ideaFormTitle" placeholder="NEW IDEA TITLE"/>
                        <textarea onClick={gaIdeaFormDescription} placeholder="What is your idea? " id="ideaFormDescription"/>
                    </div>
                    <div id="ideaFormFooter">
                        <input onClick={gaIdeaFormAuthor} type="text" required="required" maxLength="70" id="ideaAuthorForm" placeholder="Optional:  Author Name"/>
                        <Link id="ideaFormSubmit" to={window.location.pathname} onClick={this.postIdea}>
                            ADD
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}