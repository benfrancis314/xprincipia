import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


export default class TopicUnit extends React.Component {

    constructor(props){
        super(props);

        this.state = {
           topics : [],
        }
        this.renderItem = this.renderItem.bind(this);
    };
    
    componentWillReceiveProps(nextProps){
        var self = this;
        self.setState({
            topics: nextProps.topicsProps,
        })
    }

   render() {
    
            return (
                <div id="fullWide">
                    {this.state.topics.map(this.renderItem)}
                </div>
            );
    }

    renderItem(topic) {
        return(
            <Link key={topic.ID} to={`/home/${topic.ID}`} activeClassName="topicListUnitActive">
                <div id="topicListUnit">
                    {topic.Title}
                </div>
            </Link>
        )
    }

}




