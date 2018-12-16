import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import IdeaCommentUnit from './IdeaCommentUnit.jsx';


export default class IdeaComments extends React.Component {
   
//   unHoverText() {
//       $(document).ready(function() {
//           $('#logoNameGuide').html('<span id="xBlue">x</span>principia');             
//           $('#logoNameGuide').attr('id','logoName');
//       });
//   }

    constructor(props){
        super(props);
        this.state = {
           comments : [],
           description: '',
           author: '',
           commentsRefresh: '',
        }
        this.postIdeaComment = this.postIdeaComment.bind(this);
        this.commentsRefresh = this.commentsRefresh.bind(this);
    };
    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/threads/ideaID?id='+this.props.ideaID).then(function (response) {
                self.setState({
                    comments: response.data,
                })
        }) 
    }
    componentWillReceiveProps(nextProps){
        var self = this;
        axios.get( Config.API + '/threads/ideaID?id='+nextProps.ideaID).then(function (response) {
                self.setState({
                    comments: response.data,
                })
        }) 
    }
    commentsRefresh() {
        var self = this;
        axios.get( Config.API + '/threads/ideaID?id='+this.props.ideaID).then(function (response) {
            self.setState({
                comments: response.data,
            })
        }) 
    }
    

    postIdeaComment() {
        //Read field items into component state
        var self = this;
        this.state.description = document.getElementById('ideaCommentFormDescription').value
        var authorName = document.getElementById('ideaCommentFormAuthor').value
        if (authorName.length == 0) {
            this.state.author = 'Anonymous'
        }
        else {
            this.state.author = authorName
        }
        axios.post( Config.API + '/threads/create', {
            userName: this.state.author,
            description : this.state.description,
            parentTitle: this.props.ideaTitle,
            ideaID: this.props.ideaID,
        })
        .then(function (result) {
            document.getElementById("ideaCommentForm").reset();
            self.commentsRefresh()
        })
    }

    render() {
    
            return (
                <div id="ideaCommentsBody">
                    <div id="ideaCommentsLabel">
                        [ - -  COMMENTS  - - ]
                    </div>
                    <form id="ideaCommentForm">
                        <textarea placeholder="What do you think? " id="ideaCommentFormDescription" autoFocus />
                        <div id="ideaCommentFooter">
                            <input type="text" required="required" maxLength="70" id="ideaCommentFormAuthor" placeholder="Optional:  Author Name"/>
                            <div id="ideaCommentSubmit" onClick={this.postIdeaComment}>
                                Comment
                            </div>
                        </div>
                    </form>
                    <IdeaCommentUnit commentsProps={this.state.comments} commentsRefresh={this.state.commentsRefresh} />
                </div>
            );
    }
}