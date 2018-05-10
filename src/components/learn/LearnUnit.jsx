import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class LearnUnit extends React.Component {

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
        nextProps.learnItems.forEach( function (resource){
            axios.get( Config.API + "/vote/isVotedOn?type=7&typeID=" + resource.ID + "&username=" + cookie.load("userName"))
            .then( function (response) {  
                const voteHash = self.state.voteHash;

                voteHash[resource.ID] = response.data
            })  
        })
    }

	render() {
		return (
	    <div>
			{this.props.learnItems.map(this.renderItem)}    
	    </div>
		);
	}
	renderItem(resource) {

        if (resource.Type == '7') {
            var commentType = 'Educational'
        } else if (resource.Type == '8') {
            var commentType = 'Research'
        }

        function submitVote() {
            var self = this
            // self.refs.votebtn.setAttribute("disabled", "disabled");
            axios.post( Config.API + '/auth/vote/create', {
                Type: 7,
                TypeID: resource.ID,
                username : cookie.load("userName"),
            })
                .then(function (result) {
                    // self.refs.votebtn.removeAttribute("disabled");
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
                    // self.refs.votebtn.removeAttribute("disabled");
                });
        }
        function unVote() {
            var self = this
            // self.refs.votebtn.setAttribute("disabled", "disabled");
        axios.delete( Config.API + '/auth/vote/delete' ,{
            params: {
                type: 7,
                typeID: resource.ID,
                username: cookie.load('userName')
            }
        })
        .then(function (result) {
            // self.refs.votebtn.removeAttribute("disabled");
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
        //   self.refs.votebtn.removeAttribute("disabled");
      });
}

    if (resource.Username === cookie.load('userName')) {
        var editID = 'editDiscussButton'
        var deleteID = 'deleteDiscussButton'
        var flagID = 'noDisplay'
    } else {
        var editID = 'noDisplay'
        var deleteID = 'noDisplay'
        var flagID = 'flagDiscussButton'
    }
  
    if (this.state.voteHash[resource.ID] === true) {
        return (
            <li key={resource.ID} id="suggestionUnit">
                <div id={'suggestionContentHoverVote'+commentType} className={resource.ID}>
                    <div id="discussUnitButtonsContainer">
                        <Link to={window.location.pathname}>
                            <div id="discussVotedButton" onClick={unVote.bind(this)} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted.bind(this)}>     
                            </div>
                            <div id="discussPercent">{resource.Rank}</div>
                        </Link>
                    </div>
                    <Link to={this.props.linkPath+`${resource.TypeID}/learn/${resource.ID}/edit`}>
                        <div id={editID} onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={this.props.linkPath+`${resource.TypeID}/learn/${resource.ID}/delete`}>
                        <div id={deleteID} onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={this.props.linkPath+`${resource.TypeID}/learn/${resource.ID}/flag`}>
                        <div id={flagID} onMouseOver={hoverFlagVoted} onMouseOut={unHoverFlagVoted}>
                            <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={this.props.linkPath+`${resource.TypeID}/learn/${resource.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={this.props.linkPath+`${resource.TypeID}/learn/${resource.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={this.props.linkPath+`${resource.TypeID}/learn/${resource.ID}/flag`}>
                        <div id="flagDiscussButton" onMouseOver={hoverFlagVoted} onMouseOut={unHoverFlagVoted}>
                            <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <div id="discussHoverText">
                    </div>
                    <div id={"discussHeader"+commentType}>
                        {commentType} <span id="gray">from {resource.Username}</span>
                    </div>
                    <div id="resourceURLTextContainer">
                        <div id="resourceTitleText">
                            {resource.Title}
                        </div>
                        <div id="resourceURLTextShowVoted">
                            <a href={url(resource.Url)} target="_blank">
                                {resource.Url}
                            </a>
                        </div>
                    </div>
                    <div id="learnDescription">
                        {resource.Description}
                    </div>
                </div>
            </li>
        );

    } else {
    return (
       <li key={resource.ID} id="suggestionUnit">
            <div id={'suggestionContent'+commentType} className={resource.ID}>
                <div id="discussUnitButtonsContainer">
                    <Link to={window.location.pathname}>
                        <div id="discussVoteButton" onClick={submitVote.bind(this)} onMouseOver={hoverVote} onMouseOut={unHoverVote.bind(this)}>     
                        </div>
                        <div id="discussPercent">{resource.Rank}</div>
                    </Link>
                </div>
                <Link to={this.props.linkPath+`${resource.TypeID}/learn/${resource.ID}/edit`}>
                    <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit}>
                        <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                    </div>
                </Link>
                <Link to={this.props.linkPath+`${resource.TypeID}/learn/${resource.ID}/delete`}>
                    <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete}>
                        <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                    </div>
                </Link>
                <Link to={this.props.linkPath+`${resource.TypeID}/learn/${resource.ID}/flag`}>
                    <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag}>
                        <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <div id="discussHoverText">
                </div>
                <div id={"discussHeader"+commentType}>
                    {commentType} <span id="gray">from {resource.Username}</span>
                </div>
                <div id="resourceURLTextContainer">
                    <div id="resourceTitleText">
                        {resource.Title}
                    </div>
                    <div id="resourceURLText">
                        <a href={url(resource.Url)} target="_blank">
                            {resource.Url}
                        </a>
                    </div>
                </div>
                <div id="learnDescription">
                    {resource.Description}
                </div>
            </div>
        </li>
    );
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
    // $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',resource.ID);
        $('#discussHoverTextShowGreen').html("").fadeIn(7500);
        $('div#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverText');
    // });
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
    // $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',resource.ID);
        $('#discussHoverTextShowRed').html("").fadeIn(7500);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    // });
}
function hoverEdit() {
    $(document).ready(function() {
        $('div.'+resource.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEdit() {
    // $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',resource.ID);
        $('#discussHoverTextShow').html("").fadeIn(7500);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    // });
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
    // $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',resource.ID);
        $('#discussHoverTextShowRed').html("").fadeIn(7500);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    // });
}

function hoverVoteVoted() {
    $(document).ready(function() {
        $('div.'+resource.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverTextShowVoted').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
        // $('#discussHoverTextGreen').attr('id','discussHoverTextShowVoted'); 
    });
}
function unHoverVoteVoted() {
    // $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',resource.ID);
        $('div#discussHoverTextGreen').html("").fadeIn(7500);
        // $('div#discussHoverTextShowVoted').attr('id','discussHoverTextGreen');
    
        $('div#discussHoverTextGreen').attr('id','discussHoverTextShowVoted');
    // });
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
    // $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',resource.ID);
        $('div#discussHoverTextShowRed').html("").fadeIn(7500);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
    // });
}
function hoverEditVoted() {
    $(document).ready(function() {
        $('div.'+resource.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEditVoted() {
    // $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',resource.ID);
        $('div#discussHoverTextShow').html("").fadeIn(7500);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
    // });
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
    // $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',resource.ID);
        $('div#discussHoverTextShowRed').html("").fadeIn(7500);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
    // });
}
}
}

//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}
function dateTime(str) {
    if(str != undefined){
       var result = str.substring(0,10);
       return result
    }
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