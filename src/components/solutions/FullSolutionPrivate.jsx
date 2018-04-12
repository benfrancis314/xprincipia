import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';


export default class FullSolution extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutionInfo: [],
            solutionID: [],
            probID: []
        }
        this.voteUp = this.voteUp.bind(this)
        this.voteDown  = this.voteDown.bind(this)
        this.changeRankOn = this.changeRankOn.bind(this)
        this.changeRankOff = this.changeRankOff.bind(this)
    };

    //initialize the component with this state
    componentDidMount(){
        ReactDOM.findDOMNode(this).scrollIntoView();
        var self = this;
        return axios.get( Config.API + '/solutions/ID?id='+this.props.params.solutionID).then(function (response) {
            self.setState({
                solutionInfo: response.data,
            })
            var solutionInfo = self.state.solutionInfo
            // solutionInfo.CreatedAt = dateTime(solutionInfo.CreatedAt)
            self.setState({
                solutionInfo : solutionInfo
            })

        })
    }

  shouldComponentUpdate(nextProps, nextState) {
      // only render if solutionID has changed
      return this.state.solutoinID !== nextProps.params.solutionID;
  }
  //On recieving next props
  componentWillReceiveProps(nextProps){
    var self = this;
	    return axios.get( Config.API + '/solutions/ID?id='+nextProps.params.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,
              solutionID: nextProps.params.solutionID,
		          probID: nextProps.params.probID
          })
        })
  }

componentDidUpdate() {
        // ReactDOM.findDOMNode(this).scrollIntoView();
  }   

  voteUp() {
    var self = this
    self.refs.solbtn1.setAttribute("disabled", "disabled");
    axios.get( Config.API + '/vote/privateUp?id='+this.props.params.solutionID+'&type=1').then(function (response) {
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
        self.refs.solbtn1.removeAttribute("disabled");
    });
}

voteDown() {
    var self = this;
    self.refs.solbtn2.setAttribute("disabled", "disabled");
    axios.get( Config.API + '/vote/privateDown?id='+this.props.params.solutionID+'&type=1').then(function (response) {
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
        self.refs.solbtn2.removeAttribute("disabled");
    });
      
  }
  changeRankOn() {
    $(document).ready(function() {
          $('#privateProposalRank').attr('id','privateProposalRankActive');               
      });
  }
  changeRankOff() {
    $(document).ready(function() {
          $('#privateProposalRankActive').attr('id','privateProposalRank');              
      });
  }



   render() {
    //    No longer used but would like to use this in the future.
    //    Problem is it toggles the solution units in order from first to last, not the one selected
        // function toggleProposal() {
        //     $(document).ready(function() {
        //         $('#proposalToggleOn').attr('id','proposalToggleOff');
        //         $('#solutionUnitActive').attr('id','solutionUnit');			
        //     });
        // };
        
    if (this.state.solutionInfo.Class == '2') {
      return (
        <div id='fullSolutionContainer'>
            <div id="fullSolution">
                <div id="solutionIntro">
                    <Link to={`/project/private/${this.props.params.probID}/subprojects`}>
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
                    </Link>
                    <div id="solutionTitleLabelRed">
                        solution
                    </div>
                    <h1 id="solutionTitleRed">{this.state.solutionInfo.Title}</h1>
                    
                    <div id="voteSolutionContainer">
                        <Link to={window.document.location}>
                            <div id="voteSolutionUp" ref='solbtn1' onClick={this.voteUp}  onMouseDown={this.changeRankOn} onMouseUp={this.changeRankOff}>
                            </div>
                        </Link>
                        <div id="privateProposalRank">
                            rank {this.state.solutionInfo.Rank}
                        </div>  
                        <Link to={window.document.location}>
                            <div id="voteSolutionDown" ref='solbtn2' onClick={this.voteDown}  onMouseDown={this.changeRankOn} onMouseUp={this.changeRankOff}>
                            </div>
                        </Link>
                    </div>
                                      
                    {/*Commented out until functional*/}
                    {/*<div id="currentVersion">v.112</div>*/}
                    {/* <div id="voteSolutionGreenContainer"> */}
                    <p id="solutionSummary">
                        {this.state.solutionInfo.Summary}
                    </p>
                    {/* </div> */}
                </div>
                {React.cloneElement(this.props.children, {solutionInfo: this.state.solutionInfo})}
            </div>
            {randomImg()}
        </div>
      );
   } else if (this.state.solutionInfo.Class == '1') {
    return (
        <div id='fullSolutionContainer'>
            <div id="fullSolution">
                <div id="solutionIntro">
                    <Link to={`/project/private/${this.props.params.probID}/subprojects`}>
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
                    </Link>
                    <div id="solutionTitleLabelGreen">
                        plan
                    </div>
                    <h1 id="solutionTitleGreen">{this.state.solutionInfo.Title}</h1>
                    <div id="voteSolutionContainer">
                        <Link to={window.document.location}>
                            <div id="voteSolutionUp" ref='solbtn1' onClick={this.voteUp}  onMouseDown={this.changeRankOn} onMouseUp={this.changeRankOff}>
                            </div>
                        </Link>
                        <div id="privateProposalRank">
                            rank {this.state.solutionInfo.Rank}
                        </div>  
                        <Link to={window.document.location}>
                            <div id="voteSolutionDown" ref='solbtn2' onClick={this.voteDown}  onMouseDown={this.changeRankOn} onMouseUp={this.changeRankOff}>
                            </div>
                        </Link>
                    </div>                   
                    {/*Commented out until functional*/}
                    {/*<div id="currentVersion">v.112</div>*/}
                    <p id="solutionSummary">
                    {this.state.solutionInfo.Summary}
                    </p>
                </div>
                {React.cloneElement(this.props.children, {solutionInfo: this.state.solutionInfo})}
            </div>
            {randomImg()}
        </div>
      );
   } else {
    return (
        <div id='fullSolutionContainer'>
            <div id="fullSolution">
                <div id="solutionIntro">
                    <Link to={`/project/private/${this.props.params.probID}/subprojects`}>
                        <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
                    </Link>
                    <h1 id="solutionTitle">{this.state.solutionInfo.Title}</h1>
                    <div id="voteSolutionContainer">
                        <Link to={window.document.location}>
                            <div id="voteSolutionUp" ref='solbtn1' onClick={this.voteUp}  onMouseDown={this.changeRankOn} onMouseUp={this.changeRankOff}>
                            </div>
                        </Link>
                        <div id="privateProposalRank">
                            rank {this.state.solutionInfo.Rank}
                        </div>  
                        <Link to={window.document.location}>
                            <div id="voteSolutionDown" ref='solbtn2' onClick={this.voteDown}  onMouseDown={this.changeRankOn} onMouseUp={this.changeRankOff}>
                            </div>
                        </Link>
                    </div>                    
                    {/*Commented out until functional*/}
                    {/*<div id="currentVersion">v.112</div>*/}
                    <p id="solutionSummary">
                    {this.state.solutionInfo.Summary}x
                    </p>
                </div>
                {React.cloneElement(this.props.children, {solutionInfo: this.state.solutionInfo})}
            </div>
            {randomImg()}
        </div>
      );
   }
}
}

function randomImg() {
    if (Math.random() < 0.125) {
      return <img src={require('../../assets/orionLogo.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.25){
      return <img src={require('../../assets/heroLogo.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.375){
      return <img src={require('../../assets/dragonConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.5){
      return <img src={require('../../assets/hunterConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.625){
      return <img src={require('../../assets/queenConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.75){
      return <img src={require('../../assets/pegasusConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 0.875){
      return <img src={require('../../assets/archerConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    } else if (Math.random() < 1){
      return <img src={require('../../assets/greatBearConstellation.svg')} id="middleAlignOrionLess" width='70' height='100' alt="Back arrow, blue up arrow" />
    }
}
