import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import CommentProposalUnit from '../../components/comments/CommentProposalUnit.jsx';
import CommentUnit from '../../components/comments/CommentUnit.jsx';
import SideBarMore from '../../components/SideBarMore.jsx';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class CommentConContainer extends React.Component {
   constructor(props){
        super(props);

        this.state = {
            debate: [],
            comments: [],
        }

        // this.submitVote = this.submitVote.bind(this)
    };
        componentDidMount(){
        var self = this;
        // Need to do & in URL query with parentType also
         axios.get( Config.API + '/comments/parentType?id='+this.props.params.conID+'&parentType=9').then(function (response) {
            self.setState({
                comments: response.data,
            })
        })  
        axios.get( Config.API + '/cons/ID?id='+this.props.params.conID).then(function (response) {
            self.setState({
                debate: response.data
            })
        }) 
    }
  componentWillReceiveProps(nextProps){
    var self = this;
        axios.get( Config.API + '/comments/parentType?id='+nextProps.params.conID+'&parentType=9').then(function (response) {
            self.setState({
                comments: response.data,
            })
        })  
        axios.get( Config.API + '/cons/ID?id='+nextProps.params.conID).then(function (response) {
            self.setState({
              debate: response.data
            })
          
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

 
   render() {

        return (
            <div id="prosConsContainer">
                <div id="answerQuestionHeader">
                    <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons/${this.props.params.conID}/container`}>
                        <div id="backSolutionArrowDiv">
                            <img src={require('../../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    </Link>
                    <div id="answerQuestionLabel">return to cons</div>
                </div>
                {/*Element being commented on*/}
                <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons/${this.props.params.conID}/container`}>
                    <div id="prosConsUnit">
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                <span id="discussPercent">
                                    {floatToDecimal(this.state.debate.PercentRank)}
                                </span>
                                {this.state.debate.Username}
                            </div>
                            <div id="suggestionText">
                                {this.state.debate.Description}
                            </div>
                        </div>
                    </div>
                </Link>
                {this.props.children}
                <CommentProposalUnit comments={this.state.comments} probID={this.props.params.probID} suggID={this.props.params.suggID} commentID={this.props.params.commentID} />
            </div>
        );
    }
  }
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
};