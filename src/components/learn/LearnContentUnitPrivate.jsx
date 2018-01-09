import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class LearnContentUnit1 extends React.Component {

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
        props.learnItems.forEach( function (learnItem){
            axios.get( Config.API + "/vote/isVotedOn?type=7&typeID=" + learnItem.ID + "&username=" + cookie.load("userName"))
            .then( function (response) {  
                const voteHash = self.state.voteHash;

                voteHash[learnItem.ID] = response.data
                self.setState({
                    voteHash,
                })
            })  
            axios.get( Config.API + '/comments/number?parent_id='+learnItem.ID + '&parent_type=7').then(function (response) {
                const debateNumber = self.state.debateNumber;
                
                debateNumber[learnItem.ID] = response.data
                self.setState({
                    debateNumber,
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
       function submitVote() {
       axios.post( Config.API + '/auth/vote/create', {
           Type: 7,
           TypeID: learnItem.ID,
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
				<div id="suggestionContentHoverVote" className={learnItem.ID}>
                    <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            {this.state.debateNumber[learnItem.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverTextShowVoted">voted</div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
                        {learnItem.Username}
                    </div>
                    <div id="learnLessonTitle" onClick={showDescription} onMouseOver={hoverView} onMouseOut={unHoverView}>
                        {learnItem.Title}
                    </div>
                    {/* On hover change to VIEW */}
                    <div id="learnLessonSummary" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
                        {learnItem.Summary}
                    </div>
                    <div id="suggestionTextHide" onClick={hideDescription}>
                        {learnItem.Description}
                        <div id="lessonCompleteButton" onClick={hideDescription}>
                            complete
                        </div>
                    </div>
				</div>
        </li>);
    }  else if ( learnItem.Username === cookie.load('userName')) {
        return (
       <li key={learnItem.ID} id="suggestionUnit">
				<div id={'suggestionContent'} className={learnItem.ID}>
                    <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/edit`}>
                        <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit}>
                            <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/delete`}>
                        <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete}>
                            <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            {this.state.debateNumber[learnItem.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverText"></div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
					    <span id="discussUsername">{learnItem.Username}</span> 
                    </div>
                    <div id="learnLessonTitle" onClick={showDescription} onMouseOver={hoverView} onMouseOut={unHoverView}>
                        {learnItem.Title}
                    </div>
                    {/* On hover change to VIEW */}
                    <div id="learnLessonSummary" onClick={unVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                        {learnItem.Summary}
                    </div>
                    <div id="suggestionTextHide" onClick={hideDescription}>
                        {learnItem.Description}
                            <div id="lessonCompleteButton" onClick={hideDescription}>
                            complete
                        </div>
                    </div>
				</div>
        </li>);
    } else if (this.state.voteHash[learnItem.ID] === true) {
        return (
       <li key={learnItem.ID} id="suggestionUnit">
				<div id="suggestionContentHoverVote" className={learnItem.ID}>
                    <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
                        <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/flag`}>
                        <div id="flagDiscussButton" onMouseOver={hoverFlagVoted} onMouseOut={unHoverFlagVoted}>
                            <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                        </div>
                    </Link>
                    <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
                        <div id="numberDiscussButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                            {this.state.debateNumber[learnItem.ID]}
                        </div>
                    </Link>
                    <div id="discussHoverTextShowVoted">voted</div>
					<div id="discussHeader">
                        <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
					    {learnItem.Username}
                    </div>
                    <div id="learnLessonTitle" onClick={showDescription} onMouseOver={hoverView} onMouseOut={unHoverView}>
                        {learnItem.Title}
                    </div>
                    {/* On hover change to VIEW */}
                    <div id="learnLessonSummary" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
                        {learnItem.Summary}
                    </div>
                    <div id="suggestionTextHide" onClick={hideDescription}>
                        {learnItem.Description}
                        <div id="lessonCompleteButton" onClick={hideDescription}>
                            complete
                        </div>
                    </div>
				</div>
        </li>);

    } else {
    return (
       <li key={learnItem.ID} id="suggestionUnit">
            {/* <div id="suggestionContent"> */}
            <div id={'suggestionContent'} className={learnItem.ID}>
                <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
                    <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
                        <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/flag`}>
                    <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag}>
                        <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
                    <div id="numberDiscussButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
                        {this.state.debateNumber[learnItem.ID]}
                    </div>
                </Link>
                <div id="discussHoverText"></div>
                <div id="discussHeader">
                    <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
                    {learnItem.Username}
                </div>
                <div id="learnLessonTitle" onClick={showDescription} onMouseOver={hoverView} onMouseOut={unHoverView}>
                    {learnItem.Title}
                </div>
                {/* On hover change to VIEW */}
                <div id="learnLessonSummary" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
                    {learnItem.Summary}
                </div>
                <div id="suggestionTextHide" onClick={hideDescription}>
                    {learnItem.Description}
                    <div id="lessonCompleteButton" onClick={hideDescription}>
                        complete
                    </div>
                </div>
            </div>
        </li>);
}
function showDescription() {
    $(document).ready(function() {
        $('div.'+learnItem.ID).attr('class','suggestionContentClassSelect');
        $('.suggestionContentClassSelect > #suggestionTextHide').attr('id','suggestionText');
        $('.suggestionContentClassSelect > #learnLessonTitle').attr('id','learnLessonTitleHover');
        $('.suggestionContentClassSelect > #learnLessonSummary').attr('id','learnLessonSummaryBlue');
        $('div.suggestionContentClassSelect').attr('class',learnItem.ID);
        // $('#discussHoverTextShow').html("comments").fadeIn(7500);
    });
}
function hideDescription() {
    $(document).ready(function() {
        $('div.'+learnItem.ID).attr('class','suggestionContentClassSelect');
        $('.suggestionContentClassSelect > #suggestionText').attr('id','suggestionTextHide');
        $('.suggestionContentClassSelect > #learnLessonTitleHover').attr('id','learnLessonTitle');
        $('.suggestionContentClassSelect > #learnLessonSummaryBlue').attr('id','learnLessonSummary');
        $('div.suggestionContentClassSelect').attr('class',learnItem.ID);
        // $('#discussHoverTextShow').html("comments").fadeIn(7500);
    });
}
function hoverView() {
    $(document).ready(function() {
        $('div.'+learnItem.ID).attr('class','suggestionContentClassSelect');
        $('.suggestionContentClassSelect > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("view").fadeIn(7500);
    });
}
function unHoverView() {
    $(document).ready(function() {
        $('div.suggestionContentClassSelect').attr('class',learnItem.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    });
}
function hoverThread() {
    $(document).ready(function() {
        $('div.'+learnItem.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("comments").fadeIn(7500);
    });
}
function unHoverThread() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',learnItem.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    });
}
function hoverVote() {
    $(document).ready(function() {
        $('div.'+learnItem.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverText').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("vote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');    
    });
}
function unHoverVote() {
    $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',learnItem.ID);
        $('div#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverText');
    });
}
function hoverFlag() {
    $(document).ready(function() {
        $('div.'+learnItem.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');              
    });
}
function unHoverFlag() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',learnItem.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverEdit() {
    $(document).ready(function() {
        $('div.'+learnItem.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEdit() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',learnItem.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverText');
    });
}
function hoverDelete() {
    $(document).ready(function() {      
        $('div.'+learnItem.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
    });
}
function unHoverDelete() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',learnItem.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverText');
    });
}
function hoverThreadVoted() {
    $(document).ready(function() {
        $('div.'+learnItem.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("comments").fadeIn(7500);
    });
}
function unHoverThreadVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',learnItem.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverVoteVoted() {
    $(document).ready(function() {
        $('div.'+learnItem.ID).attr('class','suggestionContentClassGreen');
        $('.suggestionContentClassGreen > #discussHoverTextShowVoted').attr('id','discussHoverTextGreen');    
        $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
        $('#discussHoverTextGreen').attr('id','discussHoverTextShowVoted'); 
        
    });
}
function unHoverVoteVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassGreen').attr('class',learnItem.ID);
        $('div#discussHoverTextShowVoted').attr('id','discussHoverTextGreen');
        $('div#discussHoverTextGreen').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverFlagVoted() {
    $(document).ready(function() {       
        $('div.'+learnItem.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("flag").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');  
    });
}
function unHoverFlagVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',learnItem.ID);
        $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
        $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverEditVoted() {
    $(document).ready(function() {
        $('div.'+learnItem.ID).attr('class','suggestionContentClassBlue');
        $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
        $('#discussHoverTextShow').html("edit").fadeIn(7500);
    });
}
function unHoverEditVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassBlue').attr('class',learnItem.ID);
        $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
        $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
    });
}
function hoverDeleteVoted() {
    $(document).ready(function() {
        $('div.'+learnItem.ID).attr('class','suggestionContentClassRed');
        $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
        $('#discussHoverTextRed').html("delete").fadeIn(7500);
        $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
    });
}
function unHoverDeleteVoted() {
    $(document).ready(function() {
        $('div.suggestionContentClassRed').attr('class',learnItem.ID);
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

// export default class LearnContentUnit1 extends React.Component {

//     constructor(props){
//         super(props);

//          this.renderItem = this.renderItem.bind(this);
//     };
  

//     componentDidMount() {
//         var self = this
//         self.setState({
//             voteHash : {},
//         })
//     }

//     componentWillReceiveProps (props) {
//         var self = this
//         self.setState({
//             voteHash : {},
//         })
//         props.learnItems.forEach( function (learnItem){
//             axios.get( Config.API + "/vote/isVotedOn?type=7&typeID=" + learnItem.ID + "&username=" + cookie.load("userName"))
//             .then( function (response) {  
//                 const voteHash = self.state.voteHash;

//                 voteHash[learnItem.ID] = response.data
//                 self.setState({
//                     voteHash,
//                 })
//             })  
//         })
//     }

// 	render() {
// 		return (
// 	    <div>
// 			<ul> {this.props.learnItems.map(this.renderItem)} </ul>    
// 	    </div>
// 		);
// 	}
// 	renderItem(learnItem) {

//        function  submitVote() {
//        axios.post( Config.API + '/auth/vote/create', {
//            Type: 6,
//            TypeID: learnItem.ID,
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
//           typeID: learnItem.ID,
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

  
//        if (this.state.voteHash[learnItem.ID] === true && learnItem.Username === cookie.load('userName')) {
//            return (
//        <li key={learnItem.ID} id="suggestionUnit">
// 				<div id="suggestionContentHoverVote" className={learnItem.ID}>
//                     <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
//                         <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
//                             <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/edit`}>
//                         <div id="editDiscussButton" onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted}>
//                             <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/delete`}>
//                         <div id="deleteDiscussButton" onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted}>
//                             <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverTextShowVoted">voted</div>
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
//                         {learnItem.Username}
//                     </div>
//                     <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
//                         {learnItem.Description}
//                     </div>
// 				</div>
//         </li>);
//     }  else if ( learnItem.Username === cookie.load('userName')) {
//         return (
//        <li key={learnItem.ID} id="suggestionUnit">
// 				<div id={'suggestionContent'} className={learnItem.ID}>
//                     <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
//                         <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
//                             <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/edit`}>
//                         <div id="editDiscussButton" onMouseOver={hoverEdit} onMouseOut={unHoverEdit}>
//                             <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/delete`}>
//                         <div id="deleteDiscussButton" onMouseOver={hoverDelete} onMouseOut={unHoverDelete}>
//                             <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverText"></div>
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
// 					    <span id="discussUsername">{learnItem.Username}</span> 
//                     </div>
//                     <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
//                         {learnItem.Description}
//                     </div>
// 				</div>
//         </li>);
//     } else if (this.state.voteHash[learnItem.ID] === true) {
//         return (
//        <li key={learnItem.ID} id="suggestionUnit">
// 				<div id="suggestionContentHoverVote" className={learnItem.ID}>
//                     <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
//                         <div id="debateThreadButton" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted}>
//                             <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/flag`}>
//                         <div id="flagDiscussButton" onMouseOver={hoverFlagVoted} onMouseOut={unHoverFlagVoted}>
//                             <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverTextShowVoted">voted</div>
// 					<div id="discussHeader">
//                         <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
// 					    {learnItem.Username}
//                     </div>
//                     <div id="suggestionText" onClick={unVote} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted}>
//                         {learnItem.Description}
//                     </div>
// 				</div>
//         </li>);

//     } else {
//     return (
//        <li key={learnItem.ID} id="suggestionUnit">
//             {/* <div id="suggestionContent"> */}
//             <div id={'suggestionContent'} className={learnItem.ID}>
//                 <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/comments`}>
//                     <div id="debateThreadButton" onMouseOver={hoverThread} onMouseOut={unHoverThread}>
//                         <img src={require('../../assets/list4.svg')} id="debateThreadLogo" width="50" height="50" alt="Delete Button, Red X" />
//                     </div>
//                 </Link>
//                 <Link to={`/project/private/${learnItem.TypeID}/notes/${learnItem.ID}/flag`}>
//                     <div id="flagDiscussButton" onMouseOver={hoverFlag} onMouseOut={unHoverFlag}>
//                         <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
//                     </div>
//                 </Link>
//                 <div id="discussHoverText"></div>
//                 <div id="discussHeader">
//                     <span id="discussPercent">{floatToDecimal(learnItem.PercentRank)}</span>
//                     {learnItem.Username}
//                 </div>
//                 <div id="suggestionText" onClick={submitVote} onMouseOver={hoverVote} onMouseOut={unHoverVote}>
//                     {learnItem.Description}
//                 </div>
//             </div>
//         </li>);
// }

// function hoverThread() {
//     $(document).ready(function() {
//         $('div.'+learnItem.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("comments").fadeIn(7500);
//     });
// }
// function unHoverThread() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',learnItem.ID);
//         $('div#discussHoverTextShow').attr('id','discussHoverText');
//     });
// }
// function hoverVote() {
//     $(document).ready(function() {
//         $('div.'+learnItem.ID).attr('class','suggestionContentClassGreen');
//         $('.suggestionContentClassGreen > #discussHoverText').attr('id','discussHoverTextGreen');    
//         $('#discussHoverTextGreen').html("vote").fadeIn(7500);
//         $('#discussHoverTextGreen').attr('id','discussHoverTextShowGreen');    
//     });
// }
// function unHoverVote() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassGreen').attr('class',learnItem.ID);
//         $('div#discussHoverTextShowGreen').attr('id','discussHoverTextGreen');
//         $('div#discussHoverTextGreen').attr('id','discussHoverText');
//     });
// }
// function hoverFlag() {
//     $(document).ready(function() {
//         $('div.'+learnItem.ID).attr('class','suggestionContentClassRed');
//         $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
//         $('#discussHoverTextRed').html("flag").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');              
//     });
// }
// function unHoverFlag() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',learnItem.ID);
//         $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('div#discussHoverTextRed').attr('id','discussHoverText');
//     });
// }
// function hoverEdit() {
//     $(document).ready(function() {
//         $('div.'+learnItem.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("edit").fadeIn(7500);
//     });
// }
// function unHoverEdit() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',learnItem.ID);
//         $('div#discussHoverTextShow').attr('id','discussHoverText');
//     });
// }
// function hoverDelete() {
//     $(document).ready(function() {  
//         $('div.'+learnItem.ID).attr('class','suggestionContentClassRed');
//         $('.suggestionContentClassRed > #discussHoverText').attr('id','discussHoverTextRed');    
//         $('#discussHoverTextRed').html("delete").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
//     });
// }
// function unHoverDelete() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',learnItem.ID);
//         $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('div#discussHoverTextRed').attr('id','discussHoverText');
//     });
// }
// function hoverThreadVoted() {
//     $(document).ready(function() {
//         $('div.'+learnItem.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("comments").fadeIn(7500);
//     });
// }
// function unHoverThreadVoted() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',learnItem.ID);
//         $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     });
// }
// function hoverVoteVoted() {
//     $(document).ready(function() {
//         $('div.'+learnItem.ID).attr('class','suggestionContentClassGreen');
//         $('.suggestionContentClassGreen > #discussHoverTextShowVoted').attr('id','discussHoverTextGreen');    
//         $('#discussHoverTextGreen').html("unvote").fadeIn(7500);
//         $('#discussHoverTextGreen').attr('id','discussHoverTextShowVoted'); 
        
//     });
// }
// function unHoverVoteVoted() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassGreen').attr('class',learnItem.ID);
//         $('div#discussHoverTextShowVoted').attr('id','discussHoverTextGreen');
//         $('div#discussHoverTextGreen').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     });
// }
// function hoverFlagVoted() {
//     $(document).ready(function() {       
//         $('div.'+learnItem.ID).attr('class','suggestionContentClassRed');
//         $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
//         $('#discussHoverTextRed').html("flag").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');  
//     });
// }
// function unHoverFlagVoted() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',learnItem.ID);
//         $('div#discussHoverTextShowRed').attr('id','discussHoverTextRed');
//         $('div#discussHoverTextRed').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     });
// }
// function hoverEditVoted() {
//     $(document).ready(function() {
//         $('div.'+learnItem.ID).attr('class','suggestionContentClassBlue');
//         $('.suggestionContentClassBlue > #discussHoverTextShowVoted').attr('id','discussHoverTextShow');
//         $('#discussHoverTextShow').html("edit").fadeIn(7500);
//     });
// }
// function unHoverEditVoted() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassBlue').attr('class',learnItem.ID);
//         $('div#discussHoverTextShow').attr('id','discussHoverTextShowVoted');
//         $('div#discussHoverTextShowVoted').html("voted").fadeIn(7500);
//     });
// }
// function hoverDeleteVoted() {
//     $(document).ready(function() {
//         $('div.'+learnItem.ID).attr('class','suggestionContentClassRed');
//         $('.suggestionContentClassRed > #discussHoverTextShowVoted').attr('id','discussHoverTextRed');    
//         $('#discussHoverTextRed').html("delete").fadeIn(7500);
//         $('#discussHoverTextRed').attr('id','discussHoverTextShowRed');
//     });
// }
// function unHoverDeleteVoted() {
//     $(document).ready(function() {
//         $('div.suggestionContentClassRed').attr('class',learnItem.ID);
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













