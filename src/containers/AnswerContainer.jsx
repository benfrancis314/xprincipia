import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import AnswerProposalUnit from '../components/answers/AnswerProposalUnit.jsx';
import AnswerUnit from '../components/answers/AnswerUnit.jsx';
import {Config} from '../config.js';
import $ from 'jquery';

export default class AnswerContainer extends React.Component {
   constructor(props){
        super(props);

        this.state = {
            question: [],
            answers: [], 
        }
        
        // this.submitVote = this.submitVote.bind(this)
    };
    componentDidMount(){
        // ReactDOM.findDOMNode(this).scrollIntoView();
        // window.scrollBy(0, -70);
        var self = this;
        axios.get( Config.API + '/answers/questionID?id='+this.props.params.questID).then(function (response) {
            self.setState({
                answers: response.data,
            })
        })
        axios.get( Config.API + '/questions/ID?id='+this.props.params.questID).then(function (response) {
            self.setState({
                question: response.data
            })
        }) 
             
    }
    // Strategy for updating state
  componentWillReceiveProps(newProps){
    var self = this;
      axios.get( Config.API + '/questions/ID?id='+newProps.params.questID).then(function (response) {
          self.setState({
              question: response.data
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
    axios.get( Config.API + '/answers/questionID?id='+this.props.params.questID).then(function (response) {
        self.setState({
            answers: response.data,
        })
    })        

  }
å
 
   render() {

    if (this.props.params.solutionID){
        return (
            <div id="answerContainer">
                    {/*Question being answered*/}
                    <div id="answerQuestionHeader">
                        <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/questions`}>
                            <div id="backSolutionArrowDiv">
                                <img src={require('../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                            </div>
                        </Link>
                        <div id="answerQuestionLabel">Return to Questions</div>
                    </div>
                    <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/questions`}>
                        <div id="answerQuestionUnit"> 
                                <div id="answerQuestionContent">
                                    <div id="discussHeader">
                                        <span id="discussPercent">
                                            {floatToDecimal(this.state.question.PercentRank)}
                                        </span>
                                        {/*Test Username*/}
                                        {this.state.question.Username}
                                    </div>
                                    <div id="suggestionText">
                                        {/*Test Description*/}
                                        <span id="blueOpen">Q: </span>{this.state.question.Description}
                                    </div>
                                </div>
                                {/*<button type="button" id="suggestionVote" onClick={submitVote}>
                                    Vote
                                </button>*/}
                                <br/><br/> 
                        </div>
                    </Link>
                {this.props.children}
                {/*<QuestionUnit questions={this.state.questions}/>*/}
                <AnswerProposalUnit answers={this.state.answers} probID={this.props.params.probID} solutionID={this.props.params.solutionID} questID={this.props.params.questID} answerID={this.props.params.answerID} />
            </div>);




    } else {
        return (
        <div id="answerContainer">
       
        {/*Question being answered*/}
        <div id="answerQuestionHeader">
            <Link to={`/project/${this.props.params.probID}/questions`}>
                <div id="backSolutionArrowDiv">
                    <img src={require('../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                </div>
            </Link>
            <div id="answerQuestionLabel">Return to Questions</div>
        </div>
        <Link to={`/project/${this.props.params.probID}/questions`}>
            <div id="answerQuestionUnit"> 
                    <div id="answerQuestionContent">
                        <div id="discussHeader">
                            <span id="discussPercent">
                                {floatToDecimal(this.state.question.PercentRank)}
                            </span>
                            {/*Test Username*/}
                            {this.state.question.Username}
                        </div>
                        <div id="suggestionText">
                            {/*Test Description*/}
                            <span id="blueOpen">Q: </span>{this.state.question.Description}
                        </div>
                    </div>
                    {/*<button type="button" id="suggestionVote" onClick={submitVote}>
                        Vote
                    </button>*/}
                    <br/><br/> 
            </div>
        </Link>

            {this.props.children}
            {/*<QuestionUnit questions={this.state.questions}/>*/}
            <AnswerUnit answers={this.state.answers} probID={this.props.params.probID} questID={this.props.params.questID} answerID={this.props.params.answerID} />
        </div>
      );
   }
}
}
//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
};