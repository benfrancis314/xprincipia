import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class LearnContentUnit1 extends React.Component {
    constructor(props){
        super(props);
        
         this.renderItem = this.renderItem.bind(this)
    };

    componentWillReceiveProps (props) {
        var self = this
        self.setState({
            voteHash : {},
        })
        props.learnItems.forEach( function (learnItem){
            axios.get( Config.API + "/vote/isVotedOn?type=7&typeID=" + learnItem.ID + "&username=" + cookie.load("userName"))
            .then( function (response) {  
                const voteHash = self.state.voteHash;

                voteHash[learnItem.ID] = response.data
                self.setState({
                    voteHash,
                })
            })  
        })
    }

    render() {
		return (
            <div>
                <ul> {this.props.learnItems.map(this.renderItem)} </ul>
                    
            </div>
		);
	}
    renderItem(learnItem) {

       function  submitVote() {
       axios.post( Config.API + '/auth/vote/create', {
           Type: 7,
           TypeID: learnItem.ID,
           username : cookie.load("userName"),
        
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
      function unVote() {
      axios.delete( Config.API + '/auth/vote/delete' ,{
        params: {
          type: 7,
          typeID: learnItem.ID,
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

       if (this.state.voteHash[learnItem.ID] === true && learnItem.Username === cookie.load('userName')) {
           return (
       <li key={learnItem.ID} id="suggestionUnit">
				<div id="suggestionContent">
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
					    {learnItem.Username}
                    </div>
                    <div id="learnContentText">
                        {learnItem.Description}
                    </div>
				</div>
                <Link to={`/project/private/${learnItem.TypeID}/learn/content/${learnItem.ID}/delete`}>
                   <div id="deleteSBButton">
                        <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                    </div>
                </Link>
                <Link to={`/project/private/${learnItem.TypeID}/learn/content/${learnItem.ID}/edit`}>
                    <div id="editSBButtonAnswer">
                        <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                    </div>
                </Link>
                {/*<Link to={`/project/private/${learnItem.TypeID}/learn/content/${learnItem.ID}/comments`}>
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>                
                </Link>*/}
            	<button type="button" onClick={unVote} id="suggestionVoted">
                    Voted
                </button> 
                <br /><br /> 
        </li>);

    }  else if ( learnItem.Username === cookie.load('userName')) {
        return (
       <li key={learnItem.ID} id="suggestionUnit">
				<div id="suggestionContent">
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
					    {learnItem.Username}
                    </div>
                    <div id="learnContentText">
                        {learnItem.Description}
                    </div>
				</div>
                <Link to={`/project/private/${learnItem.TypeID}/learn/content/${learnItem.ID}/delete`}>
                   <div id="deleteSBButton">
                        <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                    </div>
                </Link>
                <Link to={`/project/private/${learnItem.TypeID}/learn/content/${learnItem.ID}/edit`}>
                    <div id="editSBButtonAnswer">
                        <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                    </div>
                </Link>
                {/*<Link to={`/project/private/${learnItem.TypeID}/learn/content/${learnItem.ID}/comments`}>
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>                
                </Link>*/}
            	<button type="button" onClick={submitVote} id="suggestionVote">
                    Vote
                </button> 
                <br /><br /> 
        </li>);
    } else if (this.state.voteHash[learnItem.ID] === true) {
        return (
        <li key={learnItem.ID} id="questionUnit"> 
				<div id="suggestionContent">
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
					    {learnItem.Username}
                    </div>
                    <div id="suggestionText">
                        {learnItem.Description}
                    </div>
				</div>
                    {/*<Link to={`/project/private/${learnItem.TypeID}/learn/contentItem/${learnItem.ID}/flag`}>
                        <div id="flagSBButton">
                            <img src={require('.../src/assets/flag.svg')} id="deleteLogo" width="11" height="11" alt="Delete Button, Red X" />
                            Flag
                        </div>
                    </Link>*/}
                {/*<Link to={`/project/private/${learnItem.TypeID}/learn/content/${learnItem.ID}/comments`} activeClassName="activeBlue">
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>                
                </Link>*/}
                <button type="button" id="suggestionVotedNoComments" onClick={unVote}>
                    Voted
                </button>
                <br/><br/> 
        </li>);
  } else {
    return (
        <li key={learnItem.ID} id="questionUnit"> 
				<div id="suggestionContent">
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
					    {learnItem.Username}
                    </div>
                    <div id="suggestionText">
                        {learnItem.Description}
                    </div>
				</div>
                    {/*<Link to={`/project/private/${learnItem.TypeID}/learn/contentItem/${learnItem.ID}/flag`}>
                        <div id="flagSBButton">
                            <img src={require('.../src/assets/flag.svg')} id="deleteLogo" width="11" height="11" alt="Delete Button, Red X" />
                            Flag
                        </div>
                    </Link>*/}
                {/*<Link to={`/project/private/${learnItem.TypeID}/learn/content/${learnItem.ID}/comments`} activeClassName="activeBlue">
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>                
                </Link>*/}
                <button type="button" id="suggestionVoteNoComments" onClick={submitVote}>
                    Vote
                </button>
                <br/><br/> 
        </li>);
  }
}}

//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}