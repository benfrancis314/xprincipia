import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class CommentUnit extends React.Component {

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
        props.comments.forEach( function (comment){
            axios.get( Config.API + "/vote/isVotedOn?type=5&typeID=" + comment.ID + "&username=" + cookie.load("userName"))
            .then( function (response) {  
                const voteHash = self.state.voteHash;

                voteHash[comment.ID] = response.data
                self.setState({
                    voteHash,
                })
            })  
            axios.get( Config.API + '/comments/number?parentID='+comment.ID)
            .then(function (response) {
                const debateNumber = self.state.debateNumber;
                
                debateNumber[comment.ID] = response.data
                self.setState({
                    debateNumber,
                })
            })
        })
    }

	render() {
		return (
	    <div>
			<ul> {this.props.comments.map(this.renderItem)} </ul>    
	    </div>
		);
	}
	renderItem(comment) {
       function  submitVote() {
       axios.post( Config.API + '/auth/vote/create', {
           Type: 5,
           TypeID: comment.ID,
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
          type: 5,
          typeID: comment.ID,
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

  
       if (this.state.voteHash[comment.ID] === true && comment.Username === cookie.load('userName')) {
           return (
       <li key={comment.ID} id="suggestionUnit">
				<div id="suggestionContentHoverVote" className={comment.ID}>
                    <Link to={`/project/${comment.TypeID}/comment/${comment.ID}/subcomments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${comment.TypeID}/comment/${comment.ParentID}/subcomment/${comment.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${comment.TypeID}/comment/${comment.ParentID}/subcomment/${comment.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${comment.TypeID}/comment/${comment.ID}/subcomments`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            {this.state.debateNumber[comment.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverTextShowVoted">
                    voted
                    </div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(comment.PercentRank)}</span>
                        {comment.Username}
                    </div>
                    <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
                        {comment.Description}
                    </div>
				</div>
        </li>);
    }  else if ( comment.Username === cookie.load('userName')) {
        return (
       <li key={comment.ID} id="suggestionUnit">
				<div id={'suggestionContent'} className={comment.ID}>
                    <Link to={`/project/${comment.TypeID}/comment/${comment.ID}/subcomments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${comment.TypeID}/comment/${comment.ParentID}/subcomment/${comment.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${comment.TypeID}/comment/${comment.ParentID}/subcomment/${comment.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={`/project/${comment.TypeID}/comment/${comment.ID}/subcomments`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                            {this.state.debateNumber[comment.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverText"></div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(comment.PercentRank)}</span>
					    {comment.Username}
                    </div>
                    <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                        {comment.Description}
                    </div>
				</div>
        </li>);
    } else if (this.state.voteHash[comment.ID] === true) {
        return (
       <li key={comment.ID} id="suggestionUnit">
				<div id="suggestionContentHoverVote" className={comment.ID}>
                    <Link to={`/project/${comment.TypeID}/comment/${comment.ID}/subcomments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${comment.TypeID}/comment/${comment.ParentID}/subcomment/${comment.ID}/flag`}>
                        <div id="flagDiscussButton" onMouseOver={hoverFlagVoted} onMouseOut={unHoverFlagVoted}>
                            <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/${comment.TypeID}/comment/${comment.ID}/subcomments`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            {this.state.debateNumber[comment.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverTextShowVoted">
                    voted
                    </div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(comment.PercentRank)}</span>
                        {comment.Username}
                    </div>
                    <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
                        {comment.Description}
                    </div>
				</div>
        </li>);

    } else {
    return (
       <li key={comment.ID} id="suggestionUnit">
            <div id={'suggestionContent'} className={comment.ID}>
                <Link to={`/project/${comment.TypeID}/comment/${comment.ID}/subcomments`}>
                    <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                        <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <Link to={`/project/${comment.TypeID}/comment/${comment.ParentID}/subcomment/${comment.ID}/flag`}>
                    <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag}>
                        <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Flag Button, Red Flag" />
                    </div>
                </Link>
                <Link to={`/project/${comment.TypeID}/comment/${comment.ID}/subcomments`}>
                    <div id="numberDiscussButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                        {this.state.debateNumber[comment.ID]}
                    </div>
                </Link>
                <div id="discussHoverText"></div>
                <div id="discussHeader">
                    <span id="discussPercent">{floatToDecimal(comment.PercentRank)}</span>
                    {comment.Username}
                </div>
                <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                    {comment.Description}
                </div>
            </div>
        </li>);
}

function hoverThread() {
    $(document).ready(function() {
        $('div.'+comment.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("comments").fadeIn(7500);
    });
}
function unHoverThread() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',comment.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    });
}
function hoverVote() {
    $(document).ready(function() {
        $('div.'+comment.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverText').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("vote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');    
    });
}
function unHoverVote() {
    $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',comment.ID);
        $('div#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverText');
    });
}
function hoverFlag() {
    $(document).ready(function() {
        $('div.'+comment.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');              
    });
}
function unHoverFlag() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',comment.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverEdit() {
    $(document).ready(function() {
        $('div.'+comment.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEdit() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',comment.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    });
}
function hoverDelete() {
    $(document).ready(function() {      
        $('div.'+comment.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
    });
}
function unHoverDelete() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',comment.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverThreadVoted() {
    $(document).ready(function() {
        $('div.'+comment.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("comments").fadeIn(7500);
    });
}
function unHoverThreadVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',comment.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverVoteVoted() {
    $(document).ready(function() {
        $('div.'+comment.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverTextShowVoted').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowVoted'); 
        
    });
}
function unHoverVoteVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',comment.ID);
        $('div#discussHoverTextShowVoted').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverFlagVoted() {
    $(document).ready(function() {       
        $('div.'+comment.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');  
    });
}
function unHoverFlagVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',comment.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverEditVoted() {
    $(document).ready(function() {
        $('div.'+comment.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEditVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',comment.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverDeleteVoted() {
    $(document).ready(function() {
        $('div.'+comment.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
    });
}
function unHoverDeleteVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',comment.ID);
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

// export default class CommentUnit extends React.Component {

//     constructor(props){
//         super(props);

//          this.renderItem = this.renderItem.bind(this);
//         //  this.hoverThread = this.hoverThread.bind(this);
//         //  this.hoverVote = this.hoverVote.bind(this);
//         //  this.hoverFlag = this.hoverFlag.bind(this);
//         //  this.hoverEdit = this.hoverEdit.bind(this);
//         //  this.hoverDelete = this.hoverDelete.bind(this);
//         //  this.unHoverThread = this.unHoverThread.bind(this);
//         //  this.unHoverVote = this.unHoverVote.bind(this);
//         //  this.unHoverFlag = this.unHoverFlag.bind(this);
//         //  this.unHoverEdit = this.unHoverEdit.bind(this);
//         //  this.unHoverDelete = this.unHoverDelete.bind(this);
//         //  this.hoverThreadVoted = this.hoverThreadVoted.bind(this);
//         //  this.hoverVoteVoted = this.hoverVoteVoted.bind(this);
//         //  this.hoverFlagVoted = this.hoverFlagVoted.bind(this);
//         //  this.hoverEditVoted = this.hoverEditVoted.bind(this);
//         //  this.hoverDeleteVoted = this.hoverDeleteVoted.bind(this);
//         //  this.unHoverThreadVoted = this.unHoverThreadVoted.bind(this);
//         //  this.unHoverVoteVoted = this.unHoverVoteVoted.bind(this);
//         //  this.unHoverFlagVoted = this.unHoverFlagVoted.bind(this);
//         //  this.unHoverEditVoted = this.unHoverEditVoted.bind(this);
//         //  this.unHoverDeleteVoted = this.unHoverDeleteVoted.bind(this);
//     };
  



//     componentWillReceiveProps (props) {
//         var self = this
//         self.setState({
//             voteHash : {},
//         })
//         props.comments.forEach( function (comment){
//             // This has Type 6 here, may need to change
//             axios.get( Config.API + "/vote/isVotedOn?type=6&typeID=" + comment.ID + "&username=" + cookie.load("userName"))
//             .then( function (response) {  
//                 const voteHash = self.state.voteHash;

//                 voteHash[comment.ID] = response.data
//                 self.setState({
//                     voteHash,
//                 })
//             })  
//         })
//     }

// 	render() {
// 		return (
// 	    <div>
// 			<ul> {this.props.comments.map(this.renderItem)} </ul>    
// 	    </div>
// 		);
// 	}
// 	renderItem(comment) {

//        function  submitVote() {
//        axios.post( Config.API + '/auth/vote/create', {
//            Type: 6,
//            TypeID: comment.ID,
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
//           typeID: comment.ID,
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

  
//        if (this.state.voteHash[comment.ID] === true && comment.Username === cookie.load('userName')) {
//            return (
//        <li key={comment.ID} id="suggestionUnit">
// 				<div id="commentContentHoverVote">
//                     <Link to={`/project/${this.props.probID}/comment/${comment.ID}/subcomments`}>
//                         <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
//                             <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${this.props.probID}/comment/${comment.ID}/edit`}>
//                         <div id="editDiscussButton" onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted}>
//                             <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${this.props.probID}/comment/${comment.ID}/delete`}>
//                         <div id="deleteDiscussButton" onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted}>
//                             <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverText">comments</div>
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(comment.PercentRank)}</span>
//                         {comment.Username}
//                     </div>
//                     <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
//                         {comment.Description}
//                     </div>
// 				</div>
// 				{/*<Link  to={`/project/${comment.TypeID}/comment/${comment.ID}/comments`} activeClassName="activeBlue">
//                     <div id="commentSBButtonUser">
//                             <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
//                     </div>
//                 </Link> */}
//                 {/* <button type="button" id="suggestionVoted">
//                     Voted
//                 </button>             
//                 <br /><br />  */}
//         </li>);
//     }  else if ( comment.Username === cookie.load('userName')) {
//         return (
//        <li key={comment.ID} id="suggestionUnit">
// 				<div id="commentContent">
//                     <Link to={`/project/${this.props.probID}/comment/${comment.ID}/subcomments`}>
//                         <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
//                             <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${this.props.probID}/comment/${comment.ID}/edit`}>
//                         <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit}>
//                             <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${this.props.probID}/comment/${comment.ID}/delete`}>
//                         <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete}>
//                             <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverText">comments</div>
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(comment.PercentRank)}</span>
// 					    <span id="discussUsername">{comment.Username}</span> 
//                     </div>
//                     <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
//                         {comment.Description}
//                     </div>
// 				</div>
                
// 				{/*<Link  to={`/project/${comment.TypeID}/comment/${comment.ID}/comments`} activeClassName="activeBlue">
//                     <div id="commentSBButtonUser">
//                             <img src={require('../../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
//                     </div>
//                 </Link> */}
//                 {/* <button type="button" onClick={submitVote} id="suggestionVote">
//                     Vote
//                 </button>             
//                 <br /><br />  */}
//         </li>);
//     } else if (this.state.voteHash[comment.ID] === true) {
//         return (
//        <li key={comment.ID} id="suggestionUnit">
// 				<div id="commentContentHoverVote">
//                     <Link to={`/project/${this.props.probID}/comment/${comment.ID}/subcomments`}>
//                         <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
//                             <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${this.props.probID}/comment/${comment.ID}/flag`}>
//                         <div id="flagDiscussButton" onMouseOver={hoverFlagVoted} onMouseOut={unHoverFlagVoted}>
//                             <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverTextShowGreen">voted</div>
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(comment.PercentRank)}</span>
// 					    {comment.Username}
//                     </div>
//                     <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
//                         {comment.Description}
//                     </div>
// 				</div>
//         </li>);

//     } else {
//     return (
//        <li key={comment.ID} id="suggestionUnit">
// 				<div id="commentContent">
//                     <Link to={`/project/${this.props.probID}/comment/${comment.ID}/subcomments`}>
//                         <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
//                             <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/${this.props.probID}/comment/${comment.ID}/flag`}>
//                         <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag}>
//                             <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverText">comments</div>
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(comment.PercentRank)}</span>
// 					    {comment.Username}
//                     </div>
//                     <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
//                         {comment.Description}
//                     </div>
// 				</div>
//         </li>);
// }

// function hoverThread() {
//     $(document).ready(function() {
//         // $('#discussHoverText').html("view discussion").fadeIn(7500);
//         $('#commentContent').attr('id','commentContentHover');
//         $('#discussHoverText').attr('id','discussHoverTextShow');
//     });
//     // alert(comment.ID)
// }
// function unHoverThread() {
//     $(document).ready(function() {
//         // $('#discussHoverText').html("");
//         $('#commentContentHover').attr('id','commentContent');
//         $('#discussHoverTextShow').attr('id','discussHoverText');
//     });
// }
// function hoverVote() {
//     $(document).ready(function() {
//         // $('#discussHoverText').html("view discussion").fadeIn(7500);
//         // $('#suggestionVoteNoComments').attr('id','suggestionVoteNoCommentsHover');
//         $('#commentContent').attr('id','commentContentHoverVote');
//         $('#discussHoverText').attr('id','discussHoverTextGreen');
//         $('#discussHoverTextGreen').html("vote").fadeIn(7500);
//         $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');
//         $('#discussPercent').attr('id','discussPercentGreen');
        
//     });
// }
// function unHoverVote() {
//     $(document).ready(function() {
//         // $('#suggestionVoteNoCommentsHover').attr('id','suggestionVoteNoComments');  
//         $('#commentContentHoverVote').attr('id','commentContent');  
//         $('#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
//         $('#discussHoverTextGreen').html("comments").fadeIn(7500);
//         $('#discussHoverTextGreen').attr('id','discussHoverText');
//         $('#discussPercentGreen').attr('id','discussPercent');   
//     });
// }
// function hoverFlag() {
//     $(document).ready(function() {
//         // $('#commentContent').attr('id','commentContentHoverFlag');
//         $('#commentContent').attr('id','commentContentHoverFlag');
//         $('#discussHoverText').attr('id','discussHoverTextRed');
//         $('#discussHoverTextRed').html("flag").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');            
//     });
// }
// function unHoverFlag() {
//     $(document).ready(function() {
//         // $('#commentContentHoverFlag').attr('id','commentContent');  
//         $('#commentContentHoverFlag').attr('id','commentContent');  
//         $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('#discussHoverTextRed').html("comments").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverText');
//     });
// }
// function hoverEdit() {
//     $(document).ready(function() {
//         // $('#discussHoverText').html("view discussion").fadeIn(7500);
//         $('#commentContent').attr('id','commentContentHover');
//         $('#discussHoverText').html("edit").fadeIn(7500);
//         $('#discussHoverText').attr('id','discussHoverTextShow');
//     });
// }
// function unHoverEdit() {
//     $(document).ready(function() {
//         // $('#discussHoverText').html("");
//         $('#commentContentHover').attr('id','commentContent');
//         $('#discussHoverTextShow').attr('id','discussHoverText');
//         $('#discussHoverText').html("comments").fadeIn(7500);
//     });
// }
// function hoverDelete() {
//     $(document).ready(function() {
//         // $('#commentContent').attr('id','commentContentHoverFlag');
//         $('#commentContent').attr('id','commentContentHoverFlag');
//         $('#discussHoverText').attr('id','discussHoverTextRed');
//         $('#discussHoverTextRed').html("delete").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');            
//     });
// }
// function unHoverDelete() {
//     $(document).ready(function() {
//         // $('#commentContentHoverFlag').attr('id','commentContent');  
//         $('#commentContentHoverFlag').attr('id','commentContent');  
//         $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('#discussHoverTextRed').html("comments").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverText');
//     });
// }
// function hoverThreadVoted() {
//     $(document).ready(function() {
//         // $('#discussHoverText').html("view discussion").fadeIn(7500);
//         $('#commentContentHoverVote').attr('id','commentContentHover');
//         $('#discussHoverTextShowGreen').attr('id','discussHoverText');
//         $('#discussHoverText').html("comments").fadeIn(7500);
//         $('#discussHoverText').attr('id','discussHoverTextShow');
//     });
// }
// function unHoverThreadVoted() {
//     $(document).ready(function() {
//         // $('#discussHoverText').html("");
//         $('#commentContentHover').attr('id','commentContentHoverVote');
//         $('#discussHoverTextShow').attr('id','discussHoverTextShowGreen');
//         $('#discussHoverTextShowGreen').html("voted").fadeIn(7500);
//     });
// }
// function hoverVoteVoted() {
//     $(document).ready(function() {
//         // $('#discussHoverText').html("view discussion").fadeIn(7500);
//         // $('#suggestionVoteNoComments').attr('id','suggestionVoteNoCommentsHover');
//         $('#commentContentHoverVote').attr('id','commentContentHoverUnvote');
//         $('#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
//         $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
//         $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');
//         $('#discussPercent').attr('id','discussPercentGreen');
        
//     });
// }
// function unHoverVoteVoted() {
//     $(document).ready(function() {
//         // $('#suggestionVoteNoCommentsHover').attr('id','suggestionVoteNoComments');  
//         $('#commentContentHoverUnvote').attr('id','commentContentHoverVote');  
//         $('#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
//         $('#discussHoverTextGreen').html("voted").fadeIn(7500);
//         $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');
//         // $('#discussHoverTextGreen').attr('id','discussHoverText');
//         $('#discussPercentGreen').attr('id','discussPercent');   
//     });
// }
// function hoverFlagVoted() {
//     $(document).ready(function() {
//         // $('#commentContent').attr('id','commentContentHoverFlag');
//         $('#commentContentHoverVote').attr('id','commentContentHoverFlag');
//         $('#discussHoverText').attr('id','discussHoverTextRed');
//         $('#discussHoverTextRed').html("flag").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');            
//     });
// }
// function unHoverFlagVoted() {
//     $(document).ready(function() {
//         // $('#commentContentHoverFlag').attr('id','commentContent');  
//         $('#commentContentHoverFlag').attr('id','commentContentHoverVote');  
//         $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('#discussHoverTextRed').html("voted").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverText');
//     });
// }
// function hoverEditVoted() {
//     $(document).ready(function() {
//         // $('#discussHoverText').html("view discussion").fadeIn(7500);
//         $('#commentContentHoverVote').attr('id','commentContentHover');
//         $('#discussHoverText').html("edit").fadeIn(7500);
//         $('#discussHoverText').attr('id','discussHoverTextShow');
//     });
// }
// function unHoverEditVoted() {
//     $(document).ready(function() {
//         // $('#discussHoverText').html("");
//         $('#commentContentHover').attr('id','commentContentHoverVote');
//         $('#discussHoverTextShow').attr('id','discussHoverText');
//         $('#discussHoverText').html("voted").fadeIn(7500);
//         $('#discussHoverText').attr('id','discussHoverTextShowGreen');
//     });
// }
// function hoverDeleteVoted() {
//     $(document).ready(function() {
//         // $('#commentContent').attr('id','commentContentHoverFlag');
//         $('#commentContentHoverGreen').attr('id','commentContentHoverFlag');
//         $('#discussHoverTextShowGreen').attr('id','discussHoverTextRed');
//         $('#discussHoverTextRed').html("delete").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');            
//     });
// }
// function unHoverDeleteVoted() {
//     $(document).ready(function() {
//         // $('#commentContentHoverFlag').attr('id','commentContent');  
//         $('#commentContentHoverFlag').attr('id','commentContentHoverGreen');  
//         $('#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('#discussHoverTextRed').html("voted").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowGreen');
//     });

// }
// }
// }

// //convert float to Decimal
// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }