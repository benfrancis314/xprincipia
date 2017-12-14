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
        //  this.hoverThread = this.hoverThread.bind(this);
        //  this.hoverVote = this.hoverVote.bind(this);
        //  this.hoverFlag = this.hoverFlag.bind(this);
        //  this.hoverEdit = this.hoverEdit.bind(this);
        //  this.hoverDelete = this.hoverDelete.bind(this);
        //  this.unHoverThread = this.unHoverThread.bind(this);
        //  this.unHoverVote = this.unHoverVote.bind(this);
        //  this.unHoverFlag = this.unHoverFlag.bind(this);
        //  this.unHoverEdit = this.unHoverEdit.bind(this);
        //  this.unHoverDelete = this.unHoverDelete.bind(this);
        //  this.hoverThreadVoted = this.hoverThreadVoted.bind(this);
        //  this.hoverVoteVoted = this.hoverVoteVoted.bind(this);
        //  this.hoverFlagVoted = this.hoverFlagVoted.bind(this);
        //  this.hoverEditVoted = this.hoverEditVoted.bind(this);
        //  this.hoverDeleteVoted = this.hoverDeleteVoted.bind(this);
        //  this.unHoverThreadVoted = this.unHoverThreadVoted.bind(this);
        //  this.unHoverVoteVoted = this.unHoverVoteVoted.bind(this);
        //  this.unHoverFlagVoted = this.unHoverFlagVoted.bind(this);
        //  this.unHoverEditVoted = this.unHoverEditVoted.bind(this);
        //  this.unHoverDeleteVoted = this.unHoverDeleteVoted.bind(this);
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
				<div id="suggestionContentHoverVote" className={freeForm.ID}>
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
                    <div id="discussHoverTextShowVoted">voted</div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(freeForm.PercentRank)}</span>
                        {freeForm.Username}
                    </div>
                    <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
                        {freeForm.Description}
                    </div>
				</div>
        </li>);
    }  else if ( freeForm.Username === cookie.load('userName')) {
        return (
       <li key={freeForm.ID} id="suggestionUnit">
				<div id={'suggestionContent'} className={freeForm.ID}>
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
                    <div id="discussHoverText"></div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(freeForm.PercentRank)}</span>
					    <span id="discussUsername">{freeForm.Username}</span> 
                    </div>
                    <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                        {freeForm.Description}
                    </div>
				</div>
        </li>);
    } else if (this.state.voteHash[freeForm.ID] === true) {
        return (
       <li key={freeForm.ID} id="suggestionUnit">
				<div id="suggestionContentHoverVote" className={freeForm.ID}>
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
                    <div id="discussHoverTextShowVoted">voted</div>
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
            {/* <div id="suggestionContent"> */}
            <div id={'suggestionContent'} className={freeForm.ID}>
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
                <div id="discussHoverText"></div>
                <div id="discussHeader">
                    <span id="discussPercent">{floatToDecimal(freeForm.PercentRank)}</span>
                    {freeForm.Username}
                </div>
                <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                    {freeForm.Description}
                </div>
            </div>
        </li>);
}

function hoverThread() {
    $(document).ready(function() {
        $('div.'+freeForm.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("debate").fadeIn(7500);
    });
}
function unHoverThread() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',freeForm.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    });
}
function hoverVote() {
    $(document).ready(function() {
        // $('#suggestionContent').attr('id','suggestionContentHoverVote');
        // $('#discussHoverText').attr('id','discussHoverTextGreen');
        // $('#discussHoverTextGreen').html("vote").fadeIn(7500);
        // $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');
        // $('#discussPercent').attr('id','discussPercentGreen');

        $('div.'+freeForm.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverText').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("vote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');    
    });
}
function unHoverVote() {
    $(document).ready(function() {
        // $('#suggestionContentHoverVote').attr('id','suggestionContent');  
        // $('#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        // $('#discussHoverTextGreen').html("debate").fadeIn(7500);
        // $('#discussHoverTextGreen').attr('id','discussHoverText');
        // $('#discussPercentGreen').attr('id','discussPercent');   

        $('div.suggestionContentClassGreen').attr('class',freeForm.ID);
        $('div#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverText');
    });
}
function hoverFlag() {
    $(document).ready(function() {
        // $('#suggestionContent').attr('id','suggestionContentHoverFlag');
        // $('#discussHoverText').attr('id','discussHoverTextRed');
        // $('#discussHoverTextRed').html("flag").fadeIn(7500);
        // $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');

        $('div.'+freeForm.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');              
    });
}
function unHoverFlag() {
    $(document).ready(function() {
        // $('#suggestionContentHoverFlag').attr('id','suggestionContent');  
        // $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        // $('#discussHoverTextRed').html("debate").fadeIn(7500);
        // $('#discussHoverTextRed').attr('id','discussHoverText');

        $('div.suggestionContentClassRed').attr('class',freeForm.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverEdit() {
    $(document).ready(function() {
        // $('#suggestionContent').attr('id','suggestionContentHover');
        // $('#discussHoverText').html("edit").fadeIn(7500);
        // $('#discussHoverText').attr('id','discussHoverTextShow');

        $('div.'+freeForm.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEdit() {
    $(document).ready(function() {
        // $('#suggestionContentHover').attr('id','suggestionContent');
        // $('#discussHoverTextShow').attr('id','discussHoverText');
        // $('#discussHoverText').html("debate").fadeIn(7500);

        $('div.suggestionContentClassBlue').attr('class',freeForm.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    });
}
function hoverDelete() {
    $(document).ready(function() {
        // $('#suggestionContent').attr('id','suggestionContentHoverFlag');
        // $('#discussHoverText').attr('id','discussHoverTextRed');
        // $('#discussHoverTextRed').html("delete").fadeIn(7500);
        // $('#discussHoverTextRed').attr('id','discussHoverTextShowRed'); 
        
        $('div.'+freeForm.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
    });
}
function unHoverDelete() {
    $(document).ready(function() {
        // $('#suggestionContentHoverFlag').attr('id','suggestionContent');  
        // $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        // $('#discussHoverTextRed').html("debate").fadeIn(7500);
        // $('#discussHoverTextRed').attr('id','discussHoverText');

        $('div.suggestionContentClassRed').attr('class',freeForm.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverThreadVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHoverVote').attr('id','suggestionContentHover');
        // $('#discussHoverTextShowGreen').attr('id','discussHoverText');
        // $('#discussHoverText').html("debate").fadeIn(7500);
        // $('#discussHoverText').attr('id','discussHoverTextShow');

        $('div.'+freeForm.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("debate").fadeIn(7500);
    });
}
function unHoverThreadVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHover').attr('id','suggestionContentHoverVote');
        // $('#discussHoverTextShow').attr('id','discussHoverTextShowGreen');
        // $('#discussHoverTextShowGreen').html("voted").fadeIn(7500);

        $('div.suggestionContentClassBlue').attr('class',freeForm.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverVoteVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHoverVote').attr('id','suggestionContentHoverUnvote');
        // $('#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        // $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
        // $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');
        // $('#discussPercent').attr('id','discussPercentGreen');

        $('div.'+freeForm.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverTextShowVoted').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowVoted'); 
        
    });
}
function unHoverVoteVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHoverUnvote').attr('id','suggestionContentHoverVote');  
        // $('#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        // $('#discussHoverTextGreen').html("voted").fadeIn(7500);
        // $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');
        // $('#discussPercentGreen').attr('id','discussPercent');   

        $('div.suggestionContentClassGreen').attr('class',freeForm.ID);
        $('div#discussHoverTextShowVoted').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverFlagVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHoverVote').attr('id','suggestionContentHoverFlag');
        // $('#discussHoverText').attr('id','discussHoverTextRed');
        // $('#discussHoverTextRed').html("flag").fadeIn(7500);
        // $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');    
        
        $('div.'+freeForm.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');  
    });
}
function unHoverFlagVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHoverFlag').attr('id','suggestionContentHoverVote');  
        // $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        // $('#discussHoverTextRed').html("voted").fadeIn(7500);
        // $('#discussHoverTextRed').attr('id','discussHoverText');

        $('div.suggestionContentClassRed').attr('class',freeForm.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverEditVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHoverVote').attr('id','suggestionContentHover');
        // $('#discussHoverText').html("edit").fadeIn(7500);
        // $('#discussHoverText').attr('id','discussHoverTextShow');

        $('div.'+freeForm.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEditVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHover').attr('id','suggestionContentHoverVote');
        // $('#discussHoverTextShow').attr('id','discussHoverText');
        // $('#discussHoverText').html("voted").fadeIn(7500);
        // $('#discussHoverText').attr('id','discussHoverTextShowGreen');

        $('div.suggestionContentClassBlue').attr('class',freeForm.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverDeleteVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHoverGreen').attr('id','suggestionContentHoverFlag');
        // $('#discussHoverTextShowGreen').attr('id','discussHoverTextRed');
        // $('#discussHoverTextRed').html("delete").fadeIn(7500);
        // $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');    
        
        $('div.'+freeForm.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
    });
}
function unHoverDeleteVoted() {
    $(document).ready(function() {
        // $('#suggestionContentHoverFlag').attr('id','suggestionContentHoverGreen');  
        // $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        // $('#discussHoverTextRed').html("voted").fadeIn(7500);
        // $('#discussHoverTextRed').attr('id','discussHoverTextShowGreen');

        $('div.suggestionContentClassRed').attr('class',freeForm.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });

}
}
}

//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}