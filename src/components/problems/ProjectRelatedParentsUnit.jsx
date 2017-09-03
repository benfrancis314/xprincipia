import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class QuestionUnit extends React.Component {

constructor(props){
     super(props);

        this.renderItem = this.renderItem.bind(this)

    };

// Update when backend is set up
//     componentWillReceiveProps (props) {
//     var self = this
//     self.setState({
//         voteHash : {},
//     })
//     props.questions.forEach( function (question){
//         axios.get( Config.API + "/auth/vote/isVotedOn?type=2&typeID=" + question.ID + "&username=" + cookie.load("userName"))
//         .then( function (response) {  
//             const voteHash = self.state.voteHash;

//             voteHash[question.ID] = response.data
//             self.setState({
//                 voteHash,
//             })
//         })  
//     })
// }


// Use the project id to get the titles, and only show the titles

	render() {
		return (
	    <div>
			<ul> 
                <div id="relatedParentUnitContainer">
                {/*Add back in when ready*/}
                {/*{this.props.questions.map(this.renderItem)} */}
                    <li id="relatedParentUnit"> 
                        <div id="relatedParentContent">
                            {/*Update vote percentage when votes work for these*/}
                                {/*<div id="discussHeader">*/}
                                    {/*<span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>*/}
                                {/*</div>*/}
                            <div id="relatedParentText">
                                {/*{relatedParent.Description}*/}
                                Related Parent Title
                            </div>
                        </div>
                        {/*Add back in vote when voting is ready*/}
                        {/*<button type="button" id="suggestionVote" onClick={submitVote}>
                            Vote
                        </button>*/}
                    </li>
                    <li id="relatedParentUnit"> 
                        <div id="relatedParentContent">
                            {/*Update vote percentage when votes work for these*/}
                                {/*<div id="discussHeader">*/}
                                    {/*<span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>*/}
                                {/*</div>*/}
                            <div id="relatedParentText">
                                {/*{relatedParent.Description}*/}
                                Related Parent Title
                            </div>
                        </div>
                        {/*Add back in vote when voting is ready*/}
                        {/*<button type="button" id="suggestionVote" onClick={submitVote}>
                            Vote
                        </button>*/}
                    </li>
                </div>
            </ul>	               
	    </div>
		);
	}
	renderItem(question) {
       
       return (
            <li id="relatedParentUnit"> 
                    <div id="relatedParentContent">
                        {/*Update vote percentage when votes work for these*/}
                            {/*<div id="discussHeader">*/}
                                {/*<span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>*/}
                            {/*</div>*/}
                        <div id="relatedParentText">
                            {/*{relatedParent.Description}*/}
                            Related Parent Title
                        </div>
                    </div>
                    {/*Add back in vote when voting is ready*/}
                    {/*<button type="button" id="suggestionVote" onClick={submitVote}>
                        Vote
                    </button>*/}
            </li>);
    }
}