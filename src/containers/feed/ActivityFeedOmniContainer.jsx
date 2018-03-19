import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

configureAnchors({offset: -20, scrollDuration: 700});


// import ReactGA from 'react-ga';

export default class WelcomeUserUnit extends React.Component {
   
    hoverFeedText() {
        $(document).ready(function() {
                $('#feedTitle').html("select filter").fadeIn(7500);
                $('#feedTitle').attr('id','feedTitleHover');
        });
    }
    unHoverFeedText() {
            $(document).ready(function() {
                    $('#feedTitleHover').html("new activity");
                    $('#feedTitleHover').attr('id','feedTitle');
            });
    }
    hoverAdd() {
        $(document).ready(function() {
                $('#feedTitle').html("new project").fadeIn(7500);
                $('#feedTitle').attr('id','feedTitleHover');
        });
    }
    unHoverAdd() {
            $(document).ready(function() {
                    $('#feedTitleHover').html("new activity");
                    $('#feedTitleHover').attr('id','feedTitle');
            });
    }
    constructor(props){
        super(props);

        this.state = {
           feedProjects: [],
           feedProjectsSlice: []
        }

        this.pagingMore = this.pagingMore.bind(this);        
    };

    componentDidMount(){
        var self = this;
        return axios.get( Config.API + '/problems/omnifeed').then(function (response) {
            self.setState({
                feedProjects: response.data.reverse(),
                feedProjectsSlice: response.data.reverse().slice(0,9)
            })
        }) 
 
     }
     pagingMore() {
        this.state.feedProjectsSlice = this.state.feedProjects.slice(1,6)
        alert(this.state.feedProjectsSlice.length)
     }

	render() {
        return (
        <div id="feedContainer">
            <ScrollableAnchor id={'feed'}>
                <div id="feedTitle">
                    new activity
                </div>
            </ScrollableAnchor>
            {React.cloneElement(this.props.children, {problems: this.state.feedProjectsSlice})}
            <div id="feedBottom">
                <br />
            </div>
        </div>
		);
	}
}
function dateTime(str) {
    if(str != undefined){
       var result = str.substring(0,10);
       return result
    }
}
