import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import CommentProposalUnit from '../../components/comments/CommentProposalUnit.jsx';
import CommentUnit from '../../components/comments/CommentUnit.jsx';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class SuggestionCommentContainer extends React.Component {
   constructor(props){
        super(props);

        this.state = {
            suggestion: [],
            comments: [],
        }

        // this.submitVote = this.submitVote.bind(this)
    };

// New axios call:
// axios.get( Config.API + '/comments/suggestionID?id='+this.props.params.suggID+'&parentType='+this.props.parentType).then(function (response) {
    // Next need to feed in parentType through props

        componentDidMount(){
        var self = this;
         axios.get( Config.API + '/comments/parentType?id='+this.props.params.suggID+'&parentType=3').then(function (response) {
            self.setState({
                comments: response.data,
            })
        })  
        axios.get( Config.API + '/suggestions/ID?id='+this.props.params.suggID).then(function (response) {
            self.setState({
                suggestion: response.data
            })
        }) 
    }
  componentWillReceiveProps(nextProps){
    var self = this;
    axios.get( Config.API + '/comments/parentType?id='+nextProps.params.suggID+'&parentType=3').then(function (response) {
        self.setState({
            comments: response.data,
        })
    })  
      axios.get( Config.API + '/suggestions/ID?id='+nextProps.params.suggID).then(function (response) {
          self.setState({
              suggestion: response.data
          })
          
        })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });       
  }

 
   render() {

    if (this.props.params.solutionID){
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestions`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">Return to Suggestions</div>
                </div>
                {/*Suggestion being commented on*/}
                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestions`}>
                    <div id="answerQuestionUnit">
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                <span id="discussPercent">
                                    {floatToDecimal(this.state.suggestion.PercentRank)}
                                </span>
                                {this.state.suggestion.Username}
                            </div>
                            <div id="suggestionText">
                                {this.state.suggestion.Description}
                            </div>
                        </div>
                    </div>
                </Link>
                {this.props.children}
                <CommentProposalUnit comments={this.state.comments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.suggID} commentID={this.props.params.commentID} />
            </div>);



    } else {
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/${this.props.params.probID}/suggestions`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">Return to Suggestions</div>
                </div>
                {/*Suggestion being commented on*/}
                <div id="answerQuestionUnit">
                    <div id="answerQuestionContent">
                        <div id="discussHeader">
                            <span id="discussPercent">
                                {floatToDecimal(this.state.suggestion.PercentRank)}
                            </span>
                            {this.state.suggestion.Username}
                        </div>
                        <div id="suggestionText">
                            {this.state.suggestion.Description}
                        </div>
                    </div>
                    {/*<button type="button" ref='votebtn' onClick={submitVote} id="suggestionVote">
                        Vote
                    </button> */}
                    {/* <br /><br />  */}
            </div>
                {this.props.children}
                <CommentUnit comments={this.state.comments} probID={this.props.params.probID} suggID={this.props.params.suggID} commentID={this.props.params.commentID} />
            </div>
        );
    }
  }
}
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
};