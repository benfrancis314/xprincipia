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
      dataString: '',
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
    var self = this
    self.refs.btn.setAttribute("disabled", "disabled");

    // FILE UPLOAD

    this.state.title = document.getElementById('solutionTitleForm').value
    this.state.summary = document.getElementById('solutionSummaryForm').value
    this.state.description = document.getElementById('solutionDescriptionForm').value

    if (document.getElementById('proposalClass2').checked) {
      this.state.class = '2' 
    } else if (document.getElementById('proposalClass1').checked) {
      this.state.class = '1' 
    } else {
      this.state.class = '0' 
    }

    if (this.state.prose == '1') {
    axios.post( Config.API + '/auth/solutions/create', {
        username: cookie.load('userName'),
        problemID:this.props.probID,
        title : this.state.title,
        summary : this.state.summary,
        description : this.state.description,
        class : this.state.class,
        private: this.state.private,
        parentTitle: this.props.projectTitle,
        key: '',
      })
      .then(function (result) {
        // document.location = '/project/' + self.props.probID + '/subprojects'
        document.getElementById("proposalSectionHeader").scrollIntoView();
        self.refs.btn.removeAttribute("disabled");
        // document.getElementById("createForm").reset();
      })
      .catch(function (error) {
        // alert('error')
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to create a project');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
            self.refs.btn.removeAttribute("disabled");
      });
    } else {
      console.log('start')
      // $('#pdfUploadLoaderHide').attr('id','pdfUploadLoaderShow');
      axios.post( Config.API + '/auth/solutions/create', {
        username: cookie.load('userName'),
        problemID:this.props.probID,
        title : this.state.title,
        summary : this.state.summary,
        description : this.state.description,
        class : this.state.class,
        private: this.state.private,
        // parentTitle: this.props.projectTitle,
        key: String(this.state.key),
        pdf: this.state.dataString,
        originalproposalID: this.props.params.solutionID,
      })
      .then(function (result) {
        // $('#pdfUploadLoaderShow').attr('id','pdfUploadLoaderHide');
        console.log('end')
        document.getElementById("proposalSectionHeader").scrollIntoView();
        self.refs.btn.removeAttribute("disabled");
        // document.getElementById("createForm").reset();
      })
      .catch(function (error) {
        console.log('error')
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to create a project');
                    })
                  );
                }  else if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
              }
          });
    self.refs.btn.removeAttribute("disabled");
      });
    }
  }

  onChange() {
    // GETS FILE
    var self = this;
    var files = document.getElementById('fileVersion').files;
    var file = files[0];
    this.state.file = file;
  
  
    // ATTEMPT AT CREATING GLOBAL VARIABLE
    var dataURL = '1'
  
    // JUST SETS UP FILEREADER
    var reader  = new FileReader();
  
    // EXTRACTS INFO AS BASE64
    if (file) {
      reader.readAsDataURL(file);
    }
  
    // RETURNS RESULTS AFTER LOAD
    reader.addEventListener("load", function () {
      dataURL = reader.result;
      self.setState({
          dataString: reader.result.replace("data:application/pdf;base64,", ""),
      })
    });
  }

  render() {
      return (
      <div id="createSolutionBox">
        <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
            <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />            
        </Link>
        <div id="createVersionHeader">
          new version
        </div>
        <label htmlFor="solutionDescription" id="versionChangesFormLabel">changes from v.{this.state.solutionInfo.Version}<br />
        <textarea name="solutionDescription" required="required" placeholder='Describe your changes so others may follow the evolution of your ideas.' id="versionChangesForm">
        </textarea></label><br />

        {/* Simulate proposal form */}
          <form id="createForm">
              <fieldset id="fieldSetSideBorderGray">
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
                            <input type="radio" id="proposalClass0"  name="projectType" value="0"/>
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
                  <textarea name="solutionSummary" required="required" maxLength="500" placeholder="Please summarize your proposal here. (500 ch)" id="versionSummaryForm"/>
                </label><br />

                <div id="solutionDescriptionFormLabel">
                  description
                </div>
                <div id="proposalFormButtonContainer">
                  <div id="proposalFormButtonLeftActive" onClick={this.showProse}>
                      prose
                  </div>
                  <div id="proposalFormButtonRight" onClick={this.showPDF}>
                      pdf
                  </div>
                </div>

                <div id="pdfProposalContainer">
                    <input type="file" id="fileVersion" onChange={this.onChange} />
                    <div id="pdfWarningsContainer">
                      <div id="pdfLoadWarning">
                        pdfs may take<span id="blueOpaque"> ~1-2 minutes </span>to upload
                      </div>
                      <div id="pdfSizeWarning">
                        if your pdf is <span id="blueOpaque">above 1mb</span>, <br />
                        please send your proposal information to:<br />
                        <span id="green"> info@xprincipia.com</span>
                      </div>
                    </div>
                </div>

              {/* <div onClick={this.testFileInput}>testHTML</div> */}

                <div id="proseProposalContainerVersion">
                  {/* <label htmlFor="solutionDescription" id="solutionDescriptionFormLabel">description<br /> */}
                    <textarea name="solutionDescription" required="required" placeholder="Please describe your proposal here." id="versionDescriptionForm">
                    </textarea>
                  {/* </label> */}
                </div>

                  <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/versions`}>
                      <input type="button" ref='btn' value="Create" onClick={this.postSolutionVersion} id="submitSolution"/>
                  </Link>
              </fieldset>
            </form>
      </div>
      );
   }
}
