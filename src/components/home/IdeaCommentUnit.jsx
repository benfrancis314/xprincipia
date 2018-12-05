import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class IdeaUnit extends React.Component {

    constructor(props){
        super(props);

        this.state = {
           comments : [],
        }
        this.renderItem = this.renderItem.bind(this);
    };
    
    componentWillReceiveProps(nextProps){
        var self = this;
        self.setState({
            comments: nextProps.commentsProps,
            commentsRefresh: nextProps.commentsRefresh,
        })
    }

   render() {
    
            return (
                <div id="ideaCommentList">
                    {this.state.comments.map(this.renderItem)}
                </div>
            );
    }

    renderItem(comment) {

        return(
            <div key={comment.ID} id="ideaCommentUnit">
                <div id="ideaCommentMetadata">
                    <div id="ideaCommentDate">
                        {comment.CreatedAt.slice(0,10)}
                    </div>
                    <div id="ideaCommentAuthor">
                        {comment.Username}
                    </div>
                </div>
                <div id="ideaCommentDescription">
                    {comment.Description}
                </div>
            </div>
        )
    }

}

