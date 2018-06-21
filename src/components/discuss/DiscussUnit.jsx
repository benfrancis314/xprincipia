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
            responseNumber : [],
            linkPath: '',
            proposalPath: '',
            commentPath: '',
        }

         this.renderItem = this.renderItem.bind(this);
    };


    componentWillReceiveProps (nextProps) {
        var self = this
        if (window.location.pathname.includes('private')) {
            self.setState({
                linkPath: '/project/private/',
            })
        } else {
            self.setState({
                linkPath: '/project/',
            })
        }
        nextProps.questions.forEach( 
            function (question){
                axios.get( Config.API + "/vote/isVotedOn?type=5&typeID=" + question.ID + "&username=" + cookie.load("userName"))
                    .then( function (response) {  
                        const voteHash = self.state.voteHash;

                        voteHash[question.ID] = response.data
                    })  
                if(question.Type == '2') {
                    axios.get( Config.API + '/comments/bytype/answercom/number?problem_id='+question.ID)
                        .then(function (response) {
                            const responseNumber = self.state.responseNumber;
                            responseNumber[question.ID] = response.data
                        })   
                } else {
                    axios.get( Config.API + '/comments/bytype/proconcom/number?problem_id='+question.ID)
                        .then(function (response) {
                            const responseNumber = self.state.responseNumber;
                            responseNumber[question.ID] = response.data
                        }) 
                }
        })
    }

	render() {
		return (
	    <div>
			{this.props.questions.map(this.renderItem)}  
	    </div>
		);
	}
	renderItem(question) {
        if (question.Type == '2') {
            var commentType = 'Question'
        } else if (question.Type == '3') {
            var commentType = 'Suggestion'
        } else if (question.Type == '6') {
            var commentType = 'Debate'
        } else if (question.Type == '5') {
            var commentType = 'Comment'
        } else if (question.Type == '9') {
            var commentType = 'Pro'
        } else if (question.Type == '10') {
            var commentType = 'Con'
        } else if (question.Type == '4') {
        var commentType = 'Answer'
        }


        if (window.location.pathname.includes('proposal')) {
            var proposalPath = '/proposal/'+this.props.solutionID+'/'
        } else {
            var proposalPath = '/'
        }

        if (window.location.pathname.includes('comments')) {
            var commentPath = '/' + this.props.discussID+'/comments/'+question.ID
        } else {
            var commentPath ='/' + question.ID
        }


       function submitVote() {
        var self = this
        // self.refs.votebtn.setAttribute("disabled", "disabled");
       axios.post( Config.API + '/auth/vote/create', {
           Type: 5,
           TypeID: question.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            // document.location = window.location.pathname;
            // self.refs.votebtn.removeAttribute("disabled");
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
        //   self.refs.votebtn.removeAttribute("disabled");
      });
  }
      function unVote() {
        var self = this
        // self.refs.votebtn.setAttribute("disabled", "disabled");
      axios.delete( Config.API + '/auth/vote/delete' ,{
        params: {
          type: 5,
          typeID: question.ID,
          username: cookie.load('userName')
        }
        })
        .then(function (result) {
            // self.refs.votebtn.removeAttribute("disabled");
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
        //   self.refs.votebtn.removeAttribute("disabled");
      });
}

    if (question.Username === cookie.load('userName')) {
        var editID = 'editDiscussButton'
        var deleteID = 'deleteDiscussButton'
        var flagID = 'noDisplay'
    } else {
        var editID = 'noDisplay'
        var deleteID = 'noDisplay'
        var flagID = 'flagDiscussButton'
    }
    // if (question.Private === 1) {
    //     var voteSectionID = 'noDisplay'
    // } else {
    //     var voteSectionID = 'discussUnitButtonsContainer'
    // }
    return (
        <li key={question.ID} id="suggestionUnit">
            <div id={'suggestionContent'+commentType} className={question.ID}>
                <div id='discussUnitButtonsContainer' onMouseOver={hoverThread} onMouseOut={unHoverThread.bind(this)}>
                    <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss/'+question.ID+'/comments'}>
                        <div id="discussResponsesNumber">     
                            {this.state.responseNumber[question.ID]}
                        </div>
                        <div id="discussPercent">responses</div>
                    </Link>
                </div>
                <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss'+commentPath + '/edit'} activeClassName="activeDiscussEdit">
                    <div id={editID} onMouseOver={hoverEdit} onMouseOut={unHoverEdit.bind(this)}>
                        <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                    </div>
                </Link>
                <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss'+commentPath + '/delete'} activeClassName="activeDiscussDelete">
                    <div id={deleteID} onMouseOver={hoverDelete} onMouseOut={unHoverDelete.bind(this)}>
                        <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                    </div>
                </Link>
                <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss'+commentPath + '/flag'}  activeClassName="activeDiscussFlag">
                    <div id={flagID} onMouseOver={hoverFlag} onMouseOut={unHoverFlag.bind(this)}>
                        <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
                    </div>
                </Link>
                <div id="discussHoverText">
                </div>
                <div id={"discussHeader"+commentType}>
                    {commentType} <span id="gray">by {question.Username}</span>
                </div>
                {/* <Link to={this.state.linkPath+question.TypeID+`/discuss/${question.ID}/comments`}> */}
                
                <div id="suggestionText">
                    {question.Description}
                </div>
                <div id="discussUnitDateProse">{dateTime(question.CreatedAt)}</div>
            </div>
        </li>
    );
    // OLD, WITH VOTE
//        if (this.state.voteHash[question.ID] === true) {
//            return (
//             <li key={question.ID} id="suggestionUnit">
//                 <div id={'suggestionContentHoverVote'+commentType} className={question.ID}>
//                     <div id={voteSectionID}>
//                         <Link to={window.location.pathname}>
//                             <div id="discussVotedButton" onClick={unVote.bind(this)} onMouseOver={hoverVoteVoted} onMouseOut={unHoverVoteVoted.bind(this)}>     
//                             </div>
//                             <div id="discussPercent">{question.Rank}</div>
//                         </Link>
//                     </div>
//                     <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss'+commentPath + '/edit'} activeClassName="activeDiscussEdit">
//                         <div id={editID} onMouseOver={hoverEditVoted} onMouseOut={unHoverEditVoted.bind(this)}>
//                             <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
//                         </div>
//                     </Link>
//                     <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss'+commentPath + '/delete'} activeClassName="activeDiscussDelete">
//                         <div id={deleteID} onMouseOver={hoverDeleteVoted} onMouseOut={unHoverDeleteVoted.bind(this)}>
//                             <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
//                         </div>
//                     </Link>
//                     <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss'+commentPath + '/flag'} activeClassName="activeDiscussFlag">
//                         <div id={flagID} onMouseOver={hoverFlag} onMouseOut={unHoverFlag.bind(this)}>
//                             <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
//                         </div>
//                     </Link>
//                     <div id="discussHoverTextShowVoted">
//                         <span id="discussNumberValue">{this.state.responseNumber[question.ID]} </span>responses
//                     </div>
//                     <div id={"discussHeader"+commentType}>
//                         {commentType} <span id="gray">by {question.Username}</span>
//                     </div>
//                     <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss/'+question.ID+'/comments'}>
//                         <div id="suggestionText" onMouseOver={hoverThreadVoted} onMouseOut={unHoverThreadVoted.bind(this)}>
//                             {question.Description}
//                         </div>
//                     </Link>
//                     <div id="feedDateProse">{dateTime(question.CreatedAt)}</div>
//                 </div>
//             </li>
//         );
//     } else {
        // return (
        //     <li key={question.ID} id="suggestionUnit">
        //         <div id={'suggestionContent'+commentType} className={question.ID}>
        //             <div id={voteSectionID}>
        //                 <Link to={window.location.pathname}>
        //                     <div id="discussVoteButton" onClick={submitVote.bind(this)} onMouseOver={hoverVote} onMouseOut={unHoverVote.bind(this)}>     
        //                     </div>
        //                     <div id="discussPercent">{question.Rank}</div>
        //                 </Link>
        //             </div>
        //             <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss'+commentPath + '/edit'} activeClassName="activeDiscussEdit">
        //                 <div id={editID} onMouseOver={hoverEdit} onMouseOut={unHoverEdit.bind(this)}>
        //                     <img src={require('../../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
        //                 </div>
        //             </Link>
        //             <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss'+commentPath + '/delete'} activeClassName="activeDiscussDelete">
        //                 <div id={deleteID} onMouseOver={hoverDelete} onMouseOut={unHoverDelete.bind(this)}>
        //                     <img src={require('../../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
        //                 </div>
        //             </Link>
        //             <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss'+commentPath + '/flag'}  activeClassName="activeDiscussFlag">
        //                 <div id={flagID} onMouseOver={hoverFlag} onMouseOut={unHoverFlag.bind(this)}>
        //                     <img src={require('../../assets/flag.svg')} id="deleteLogo" width="24" height="24" alt="Delete Button, Red X" />
        //                 </div>
        //             </Link>
        //             <div id="discussHoverText">
        //                 <span id="discussNumberValue">{this.state.responseNumber[question.ID]} </span>responses
        //             </div>
        //             <div id={"discussHeader"+commentType}>
        //                 {commentType} <span id="gray">by {question.Username}</span>
        //             </div>
        //             {/* <Link to={this.state.linkPath+question.TypeID+`/discuss/${question.ID}/comments`}> */}
        //             <Link to={this.state.linkPath+question.TypeID+proposalPath+'discuss/'+question.ID+'/comments'}>
        //                 <div id="suggestionText" onMouseOver={hoverThread} onMouseOut={unHoverThread.bind(this)}>
        //                     {question.Description}
        //                 </div>
        //             </Link>
        //             <div id="discussUnitDateProse">{dateTime(question.CreatedAt)}</div>
        //         </div>
        //     </li>
//         );

// }

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
        // WITH VOTING
        // $('#discussHoverTextShow').html(this.state.responseNumber[question.ID]+" responses").fadeIn(7500);
        // WITHOUT VOTING
        $('#discussHoverTextShow').html("").fadeIn(7500);
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
        // WITH VOTING
        // $('#discussHoverTextShowGreen').html(this.state.responseNumber[question.ID]+" responses").fadeIn(7500);
        // WITHOUT VOTING
        $('#discussHoverTextShowGreen').html("").fadeIn(7500);
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
        // WITH VOTING
        // $('#discussHoverTextShowRed').html(this.state.responseNumber[question.ID]+" responses").fadeIn(7500);
        // WITHOUT VOTING
        $('#discussHoverTextShowRed').html("").fadeIn(7500);
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
        // WITH VOTING
        // $('#discussHoverTextShowBlue').html(this.state.responseNumber[question.ID]+" responses").fadeIn(7500);
        // WITHOUT VOTING
        $('#discussHoverTextShowBlue').html("").fadeIn(7500);
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
        // WITH VOTING
        // $('#discussHoverTextShowRed').html(this.state.responseNumber[question.ID]+" responses").fadeIn(7500);
        // WITHOUT VOTING
        $('#discussHoverTextShowRed').html("").fadeIn(7500);
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
        $('div#discussHoverTextShow').html(this.state.responseNumber[question.ID]+" responses").fadeIn(7500);
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
        $('div#discussHoverTextGreen').html(this.state.responseNumber[question.ID]+" responses").fadeIn(7500);
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
        $('div#discussHoverTextShowRed').html(this.state.responseNumber[question.ID]+" responses").fadeIn(7500);
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
        $('div#discussHoverTextShow').html(this.state.responseNumber[question.ID]+" responses").fadeIn(7500);
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
        $('div#discussHoverTextShowRed').html(this.state.responseNumber[question.ID]+" responses").fadeIn(7500);
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
