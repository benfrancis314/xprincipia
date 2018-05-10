import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import FullSolutionDescription from './FullSolutionDescription.jsx';
import $ from 'jquery';

export default class FullSolutionContent extends React.Component {
  constructor(){
        super();

        this.state = {
            solutionInfo: [],
            vote: false,
            voteID: '',
            voteNumberID: '',
            voteTitle: '',
            voteAction: '',
            probID : [],
            solutionID : [],
            editDeleteMenuID: '',
            editID: '',
            deleteID: '',
            newVersionID: '',
            linkPath: '',
        }

        this.vote = this.vote.bind(this)
    };

    //initialize the component with this state
    componentDidMount(){
      var self = this;
      if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
        })
      } else {
          self.setState({
              linkPath: '/project/',
          })
      }
      self.setState({
          probID : self.props.params.probID,
          solutionID : self.props.params.solutionID
      })
      axios.get( Config.API + '/solutions/ID?id='+self.props.params.solutionID).then(function (response) {
        if ((response.data.OriginalPosterUsername === cookie.load('userName')) && (response.data.Private == '1')) {
          self.setState({
            solutionInfo: response.data,
            solutionID: self.props.params.solutionID,
            probID: self.props.params.probID,
            rank: response.data.Rank,
            editID: 'editProjectButton',
            deleteID: 'deleteProjectButton',
            editDeleteMenuID: 'editDeleteMenuProposal',
            newVersionID: 'newVersionButton',
          })
        } else if (response.data.OriginalPosterUsername === cookie.load('userName')) {
            self.setState({
              solutionInfo: response.data,
              solutionID: self.props.params.solutionID,
              probID: self.props.params.probID,
              rank: response.data.Rank,
              editID: 'editProjectButton',
              deleteID: 'noDisplay',
              editDeleteMenuID: '',
              newVersionID: 'newVersionButton',
            })
        } else {
          self.setState({
            problemInfo: response.data,
            solutionInfo: response.data,
            solutionID: self.props.params.solutionID,
            probID: self.props.params.probID,
            rank: response.data.Rank,
            editID: 'noDisplay',
            deleteID: 'noDisplay',
            newVersionID: 'noDisplay',
          })
        }
    })
    
    axios.get( Config.API + "/vote/isVotedOn?type=1&typeID=" + this.props.params.solutionID + "&username=" + cookie.load("userName"))
          .then( function (response){
            if (response.data === true) {
              self.setState({
                voteID: 'votedProblem',
                voteNumberID: 'proposalPercentFullGreen',
                voteTitle: 'voted',
                voteAction: 'this.unVote',
                vote: true,
              }) 
            } else {
              self.setState({
                voteID: 'voteProblem',
                voteNumberID: 'proposalPercentFull',
                voteTitle: 'vote',
                voteAction: 'this.submitVote',
                vote: false,
              }) 
            }
      })     
      // if (window.location.pathname)
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     // only render if solutionID has changed
    //     return this.state.solutionID !== nextProps.params.solutionID;
    // }
    componentWillReceiveProps(nextProps){
      var self = this;
      if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
        })
      } else {
          self.setState({
              linkPath: '/project/',
          })
      }
        axios.get( Config.API + '/solutions/ID?id='+nextProps.params.solutionID).then(function (response) {
            if ((response.data.OriginalPosterUsername === cookie.load('userName')) && (response.data.Private == '1')) {
              self.setState({
                solutionInfo: response.data,
                solutionID: nextProps.params.solutionID,
                probID: nextProps.params.probID,
                rank: response.data.Rank,
                editID: 'editProjectButton',
                deleteID: 'deleteProjectButton',
                editDeleteMenuID: 'editDeleteMenuProposal',
                newVersionID: 'newVersionButton',
                
              })
            } else if (response.data.OriginalPosterUsername === cookie.load('userName')) {
                self.setState({
                  solutionInfo: response.data,
                  solutionID: nextProps.params.solutionID,
                  probID: nextProps.params.probID,
                  rank: response.data.Rank,
                  editID: 'editProjectButton',
                  deleteID: 'noDisplay',
                  editDeleteMenuID: '',
                  newVersionID: 'newVersionButton',
                })
            } else {
              self.setState({
                problemInfo: response.data,
                solutionInfo: response.data,
                solutionID: nextProps.params.solutionID,
                probID: nextProps.params.probID,
                rank: response.data.Rank,
                editID: 'noDisplay',
                deleteID: 'noDisplay',
                newVersionID: 'noDisplay',
              })
            }
          })
        axios.get( Config.API + "/vote/isVotedOn?type=1&typeID=" + nextProps.params.solutionID + "&username=" + cookie.load("userName"))
          .then( function (response){
            if (response.data === true) {
              self.setState({
                voteID: 'votedSolution',
                voteTitle: 'voted',
                voteAction: 'this.unVote',
                vote: true,
              }) 
            } else {
              self.setState({
                voteID: 'voteSolution',
                voteTitle: 'vote',
                voteAction: 'this.submitVote',
                vote: false,
              }) 
            }
      })     
    
     }

  vote() {
    if(this.state.vote === true ) {
      var self = this
      self.refs.solbtn.setAttribute("disabled", "disabled");
       axios.post( Config.API + '/auth/vote/create', {
           Type: 1,
           TypeID: this.state.solutionInfo.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            // document.location = window.location.pathname;
            self.refs.solbtn.removeAttribute("disabled");
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
          self.refs.solbtn.removeAttribute("disabled");
      });
  }
  else {
    var self = this
    self.refs.solbtn.setAttribute("disabled", "disabled");
      axios.delete( Config.API + '/auth/vote/delete' ,{
        params: {
          type: 1,
          typeID: this.state.solutionInfo.ID,
          username: cookie.load('userName')
        }
        })
        .then(function (result) {
            self.setState({
                vote: false

            })
            // document.location = window.location.pathname 
            self.refs.solbtn.removeAttribute("disabled");
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
          self.refs.solbtn.removeAttribute("disabled");
      });
    }
    }
   render() {
           return (
              <div>
                <div id={this.state.voteNumberID}>
                    {this.state.solutionInfo.Rank}
                </div>
                <div id="voteVersionsMenu">
                <Link to={this.state.linkPath+this.props.params.probID+'/proposal/'+this.props.params.solutionID}>
                    <div id={this.state.voteID} ref='solbtn' onClick={this.vote}>
                      {this.state.voteTitle}
                    </div>
                  </Link>
                  <Link to={this.state.linkPath+this.props.params.probID+'/proposal/'+this.props.params.solutionID+'/versions'}>
                      <div id="versionsButton">
                              versions
                      </div>
                  </Link>
                </div>
                  <div id="versionNumber">v.{this.state.solutionInfo.Version}</div>
                  <div id="createDate">{dateTime(this.state.solutionInfo.CreatedAt)}</div>
                  
                  {/* <Link to={`/proposal/${this.props.params.probID}/${this.props.params.solutionID}/delete`}>
                    <img src={require('../../assets/delete.svg')} id="deleteSolutionButton" width="20" height="20" alt="Edit Button" />              
                  </Link> */}
                  <div id={this.state.editDeleteMenuID}>
                    <Link to={this.state.linkPath+this.props.params.probID+'/proposal/'+this.props.params.solutionID+'/edit'} activeClassName="activeProposalOption">
                      <img src={require('../../assets/editBlue.svg')} id={this.state.editID} width="20" height="20" alt="Edit Button" />
                    </Link>
                    <Link to={this.state.linkPath+this.props.params.probID+'/proposal/'+this.props.params.solutionID+'/edit'} activeClassName="activeProposalOption">
                      <img src={require('../../assets/redX2.svg')} id={this.state.deleteID} width="20" height="20" alt="Edit Button" />
                    </Link>
                  </div>
                  <Link to={this.state.linkPath+this.props.params.probID+'/proposal/'+this.props.params.solutionID+'/versions/create'} activeClassName="activeProposalOption">
                    <div id={this.state.newVersionID}>
                      new version
                    </div>
                  </Link>
                  
                  <div id="proposalMenu">
                    <Link to={this.state.linkPath+this.props.params.probID+'/proposal/'+this.props.params.solutionID+'/discuss'} activeClassName="activeProsCons">
                        <div id="proposalDiscussButton">discuss</div>
                    </Link>
                    <Link to={this.state.linkPath+this.props.params.probID+'/proposal/'+this.props.params.solutionID+'/subprojects'} activeClassName="activeProposalOption">                    
                        <div id="proposalBreakdownButton">breakdown</div>
                    </Link>
                  </div>
                  <div>
                  {React.cloneElement(this.props.children, {creator:this.state.solutionInfo.OriginalPosterUsername, parentTitle: this.props.parentTitle} )}
                  <FullSolutionDescription solutionInfo={ this.state.solutionInfo} solutionID={this.props.params.solutionID}/>
                </div>
              </div>
               );
          }
}

 
  function dateTime(str) {
     if(str != undefined){
        var result = str.substring(0,10);
        return result
     }
}
