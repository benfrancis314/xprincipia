import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class EditSolutionForm extends React.Component {

  constructor(props){
    super(props);

    this.state= {
      title: '',
      summary: '',
      description: '',
      references: '',
      solutionInfo: '',
    }

    this.updateSolution = this.updateSolution.bind(this);
  };
  componentWillMount(){
      var self = this;
      return axios.get( Config.API + '/auth/solutions/ID?id='+this.props.params.solutionID).then(function (response) {
          //if parent ID is 0 then the problem is at the root of the tree
          // return id as the parentID for routing purposes
          //set other data
          self.setState({
              solutionInfo: response.data
          })
          
          document.getElementById('solutionEditTitleForm').value = self.state.solutionInfo.Title;
          document.getElementById('solutionEditSummaryForm').value = self.state.solutionInfo.Summary;
          document.getElementById('solutionEditDescriptionForm').value = self.state.solutionInfo.Description;
          document.getElementById('solutionEditReferencesForm').value = self.state.solutionInfo.References;

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

    updateSolution() {
    //Read field items into component state
    this.state.title = document.getElementById('solutionEditTitleForm').value
    this.state.summary = document.getElementById('solutionEditSummaryForm').value
    this.state.description = document.getElementById('solutionEditDescriptionForm').value
    this.state.references = document.getElementById('solutionEditReferencesForm').value

  var self = this;
  axios.put( Config.API + '/auth/solutions/update?id='+this.props.params.solutionID, {
      username: cookie.load('userName'),
      title : self.state.title,
      summary : self.state.summary,
      description : self.state.description,
      references: self.state.references
    })
    .then(function (result) {
     document.location = '/project/private/' + self.props.params.probID + '/proposal/' + self.props.params.solutionID
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
        <div>
            <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
            </Link>
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
            <div id="createSolutionBox">
                <form id="solutionEditForm">                      
                  <label htmlFor="solutionTitle" id="proposalEditTitleFormLabel">Title<br />
                      <input type="text" name="solutionTitle" required="required" maxLength="140" id="solutionEditTitleForm" autoFocus/>
                  </label><br />

                  <label htmlFor="solutionSummary" id="editSummaryFormLabel">Summary<br />
                      <textarea name="solutionSummary" required="required" maxLength="400" placeholder="Summarize in 250 characters here." id="solutionEditSummaryForm"/>
                  </label><br />

                  <label htmlFor="solutionDescription" id="editDescriptionFormLabel">Description<br />
                      <textarea name="solutionDescription" required="required" placeholder="Describe in detail here." id="solutionEditDescriptionForm">
                      </textarea></label><br />

                  <label htmlFor="solutionReferences" id="editReferencesFormLabel">References<br />
                      <textarea name="solutionReferences" placeholder="Provide your references here." id="solutionEditReferencesForm">
                      </textarea></label><br />

                  <div onClick={this.updateSolution} id="editButton">Submit</div>

                  <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                    <div id="returnButton">Exit</div>
                  </Link>
                </form>
            </div>
            </ReactCSSTransitionGroup>
        </div>
      );
   }
}
