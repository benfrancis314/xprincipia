import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class LearnResourcesUnit1 extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            voteHash : {},
            debateNumber : [],
        }

         this.renderItem = this.renderItem.bind(this);
    };

    componentWillReceiveProps (nextProps) {
        var self = this
        nextProps.resources.forEach( function (resource){
            axios.get( Config.API + "/vote/isVotedOn?type=8&typeID=" + resource.ID + "&username=" + cookie.load("userName"))
            .then( function (response) {  
                const voteHash = self.state.voteHash;

                voteHash[resource.ID] = response.data
            })  
            axios.get( Config.API + '/comments/number?parent_id='+resource.ID + '&parent_type=8').then(function (response) {
                const debateNumber = self.state.debateNumber;
                
                debateNumber[resource.ID] = response.data
            })
        })
    }

	render() {
		return (
	    <div>
			<ul> {this.props.resources.map(this.renderItem)} </ul>    
	    </div>
		);
	}
	renderItem(resource) {
       function submitVote() {
        var self = this
        self.refs.votebtn.setAttribute("disabled", "disabled");
       axios.post( Config.API + '/auth/vote/create', {
           Type: 8,
           TypeID: resource.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            // document.location = window.location.pathname;
            self.refs.votebtn.removeAttribute("disabled");
        })
      .catch(function (error) {
          $(document).ready(function() {
            //   $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notification').attr('id','notificationShow').hide().slideDown();
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                    })
                  );
                }  else if (error.response.data != '') {
                // $('#notificationContent').text(error.response.data);
              }
          });
          self.refs.votebtn.removeAttribute("disabled");
      });
  }
      function unVote() {
        var self = this
        self.refs.votebtn.setAttribute("disabled", "disabled");
      axios.delete( Config.API + '/auth/vote/delete' ,{
        params: {
          type: 8,
          typeID: resource.ID,
          username: cookie.load('userName')
        }
        })
        .then(function (result) {
            // document.location = window.location.pathname 
            self.refs.votebtn.removeAttribute("disabled");
        })
      .catch(function (error) {
          $(document).ready(function() {
            //   $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notification').attr('id','notificationShow').hide().slideDown();
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                    })
                  );
                }  else if (error.response.data != '') {
                // $('#notificationContent').text(error.response.data);
              }
          });
          self.refs.votebtn.removeAttribute("disabled");
      });
}

  
       if (this.state.voteHash[resource.ID] === true && resource.Username === cookie.load('userName')) {
           return (
       <li key={resource.ID} id="suggestionUnit">
				<div id="suggestionContentHoverVote" className={resource.ID}>
                    <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/comments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/comments`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            {this.state.debateNumber[resource.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverTextShowVoted">
                        voted
                    </div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(resource.PercentRank)}</span>
					    {resource.Username}
                    </div>
                    <div id="resourceURLTextContainer">
                        <div id="resourceTitleText">
                            {resource.Title}
                        </div>
                        <div id="resourceURLText">
                            <a href={url(resource.Summary)} target="_blank">
                                {resource.Summary}
                            </a>
                        </div>
                    </div>
                    <Link to={`/project/private/${resource.TypeID}/learn/resources`}>
                        <div id="suggestionText" ref='votebtn' onClick={unVote.bind(this)} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                            <span id="shrunkText">{resource.Description}</span>
                        </div>
                    </Link>
				</div>
        </li>);
    }  else if ( resource.Username === cookie.load('userName')) {
        return (
       <li key={resource.ID} id="suggestionUnit">
				<div id={'suggestionContent'} className={resource.ID}>
                    <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/comments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/comments`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                            {this.state.debateNumber[resource.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverText"></div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(resource.PercentRank)}</span>
					    {resource.Username}
                    </div>
                    <div id="resourceURLTextContainer">
                        <div id="resourceTitleText">
                            {resource.Title}
                        </div>
                        <div id="resourceURLText">
                            <a href={url(resource.Summary)} target="_blank">
                                {resource.Summary}
                            </a>
                        </div>
                    </div>
                    <Link to={`/project/private/${resource.TypeID}/learn/resources`}>
                        <div id="suggestionText" ref='votebtn' onClick={submitVote.bind(this)} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                            <span id="shrunkText">{resource.Description}</span>
                        </div>
                    </Link>
				</div>
        </li>);
    } else if (this.state.voteHash[resource.ID] === true) {
        return (
       <li key={resource.ID} id="suggestionUnit">
				<div id="suggestionContentHoverVote" className={resource.ID}>
                    <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/comments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/flag`}>
                        <div id="flagDiscussButton" onMouseOver={hoverFlagVoted} onMouseOut={unHoverFlagVoted}>
                            <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/comments`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            {this.state.debateNumber[resource.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverTextShowVoted">
                        voted
                    </div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(resource.PercentRank)}</span>
					    {resource.Username}
                    </div>
                    <div id="resourceURLTextContainer">
                        <div id="resourceTitleText">
                            {resource.Title}
                        </div>
                        <div id="resourceURLText">
                            <a href={url(resource.Summary)} target="_blank">
                                {resource.Summary}
                            </a>
                        </div>
                    </div>
                    <Link to={`/project/private/${resource.TypeID}/learn/resources`}>
                        <div id="suggestionText" ref='votebtn' onClick={unVote.bind(this)} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                            <span id="shrunkText">{resource.Description}</span>
                        </div>
                    </Link>
				</div>
        </li>);

    } else {
    return (
       <li key={resource.ID} id="suggestionUnit">
            <div id={'suggestionContent'} className={resource.ID}>
                <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/comments`}>
                    <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                        <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/flag`}>
                    <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag}>
                        <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <Link to={`/project/private/${resource.TypeID}/resources/${resource.ID}/comments`}>
                    <div id="numberDiscussButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                        {this.state.debateNumber[resource.ID]}
                    </div>
                </Link>
                <div id="discussHoverText"></div>
                <div id="discussHeader">
                    <span id="discussPercent">{floatToDecimal(resource.PercentRank)}</span>
                    {resource.Username}
                </div>
                <div id="resourceURLTextContainer">
                    <div id="resourceTitleText">
                        {resource.Title}
                    </div>
                    <div id="resourceURLText">
                        <a href={url(resource.Summary)} target="_blank">
                            {resource.Summary}
                        </a>
                    </div>
                </div>
                <Link to={`/project/private/${resource.TypeID}/learn/resources`}>
                    <div id="suggestionText" ref='votebtn' onClick={submitVote.bind(this)} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                        <span id="shrunkText">{resource.Description}</span>
                    </div>
                </Link>
            </div>
        </li>);
}

function hoverThread() {
    $(document).ready(function() {
        $('div.'+resource.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("comments").fadeIn(7500);
    });
}
function unHoverThread() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',resource.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    });
}
function hoverVote() {
    $(document).ready(function() {
        $('div.'+resource.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverText').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("vote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');    
    });
}
function unHoverVote() {
    $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',resource.ID);
        $('div#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverText');
    });
}
function hoverFlag() {
    $(document).ready(function() {
        $('div.'+resource.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');              
    });
}
function unHoverFlag() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',resource.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverEdit() {
    $(document).ready(function() {
        $('div.'+resource.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEdit() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',resource.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    });
}
function hoverDelete() {
    $(document).ready(function() {      
        $('div.'+resource.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
    });
}
function unHoverDelete() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',resource.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverThreadVoted() {
    $(document).ready(function() {
        $('div.'+resource.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("comments").fadeIn(7500);
    });
}
function unHoverThreadVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',resource.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverVoteVoted() {
    $(document).ready(function() {
        $('div.'+resource.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverTextShowVoted').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowVoted'); 
        
    });
}
function unHoverVoteVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',resource.ID);
        $('div#discussHoverTextShowVoted').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverFlagVoted() {
    $(document).ready(function() {       
        $('div.'+resource.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');  
    });
}
function unHoverFlagVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',resource.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverEditVoted() {
    $(document).ready(function() {
        $('div.'+resource.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEditVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',resource.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverDeleteVoted() {
    $(document).ready(function() {
        $('div.'+resource.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
    });
}
function unHoverDeleteVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',resource.ID);
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

function url(resourceURL){

    if (resourceURL.includes('https://') || resourceURL.includes('http://')) {
        return ( resourceURL );

    } 
    else if (
        (resourceURL.substring(0,3) !== 'www.')  &&  
        (
            (resourceURL.includes('.com')) || (resourceURL.includes('.org')) || (resourceURL.includes('.edu')) || (resourceURL.includes('.gov')) || (resourceURL.includes('.net')) )
            ) 
        {
        return ( 'https://' + resourceURL );
    }

    else {
        return ( 'https://www.google.com/#q=' + resourceURL );
    }
}

