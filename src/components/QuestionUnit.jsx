import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import $ from 'jquery';

export default class QuestionUnit extends React.Component {
    constructor(){
    super();

    this.state= {
        question: '',
    }

    this.hideQuestions = this.hideQuestions.bind(this);
    this.renderItem = this.renderItem.bind(this)
}


  submitVote() {
       axios.post('http://localhost:10000/auth/vote/create', {
           Type: 1,
           TypeID: this.state.questionInfo.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            document.location = window.location.pathname 
        })
        .catch(function (error) {
            alert("You've already voted on a question.")
        })
  }

      hideQuestions() {
        $(document).ready(function() {
            $('#questionUnit').hide();
            // $('#questionAnswersButton').on('click', function() {
                // $('#headerSection').fadeTo('fast', 0.5);
            // });
        });
    }

	render() {
		return (
	    <div>
			<ul> {this.props.questions.map(this.renderItem)} </ul>
	               
	    </div>
		);
	}

	renderItem(question) {

    return (
        <li key={question.ID} id="questionUnit">
				<div id="questionContent">
					<div id="questionAdder">Q: {question.Username}</div>
                	<div id="questionText">{question.Description}</div>
				</div>
				<button type="button" id="questionVote">Vote<br />{floatToDecimal(question.PercentRank)}</button>
            <Link to={`/problem/${question.TypeID}/${question.ID}/answers`} activeClassName="activeBlue" id="questionAnswersButton" onClick={this.hideQuestions}>
                <button type="button" id="questionAnswers">Answers</button>
            </Link>
        <br/><br/> 
        </li>)
  }
}

//convert float to Decimal
function floatToDecimal(float) {
	console.log(float)
	return Math.round(float*100)+'%';
}
