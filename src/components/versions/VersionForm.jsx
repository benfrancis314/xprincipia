import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class VersionForm extends React.Component {

  constructor(props){
    super(props);

    this.state= {
      title: '',
      summary: '',
      description: '',
      references: '',
      solutionInfo: '',
    }

    this.postSolutionVersion = this.postSolutionVersion.bind(this);
    this.showPDFVersion = this.showPDFVersion.bind(this);
    this.showProseVersion = this.showProseVersion.bind(this);
  };
  componentDidMount(){
      var self = this;
      return axios.get( Config.API + '/solutions/ID?id='+this.props.params.solutionID).then(function (response) {
          //if parent ID is 0 then the problem is at the root of the tree
          // return id as the parentID for routing purposes
          //set other data
          self.setState({
              solutionInfo: response.data
          })
          
          document.getElementById('versionTitleForm').value = self.state.solutionInfo.Title;
          document.getElementById('versionSummaryForm').value = self.state.solutionInfo.Summary;
          document.getElementById('versionDescriptionForm').value = self.state.solutionInfo.Description;
          document.getElementById('versionReferencesForm').value = self.state.solutionInfo.References;

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
  showPDFVersion() {
    $(document).ready(function() {
      $('#pdfProposalContainerVersion').attr('id','pdfProposalContainerShowVersion');    
      $('#proseProposalContainerShowVersion').attr('id','proseProposalContainerVersion');  
      $('#proposalFormButtonLeftVersion').attr('id','proposalFormButtonLeftActiveVersion');  
      $('#proposalFormButtonRightActiveVersion').attr('id','proposalFormButtonRightVersion');                          
    });
    this.setState({
      prose: '0',
    })
  }



  showProseVersion() {
    $(document).ready(function() {
      $('#pdfProposalContainerShowVersion').attr('id','pdfProposalContainerVersion');    
      $('#proseProposalContainerVersion').attr('id','proseProposalContainerShowVersion');
      $('#proposalFormButtonRightVersion').attr('id','proposalFormButtonRightActiveVersion');   
      $('#proposalFormButtonLeftActiveVersion').attr('id','proposalFormButtonLeftVersion');        
    });
    this.setState({
      prose: '1',
    })
  }

  postSolutionVersion() {
    //Read field items into component state
    this.state.title = document.getElementById('versionTitleForm').value
    this.state.summary = document.getElementById('versionSummaryForm').value
    this.state.description = document.getElementById('versionDescriptionForm').value
    this.state.references = document.getElementById('versionReferencesForm').value
    this.state.changes = document.getElementById('versionChangesForm').value

  axios.post( Config.API + '/auth/solutions/versions/create', {
      username: cookie.load('userName'),
      problemID:this.props.params.probID,
      title : this.state.title,
      summary : this.state.summary,
      description : this.state.description,
      references: this.state.references,
      evidence: this.state.changes,
      originalproposalID: this.props.params.solutionID,
    })
    .then(function (result) {
      // document.location = window.location.pathname 
      // alert('success version create')
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
      <div id="createSolutionBox">
        <div id="createVersionHeader">
          create v.2
        </div>
          {/* <form id="createVersionForm"> */}
              <label htmlFor="solutionDescription" id="versionChangesFormLabel">changes from v.1<br />
                  <textarea name="solutionDescription" required="required" placeholder='Describe your changes so others may follow the evolution of your idea.' id="versionChangesForm">
                  </textarea></label><br />
          {/* </form> */}
          <form id="createForm">
              <fieldset id="fieldSetSideBorder">
                <label htmlFor="solutionTitle" id="projectTitleProposalFormLabel">project title<br />
                  <h1 id="proposalCreateProjectTitle">{this.props.parentTitle}</h1>
                </label><br />

                <label htmlFor="solutionTitle" id="solutionTitleFormLabel">proposal title<br />
                    <input type="text" name="solutionTitle" required="required" maxLength="140" id="versionTitleForm" />
                  </label><br />


                  <div id="projectFormRadioContainer">
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow1">
                          proposal
                        </div>
                        <div id="projectFormRadioRow">
                          <label id="projectRadioButtonContainer">
                            <input type="radio" id="proposalClass0" name="projectType" value="0"/>
                            <span id="checkmark1"></span>
                          </label>
                        </div>
                      </div>
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow2">
                          plan
                        </div>
                        <div id="projectFormRadioRow">
                          <label id="projectRadioButtonContainer">
                            <input type="radio" id="proposalClass1" name="projectType" value="1" />
                            <span id="checkmark2"></span>
                          </label>
                        </div>
                      </div>
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow3">
                          solution
                        </div>
                        <div id="projectFormRadioRow">
                          <label id="projectRadioButtonContainer">
                            <input type="radio" id="proposalClass2" name="projectType" value="2" />
                            <span id="checkmark3"></span>
                          </label>
                        </div>
                      </div>
                    </div>


                <label htmlFor="solutionSummary" id="solutionSummaryFormLabel">summary<br />
                  <textarea name="solutionSummary" required="required" maxLength="500" placeholder="Please summarize your proposal here. (500 ch.)" id="versionSummaryForm"/>
                </label><br />

                <div id="solutionDescriptionFormLabel">
                  description
                </div>
                <div id="proposalFormButtonContainer">
                  <div id="proposalFormButtonLeftActive" onClick={this.showPDFVersion}>
                      pdf
                  </div>
                  <div id="proposalFormButtonRight" onClick={this.showProseVersion}>
                      prose
                  </div>
                </div>

                <div id="pdfProposalContainerShowVersion">
                    <input type="file" id="fileProposal" 
                    />
                </div>

              {/* <div onClick={this.testFileInput}>testHTML</div> */}

                <div id="proseProposalContainerVersion">
                  {/* <label htmlFor="solutionDescription" id="solutionDescriptionFormLabel">description<br /> */}
                    <textarea name="solutionDescription" required="required" placeholder="Please describe your proposal here." id="versionDescriptionForm">
                    </textarea>
                  {/* </label> */}
                </div>


                <br />
                <label htmlFor="solutionReferences" id="solutionReferenceFormLabel">sources <span id="gray">(optional)</span><br />
                    <textarea name="solutionReferences" placeholder="Please provide your sources here." id="versionReferencesForm">
                    </textarea></label><br />
                  {/* <Link to={`/project/${this.props.probID}/subprojects`}> */}
                  <Link to={window.location.pathname}>
                      <input type="button" ref='btn' value="Create" onClick={this.postSolutionVersion} id="submitSolution"/>
                  </Link>
              </fieldset>
            </form>
      </div>
      );
   }
}
