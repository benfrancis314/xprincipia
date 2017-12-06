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
                    $('#feedTitleHover').html("discovery's past");
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
                    $('#feedTitleHover').html("discovery's past");
                    $('#feedTitleHover').attr('id','feedTitle');
            });
    }
    constructor(props){
        super(props);

        this.state = {
           feedSuggestions: [],
           feedSuggestionsSlice: []
        }
    };

    componentDidMount(){
        var self = this;
        // window.scrollTo(0,0);
        return axios.get( Config.API + '/suggestions/feed').then(function (response) {
            self.setState({
                feedSuggestions: response.data.reverse(),
                feedSuggestionsSlice: response.data.reverse().slice(0,10)
            })
        }) 
     }
	render() {
        return (
        <div id="feedContainer">
            <ScrollableAnchor id={'feed'}>
                <div id="feedTitle">
                    discovery's past
                </div>
            </ScrollableAnchor>
            {/* {React.cloneElement(this.props.children, {problems: this.props.problems})} */}
            {React.cloneElement(this.props.children, {suggestions: this.state.feedSuggestions})}
            <div id="feedBottom">
                <br />
            </div>
        </div>
		);
	}
}

// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }
function dateTime(str) {
    if(str != undefined){
       var result = str.substring(0,10);
       return result
    }
}
