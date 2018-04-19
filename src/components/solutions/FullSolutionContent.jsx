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
            vote : true,
            probID : [],
            solutionID : []
        }

        this.submitVote = this.submitVote.bind(this)
        this.unVote = this.unVote.bind(this)
        this.deleteSolution = this.deleteSolution.bind(this)
    };

    //initialize the component with this state
    componentDidMount(){
      var self = this;
      self.setState({
          probID : this.props.params.probID,
          solutionID : this.props.params.solutionID
      })
      axios.get( Config.API + '/solutions/ID?id='+this.props.params.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,
              rank: response.data.Rank
          })
    })
    
    axios.get( Config.API + "/vote/isVotedOn?type=1&typeID=" + this.props.params.solutionID + "&username=" + cookie.load("userName"))
          .then( function (response){
            self.setState({
              vote: response.data
            })
      })     
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     // only render if solutionID has changed
    //     return this.state.solutionID !== nextProps.params.solutionID;
    // }
    componentWillReceiveProps(nextProps){
      var self = this;
        axios.get( Config.API + '/solutions/ID?id='+nextProps.params.solutionID).then(function (response) {
            self.setState({
                solutionInfo: response.data,
                solutionID: nextProps.params.solutionID,
                probID: nextProps.params.probID,
                rank: response.data.Rank
            })
          })
        axios.get( Config.API + "/vote/isVotedOn?type=1&typeID=" + nextProps.params.solutionID + "&username=" + cookie.load("userName"))
          .then( function (response){
            self.setState({
              vote: response.data
            })
      })     
    
     }

  deleteSolution() {
  
  //Delete question
   var self = this
    axios.delete( Config.API + '/auth/solutions/delete?id='+this.state.solutionID, {
        params: {
          id: this.props.params.solutionID,
          username: cookie.load('userName')
        }
      })
      .then(function (result) {
        document.location = '/project/'+ self.state.probID + '/solutions/top'
      })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });
  }
  submitVote() {
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
unVote() {
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
   render() {
       if (this.state.vote === true && this.state.solutionInfo.OriginalPosterUsername === cookie.load('userName')) {
           return (
      <div>
            <div id="ProposalPercentFullGreen">
                {this.state.solutionInfo.Rank}
            </div>
            <div id="voteVersionsMenu">
              <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                <div id="votedSolution" ref='solbtn' onClick={this.unVote}>Voted</div>
              </Link>
              <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/versions`}>
                  <div id="versionsButton">
                          versions
                  </div>
              </Link>
            </div>
              <div id="versionNumber">v.1</div>
              <div id="createDate">{dateTime(this.state.solutionInfo.CreatedAt)}</div>
              
              {/* <Link to={`/proposal/${this.props.params.probID}/${this.props.params.solutionID}/delete`}>
                <img src={require('../../assets/delete.svg')} id="deleteSolutionButton" width="20" height="20" alt="Edit Button" />              
              </Link> */}

              <Link to={`/proposal/${this.props.params.probID}/${this.props.params.solutionID}/edit`} activeClassName="activeProposalOption">
                <img src={require('../../assets/editBlue.svg')} id="editProposalButton" width="20" height="20" alt="Edit Button" />
              </Link>
              <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/versions/create`} activeClassName="activeProposalOption">
                <div id="newVersionButton">
                  new version
                </div>
              </Link>
              
              <div id="prosConsMenu">
                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/pros`} activeClassName="activeProsCons">
                    <div id="prosButton">pro</div>
                </Link>
                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons`} activeClassName="activeProsCons">
                    <div id="consButton">contra</div>
                </Link>
              </div>
              <div>
              {React.cloneElement(this.props.children, {creator:this.state.solutionInfo.OriginalPosterUsername, parentTitle: this.props.parentTitle} )}
              <FullSolutionDescription solutionInfo={ this.state.solutionInfo} solutionID={this.props.params.solutionID}/>
            </div>
        </div>
               );

  } else if(this.state.solutionInfo.OriginalPosterUsername === cookie.load('userName')) {
      return ( 
      <div>
            <div id="ProposalPercentFull">
                {this.state.solutionInfo.Rank}
            </div>
            <div id="voteVersionsMenu">
              <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                <div id="voteSolution" ref='solbtn' onClick={this.submitVote}>Vote</div>
              </Link>
              <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/versions`}>
                  <div id="versionsButton">
                          versions
                  </div>
              </Link>
            </div>
              <div id="versionNumber">v. 1</div>
              <div id="createDate">{dateTime(this.state.solutionInfo.CreatedAt)}</div>

              <Link to={`/proposal/${this.props.params.probID}/${this.props.params.solutionID}/edit`} activeClassName="activeProposalOption">
                <img src={require('../../assets/editBlue.svg')} id="editProjectButton" width="20" height="20" alt="Edit Button" />
              </Link>
              <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/versions/create`} activeClassName="activeProposalOption">
                <div id="newVersionButton">
                  new version
                </div>
              </Link>

              <div id="prosConsMenu">
                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/pros`} activeClassName="activeProsCons">
                    <div id="prosButton">pro</div>
                </Link>
                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons`} activeClassName="activeProsCons">
                    <div id="consButton">contra</div>
                </Link>
              </div>
              <div>
              {React.cloneElement(this.props.children, {creator:this.state.solutionInfo.OriginalPosterUsername, parentTitle: this.props.parentTitle} )}
              <FullSolutionDescription solutionInfo={ this.state.solutionInfo} solutionID={this.props.params.solutionID}/>         
              </div>
        </div>

      ); 
  } else if(this.state.vote === true) {
      return ( 
      <div>
            <div id="ProposalPercentFullGreen">
                {this.state.solutionInfo.Rank}
            </div>
            <div id="voteVersionsMenu">
                    <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                      <div id="votedSolution" ref='solbtn' onClick={this.unVote}>Voted</div>
                    </Link>
                    <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/versions`}>
                        <div id="versionsButton">
                                versions
                        </div>
                    </Link>
              </div>
              <div id="versionNumber">v. 1</div>
              <div id="createDate">{dateTime(this.state.solutionInfo.CreatedAt)}</div>
              
              {/*<Link to={`/proposal/${this.props.probID}/${this.props.solutionID}/flag`}>
                <img src={require('../../assets/flag.svg')} id="deleteSolutionButton" width="20" height="20" alt="Flag Button" />
              </Link>*/}


              <div id="prosConsMenu">
                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/pros`} activeClassName="activeProsCons">
                    <div id="prosButton">pro</div>
                </Link>
                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons`} activeClassName="activeProsCons">
                    <div id="consButton">contra</div>
                </Link>
              </div>
              <div>
              {React.cloneElement(this.props.children, {creator:this.state.solutionInfo.OriginalPosterUsername, parentTitle: this.props.parentTitle} )}
              <FullSolutionDescription solutionInfo={ this.state.solutionInfo} solutionID={this.props.params.solutionID}/>
            </div>
        </div>

      ); 
  } else {
    return (
      <div>
            <div id="ProposalPercentFull">
                {this.state.solutionInfo.Rank}
            </div>
            <div id="voteVersionsMenu">
              <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                <div id="voteSolution" ref='solbtn' onClick={this.submitVote}>Vote</div>
              </Link>
              <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/versions`}>
                  <div id="versionsButton">
                          versions
                  </div>
              </Link>
            </div>
              <div id="versionNumber">v. 1</div>
              <div id="createDate">{dateTime(this.state.solutionInfo.CreatedAt)}</div>
              
              {/*<Link to={`/proposal/${this.props.probID}/${this.props.solutionID}/flag`}>
                <img src={require('../../assets/flag.svg')} id="deleteSolutionButton" width="20" height="20" alt="Flag Button" />
              </Link>*/}


              <div id="prosConsMenu">
                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/pros`} activeClassName="activeProsCons">
                    <div id="prosButton">pro</div>
                </Link>
                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons`} activeClassName="activeProsCons">
                    <div id="consButton">contra</div>
                </Link>
              </div>
              <div>
            {/*<ProsContainer probID={this.state.probID} solutionID={this.state.solutionID} />*/}
            {/*<ConsContainer probID={this.state.probID} solutionID={this.state.solutionID} />*/}
              {React.cloneElement(this.props.children, {creator:this.state.solutionInfo.OriginalPosterUsername, parentTitle: this.props.parentTitle} )}
              <FullSolutionDescription solutionInfo={ this.state.solutionInfo} solutionID={this.props.params.solutionID}/>           
            </div>
        </div>
      );
   }}}

 
  function dateTime(str) {
     if(str != undefined){
        var result = str.substring(0,10);
        return result
     }
}
