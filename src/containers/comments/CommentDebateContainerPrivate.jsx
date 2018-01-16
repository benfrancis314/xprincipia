import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import CommentProposalUnitPrivate from '../../components/comments/CommentProposalUnitPrivate.jsx';
import CommentUnitPrivate from '../../components/comments/CommentUnitPrivate.jsx';
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
         axios.get( Config.API + '/comments/parentType?id='+this.props.params.freeFormID+'&parentType=6').then(function (response) {
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
  componentWillReceiveProps(nextProps){
    var self = this;
        axios.get( Config.API + '/comments/parentType?id='+nextProps.params.freeFormID+'&parentType=6').then(function (response) {
            self.setState({
                comments: response.data,
            })
        })  
        axios.get( Config.API + '/freeForms/ID?id='+nextProps.params.freeFormID).then(function (response) {
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
  }

 
   render() {

    if (this.props.params.solutionID){
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/freeforms`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">return to debates</div>
                </div>
                {/*Element being commented on*/}
                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/freeforms`}>
                    <div id="answerQuestionUnit">
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                <span id="discussPercent">
                                    {floatToDecimal(this.state.debate.PercentRank)}
                                </span>
                                {this.state.debate.Username}
                            </div>
                            <div id="suggestionText">
                                {this.state.debate.Description}
                            </div>
                        </div>
                    </div>
                </Link>
                {this.props.children}
                <CommentProposalUnitPrivate comments={this.state.comments} probID={this.props.params.probID} solutionID={this.props.params.solutionID} suggID={this.props.params.freeFormID} commentID={this.props.params.commentID} />
            </div>);



    } else {
        return (
            <div id="answerContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/private/${this.props.params.probID}/freeforms`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">return to debates</div>
                </div>
                {/*Element being commented on*/}
                <Link to={`/project/private/${this.props.params.probID}/freeforms`}>
                <div id="answerQuestionUnit">
                    <div id="answerQuestionContent">
                        <div id="discussHeader">
                            <span id="discussPercent">
                                {floatToDecimal(this.state.debate.PercentRank)}
                            </span>
                            {this.state.debate.Username}
                        </div>
                        <div id="suggestionText">
                            {this.state.debate.Description}
                        </div>
                    </div>
                    </div>
                </Link>
                {this.props.children}
                <CommentUnitPrivate comments={this.state.comments} probID={this.props.params.probID} suggID={this.props.params.suggID} commentID={this.props.params.commentID} />
            </div>
        );
    }
  }
}
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
};