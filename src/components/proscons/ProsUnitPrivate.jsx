import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';


export default class ProsUnit extends React.Component {
    constructor(props){
        super(props);
         this.renderItem = this.renderItem.bind(this)
    };
  
    componentWillReceiveProps (props) {
        var self = this
        self.setState({
            voteHash : {},
        })
        props.pros.forEach( function (pro){
            axios.get( Config.API + "/auth/vote/isVotedOn?type=9&typeID=" + pro.ID + "&username=" + cookie.load("userName"))
            .then( function (response) {  
                const voteHash = self.state.voteHash;

                voteHash[pro.ID] = response.data
                self.setState({
                    voteHash,
                })
            })  
        })
    }


	render() {
		return (
	    <div>
			<ul> {this.props.pros.map(this.renderItem)} </ul>
	               
	    </div>
		);
	}
	renderItem(pro) {

       function  submitVote() {
       axios.post( Config.API + '/auth/vote/create', {
           Type: 9,
           TypeID: pro.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            document.location = window.location.pathname;
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
          type: 9,
          typeID: pro.ID,
          username: cookie.load('userName')
        }
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
       if (this.state.voteHash[pro.ID] === true && pro.Username === cookie.load('userName')) {
           return (
       <li key={pro.ID} id="prosConsUnit">
				<div id="suggestionContent">
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(pro.PercentRank)}</span>
					    {/*{pro.Username}*/}
                    </div>
                    <div id="suggestionText">
                        {pro.Description}
                    </div>
				</div>
                    <Link to={`/project/private/${this.props.probID}/${pro.TypeID}/pros/${pro.ID}/delete`}>
                        <div id="deleteSBButton">
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${this.props.probID}/${pro.TypeID}/pros/${pro.ID}/edit`}>
                        <div id="editSBButtonAnswer">
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                {/*<Link to={`/project/${pro.TypeID}/pros/${pro.ID}/comments`}>
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>                
                </Link>*/}
                <button type="button" onClick={unVote} id="suggestionVoted">
                    Voted
                </button>             
            <br /><br /> 
        </li>);

    }  else if ( pro.Username === cookie.load('userName')) {
        return (
       <li key={pro.ID} id="prosConsUnit">
				<div id="suggestionContent">
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(pro.PercentRank)}</span>
					    {/*{pro.Username}*/}
                    </div>
                    <div id="suggestionText">
                        {pro.Description}
                    </div>
				</div>
                    <Link to={`/project/private/${this.props.probID}/${pro.TypeID}/pros/${pro.ID}/delete`}>
                        <div id="deleteSBButton">
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${this.props.probID}/${pro.TypeID}/pros/${pro.ID}/edit`}>
                        <div id="editSBButtonAnswer">
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                {/*For when we add in comments to these*/}
                {/*<Link to={`/project/${pro.TypeID}/pros/${pro.ID}/comments`}>
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>                
                </Link>*/}
                <button type="button" onClick={submitVote} id="suggestionVote">
                    Vote
                </button>             
            <br /><br /> 
        </li>);
    } else if (this.state.voteHash[pro.ID] === true) {
        return (
       <li key={pro.ID} id="prosConsUnit">
				<div id="suggestionContent">
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(pro.PercentRank)}</span>
					    {/*{pro.Username}*/}
                    </div>
                    <div id="suggestionText">
                        {pro.Description}
                    </div>
				</div>
                {/*<Link to={`/project/${pro.TypeID}/pros/${pro.ID}/flag`}>
                        <div id="flagSBButton">
                            <img src={require('.../src/assets/delete.svg')} id="deleteLogo" width="11" height="11" alt="Delete Button, Red X" />
                            Flag
                        </div>
                </Link>*/}
				<button type="button" onClick={unVote} id="suggestionVoted">
                    Voted
                </button> 
            <br /><br /> 
        </li>);
    } else {
    return (
       <li key={pro.ID} id="prosConsUnit">
				<div id="suggestionContent">
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(pro.PercentRank)}</span>
					    {/*{pro.Username}*/}
                    </div>
                    <div id="suggestionText">
                        {pro.Description}
                    </div>
				</div>
                {/*<Link to={`/project/${pro.TypeID}/pros/${pro.ID}/flag`}>
                        <div id="flagSBButton">
                            <img src={require('.../src/assets/delete.svg')} id="deleteLogo" width="11" height="11" alt="Delete Button, Red X" />
                            Flag
                        </div>
                </Link>*/}
				<button type="button" onClick={submitVote} id="suggestionVoteNoComments">
                    Vote
                </button> 
            <br /><br /> 
        </li>);
  }
}}

//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}
