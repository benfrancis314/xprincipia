import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';

export default class CommentUnit extends React.Component {

  submitVote() {
       axios.post('http://localhost:10000/auth/vote/create', {
           Type: 1,
           TypeID: this.state.answerInfo.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            document.location = window.location.pathname 
        })
        .catch(function (error) {
            alert("You've already voted on a question.")
        })
  }

	render() {
		return (
	    <div>
			<ul> {this.props.answers.map(this.renderItem)} </ul>
	               
	    </div>
		);
	}

   renderItem(answer) {
      return (
        <li key={answer.ID} id="answerUnit">
            <div id="answerContent">
                <div id="answerAdder">C: {answer.Username}</div>
                <div id="answerText">{answer.Description}</div>
            </div>
            <button type="button" id="answerVote">Vote<br />{floatToDecimal(answer.PercentRank)}</button>
        </li>

      );
   }
}

//convert float to Decimal
function floatToDecimal(float) {
	console.log(float)
	return Math.round(float*100)+'%';
}