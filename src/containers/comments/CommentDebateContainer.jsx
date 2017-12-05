import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import CommentProposalUnit from '../../components/comments/CommentProposalUnit.jsx';
import CommentUnit from '../../components/comments/CommentUnit.jsx';
import SideBarMore from '../../components/SideBarMore.jsx';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class CommentDebateContainer extends React.Component {
   constructor(props){
        super(props);

        this.state = {
            debate: [],
            comments: [],
        }

        // this.submitVote = this.submitVote.bind(this)
    };
        componentDidMount(){
        var self = this;
        // Need to do & in URL query with parentType also
         axios.get( Config.API + '/comments/parentID?id='+this.props.params.freeFormID).then(function (response) {
            self.setState({
                comments: response.data,
            })
        })  
        axios.get( Config.API + '/freeForms/ID?id='+this.props.params.freeFormID).then(function (response) {
            self.setState({
                debate: response.data
            })
        }) 
    }
  componentWillReceiveProps(newProps){
    var self = this;
      axios.get( Config.API + '/freeForms/ID?id='+newProps.params.freeFormID).then(function (response) {
          self.setState({
              debate: response.data
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
    axios.get( Config.API + '/auth/comments/suggestionID?id='+this.props.params.suggID).then(function (response) {
        self.setState({
            comments: response.data,
        })
    })        

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
                    {/*<button type="button" onClick={submitVote} id="suggestionVote">
                        Vote
                    </button> */}
                    <br /><br /> 
                </div>
                {this.props.children}
                <CommentProposalUnit comments={this.state.comments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.freeFormID} commentID={this.props.params.commentID} />
            </div>);



    } else {
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/${this.props.params.probID}/freeforms`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">return to debates</div>
                </div>
                {/*Suggestion being commented on*/}
                <div id="answerQuestionUnit">
                    <div id="answerQuestionContent">
                        <div id="discussHeader">
                            <span id="discussPercent">
                                {/* {floatToDecimal(this.state.suggestion.PercentRank)} */}
                            </span>
                            {/* {this.state.suggestion.Username} */}
                        </div>
                        <div id="suggestionText">
                            {/* {this.state.suggestion.Description} */}
                        </div>
                    </div>
                    {/*<button type="button" onClick={submitVote} id="suggestionVote">
                        Vote
                    </button> */}
                    <br /><br /> 
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