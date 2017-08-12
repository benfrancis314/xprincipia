import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import FullSolution from '../components/solutions/FullSolution.jsx';

export default class FullSolutionContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutionInfo: [],
            probID: []
        }

        this.submitVote = this.submitVote.bind(this)
    };

    getInitialState(){
      var self = this;
      return axios.get( Config.API + '/auth/solutions/ID?id='+this.props.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,
              probID: this.props.probID
          })
    })

    }

    //initialize the component with this state
    // componentDidMount(){
    //   var self = this;
    //   return axios.get( Config.API + '/auth/solutions/ID?id='+this.props.solutionID).then(function (response) {
    //       self.setState({
    //           solutionInfo: response.data,
    //       })
    // })
    // .catch(function (error) {
    //     if(error.response.status === 401 || error.response.status === 403){
    //         document.location = "/login"
    //     }
    // });   
    // }
componentWillReceiveProps (nextProps){
      var self = this;
      return axios.get( Config.API + '/auth/solutions/ID?id='+nextProps.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,
              probID: nextProps.probID
          })
    })
}

  submitVote() {
       axios.post( Config.API + '/auth/vote/create', {
           Type: 1,
           TypeID: this.state.solutionInfo.ID,
           username : cookie.load("userName"),
           
        })
        .then(function (result) {
            document.location = window.location.pathname;
            alert("Thank you, your vote has been recorded.");
        })
        .catch(function (error) {
            alert("I'm sorry, you've already voted on a solution.");
        })
  }

   render() {
      return (
        <div id="proposalToggleOff">
            {React.cloneElement(<FullSolution probID={this.state.probID} solutionID={this.props.solutionID} /> )}
        </div>
      );
   }
}


 
 