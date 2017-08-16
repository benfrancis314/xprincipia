import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import {Config} from '../../config.js';
import ConsContainer from '../../containers/ConsContainer.jsx';
import FullSolutionDescription from './FullSolutionDescription.jsx';
import ProsContainer from '../../containers/ProsContainer.jsx';
import $ from 'jquery';

export default class FullSolutionContent extends React.Component {
  constructor(props){
        super(props);

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

    getInitialState(){
        var self = this;
            self.setState({
                probID : this.props.params.probID,
                solutionID : this.props.params.solutionID
            })
    }

    //initialize the component with this state
    componentDidMount(){
      var self = this;
      axios.get( Config.API + '/auth/solutions/ID?id='+this.props.params.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,
              rank: response.data.Rank
          })
    })
    .catch(function (error) {
       
    });
    
    axios.get( Config.API + "/auth/vote/isVotedOn?type=1&typeID=" + this.props.params.solutionID + "&username=" + cookie.load("userName"))
          .then( function (response){
            console.log(response.data)
            self.setState({
              vote: response.data
            })
      })     
    }

// Not sure if this is needed
  // componentWillReceiveProps(nextProps){
	//   var self = this
	//   self.setState({
	// 	  solutionID: nextProps.params.solutionID,
	// 	  probID: nextProps.params.probID
	//   })
  // }

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
        document.location = '/problem/'+ self.state.probID + '/solutions/top'
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
       axios.post( Config.API + '/auth/vote/create', {
           Type: 1,
           TypeID: this.state.solutionInfo.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            document.location = window.location.pathname;
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
      });
  }
unVote() {
    var self = this
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
            document.location = window.location.pathname 
            // Scroll back to proposal
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
                <Link><div id="votedSolution" onClick={this.unVote}>Voted</div></Link>
                {/*<Link to={`/fullsolution/${this.props.params.probID}/${this.props.params.solutionID}/versions`}>
                    <div id="versionsButton">
                            Versions
                    </div>
                </Link>*/}
              </div>
              <div id="createDate">{dateTime(this.state.solutionInfo.CreatedAt)}</div>
              
              <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/edit`}>
                <img src={require('../../assets/editBlue.svg')} id="editSolutionButton" width="20" height="20" alt="Edit Button" />
              </Link>

              <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/delete`}>
                <img src={require('../../assets/delete.svg')} id="deleteSolutionButton" width="20" height="20" alt="Edit Button" />              
              </Link>

              <div id="prosConsMenu">
                <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/pros`} activeClassName="activeWhite">
                    <div id="prosButton">Pros</div>
                </Link>
                <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/cons`} activeClassName="activeWhite">
                    <div id="consButton">Cons</div>
                </Link>
              </div>
            
              <div>
            {this.props.children}
            <FullSolutionDescription solutionID={this.state.solutionID}/>
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
                <Link><div id="voteSolution" onClick={this.submitVote}>Vote</div></Link>
                {/*<Link to={`/fullsolution/${this.props.params.probID}/${this.props.params.solutionID}/versions`}>
                    <div id="versionsButton">
                            Versions
                    </div>
                </Link>*/}
              </div>
              <div id="createDate">{dateTime(this.state.solutionInfo.CreatedAt)}</div>
              
              <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/edit`}>
                <img src={require('../../assets/editBlue.svg')} id="editSolutionButton" width="20" height="20" alt="Edit Button" />
              </Link>

              <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/delete`}>
                <img src={require('../../assets/delete.svg')} id="deleteSolutionButton" width="20" height="20" alt="Edit Button" />              
              </Link>

              <div id="prosConsMenu">
                <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/pros`} activeClassName="activeWhiteBlueText">
                    <div id="prosButton">Pros</div>
                </Link>
                <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/cons`} activeClassName="activeWhiteBlueText">
                    <div id="consButton">Cons</div>
                </Link>
              </div>
            
              <div>
            {this.props.children}
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
                    <Link><div id="votedSolution" onClick={this.unVote}>Voted</div></Link>
                    {/*<Link to={`/fullsolution/${this.props.params.probID}/${this.props.params.solutionID}/versions`}>
                        <div id="versionsButton">
                                Versions
                        </div>
                    </Link>*/}
              </div>
              <div id="createDate">{dateTime(this.state.solutionInfo.CreatedAt)}</div>
              
              {/*<Link to={`/fullsolution/${this.props.probID}/${this.props.solutionID}/flag`}>
                <img src={require('../../assets/flag.svg')} id="deleteSolutionButton" width="20" height="20" alt="Flag Button" />
              </Link>*/}


              <div id="prosConsMenu">
                <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/pros`} activeClassName="activeWhite">
                    <div id="prosButton">Pros</div>
                </Link>
                <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/cons`} activeClassName="activeWhite">
                    <div id="consButton">Cons</div>
                </Link>
              </div>
            
              <div>
            {/*{React.cloneElement(<ProsContainer probID={this.state.probID} solutionID={this.state.solutionID} /> )}*/}
            {/*{React.cloneElement(<ConsContainer probID={this.state.probID} solutionID={this.state.solutionID} /> )}*/}
            {this.props.children}
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
                    <Link><div id="voteSolution" onClick={this.submitVote}>Vote</div></Link>
                    {/*<Link to={`/fullsolution/${this.props.params.probID}/${this.props.params.solutionID}/versions`}>
                        <div id="versionsButton">
                                Versions
                        </div>
                    </Link>*/}
              </div>
              <div id="createDate">{dateTime(this.state.solutionInfo.CreatedAt)}</div>
              
              {/*<Link to={`/fullsolution/${this.props.probID}/${this.props.solutionID}/flag`}>
                <img src={require('../../assets/flag.svg')} id="deleteSolutionButton" width="20" height="20" alt="Flag Button" />
              </Link>*/}


              <div id="prosConsMenu">
                <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/pros`} activeClassName="activeWhite">
                    <div id="prosButton">Pros</div>
                </Link>
                <Link to={`/fullsolution/${this.state.probID}/${this.state.solutionID}/cons`} activeClassName="activeWhite">
                    <div id="consButton">Cons</div>
                </Link>
              </div>
            
              <div>
            {/*{React.cloneElement(<ProsContainer probID={this.state.probID} solutionID={this.state.solutionID} /> )}*/}
            {/*{React.cloneElement(<ConsContainer probID={this.state.probID} solutionID={this.state.solutionID} /> )}*/}
            {this.props.children}
            </div>
        </div>
      );
   }}}

 
  function dateTime(str) {
     if(str != undefined){
        var result = str.substring(0,9);
        return result
     }
}