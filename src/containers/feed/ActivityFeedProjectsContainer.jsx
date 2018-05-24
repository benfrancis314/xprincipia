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
        // window.scrollTo(0,0);
        axios.get( Config.API + '/problems/feed').then(function (response) {
            self.setState({
                feedProjects: response.data.reverse(),
                // feedProjectsSlice: response.data.reverse().slice(1,3)
                feedProjectsSlice: response.data.reverse().slice(0,9)
            })
        }) 
 
     }
     pagingMore() {
        this.state.feedProjectsSlice = this.state.feedProjects.slice(1,6)
        alert(this.state.feedProjectsSlice.length)
        // alert('success')
     }
    //  Attempt to get paging to transition from a certain number of projects to a different number
    //  componentWillReceiveProps(nextState) {
    //     nextState.feedProjectsSlice = this.state.feedProjectsSlice
    //   }
	render() {
        return (
        <div id="feedContainer">
            <ScrollableAnchor id={'feed'}>
                <div id="feedTitle">
                    new activity
                </div>
            </ScrollableAnchor>
            {/* {React.cloneElement(this.props.children, {problems: this.props.problems})} */}
            {React.cloneElement(this.props.children, {problems: this.state.feedProjectsSlice})}
            <div id="feedBottom">
                <br />
            </div>
            {/* <div onClick={this.pagingMore}>
                Paging
            </div> */}
        </div>
		);
	}
	renderItem(problem) {
  

// For Google Analytics when working
    // function handleClick() {
    //     ReactGA.event({
    //         category: 'Project',
    //         action: 'Clicked Link',
    //     });
    // }
if (problem.Private === true) {
        return (
            <div key={problem.ID} id="nodisplay">
            </div>
        );

} else if (problem.ParentType === 1) {

      return (
      
            <li key={problem.ID} id="nodisplay">
            </li>
      
      
      );

} else if (problem.Title === 'future civilization') {

      return (
      
        <li key={problem.ID} id="nodisplay">
        </li>
      
      
      );

} else if (problem.Title === 'evolving humanity') {
      return (
        <li key={problem.ID} id="nodisplay">
        </li>
      
      );
} else if (problem.Title === 'describing reality') {
      return (
        <li key={problem.ID} id="nodisplay">
        </li>
      
      );
} else if (problem.Title === 'advancing technology') {
      return (
        <li key={problem.ID} id="nodisplay">
        </li>
      
      );
} else 
      return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/'+problem.ID +'/subprojects'}>
                <div id="feedUnits">               
                    <div id="blueFeed">project by {problem.OriginalPosterUsername}</div>
                    <div id="whiteFeed">{problem.Title}</div>
                    <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
                </div>
            </Link>
        </li>
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
