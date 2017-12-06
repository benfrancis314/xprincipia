import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class FreeFormUnit extends React.Component {

    constructor(props){
        super(props);

         this.renderItem = this.renderItem.bind(this);
    };
  



    componentWillReceiveProps (props) {
        var self = this
        self.setState({
            voteHash : {},
        })
        props.freeForms.forEach( function (freeForm){
            axios.get( Config.API + "/vote/isVotedOn?type=6&typeID=" + freeForm.ID + "&username=" + cookie.load("userName"))
            .then( function (response) {  
                const voteHash = self.state.voteHash;

                voteHash[freeForm.ID] = response.data
                self.setState({
                    voteHash,
                })
            })  
        })
    }

	render() {
		return (
	    <div>
			<ul> {this.props.freeForms.map(this.renderItem)} </ul>    
	    </div>
		);
	}
	renderItem(freeForm) {

       function  submitVote() {
       axios.post( Config.API + '/auth/vote/create', {
           Type: 6,
           TypeID: freeForm.ID,
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
          type: 6,
          typeID: freeForm.ID,
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

  
       if (this.state.voteHash[freeForm.ID] === true && freeForm.Username === cookie.load('userName')) {
           return (
       <li key={freeForm.ID} id="suggestionUnit">
				<div id="suggestionContentHoverVote">
                    <Link to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/comments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <div id="discussHoverText">debate</div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(freeForm.PercentRank)}</span>
                        {freeForm.Username}
                    </div>
                    <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
                        {freeForm.Description}
                    </div>
				</div>
				{/*<Link  to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/comments`} activeClassName="activeBlue">
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>
                </Link> */}
                {/* <button type="button" id="suggestionVoted">
                    Voted
                </button>             
                <br /><br />  */}
        </li>);
    }  else if ( freeForm.Username === cookie.load('userName')) {
        return (
       <li key={freeForm.ID} id="suggestionUnit">
				<div id="suggestionContent">
                    <Link to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/comments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <div id="discussHoverText">debate</div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(freeForm.PercentRank)}</span>
					    <span id="discussUsername">{freeForm.Username}</span> 
                    </div>
                    <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                        {freeForm.Description}
                    </div>
				</div>
                
				{/*<Link  to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/comments`} activeClassName="activeBlue">
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>
                </Link> */}
                {/* <button type="button" onClick={submitVote} id="suggestionVote">
                    Vote
                </button>             
                <br /><br />  */}
        </li>);
    } else if (this.state.voteHash[freeForm.ID] === true) {
        return (
       <li key={freeForm.ID} id="suggestionUnit">
				<div id="suggestionContentHoverVote">
                    <Link to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/comments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/flag`}>
                        <div id="flagDiscussButton" onMouseOver={hoverFlagVoted} onMouseOut={unHoverFlagVoted}>
                            <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <div id="discussHoverTextShowGreen">voted</div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(freeForm.PercentRank)}</span>
					    {freeForm.Username}
                    </div>
                    <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
                        {freeForm.Description}
                    </div>
				</div>
        </li>);

    } else {
    return (
       <li key={freeForm.ID} id="suggestionUnit">
				<div id="suggestionContent">
                    <Link to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/comments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/flag`}>
                        <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag}>
                            <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <div id="discussHoverText">debate</div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(freeForm.PercentRank)}</span>
					    {freeForm.Username}
                    </div>
                    <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                        {freeForm.Description}
                    </div>
				</div>
                    {/*<Link to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/flag`}>
                        <div id="flagSBButton">
                            <img src={require('.../src/assets/flag.svg')} id="deleteLogo" width="11" height="11" alt="Delete Button, Red X" />
                            Flag
                        </div>
                    </Link>*/}
				{/*<Link  to={`/project/${freeForm.TypeID}/freeform/${freeForm.ID}/comments`} activeClassName="activeBlue">
                    <div id="commentSBButtonUser">
                            <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>
                </Link> */}
                
                {/* <button type="button" onClick={submitVote} id="suggestionVoteNoComments">
                    Vote
                </button>             
                <br /><br />  */}
        </li>);
  }


function hoverThread() {
    $(document).ready(function() {
        // $('#discussHoverText').html("view discussion").fadeIn(7500);
        $('#suggestionContent').attr('id','suggestionContentHover');
        $('#discussHoverText').attr('id','discussHoverTextShow');
    });
}
function unHoverThread() {
    $(document).ready(function() {
        // $('#discussHoverText').html("");
        $('#suggestionContentHover').attr('id','suggestionContent');
        $('#discussHoverTextShow').attr('id','discussHoverText');
    });
}
function hoverVote() {
    $(document).ready(function() {
        // $('#discussHoverText').html("view discussion").fadeIn(7500);
        // $('#suggestionVoteNoComments').attr('id','suggestionVoteNoCommentsHover');
        $('#suggestionContent').attr('id','suggestionContentHoverVote');
        $('#discussHoverText').attr('id','discussHoverTextGreen');
        $('#discussHoverTextGreen').html("vote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');
        $('#discussPercent').attr('id','discussPercentGreen');
        
    });
}
function unHoverVote() {
    $(document).ready(function() {
        // $('#suggestionVoteNoCommentsHover').attr('id','suggestionVoteNoComments');  
        $('#suggestionContentHoverVote').attr('id','suggestionContent');  
        $('#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        $('#discussHoverTextGreen').html("debate").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverText');
        $('#discussPercentGreen').attr('id','discussPercent');   
    });
}
function hoverFlag() {
    $(document).ready(function() {
        // $('#suggestionContent').attr('id','suggestionContentHoverFlag');
        $('#suggestionContent').attr('id','suggestionContentHoverFlag');
        $('#discussHoverText').attr('id','discussHoverTextRed');
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');            
    });
}
function unHoverFlag() {
    $(document).ready(function() {
        // $('#suggestionContentHoverFlag').attr('id','suggestionContent');  
        $('#suggestionContentHoverFlag').attr('id','suggestionContent');  
        $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('#discussHoverTextRed').html("debate").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverEdit() {
    $(document).ready(function() {
        // $('#discussHoverText').html("view discussion").fadeIn(7500);
        $('#suggestionContent').attr('id','suggestionContentHover');
        $('#discussHoverText').html("edit").fadeIn(7500);
        $('#discussHoverText').attr('id','discussHoverTextShow');
    });
}
function unHoverEdit() {
    $(document).ready(function() {
        // $('#discussHoverText').html("");
        $('#suggestionContentHover').attr('id','suggestionContent');
        $('#discussHoverTextShow').attr('id','discussHoverText');
        $('#discussHoverText').html("debate").fadeIn(7500);
    });
}
function hoverDelete() {
    $(document).ready(function() {
        // $('#suggestionContent').attr('id','suggestionContentHoverFlag');
        $('#suggestionContent').attr('id','suggestionContentHoverFlag');
        $('#discussHoverText').attr('id','discussHoverTextRed');
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');            
    });
}
function unHoverDelete() {
    $(document).ready(function() {
        // $('#suggestionContentHoverFlag').attr('id','suggestionContent');  
        $('#suggestionContentHoverFlag').attr('id','suggestionContent');  
        $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('#discussHoverTextRed').html("debate").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverThreadVoted() {
    $(document).ready(function() {
        // $('#discussHoverText').html("view discussion").fadeIn(7500);
        $('#suggestionContentHoverVote').attr('id','suggestionContentHover');
        $('#discussHoverTextShowGreen').attr('id','discussHoverText');
        $('#discussHoverText').html("debate").fadeIn(7500);
        $('#discussHoverText').attr('id','discussHoverTextShow');
    });
}
function unHoverThreadVoted() {
    $(document).ready(function() {
        // $('#discussHoverText').html("");
        $('#suggestionContentHover').attr('id','suggestionContentHoverVote');
        $('#discussHoverTextShow').attr('id','discussHoverTextShowGreen');
        $('#discussHoverTextShowGreen').html("voted").fadeIn(7500);
    });
}
function hoverVoteVoted() {
    $(document).ready(function() {
        // $('#discussHoverText').html("view discussion").fadeIn(7500);
        // $('#suggestionVoteNoComments').attr('id','suggestionVoteNoCommentsHover');
        $('#suggestionContentHoverVote').attr('id','suggestionContentHoverUnvote');
        $('#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');
        $('#discussPercent').attr('id','discussPercentGreen');
        
    });
}
function unHoverVoteVoted() {
    $(document).ready(function() {
        // $('#suggestionVoteNoCommentsHover').attr('id','suggestionVoteNoComments');  
        $('#suggestionContentHoverUnvote').attr('id','suggestionContentHoverVote');  
        $('#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        $('#discussHoverTextGreen').html("voted").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');
        // $('#discussHoverTextGreen').attr('id','discussHoverText');
        $('#discussPercentGreen').attr('id','discussPercent');   
    });
}
function hoverFlagVoted() {
    $(document).ready(function() {
        // $('#suggestionContent').attr('id','suggestionContentHoverFlag');
        $('#suggestionContentHoverVote').attr('id','suggestionContentHoverFlag');
        $('#discussHoverText').attr('id','discussHoverTextRed');
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');            
    });
}
function unHoverFlagVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHoverFlag').attr('id','suggestionContent');  
        $('#suggestionContentHoverFlag').attr('id','suggestionContentHoverVote');  
        $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('#discussHoverTextRed').html("voted").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverEditVoted() {
    $(document).ready(function() {
        // $('#discussHoverText').html("view discussion").fadeIn(7500);
        $('#suggestionContentHoverVote').attr('id','suggestionContentHover');
        $('#discussHoverText').html("edit").fadeIn(7500);
        $('#discussHoverText').attr('id','discussHoverTextShow');
    });
}
function unHoverEditVoted() {
    $(document).ready(function() {
        // $('#discussHoverText').html("");
        $('#suggestionContentHover').attr('id','suggestionContentHoverVote');
        $('#discussHoverTextShow').attr('id','discussHoverText');
        $('#discussHoverText').html("voted").fadeIn(7500);
        $('#discussHoverText').attr('id','discussHoverTextShowGreen');
    });
}
function hoverDeleteVoted() {
    $(document).ready(function() {
        // $('#suggestionContent').attr('id','suggestionContentHoverFlag');
        $('#suggestionContentHoverGreen').attr('id','suggestionContentHoverFlag');
        $('#discussHoverTextShowGreen').attr('id','discussHoverTextRed');
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');            
    });
}
function unHoverDeleteVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHoverFlag').attr('id','suggestionContent');  
        $('#suggestionContentHoverFlag').attr('id','suggestionContentHoverGreen');  
        $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('#discussHoverTextRed').html("voted").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowGreen');
    });
}
}
}

//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}