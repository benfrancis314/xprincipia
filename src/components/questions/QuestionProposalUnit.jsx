import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class QuestionUnit extends React.Component {

    constructor(props){
        super(props);

         this.renderItem = this.renderItem.bind(this);
    };
    componentDidMount() {
        var self = this
        self.setState({
            voteHash : {},
            debateNumber : [],
        })
    }



    componentWillReceiveProps (props) {
        var self = this
        self.setState({
            voteHash : {},
            debateNumber : {},
        })
        props.questions.forEach( function (question){
            axios.get( Config.API + "/vote/isVotedOn?type=2&typeID=" + question.ID + "&username=" + cookie.load("userName"))
            .then( function (response) {  
                const voteHash = self.state.voteHash;

                voteHash[question.ID] = response.data
                self.setState({
                    voteHash,
                })
            })  
            axios.get( Config.API + '/answers/number?questionID='+question.ID)
            .then(function (response) {
                const debateNumber = self.state.debateNumber;
                
                debateNumber[question.ID] = response.data
                self.setState({
                    debateNumber,
                })
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
       function  submitVote() {
       axios.post( Config.API + '/auth/vote/create', {
           Type: 2,
           TypeID: question.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            document.location = window.location.pathname;
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
       <li key={question.ID} id="suggestionUnit">
				<div id="suggestionContentHoverVote" className={question.ID}>
                    <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`}>
                        <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            {this.state.debateNumber[question.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverTextShowVoted">
                    voted
                    </div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
                        {question.Username}
                    </div>
                    <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
                        {question.Description}
                    </div>
				</div>
        </li>);
    }  else if ( question.Username === cookie.load('userName')) {
        return (
       <li key={question.ID} id="suggestionUnit">
				<div id={'suggestionContent'} className={question.ID}>
                    <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`}>
                        <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                            {this.state.debateNumber[question.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverText"></div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
					    {question.Username}
                    </div>
                    <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                        {question.Description}
                    </div>
				</div>
        </li>);
    } else if (this.state.voteHash[question.ID] === true) {
        return (
       <li key={question.ID} id="suggestionUnit">
				<div id="suggestionContentHoverVote" className={question.ID}>
                    <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`}>
                        <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/flag`}>
                        <div id="flagDiscussButton" onMouseOver={hoverFlagVoted} onMouseOut={unHoverFlagVoted}>
                            <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            {this.state.debateNumber[question.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverTextShowVoted">
                    voted
                    </div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
                        {question.Username}
                    </div>
                    <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
                        {question.Description}
                    </div>
				</div>
        </li>);

    } else {
    return (
       <li key={question.ID} id="suggestionUnit">
            <div id={'suggestionContent'} className={question.ID}>
                <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`}>
                    <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                        <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/flag`}>
                    <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag}>
                        <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`}>
                    <div id="numberDiscussButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                        {this.state.debateNumber[question.ID]}
                    </div>
                </Link>
                <div id="discussHoverText"></div>
                <div id="discussHeader">
                    <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
                    {question.Username}
                </div>
                <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                    {question.Description}
                </div>
            </div>
        </li>);
}

function hoverThread() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("answers").fadeIn(7500);
    });
}
function unHoverThread() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',question.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    });
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
    $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',question.ID);
        $('div#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverText');
    });
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
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',question.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverEdit() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEdit() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',question.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    });
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
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',question.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverThreadVoted() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("answers").fadeIn(7500);
    });
}
function unHoverThreadVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',question.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
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
    $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',question.ID);
        $('div#discussHoverTextShowVoted').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
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
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',question.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverEditVoted() {
    $(document).ready(function() {
        $('div.'+question.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEditVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',question.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
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
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',question.ID);
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


// import React from 'react';
// import { Link } from 'react-router';
// import axios from 'axios';
// import cookie from 'react-cookie';
// import {Config} from '../../config.js';
// import $ from 'jquery';

// export default class QuestionUnit extends React.Component {

//     constructor(props){
//         super(props);

//          this.renderItem = this.renderItem.bind(this);
//     };
  

// componentDidMount() {
//     var self = this
//     self.setState({
//         voteHash : {},
//     })
// }

//     componentWillReceiveProps (props) {
//         var self = this
//         self.setState({
//             voteHash : {},
//         })
//         props.questions.forEach( function (question){
//             axios.get( Config.API + "/vote/isVotedOn?type=2&typeID=" + question.ID + "&username=" + cookie.load("userName"))
//             .then( function (response) {  
//                 const voteHash = self.state.voteHash;

//                 voteHash[question.ID] = response.data
//                 self.setState({
//                     voteHash,
//                 })
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

//        function  submitVote() {
//        axios.post( Config.API + '/auth/vote/create', {
//            Type: 2,
//            TypeID: question.ID,
//            username : cookie.load("userName"),
           
//         })
//         .then(function (result) {
//             document.location = window.location.pathname;
//         })
//       .catch(function (error) {
//         // console.log(error.response.data)
//           $(document).ready(function() {
//               $('#notification').attr('id','notificationShow').hide().slideDown();

//                 if (error.response.data == '[object Object]') {
//                   return (
//                     $(document).ready(function() {
//                       $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//                       $('#notificationContent').html('Please <span id="blue">login </span>to vote');
//                     })
//                   );
//                 }  else if (error.response.data != '') {
//                 $('#notificationContent').text(error.response.data);
//               }
//           });
//       });
//   }
//       function unVote() {
//       axios.delete( Config.API + '/auth/vote/delete' ,{
//         params: {
//           type: 6,
//           typeID: question.ID,
//           username: cookie.load('userName')
//         }
//         })
//         .then(function (result) {
//             document.location = window.location.pathname 
//         })
//       .catch(function (error) {
//         // console.log(error.response.data)
//           $(document).ready(function() {
//               $('#notification').attr('id','notificationShow').hide().slideDown();

//                 if (error.response.data == '[object Object]') {
//                   return (
//                     $(document).ready(function() {
//                       $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//                       $('#notificationContent').html('Please <span id="blue">login </span>to vote');
//                     })
//                   );
//                 }  else if (error.response.data != '') {
//                 $('#notificationContent').text(error.response.data);
//               }
//           });
//       });
// }

  
//        if (this.state.voteHash[question.ID] === true && question.Username === cookie.load('userName')) {
//            return (
//        <li key={question.ID} id="suggestionUnit">
// 				<div id="suggestionContentHoverVote" className={question.ID}>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/answers`}>
//                         <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
//                             <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/edit`}>
//                         <div id="editDiscussButton" onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted}>
//                             <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/delete`}>
//                         <div id="deleteDiscussButton" onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted}>
//                             <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverTextShowVoted">voted</div>
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
//                         {question.Username}
//                     </div>
//                     <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
//                         {question.Description}
//                     </div>
// 				</div>
//         </li>);
//     }  else if ( question.Username === cookie.load('userName')) {
//         return (
//        <li key={question.ID} id="suggestionUnit">
// 				<div id={'suggestionContent'} className={question.ID}>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/answers`}>
//                         <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
//                             <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/edit`}>
//                         <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit}>
//                             <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/delete`}>
//                         <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete}>
//                             <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverText"></div>
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
// 					    <span id="discussUsername">{question.Username}</span> 
//                     </div>
//                     <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
//                         {question.Description}
//                     </div>
// 				</div>
//         </li>);
//     } else if (this.state.voteHash[question.ID] === true) {
//         return (
//        <li key={question.ID} id="suggestionUnit">
// 				<div id="suggestionContentHoverVote" className={question.ID}>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/answers`}>
//                         <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
//                             <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${question.TypeID}/question/${question.ID}/flag`}>
//                         <div id="flagDiscussButton" onMouseOver={hoverFlagVoted} onMouseOut={unHoverFlagVoted}>
//                             <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverTextShowVoted">voted</div>
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
// 					    {question.Username}
//                     </div>
//                     <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
//                         {question.Description}
//                     </div>
// 				</div>
//         </li>);

//     } else {
//     return (
//        <li key={question.ID} id="suggestionUnit">
//             {/* <div id="suggestionContent"> */}
//             <div id={'suggestionContent'} className={question.ID}>
//                 <Link to={`/project/${question.TypeID}/question/${question.ID}/answers`}>
//                     <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
//                         <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                     </div>
//                 </Link>
//                 <Link to={`/project/${question.TypeID}/question/${question.ID}/flag`}>
//                     <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag}>
//                         <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
//                     </div>
//                 </Link>
//                 <div id="discussHoverText"></div>
//                 <div id="discussHeader">
//                     <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
//                     {question.Username}
//                 </div>
//                 <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
//                     {question.Description}
//                 </div>
//             </div>
//         </li>);
// }

// function hoverThread() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("answers").fadeIn(7500);
//     });
// }
// function unHoverThread() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',question.ID);
//         $('div#discussHoverTextShow').attr('id','discussHoverText');
//     });
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
//     $(document).ready(function() {
//         $('div.suggestionContentClassGreen').attr('class',question.ID);
//         $('div#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
//         $('div#discussHoverTextGreen').attr('id','discussHoverText');
//     });
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
//     $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',question.ID);
//         $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('div#discussHoverTextRed').attr('id','discussHoverText');
//     });
// }
// function hoverEdit() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("edit").fadeIn(7500);
//     });
// }
// function unHoverEdit() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',question.ID);
//         $('div#discussHoverTextShow').attr('id','discussHoverText');
//     });
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
//     $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',question.ID);
//         $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('div#discussHoverTextRed').attr('id','discussHoverText');
//     });
// }
// function hoverThreadVoted() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("answers").fadeIn(7500);
//     });
// }
// function unHoverThreadVoted() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',question.ID);
//         $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     });
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
//     $(document).ready(function() {
//         $('div.suggestionContentClassGreen').attr('class',question.ID);
//         $('div#discussHoverTextShowVoted').attr('id','discussHoverTextGreen');
//         $('div#discussHoverTextGreen').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     });
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
//     $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',question.ID);
//         $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     });
// }
// function hoverEditVoted() {
//     $(document).ready(function() {
//         $('div.'+question.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("edit").fadeIn(7500);
//     });
// }
// function unHoverEditVoted() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',question.ID);
//         $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     });
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
//     $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',question.ID);
//         $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     });

// }
// }
// }

// //convert float to Decimal
// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }


// import React from 'react';
// import { Link } from 'react-router';
// import axios from 'axios';
// import cookie from 'react-cookie';
// import {Config} from '../../config.js';
// import $ from 'jquery';

// export default class QuestionUnit extends React.Component {

// constructor(props){
//      super(props);

//         this.renderItem = this.renderItem.bind(this)

//     };

// // Trying to use this to fix scroll error when discuss menu up and scroll down to #proposals in url
// // shouldComponentUpdate(nextProps, nextState) {
// //     // only render if probID has changed
// //     return this.state.probID !== nextProps.params.probID;
// // }

//     componentWillReceiveProps (props) {
//     var self = this
//     self.setState({
//         voteHash : {},
//     })
//     props.questions.forEach( function (question){
//         axios.get( Config.API + "/vote/isVotedOn?type=2&typeID=" + question.ID + "&username=" + cookie.load("userName"))
//         .then( function (response) {  
//             const voteHash = self.state.voteHash;

//             voteHash[question.ID] = response.data
//             self.setState({
//                 voteHash,
//             })
//         })  
//     })
// }


// 	render() {
// 		return (
// 	    <div id="questionUnitContainer">
// 			<ul> {this.props.questions.map(this.renderItem)} </ul>	               
// 	    </div>
// 		);
// 	}
// 	renderItem(question) {
       
//        function submitVote() {
//        axios.post( Config.API + '/auth/vote/create', {
//            Type: 2,
//            TypeID: question.ID,
//            username : cookie.load("userName"),
           
//         })
//         .then(function (result) {
//             document.location = window.location.pathname 
//         })

//       .catch(function (error) {
//         // console.log(error.response.data)
//           $(document).ready(function() {
//               $('#notification').attr('id','notificationShow').hide().slideDown();

//                 if (error.response.data == '[object Object]') {
//                   return (
//                     $(document).ready(function() {
//                       $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//                       $('#notificationContent').html('Please <span id="blue">login </span>to vote');
//                     })
//                   );
//                 }  else if (error.response.data != '') {
//                 $('#notificationContent').text(error.response.data);
//               }
//           });
//       });
//     }
//      function unVote() {
//       axios.delete( Config.API + '/auth/vote/delete' ,{
//         params: {
//           type: 2,
//           typeID: question.ID,
//           username: cookie.load('userName')
//         }
//         })
//         .then(function (result) {
//             document.location = window.location.pathname 
//         })
//       .catch(function (error) {
//           $(document).ready(function() {
//               $('#notification').attr('id','notificationShow').hide().slideDown();

//                 if (error.response.data == '[object Object]') {
//                   return (
//                     $(document).ready(function() {
//                       $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//                       $('#notificationContent').html('Please <span id="blue">login </span>to vote');
//                     })
//                   );
//                 }  else if (error.response.data != '') {
//                 $('#notificationContent').text(error.response.data);
//               }
//           });
//       });
        
//     }
 
//        if (this.state.voteHash[question.ID] === true && question.Username === cookie.load('userName')) {
//            return (
//             <li key={question.ID} id="questionUnit"> 
//                     <div id="suggestionContent">
//                         <div id="discussHeader">
//                             <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
//                             {question.Username}
//                         </div>
//                         <div id="suggestionText">
//                             {question.Description}
//                         </div>
//                     </div>
//                     <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/delete`} >
//                         <div id="deleteSBButton">
//                             <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/edit`}>
//                         <div id="editSBButton">
//                             <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`} activeClassName="activeGlow">
//                         <div id="commentSBButtonUser">
//                             <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
//                         </div>                
//                     </Link>
//                     <button type="button" id="suggestionVoted" onClick={unVote}>
//                         Voted
//                     </button>
//             </li>);

//     }  else if ( question.Username === cookie.load('userName')) {
//         return (
//             <li key={question.ID} id="questionUnit"> 
// 				<div id="suggestionContent">
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
// 					    {question.Username}
//                     </div>
//                     <div id="suggestionText">
//                         {question.Description}
//                     </div>
// 				</div>
//                 <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/delete`} >
//                     <div id="deleteSBButton">
//                         <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
//                     </div>
//                 </Link>
//                 <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/edit`}>
//                     <div id="editSBButton">
//                         <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
//                     </div>
//                 </Link>
//                 <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`} activeClassName="activeGlow">
//                     <div id="commentSBButtonUser">
//                         <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
//                     </div>                
//                 </Link>
//                 <button type="button" id="suggestionVote" onClick={submitVote}>
//                     Vote
//                 </button>
//             </li>);    
//     } else if (this.state.voteHash[question.ID] === true) {
//         return (
//         <li key={question.ID} id="questionUnit"> 
// 				<div id="suggestionContent">
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
// 					    {question.Username}
//                     </div>
//                     <div id="suggestionText">
//                         {question.Description}
//                     </div>
// 				</div>
//                     {/*<Link to={`/project/${question.TypeID}/question/${question.ID}/flag`}>
//                         <div id="flagSBButton">
//                             <img src={require('.../src/assets/flag.svg')} id="deleteLogo" width="11" height="11" alt="Delete Button, Red X" />
//                             Flag
//                         </div>
//                     </Link>*/}
//                 <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`} activeClassName="activeGlow">
//                     <div id="commentSBButtonUser">
//                         <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
//                     </div>                
//                 </Link>
//                 <button type="button" id="suggestionVoted" onClick={unVote}>
//                     Voted
//                 </button>
//         </li>);
//     } else {
//     return (
//         <li key={question.ID} id="questionUnit"> 
// 				<div id="suggestionContent">
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(question.PercentRank)}</span>
// 					    {question.Username}
//                     </div>
//                     <div id="suggestionText">
//                         {question.Description}
//                     </div>
// 				</div>
//                 <Link to={`/project/${this.props.probID}/proposal/${question.TypeID}/question/${question.ID}/answers`} activeClassName="activeGlow">
//                     <div id="commentSBButtonUser">
//                         <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
//                     </div>                
//                 </Link>
//                 <button type="button" id="suggestionVote" onClick={submitVote}>
//                     Vote
//                 </button>
//         </li>);
//   }
// }}

// //convert float to Decimal
// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// };
