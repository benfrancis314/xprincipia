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
           feedDebates: [],
           feedDebatesSlice: []
        }
    };

    componentDidMount(){
        var self = this;
        // window.scrollTo(0,0);
        return axios.get( Config.API + '/freeForms/feed').then(function (response) {
            self.setState({
                feedDebates: response.data.reverse(),
                feedDebatesSlice: response.data.reverse().slice(0,10)
            })
        }) 
    }
	render() {
        return (
        <div id="feedContainer">
            <ScrollableAnchor id={'feed'}>
                <div id="feedTitle">
                    new activity
                </div>
            </ScrollableAnchor>
            {/* {React.cloneElement(this.props.children, {problems: this.props.problems})} */}
            {React.cloneElement(this.props.children, {debates: this.state.feedDebates})}
            <div id="feedBottom">
                <br />
            </div>
        </div>
		);
	}
// 	renderItem(problem) {
  
// if (question.Private === true) {
//         return (
//             <div key={problem.ID} id="nodisplay">
//             </div>
//         );

// } else 
//       return (
//         <li key={question.ID} id="feedListUnit">
//             <Link to={'/project/'+question.TypeID +'/subprojects'}>
//                 <div id="feedUnits">               
//                     <div id="blueFeed">on {question.ParentTitle}</div>
//                     <div id="whiteFeed">{question.Description}</div>
//                     <div id="feedDate">{dateTime(question.CreatedAt)}</div>
//                 </div>
//             </Link>
//         </li>
//       );
//    }
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
