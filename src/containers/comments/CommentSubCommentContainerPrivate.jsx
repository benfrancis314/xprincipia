import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import CommentProposalUnitPrivate from '../../components/comments/CommentProposalUnitPrivate.jsx';
import CommentUnitPrivate from '../../components/comments/CommentUnitPrivate.jsx';
import SideBarMore from '../../components/SideBarMore.jsx';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class CommentSubCommentContainer extends React.Component {
   constructor(props){
        super(props);

        this.state = {
            subcomments: [],
            comment: [],
        }

        // this.submitVote = this.submitVote.bind(this)
    };
        componentDidMount(){
        var self = this;
        // Need to do & in URL query with parentType also
         axios.get( Config.API + '/comments/parentType?id='+this.props.params.commentID+'&parentType=5').then(function (response) {
            self.setState({
                subcomments: response.data,
            })
        })  
        axios.get( Config.API + '/comments/ID?id='+this.props.params.commentID).then(function (response) {
            self.setState({
                comment: response.data
            })
        }) 
    }
  componentWillReceiveProps(nextProps){
    var self = this;
        axios.get( Config.API + '/comments/parentType?id='+nextProps.params.commentID+'&parentType=5').then(function (response) {
            self.setState({
                subcomments: response.data,
            })
        })  
        axios.get( Config.API + '/comments/ID?id='+nextProps.params.commentID).then(function (response) {
            self.setState({
              comment: response.data
            })
          
        }) 
  }

 
   render() {
    // PROPOSAL SUGGESTIONS
    if ((this.props.params.solutionID) && (this.state.comment.ParentType == '3')){
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestion/${this.state.comment.ParentID}/comments`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">return to comments</div>
                </div>
                {/*Suggestion being commented on*/}
                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestion/${this.state.comment.ParentID}/comments`}>
                    <div id="answerQuestionUnit">
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                <span id="discussPercent">
                                    {floatToDecimal(this.state.comment.PercentRank)}
                                </span>
                                {this.state.comment.Username}
                            </div>
                            <div id="suggestionText">
                                {this.state.comment.Description}
                            </div>
                        </div>
                    </div>
                </Link>
                {this.props.children}
                <CommentProposalUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
            </div>);
    // PROPOSAL ANSWERS
    } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '4')) {
    return (
        <div id="answerContainer">
            <div id="answerQuestionHeader">
                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/question/${this.state.comment.BackupParentID}/answer/${this.state.comment.BackupParentID}/comments`}>
                    <div id="backSolutionArrowDiv">
                        <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                    </div>
                </Link>
                <div id="answerQuestionLabel">return to comments</div>
            </div>
            {/*Suggestion being commented on*/}
            <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/question/${this.state.comment.BackupParentID}/answer/${this.state.comment.BackupParentID}/comments`}>
                <div id="answerQuestionUnit">
                    <div id="answerQuestionContent">
                        <div id="discussHeader">
                            <span id="discussPercent">
                                {floatToDecimal(this.state.comment.PercentRank)}
                            </span>
                            {this.state.comment.Username}
                        </div>
                        <div id="suggestionText">
                            {this.state.comment.Description}
                        </div>
                    </div>
                </div>
            </Link>
            {this.props.children}
            <CommentProposalUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
        </div>);
    // PROPOSAL COMMENTS
    } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '5')){
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/comment/${this.state.comment.ParentID}/subcomments`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">return to comments</div>
                </div>
                {/*Suggestion being commented on*/}
                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/comment/${this.state.comment.ParentID}/subcomments`}>
                    <div id="answerQuestionUnit">
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                <span id="discussPercent">
                                    {floatToDecimal(this.state.comment.PercentRank)}
                                </span>
                                {this.state.comment.Username}
                            </div>
                            <div id="suggestionText">
                                {this.state.comment.Description}
                            </div>
                        </div>
                    </div>
                </Link>
                {this.props.children}
                <CommentProposalUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
            </div>);
    // PROPOSAL DEBATE
    } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '6')){
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestion/${this.state.comment.ParentID}/comments`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">return to comments</div>
                </div>
                {/*Suggestion being commented on*/}
                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestion/${this.state.comment.ParentID}/comments`}>
                    <div id="answerQuestionUnit">
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                <span id="discussPercent">
                                    {floatToDecimal(this.state.comment.PercentRank)}
                                </span>
                                {this.state.comment.Username}
                            </div>
                            <div id="suggestionText">
                                {this.state.comment.Description}
                            </div>
                        </div>
                    </div>
                </Link>
                {this.props.children}
                <CommentProposalUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
            </div>);
    // PROPOSAL PROS
    } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '9')){
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/pros/${this.state.comment.ParentID}/comments`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">return to comments</div>
                </div>
                {/*Suggestion being commented on*/}
                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/pros/${this.state.comment.ParentID}/comments`}>
                    <div id="answerQuestionUnit">
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                <span id="discussPercent">
                                    {floatToDecimal(this.state.comment.PercentRank)}
                                </span>
                                {this.state.comment.Username}
                            </div>
                            <div id="suggestionText">
                                {this.state.comment.Description}
                            </div>
                        </div>
                    </div>
                </Link>
                {this.props.children}
                <CommentProposalUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
            </div>);
    // PROPOSAL CONS
    } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '10')){
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons/${this.state.comment.ParentID}/comments`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">return to comments</div>
                </div>
                {/*Suggestion being commented on*/}
                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons/${this.state.comment.ParentID}/comments`}>
                    <div id="answerQuestionUnit">
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                <span id="discussPercent">
                                    {floatToDecimal(this.state.comment.PercentRank)}
                                </span>
                                {this.state.comment.Username}
                            </div>
                            <div id="suggestionText">
                                {this.state.comment.Description}
                            </div>
                        </div>
                    </div>
                </Link>
                {this.props.children}
                <CommentProposalUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
            </div>);
        } else if  (this.state.comment.ParentType == '3'){
            return (
                <div id="answerContainer">
                    <div id="answerQuestionHeader">
                        <Link to={`/project/private/${this.props.params.probID}/suggestion/${this.state.comment.ParentID}/comments`}>
                            <div id="backSolutionArrowDiv">
                                <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                            </div>
                        </Link>
                        <div id="answerQuestionLabel">return to comments</div>
                    </div>
                    {/*Suggestion being commented on*/}
                    <Link to={`/project/private/${this.props.params.solutionID}/suggestion/${this.state.comment.ParentID}/comments`}>
                        <div id="answerQuestionUnit">
                            <div id="answerQuestionContent">
                                <div id="discussHeader">
                                    <span id="discussPercent">
                                        {floatToDecimal(this.state.comment.PercentRank)}
                                    </span>
                                    {this.state.comment.Username}
                                </div>
                                <div id="suggestionText">
                                    {this.state.comment.Description}
                                </div>
                            </div>
                        </div>
                    </Link>
                    {this.props.children}
                    <CommentUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
                </div>);
        // PROPOSAL ANSWERS
        } else if (this.state.comment.ParentType == '4') {
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/private/${this.props.params.probID}/question/${this.state.comment.BackupParentID}/answer/${this.state.comment.BackupParentID}/comments`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">return to comments</div>
                </div>
                {/*Suggestion being commented on*/}
                <Link to={`/project/private/${this.props.params.probID}/question/${this.state.comment.BackupParentID}/answer/${this.state.comment.BackupParentID}/comments`}>
                    <div id="answerQuestionUnit">
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                <span id="discussPercent">
                                    {floatToDecimal(this.state.comment.PercentRank)}
                                </span>
                                {this.state.comment.Username}
                            </div>
                            <div id="suggestionText">
                                {this.state.comment.Description}
                            </div>
                        </div>
                    </div>
                </Link>
                {this.props.children}
                <CommentUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
            </div>);
        // PROPOSAL COMMENTS
        } else if (this.state.comment.ParentType == '5') {
            return (
                <div id="answerContainer">
                    <div id="answerQuestionHeader">
                        <Link to={`/project/private/${this.props.params.probID}/comment/${this.state.comment.ParentID}/subcomments`}>
                            <div id="backSolutionArrowDiv">
                                <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                            </div>
                        </Link>
                        <div id="answerQuestionLabel">return to comments</div>
                    </div>
                    {/*Suggestion being commented on*/}
                    <Link to={`/project/private/${this.props.params.probID}/comment/${this.state.comment.ParentID}/subcomments`}>
                        <div id="answerQuestionUnit">
                            <div id="answerQuestionContent">
                                <div id="discussHeader">
                                    <span id="discussPercent">
                                        {floatToDecimal(this.state.comment.PercentRank)}
                                    </span>
                                    {this.state.comment.Username}
                                </div>
                                <div id="suggestionText">
                                    {this.state.comment.Description}
                                </div>
                            </div>
                        </div>
                    </Link>
                    {this.props.children}
                    <CommentUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
                </div>);
        // PROPOSAL DEBATE
        } else if (this.state.comment.ParentType == '6') {
            return (
                <div id="answerContainer">
                    <div id="answerQuestionHeader">
                        <Link to={`/project/private/${this.props.params.probID}/suggestion/${this.state.comment.ParentID}/comments`}>
                            <div id="backSolutionArrowDiv">
                                <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                            </div>
                        </Link>
                        <div id="answerQuestionLabel">return to comments</div>
                    </div>
                    {/*Suggestion being commented on*/}
                    <Link to={`/project/private/${this.props.params.probID}/suggestion/${this.state.comment.ParentID}/comments`}>
                        <div id="answerQuestionUnit">
                            <div id="answerQuestionContent">
                                <div id="discussHeader">
                                    <span id="discussPercent">
                                        {floatToDecimal(this.state.comment.PercentRank)}
                                    </span>
                                    {this.state.comment.Username}
                                </div>
                                <div id="suggestionText">
                                    {this.state.comment.Description}
                                </div>
                            </div>
                        </div>
                    </Link>
                    {this.props.children}
                    <CommentUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
                </div>);
        // PROPOSAL PROS
        } else if (this.state.comment.ParentType == '7') {
            return (
                <div id="answerContainer">
                    <div id="answerQuestionHeader">
                        <Link to={`/project/private/${this.props.params.probID}/learn/content/${this.state.comment.ParentID}/comments`}>
                            <div id="backSolutionArrowDiv">
                                <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                            </div>
                        </Link>
                        <div id="answerQuestionLabel">return to comments</div>
                    </div>
                    {/*Suggestion being commented on*/}
                    <Link to={`/project/private/${this.props.params.probID}/learn/content/${this.state.comment.ParentID}/comments`}>
                        <div id="answerQuestionUnit">
                            <div id="answerQuestionContent">
                                <div id="discussHeader">
                                    <span id="discussPercent">
                                        {floatToDecimal(this.state.comment.PercentRank)}
                                    </span>
                                    {this.state.comment.Username}
                                </div>
                                <div id="suggestionText">
                                    {this.state.comment.Description}
                                </div>
                            </div>
                        </div>
                    </Link>
                    {this.props.children}
                    <CommentUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
                </div>);
        // PROPOSAL CONS
        } else if (this.state.comment.ParentType == '8'){
            return (
                <div id="answerContainer">
                    <div id="answerQuestionHeader">
                        <Link to={`/project/private/${this.props.params.probID}/learn/resources/${this.state.comment.ParentID}/comments`}>
                            <div id="backSolutionArrowDiv">
                                <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                            </div>
                        </Link>
                        <div id="answerQuestionLabel">return to comments</div>
                    </div>
                    {/*Suggestion being commented on*/}
                    <Link to={`/project/private/${this.props.params.probID}/learn/resources/${this.state.comment.ParentID}/comments`}>
                        <div id="answerQuestionUnit">
                            <div id="answerQuestionContent">
                                <div id="discussHeader">
                                    <span id="discussPercent">
                                        {floatToDecimal(this.state.comment.PercentRank)}
                                    </span>
                                    {this.state.comment.Username}
                                </div>
                                <div id="suggestionText">
                                    {this.state.comment.Description}
                                </div>
                            </div>
                        </div>
                    </Link>
                    {this.props.children}
                    <CommentUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.commentID} commentID={this.props.params.commentID} />
                </div>);
    } else {
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/private/${this.props.params.probID}/comment/${this.state.comment.ParentID}/subcomments`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">return to comments</div>
                </div>
                {/*Suggestion being commented on*/}
                <Link to={`/project/private/${this.props.params.probID}/comment/${this.state.comment.ParentID}/subcomments`}>
                    <div id="answerQuestionUnit">
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                <span id="discussPercent">
                                    {floatToDecimal(this.state.comment.PercentRank)}
                                </span>
                                {this.state.comment.Username}
                            </div>
                            <div id="suggestionText">
                                {this.state.comment.Description}
                            </div>
                        </div>
                    </div>
                </Link>
                {this.props.children}
                <CommentUnitPrivate comments={this.state.subcomments} probID={this.props.params.probID} suggID={this.props.params.suggID} commentID={this.props.params.commentID} />
            </div>
        );
    }
  }
}
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
};

