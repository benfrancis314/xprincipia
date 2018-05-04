import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class DiscussUnit extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            voteHash : {},
            debateNumber : [],
        }

        this.renderItem = this.renderItem.bind(this);
        this.voteUp = this.voteUp.bind(this);
        this.voteDown = this.voteDown.bind(this);
    };

    componentWillReceiveProps (nextProps) {
        var self = this
        nextProps.questions.forEach( function (question){
            axios.get( Config.API + "/vote/isVotedOn?type=2&typeID=" + question.ID + "&username=" + cookie.load("userName"))
            .then( function (response) {  
                const voteHash = self.state.voteHash;

                voteHash[question.ID] = response.data
            })  
            axios.get( Config.API + '/answers/number?questionID='+question.ID)
            .then(function (response) {
                const debateNumber = self.state.debateNumber;
                
                debateNumber[question.ID] = response.data
            })
        })
    }

    voteUp() {
        var self = this
        self.refs.probbtn.setAttribute("disabled", "disabled");
        axios.get( Config.API + '/vote/privateUp?id='+this.props.params.probID+'&type=2').then(function (response) {
          // alert('vote up success');
        })
        .catch(function (error) {
            $(document).ready(function() {
                $('#notification').attr('id','notificationShow').hide().slideDown();
                  if (error.response.data == '[object Object]') {
                    return (
                      $(document).ready(function() {
                        $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                        $('#notificationFeedbackShow').attr('id','notificationFeedback');
                        $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                      })
                    );
                  }  else if (error.response.data != '') {
                  $('#notificationContent').text(error.response.data);
                }
            });
            self.refs.probbtn.removeAttribute("disabled");
        });
    }
  
  voteDown() {
        var self = this;
        self.refs.probbtn.setAttribute("disabled", "disabled");
        // I believe something about the double click disable broke,
        // look at old versions to find the fix
        // self.refs.btn.setAttribute("disabled", "disabled");
        axios.get( Config.API + '/vote/privateDown?id='+this.props.params.probID+'&type=2').then(function (response) {
            // alert('vote down success');
          })
        .catch(function (error) {
            $(document).ready(function() {
                $('#notification').attr('id','notificationShow').hide().slideDown();
                  if (error.response.data == '[object Object]') {
                    return (
                      $(document).ready(function() {
                        $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                        $('#notificationFeedbackShow').attr('id','notificationFeedback');
                        $('#notificationContent').html('Please <span id="blue">login </span>to vote');
                      })
                    );
                  }  else if (error.response.data != '') {
                  $('#notificationContent').text(error.response.data);
                }
            });
            self.refs.probbtn.removeAttribute("disabled");
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
       function submitVote() {
        var self = this
        self.refs.votebtn.setAttribute("disabled", "disabled");
       axios.post( Config.API + '/auth/vote/create', {
           Type: 2,
           TypeID: question.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            // document.location = window.location.pathname;
            self.refs.votebtn.removeAttribute("disabled");
        })
      .catch(function (error) {
          $(document).ready(function() {
            //   $('#notification').attr('id','notificationShow').hide().slideDown();
            // HIDE ERROR UNLESS NOT LOGGED IN

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
          type: 2,
          typeID: question.ID,
          username: cookie.load('userName')
        }
        })
        .then(function (result) {
            // document.location = window.location.pathname 
            self.refs.votebtn.removeAttribute("disabled");
        })
      .catch(function (error) {
          $(document).ready(function() {
            // HIDE ERROR UNLESS NOT LOGGED IN

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

  
       if (this.state.voteHash[question.ID] === true && question.Username === cookie.load('userName')) {
           return (
            <li key={question.ID} id="suggestionUnit">

            {/* TESTING FOR VOTING */}
                <Link to={window.location.pathname}>
                    <div id="voteProblemUp" ref='probbtn' onClick={this.voteUp}  onMouseDown={this.changeRankOn} onMouseUp={this.changeRankOff}>
                    </div>
                </Link>
                <Link to={window.location.pathname}>
                    <div id="voteProblemDown" ref='probbtn' onClick={this.voteDown}  onMouseDown={this.changeRankOn} onMouseUp={this.changeRankOff}>
                    </div>
                </Link>


                <div id='suggestionContentHoverVote' className={question.ID}>
                    <div id="discussUnitButtonsContainer">
                        <Link to={window.location.pathname}>
                            <div id="discussVotedButton" onClick={unVote.bind(this)} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>     
                            </div>
                            <div id="discussPercent">{question.Rank}</div>
                        </Link>
                    </div>
                    <Link to={`/project/${question.TypeID}/question/${question.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${question.TypeID}/question/${question.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <div id="discussHoverTextShowVoted">
                        <span id="discussNumberValue">{this.state.debateNumber[question.ID]} </span>answers
                    </div>
                    <div id="discussHeader">
                        {question.Username}
                    </div>
                    <Link to={`/project/${question.TypeID}/question/${question.ID}/answers`}>
                        <div id="suggestionText" ref='votebtn' onMouseOver={hoverThread} onMouseOut={unHoverThread.bind(this)}>
                            {question.Description}
                        </div>
                    </Link>
                </div>
            </li>
           );
    } else {
        return (
            <div></div>
        );
    }


function hoverThread() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("view answers").fadeIn(7500);
    });
}
function unHoverThread() {
    // Removed document part to use 'this.state'
    // $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',question.ID);
        $('#discussHoverTextShow').html(this.state.debateNumber[question.ID]+" answers").fadeIn(7500);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    // });
}
function hoverVote() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverText').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("vote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');    
    });
}
function unHoverVote() {
    // $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',question.ID);
        $('div#discussHoverTextShowGreen').html(this.state.debateNumber[question.ID]+" answers").fadeIn(7500);
        $('div#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverText');
    // });
}
function hoverFlag() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');              
    });
}
function unHoverFlag() {
    // $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',question.ID);
        $('#discussHoverTextShowRed').html(this.state.debateNumber[question.ID]+" answers").fadeIn(7500);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    // });
}
function hoverEdit() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEdit() {
    // $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',question.ID);
        $('#discussHoverTextShow').html(this.state.debateNumber[question.ID]+" answers").fadeIn(7500);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    // });
}
function hoverDelete() {
    $(document).ready(function() {      
        $('div.'+question.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
    });
}
function unHoverDelete() {
    // $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',question.ID);
        $('#discussHoverTextShowRed').html(this.state.debateNumber[question.ID]+" answers").fadeIn(7500);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    // });
}
function hoverThreadVoted() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("view answers").fadeIn(7500);
    });
}
function unHoverThreadVoted() {
    // $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',question.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    // });
}
function hoverVoteVoted() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverTextShowVoted').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowVoted'); 
    });
}
function unHoverVoteVoted() {
    // $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',question.ID);
        $('div#discussHoverTextShowVoted').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    // });
}
function hoverFlagVoted() {
    $(document).ready(function() {       
        $('div.'+question.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');  
    });
}
function unHoverFlagVoted() {
    // $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',question.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    // });
}
function hoverEditVoted() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEditVoted() {
    // $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',question.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    // });
}
function hoverDeleteVoted() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
    });
}
function unHoverDeleteVoted() {
    // $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',question.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    // });
}
}
}

//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}

