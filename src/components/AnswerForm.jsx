import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';

export default class AnswerForm extends React.Component {

constructor(){
  super();

  this.state= {
    answer: '',
  }

  this.postAnswer = this.postAnswer.bind(this);
};

postAnswer() {
  //Read field items into component state
  this.state.answer = document.getElementById('answerTextArea').value
// Ajax post answer request
axios.post('http://http://ec2-13-58-19-50.us-east-2.compute.amazonaws.com:10000/auth/answers/create', {
  questionID: this.props.questID,
  username: cookie.load('userName'),
  description : this.state.answer,
})
.then(function (result) {

})
.catch(function (error) {
  alert('Please try again');

  });
}



   render() {
      return (

      <div id="answerFormComponent">
        <form id="answerForm">
            <fieldset>
                <legend>Answers</legend>
                     <textarea name="answerText" required="required" id="answerTextArea"></textarea>
                     <br />
                     <input type="submit" value="Add" onClick={this.postAnswer} id="addAnswer"/>
            </fieldset>
        </form>
      </div>

      );
   }
}
