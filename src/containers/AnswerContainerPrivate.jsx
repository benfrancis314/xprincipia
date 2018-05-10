import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import AnswerProposalUnitPrivate from '../components/answers/AnswerProposalUnitPrivate.jsx';
import AnswerUnitPrivate from '../components/answers/AnswerUnitPrivate.jsx';
import SideBarMore from '../components/SideBarMore.jsx';
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
    componentWillReceiveProps(nextProps){
        var self = this;
        axios.get( Config.API + '/answers/questionID?id='+nextProps.params.questID).then(function (response) {
            self.setState({
                answers: response.data,
            })
        })
        axios.get( Config.API + '/questions/ID?id='+nextProps.params.questID).then(function (response) {
            self.setState({
                question: response.data
            })
        }) 
             
    }
 
   render() {
    if (this.props.params.solutionID){
        return (
            <div id="answerContainer">
        
            {/*Question being answered*/}
            <div id="answerQuestionHeader">
                <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/questions`}>
                    <div id="backSolutionArrowDiv">
                        <img src={require('../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                    </div>
                </Link>
                <div id="answerQuestionLabel">Return to Questions</div>
            </div>
            <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/questions`}>
                <div id="answerQuestionUnit"> 
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                <span id="discussPercent">
                                    {floatToDecimal(this.state.question.PercentRank)}
                                </span>
                            </div>
                            <div id="suggestionText">
                                {/* <span id="blueOpen">Q: </span> */}
                                {this.state.question.Description}
                            </div>
                        </div>
                        {/*<button type="button" id="suggestionVote" ref='votebtn' onClick={submitVote}>
                            Vote
                        </button>*/}
                        <br/><br/> 
                </div>
            </Link>

                {this.props.children}
                {/*<QuestionUnit questions={this.state.questions}/>*/}
                <AnswerProposalUnitPrivate answers={this.state.answers} probID={this.props.params.probID} solutionID={this.props.params.solutionID} questID={this.props.params.questID} answerID={this.props.params.answerID} />
                <SideBarMore />
            </div>);



    } else {
        return (
            <div id="answerContainer">
        
            {/*Question being answered*/}
            <div id="answerQuestionHeader">
                <Link to={`/project/private/${this.props.params.probID}/questions`}>
                    <div id="backSolutionArrowDiv">
                        <img src={require('../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                    </div>
                </Link>
                <div id="answerQuestionLabel">Return to Questions</div>
            </div>
            <div id="answerQuestionUnit"> 
                    <div id="answerQuestionContent">
                        <div id="discussHeader">
                            <span id="discussPercent">
                            
                                {floatToDecimal(this.state.question.PercentRank)}
                            </span>
                            {/*Test Username*/}
                            {/*{this.state.question.Username}*/}
                        </div>
                        <div id="suggestionText">
                            {/*Test Description*/}
                            {/* <span id="blueOpen">Q: </span> */}
                            {this.state.question.Description}
                        </div>
                    </div>
                    {/*<button type="button" id="suggestionVote" ref='votebtn' onClick={submitVote}>
                        Vote
                    </button>*/}
                    <br/><br/> 
            </div>

                {this.props.children}
                {/*<QuestionUnit questions={this.state.questions}/>*/}
                <AnswerUnitPrivate answers={this.state.answers} probID={this.props.params.probID} questID={this.props.params.questID} answerID={this.props.params.answerID} />
                <SideBarMore />
            </div>
        );
        }
    }
}
//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
};