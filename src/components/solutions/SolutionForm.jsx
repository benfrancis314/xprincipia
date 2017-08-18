import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

configureAnchors({offset: 50, scrollDuration: 900});

export default class SolutionForm extends React.Component {

  constructor(props){
    super(props);

    this.state= {
      title: '',
      summary: '',
      description: '',
      references: ''
    }

    this.postSolution = this.postSolution.bind(this);
  };

  postSolution() {
    //Read field items into component state
    this.state.title = document.getElementById('solutionTitleForm').value
    this.state.summary = document.getElementById('solutionSummaryForm').value
    this.state.description = document.getElementById('solutionDescriptionForm').value
    this.state.references = document.getElementById('solutionReferencesForm').value

    var self = this
    axios.post( Config.API + '/auth/solutions/create', {
        username: cookie.load('userName'),
        problemID:this.props.probID,
        title : this.state.title,
        summary : this.state.summary,
        description : this.state.description,
        references: this.state.references
      })
      .then(function (result) {
        document.location = '/problem/' + self.props.probID + '/subproblems'
        window.location.hash = "problemSummary";

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
        {randomImg()}
        <div id="createSolutionBox">
                        <ScrollableAnchor id={'proposalForm'}>

            <div id="proposalFormCreateTitle">
                  New Proposal
                </div>
                            </ScrollableAnchor>

            <form id="createForm">
              <fieldset id="fieldSetSideBorder">
                <label htmlFor="solutionTitle" id="projectTitleProposalFormLabel">Project Title<br />
                  <h1 id="proposalCreateProjectTitle">{this.props.projectTitle}</h1>
                </label><br />

                <label htmlFor="solutionTitle" id="solutionTitleFormLabel">Proposal Title<br />
                    <input type="text" name="solutionTitle" required="required" maxLength="140" id="solutionTitleForm" />
                  </label><br />

                <label htmlFor="solutionSummary" id="solutionSummaryFormLabel">Summary<br />
                    <textarea name="solutionSummary" required="required" maxLength="400" placeholder="Please summarize your proposal here. (400 character max)" id="solutionSummaryForm"/>
                  </label><br />

                <label htmlFor="solutionDescription" id="solutionDescriptionFormLabel">Description<br />
                    <textarea name="solutionDescription" required="required" placeholder="Please describe your proposal here." id="solutionDescriptionForm">
                    </textarea></label><br />

                <label htmlFor="solutionReferences" id="solutionReferenceFormLabel">References <span id="gray">(Optional)</span><br />
                    <textarea name="solutionReferences" placeholder="Please provide any references here." id="solutionReferencesForm">
                    </textarea></label><br />
                  <input type="submit" value="Create" onClick={this.postSolution} id="submitSolution"/>
              </fieldset>
            </form>
        </div>
      </div>
      );
   }
}


function randomImg() {
if (Math.random() < 0.125) {
  return <img src={require('../../assets/orionLogo.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.25){
  return <img src={require('../../assets/heroLogo.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.375){
  return <img src={require('../../assets/dragonConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.5){
  return <img src={require('../../assets/hunterConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.625){
  return <img src={require('../../assets/queenConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.75){
  return <img src={require('../../assets/pegasusConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.875){
  return <img src={require('../../assets/archerConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
} else if (Math.random() < 0.1){
  return <img src={require('../../assets/greatBearConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
}
}