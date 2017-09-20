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

// Trying to use this to fix scroll error when discuss menu up and scroll down to #proposals in url
// shouldComponentUpdate(nextProps, nextState) {
//     // only render if probID has changed
//     return this.state.probID !== nextProps.params.probID;
// }

    componentWillReceiveProps (props) {
    var self = this
    self.setState({
        voteHash : {},
    })
    props.questions.forEach( function (question){
        axios.get( Config.API + "/auth/vote/isVotedOn?type=2&typeID=" + question.ID + "&username=" + cookie.load("userName"))
        .then( function (response) {  
            const voteHash = self.state.voteHash;

            voteHash[question.ID] = response.data
            self.setState({
                voteHash,
            })
        })  
    })
}


	render() {
		return (
	    <div id="questionUnitContainer">
			<ul> {this.props.questions.map(this.renderItem)} </ul>	               
	    </div>
		);
	}
	renderItem(question) {
       
       function submitVote() {
       axios.post( Config.API + '/auth/vote/create', {
           Type: 2,
           TypeID: question.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            document.location = window.location.pathname 
        })

      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                    })
                  );
                }  else if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
          });
      });
    }
     function unVote() {
      axios.delete( Config.API + '/auth/vote/delete' ,{
        params: {
          type: 2,
          typeID: question.ID,
          username: cookie.load('userName')
        }
        })
        .then(function (result) {
            document.location = window.location.pathname 
        })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                    })
                  );
                }  else if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
          });
      });
        
    }
 
       if (this.state.voteHash[question.ID] === true && question.Username === cookie.load('userName')) {
           return (
            <li key={question.ID} id="questionUnit"> 
                    <div id="suggestionContent">
                        <div id="discussHeader">
                            <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
                            {question.Username}
                        </div>
                        <div id="suggestionText">
                            {question.Description}
                        </div>
                    </div>
                    <Link to={`/project/private/${this.props.probID}/proposal/${this.props.solutionID}/question/${question.ID}/delete`} >
                    <div id="deleteSBButton">
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${this.props.probID}/proposal/${this.props.solutionID}/question/${question.ID}/edit`}>
                        <div id="editSBButton">
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${this.props.probID}/proposal/${this.props.solutionID}/question/${question.ID}/answers`} activeClassName="activeGlow">
                        <div id="commentSBButtonUser">
                                <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                        </div>                
                    </Link>
                    <button type="button" id="suggestionVoted" onClick={unVote}>
                        Voted
                    </button>
            </li>);

    }  else if ( question.Username === cookie.load('userName')) {
        return (
            <li key={question.ID} id="questionUnit"> 
				<div id="suggestionContent">
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
					    {question.Username}
                    </div>
                    <div id="suggestionText">
                        {question.Description}
                    </div>
				</div>
                <Link to={`/project/private/${this.props.probID}/proposal/${this.props.solutionID}/question/${question.ID}/delete`} >
                   <div id="deleteSBButton">
                        <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                    </div>
                </Link>
                <Link to={`/project/private/${this.props.probID}/proposal/${this.props.solutionID}/question/${question.ID}/edit`}>
                    <div id="editSBButton">
                        <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                    </div>
                </Link>
                <Link to={`/project/private/${this.props.probID}/proposal/${this.props.solutionID}/question/${question.ID}/answers`} activeClassName="activeGlow">
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>                
                </Link>
                <button type="button" id="suggestionVote" onClick={submitVote}>
                    Vote
                </button>
            </li>);    
    } else if (this.state.voteHash[question.ID] === true) {
        return (
        <li key={question.ID} id="questionUnit"> 
				<div id="suggestionContent">
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
					    {question.Username}
                    </div>
                    <div id="suggestionText">
                        {question.Description}
                    </div>
				</div>
                    {/*<Link to={`/project/${question.TypeID}/question/${question.ID}/flag`}>
                        <div id="flagSBButton">
                            <img src={require('.../src/assets/flag.svg')} id="deleteLogo" width="11" height="11" alt="Delete Button, Red X" />
                            Flag
                        </div>
                    </Link>*/}
                <Link to={`/project/private/${this.props.probID}/proposal/${this.props.solutionID}/question/${question.ID}/answers`} activeClassName="activeGlow">
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>                
                </Link>
                <button type="button" id="suggestionVoted" onClick={unVote}>
                    Voted
                </button>
        </li>);
    } else {
    return (
        <li key={question.ID} id="questionUnit"> 
				<div id="suggestionContent">
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
					    {question.Username}
                    </div>
                    <div id="suggestionText">
                        {question.Description}
                    </div>
				</div>
                    {/*<Link to={`/project/${question.TypeID}/question/${question.ID}/flag`}>
                        <div id="flagSBButton">
                            <img src={require('.../src/assets/flag.svg')} id="deleteLogo" width="11" height="11" alt="Delete Button, Red X" />
                            Flag
                        </div>
                    </Link>*/}
                <Link to={`/project/private/${this.props.probID}/proposal/${this.props.solutionID}/question/${question.ID}/answers`} activeClassName="activeGlow">
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>                
                </Link>
                <button type="button" id="suggestionVote" onClick={submitVote}>
                    Vote
                </button>
        </li>);
  }
}}

//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
};