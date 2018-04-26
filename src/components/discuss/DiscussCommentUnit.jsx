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

	render() {
		return (
            <div>
                <ul> {this.props.questions.map(this.renderItem)} </ul>    
            </div>
		);
	}
	renderItem(question) {
        if (question.Type == '5') {
            var commentType = 'Comment'
        } else if (question.Type == '9') {
            var commentType = 'Pro'
        } else if (question.Type == '10') {
            var commentType = 'Con'
        }

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
                <div id={'suggestionContentHoverVote'+commentType} className={question.ID}>
                    <div id="discussUnitButtonsContainer">
                        <Link to={window.location.pathname}>
                            <div id="discussVotedButton" onClick={unVote.bind(this)} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted.bind(this)}>     
                            </div>
                            <div id="discussPercent">{floatToDecimal(question.PercentRank)}</div>
                        </Link>
                    </div>
                    <Link to={`/project/${question.TypeID}/question/${question.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted.bind(this)}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${question.TypeID}/question/${question.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted.bind(this)}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <div id="discussHoverTextShowVoted">
                        <span id="discussNumberValue">{this.state.debateNumber[question.ID]} </span>responses
                    </div>
                    <div id={"discussHeader"+commentType}>
                        {commentType} <span id="gray">by {question.Username}</span>
                    </div>
                    <Link to={`/project/${question.TypeID}/discuss/${question.ID}/comments`}>
                        <div id="suggestionText" ref='votebtn' onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted.bind(this)}>
                            {question.Description}
                        </div>
                    </Link>
                    <div id="feedDateProse">{dateTime(question.CreatedAt)}</div>
                </div>
            </li>
        );
    }  else if ( question.Username === cookie.load('userName')) {
        return (
            <li key={question.ID} id="suggestionUnit">
                <div id={'suggestionContent'+commentType} className={question.ID}>
                    <div id="discussUnitButtonsContainer">
                        <Link to={window.location.pathname}>
                            <div id="discussVoteButton" onClick={submitVote.bind(this)} onMouseOver={hoverVote} onMouseOut={unHoverVote.bind(this)}>     
                            </div>
                            <div id="discussPercent">{floatToDecimal(question.PercentRank)}</div>
                        </Link>
                    </div>
                    <Link to={`/project/${question.TypeID}/question/${question.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit.bind(this)}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${question.TypeID}/question/${question.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete.bind(this)}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <div id="discussHoverText">
                        <span id="discussNumberValue">{this.state.debateNumber[question.ID]} </span>responses
                    </div>
                    <div id={"discussHeader"+commentType}>
                        {commentType} <span id="gray">by {question.Username}</span>
                    </div>
                    <Link to={`/project/${question.TypeID}/discuss/${question.ID}/comments`}>
                        <div id="suggestionText" ref='votebtn' onMouseOver={hoverThread} onMouseOut={unHoverThread.bind(this)}>
                            {question.Description}
                        </div>
                    </Link>
                    <div id="feedDateProse">{dateTime(question.CreatedAt)}</div>
                </div>
            </li>
        );
    } else if (this.state.voteHash[question.ID] === true) {
        return (
        <li key={question.ID} id="suggestionUnit">
            <div id={'suggestionContentHoverVote'+commentType} className={question.ID}>
                <div id="discussUnitButtonsContainer">
                    <Link to={window.location.pathname}>
                        <div id="discussVotedButton" onClick={unVote.bind(this)} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted.bind(this)}>     
                        </div>
                        <div id="discussPercent">{floatToDecimal(question.PercentRank)}</div>
                    </Link>
                </div>
                <Link to={`/project/${question.TypeID}/question/${question.ID}/flag`}>
                    <div id="flagDiscussButton" onMouseOver={hoverFlagVoted} onMouseOut={unHoverFlagVoted.bind(this)}>
                        <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <div id="discussHoverTextShowVoted">
                    <span id="discussNumberValue">{this.state.debateNumber[question.ID]} </span>responses
                </div>
                <div id={"discussHeader"+commentType}>
                    {commentType} <span id="gray">by {question.Username}</span>
                </div>
                <Link to={`/project/${question.TypeID}/discuss/${question.ID}/comments`}>
                    <div id="suggestionText" ref='votebtn' onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted.bind(this)}>
                        {question.Description}
                    </div>
                </Link>
                <div id="feedDateProse">{dateTime(question.CreatedAt)}</div>
            </div>
        </li>
        );

    } else {
    return (
        <li key={question.ID} id="suggestionUnit">
            <div id={'suggestionContent'+commentType} className={question.ID}>
                <div id="discussUnitButtonsContainer">
                    <Link to={window.location.pathname}>
                        <div id="discussVoteButton" onClick={submitVote.bind(this)} onMouseOver={hoverVote} onMouseOut={unHoverVote.bind(this)}>     
                        </div>
                        <div id="discussPercent">{floatToDecimal(question.PercentRank)}</div>
                    </Link>
                </div>
                <Link to={`/project/${question.TypeID}/question/${question.ID}/flag`}>
                    <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag.bind(this)}>
                        <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <div id="discussHoverText">
                    <span id="discussNumberValue">{this.state.debateNumber[question.ID]} </span>responses
                </div>
                <div id={"discussHeader"+commentType}>
                    {commentType} <span id="gray">by {question.Username}</span>
                </div>
                <Link to={`/project/${question.TypeID}/discuss/${question.ID}/comments`}>
                    <div id="suggestionText" ref='votebtn' onMouseOver={hoverThread} onMouseOut={unHoverThread.bind(this)}>
                        {question.Description}
                    </div>
                </Link>
            </div>
        </li>
        );
}

function hoverThread() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("view responses").fadeIn(7500);
    });
}
function unHoverThread() {
    // Removed document part to use 'this.state'
    // $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',question.ID);
        $('#discussHoverTextShow').html(this.state.debateNumber[question.ID]+" responses").fadeIn(7500);
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
        $('#discussHoverTextShowGreen').html(this.state.debateNumber[question.ID]+" responses").fadeIn(7500);
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
        $('#discussHoverTextShowRed').html(this.state.debateNumber[question.ID]+" responses").fadeIn(7500);
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
        $('#discussHoverTextShow').html(this.state.debateNumber[question.ID]+" responses").fadeIn(7500);
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
        $('#discussHoverTextShowRed').html(this.state.debateNumber[question.ID]+" responses").fadeIn(7500);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    // });
}
function hoverThreadVoted() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("view responses").fadeIn(7500);
    });
}
function unHoverThreadVoted() {
    // $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',question.ID);
        $('div#discussHoverTextShow').html(this.state.debateNumber[question.ID]+" responses").fadeIn(7500);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
    // });
}
function hoverVoteVoted() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverTextShowVoted').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
        // $('#discussHoverTextGreen').attr('id','discussHoverTextShowVoted'); 
    });
}
function unHoverVoteVoted() {
    // $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',question.ID);
        $('div#discussHoverTextGreen').html(this.state.debateNumber[question.ID]+" responses").fadeIn(7500);
        // $('div#discussHoverTextShowVoted').attr('id','discussHoverTextGreen');
    
        $('div#discussHoverTextGreen').attr('id','discussHoverTextShowVoted');
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
        $('div#discussHoverTextShowRed').html(this.state.debateNumber[question.ID]+" responses").fadeIn(7500);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
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
        $('div#discussHoverTextShow').html(this.state.debateNumber[question.ID]+" responses").fadeIn(7500);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
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
        $('div#discussHoverTextShowRed').html(this.state.debateNumber[question.ID]+" responses").fadeIn(7500);
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








































































































// import React from 'react';
// import { Link } from 'react-router';
// import axios from 'axios';
// import cookie from 'react-cookie';
// import {Config} from '../../config.js';
// import $ from 'jquery';

// export default class DiscussUnit extends React.Component {

//     constructor(props){
//         super(props);

//         this.state = {
//             voteHash : {},
//             debateNumber : [],
//         }

//          this.renderItem = this.renderItem.bind(this);
//     };

//     componentWillReceiveProps (nextProps) {
//         var self = this
//         nextProps.questions.forEach( function (question){
//             axios.get( Config.API + "/vote/isVotedOn?type=2&typeID=" + question.ID + "&username=" + cookie.load("userName"))
//             .then( function (response) {  
//                 const voteHash = self.state.voteHash;

//                 voteHash[question.ID] = response.data
//             })  
//             axios.get( Config.API + '/answers/number?questionID='+question.ID)
//             .then(function (response) {
//                 const debateNumber = self.state.debateNumber;
                
//                 debateNumber[question.ID] = response.data
//             })
//         })
//     }

// 	render() {
// 		return (
// 	    <div>
// 			<ul> {this.props.questions.map(this.renderItem)} </ul>    
// 	    </div>
// 		);
// 	}
// 	renderItem(question) {
//        function submitVote() {
//         var self = this
//         self.refs.votebtn.setAttribute("disabled", "disabled");
//        axios.post( Config.API + '/auth/vote/create', {
//            Type: 2,
//            TypeID: question.ID,
//            username : cookie.load("userName"),
           
//         })
//         .then(function (result) {
//             // document.location = window.location.pathname;
//             self.refs.votebtn.removeAttribute("disabled");
//         })
//       .catch(function (error) {
//           $(document).ready(function() {
//             //   $('#notification').attr('id','notificationShow').hide().slideDown();
//             // HIDE ERROR UNLESS NOT LOGGED IN

//                 if (error.response.data == '[object Object]') {
//                   return (
//                     $(document).ready(function() {
//                       $('#notification').attr('id','notificationShow').hide().slideDown();
//                       $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//                       $('#notificationContent').html('Please <span id="blue">login </span>to vote');
//                     })
//                   );
//                 }  else if (error.response.data != '') {
//                 // $('#notificationContent').text(error.response.data);
//               }
//           });
//           self.refs.votebtn.removeAttribute("disabled");
//       });
//   }
//       function unVote() {
//         var self = this
//         self.refs.votebtn.setAttribute("disabled", "disabled");
//       axios.delete( Config.API + '/auth/vote/delete' ,{
//         params: {
//           type: 2,
//           typeID: question.ID,
//           username: cookie.load('userName')
//         }
//         })
//         .then(function (result) {
//             // document.location = window.location.pathname 
//             self.refs.votebtn.removeAttribute("disabled");
//         })
//       .catch(function (error) {
//           $(document).ready(function() {
//             // HIDE ERROR UNLESS NOT LOGGED IN

//                 if (error.response.data == '[object Object]') {
//                   return (
//                     $(document).ready(function() {
//                       $('#notification').attr('id','notificationShow').hide().slideDown();
//                       $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//                       $('#notificationContent').html('Please <span id="blue">login </span>to vote');
//                     })
//                   );
//                 }  else if (error.response.data != '') {
//                 // $('#notificationContent').text(error.response.data);
//               }
//           });
//           self.refs.votebtn.removeAttribute("disabled");
//       });
// }

  
//        if (this.state.voteHash[question.ID] === true && question.Username === cookie.load('userName')) {
//            return (
//             <li key={question.ID} id="suggestionUnit">
//                 <div id='suggestionContentHoverVote' className={question.ID}>
//                     <div id="discussUnitButtonsContainer">
//                         <Link to={window.location.pathname}>
//                             <div id="discussVotedButton" onClick={unVote.bind(this)} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted.bind(this)}>     
//                             </div>
//                             <div id="discussPercent">{floatToDecimal(question.PercentRank)}</div>
//                         </Link>
//                     </div>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/edit`}>
//                         <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit.bind(this)}>
//                             <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/delete`}>
//                         <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete.bind(this)}>
//                             <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverTextShowVoted">
//                         <span id="discussNumberValue">{this.state.debateNumber[question.ID]} </span>answers
//                     </div>
//                     <div id="discussHeader">
//                         {question.Username}
//                     </div>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/answers`}>
//                         <div id="suggestionText" ref='votebtn' onMouseOver={hoverThread} onMouseOut={unHoverThread.bind(this)}>
//                             {question.Description}
//                         </div>
//                     </Link>
//                 </div>
//             </li>
//         );
//     }  else if ( question.Username === cookie.load('userName')) {
//         return (
//             <li key={question.ID} id="suggestionUnit">
//                 <div id={'suggestionContent'} className={question.ID}>
//                     <div id="discussUnitButtonsContainer">
//                         <Link to={window.location.pathname}>
//                             <div id="discussVoteButton" onClick={submitVote.bind(this)} onMouseOver={hoverVote} onMouseOut={unHoverVote.bind(this)}>     
//                             </div>
//                             <div id="discussPercent">{floatToDecimal(question.PercentRank)}</div>
//                         </Link>
//                     </div>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/edit`}>
//                         <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit.bind(this)}>
//                             <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/delete`}>
//                         <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete.bind(this)}>
//                             <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverText">
//                         <span id="discussNumberValue">{this.state.debateNumber[question.ID]} </span>answers
//                     </div>
//                     <div id="discussHeader">
//                         {question.Username}
//                     </div>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/answers`}>
//                         <div id="suggestionText" ref='votebtn' onMouseOver={hoverThread} onMouseOut={unHoverThread.bind(this)}>
//                             {question.Description}
//                         </div>
//                     </Link>
//                 </div>
//             </li>
//         );
//     } else if (this.state.voteHash[question.ID] === true) {
//         return (
//         <li key={question.ID} id="suggestionUnit">
//             <div id={'suggestionContentHoverVote'} className={question.ID}>
//                 <div id="discussUnitButtonsContainer">
//                     <Link to={window.location.pathname}>
//                         <div id="discussVotedButton" onClick={unVote.bind(this)} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted.bind(this)}>     
//                         </div>
//                         <div id="discussPercent">{floatToDecimal(question.PercentRank)}</div>
//                     </Link>
//                 </div>
//                 <Link to={`/project/${question.TypeID}/question/${question.ID}/flag`}>
//                     <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag.bind(this)}>
//                         <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
//                     </div>
//                 </Link>
//                 <div id="discussHoverTextShowVoted">
//                     <span id="discussNumberValue">{this.state.debateNumber[question.ID]} </span>answers
//                 </div>
//                 <div id="discussHeader">
//                     {question.Username}
//                 </div>
//                 <Link to={`/project/${question.TypeID}/question/${question.ID}/answers`}>
//                     <div id="suggestionText" ref='votebtn' onMouseOver={hoverThread} onMouseOut={unHoverThread.bind(this)}>
//                         {question.Description}
//                     </div>
//                 </Link>
//             </div>
//         </li>
//         );

//     } else {
//     return (
//         <li key={question.ID} id="suggestionUnit">
//             <div id={'suggestionContent'} className={question.ID}>
//                 <div id="discussUnitButtonsContainer">
//                     <Link to={window.location.pathname}>
//                         <div id="discussVoteButton" onClick={submitVote.bind(this)} onMouseOver={hoverVote} onMouseOut={unHoverVote.bind(this)}>     
//                         </div>
//                         <div id="discussPercent">{floatToDecimal(question.PercentRank)}</div>
//                     </Link>
//                 </div>
//                 <Link to={`/project/${question.TypeID}/question/${question.ID}/flag`}>
//                     <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag.bind(this)}>
//                         <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
//                     </div>
//                 </Link>
//                 <div id="discussHoverText">
//                     <span id="discussNumberValue">{this.state.debateNumber[question.ID]} </span>answers
//                 </div>
//                 <div id="discussHeader">
//                     {question.Username}
//                 </div>
//                 <Link to={`/project/${question.TypeID}/question/${question.ID}/answers`}>
//                     <div id="suggestionText" ref='votebtn' onMouseOver={hoverThread} onMouseOut={unHoverThread.bind(this)}>
//                         {question.Description}
//                     </div>
//                 </Link>
//             </div>
//         </li>
//         );
// }

// function hoverThread() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("view answers").fadeIn(7500);
//     });
// }
// function unHoverThread() {
//     // Removed document part to use 'this.state'
//     // $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',question.ID);
//         $('#discussHoverTextShow').html(this.state.debateNumber[question.ID]+" answers").fadeIn(7500);
//         $('div#discussHoverTextShow').attr('id','discussHoverText');
//     // });
// }
// function hoverVote() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassGreen');
//         $('.suggestionContentClassGreen > #discussHoverText').attr('id','discussHoverTextGreen');    
//         $('#discussHoverTextGreen').html("vote").fadeIn(7500);
//         $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');    
//     });
// }
// function unHoverVote() {
//     // $(document).ready(function() {
//         $('div.suggestionContentClassGreen').attr('class',question.ID);
//         $('div#discussHoverTextShowGreen').html(this.state.debateNumber[question.ID]+" answers").fadeIn(7500);
//         $('div#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
//         $('div#discussHoverTextGreen').attr('id','discussHoverText');
//     // });
// }
// function hoverFlag() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassRed');
//         $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
//         $('#discussHoverTextRed').html("flag").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');              
//     });
// }
// function unHoverFlag() {
//     // $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',question.ID);
//         $('#discussHoverTextShowRed').html(this.state.debateNumber[question.ID]+" answers").fadeIn(7500);
//         $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('div#discussHoverTextRed').attr('id','discussHoverText');
//     // });
// }
// function hoverEdit() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("edit").fadeIn(7500);
//     });
// }
// function unHoverEdit() {
//     // $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',question.ID);
//         $('#discussHoverTextShow').html(this.state.debateNumber[question.ID]+" answers").fadeIn(7500);
//         $('div#discussHoverTextShow').attr('id','discussHoverText');
//     // });
// }
// function hoverDelete() {
//     $(document).ready(function() {      
//         $('div.'+question.ID).attr('class','suggestionContentClassRed');
//         $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
//         $('#discussHoverTextRed').html("delete").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
//     });
// }
// function unHoverDelete() {
//     // $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',question.ID);
//         $('#discussHoverTextShowRed').html(this.state.debateNumber[question.ID]+" answers").fadeIn(7500);
//         $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('div#discussHoverTextRed').attr('id','discussHoverText');
//     // });
// }
// function hoverThreadVoted() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("view answers").fadeIn(7500);
//     });
// }
// function unHoverThreadVoted() {
//     // $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',question.ID);
//         $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     // });
// }
// function hoverVoteVoted() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassGreen');
//         $('.suggestionContentClassGreen > #discussHoverTextShowVoted').attr('id','discussHoverTextGreen');    
//         $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
//         $('#discussHoverTextGreen').attr('id','discussHoverTextShowVoted'); 
//     });
// }
// function unHoverVoteVoted() {
//     // $(document).ready(function() {
//         $('div.suggestionContentClassGreen').attr('class',question.ID);
//         $('div#discussHoverTextShowVoted').attr('id','discussHoverTextGreen');
//         $('div#discussHoverTextGreen').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     // });
// }
// function hoverFlagVoted() {
//     $(document).ready(function() {       
//         $('div.'+question.ID).attr('class','suggestionContentClassRed');
//         $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
//         $('#discussHoverTextRed').html("flag").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');  
//     });
// }
// function unHoverFlagVoted() {
//     // $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',question.ID);
//         $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     // });
// }
// function hoverEditVoted() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("edit").fadeIn(7500);
//     });
// }
// function unHoverEditVoted() {
//     // $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',question.ID);
//         $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     // });
// }
// function hoverDeleteVoted() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassRed');
//         $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
//         $('#discussHoverTextRed').html("delete").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
//     });
// }
// function unHoverDeleteVoted() {
//     // $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',question.ID);
//         $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     // });
// }
// }
// }

// //convert float to Decimal
// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }

