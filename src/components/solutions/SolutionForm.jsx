import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Link  } from 'react-router';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:48435c33-63c3-4825-a3de-0c06e01d2c90',
});


var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: 'xprincipiabucket'}
});

var params = {
  Bucket: "xprincipiabucket", 
  Key: "test key"
 };




export default class SolutionForm extends React.Component {
  
  constructor(props){
    
    super(props);

    this.state= {
      title: '',
      summary: '',
      description: '',
      references: '',
      class: '',
      parentTitle: '',
      file: '',
      key: '',
      prose: '',
    }

    this.postSolution = this.postSolution.bind(this);
    this.showPDF = this.showPDF.bind(this);
    this.showProse = this.showProse.bind(this);
    // this.testFileInput = this.testFileInput.bind(this);
  };


  componentDidMount(){
    var self = this;
    // S3 CALL HERE
    axios.get( Config.API + '/s3call/key').then(function (response) {
      self.setState({
          key: response.data,
          file: document.getElementById("fileProposal").value,
          prose: '0',
      })
  }) 
  }

  componentWillReceiveProps(nextState, nextProps){
    var self = this;
    // S3 CALL HERE      
    axios.get( Config.API + '/s3call/key').then(function (response) {
      self.setState({
        key: response.data,
        file: document.getElementById("fileProposal").value,
      })
    })
  }

  // testFileInput() {
  //   alert(document.getElementById("fileProposal").value);
  // }


  showPDF() {
    $(document).ready(function() {
      $('#pdfProposalContainer').attr('id','pdfProposalContainerShow');    
      $('#proseProposalContainerShow').attr('id','proseProposalContainer');  
      $('#proposalFormButtonLeft').attr('id','proposalFormButtonLeftActive');  
      $('#proposalFormButtonRightActive').attr('id','proposalFormButtonRight');                          
    });
    this.setState({
      prose: '0',
    })
  }



  showProse() {
    $(document).ready(function() {
      $('#pdfProposalContainerShow').attr('id','pdfProposalContainer');    
      $('#proseProposalContainer').attr('id','proseProposalContainerShow');
      $('#proposalFormButtonRight').attr('id','proposalFormButtonRightActive');   
      $('#proposalFormButtonLeftActive').attr('id','proposalFormButtonLeft');        
    });
    this.setState({
      prose: '1',
    })
  }

  postSolution() {
    //Read field items into component state
    var self = this
    self.refs.btn.setAttribute("disabled", "disabled");

    // FILE UPLOAD

    var files = document.getElementById('fileProposal').files;
    var file = files[0];
    this.state.file = file;

    this.state.title = document.getElementById('solutionTitleForm').value
    this.state.summary = document.getElementById('solutionSummaryForm').value
    this.state.description = document.getElementById('solutionDescriptionForm').value
    this.state.references = document.getElementById('solutionReferencesForm').value

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
        references: this.state.references,
        class : this.state.class,
        private: '0',
        parentTitle: this.props.projectTitle,
        key: '',
      })
      .then(function (result) {
        // document.location = '/project/' + self.props.probID + '/subprojects'
        document.getElementById("solutionsTitleRightSB").scrollIntoView();
        self.refs.btn.removeAttribute("disabled");
        // document.getElementById("createForm").reset();
      })
      .catch(function (error) {
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
      });
    } else {
      s3.upload({
        Key: String(this.state.key),
        Body: file,
        ACL: 'public-read'
      }, function(err, data) {
        if (err) {
          // alert('There was an error uploading your photo: ', err.message);
          console.log(err.message)
        } else {
          // alert('Successfully uploaded photo.');
        }
      });
      axios.post( Config.API + '/auth/solutions/create', {
        username: cookie.load('userName'),
        problemID:this.props.probID,
        title : this.state.title,
        summary : this.state.summary,
        description : this.state.description,
        references: this.state.references,
        class : this.state.class,
        private: '0',
        parentTitle: this.props.projectTitle,
        key: String(this.state.key),
      })
      .then(function (result) {
        // document.location = '/project/' + self.props.probID + '/subprojects'
        document.getElementById("solutionsTitleRightSB").scrollIntoView();
        self.refs.btn.removeAttribute("disabled");
        // document.getElementById("createForm").reset();
      })
      .catch(function (error) {
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
      });
    }
  }

  render() {

      return (
      <div>
        {/* xxx{this.state.key}xxx */}

        {randomImg()}
        <div id="createSolutionBox">
            <ScrollableAnchor id={'proposalForm'}>
              <div id="proposalFormCreateTitle">
                    new proposal
              </div>
            </ScrollableAnchor>

            <form id="createForm">
              <fieldset id="fieldSetSideBorder">
                <label htmlFor="solutionTitle" id="projectTitleProposalFormLabel">project title<br />
                  <h1 id="proposalCreateProjectTitle">{this.props.projectTitle}</h1>
                </label><br />

                <label htmlFor="solutionTitle" id="solutionTitleFormLabel">proposal title<br />
                    <input type="text" name="solutionTitle" required="required" maxLength="140" id="solutionTitleForm" />
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
                  <textarea name="solutionSummary" required="required" maxLength="500" placeholder="Please summarize your proposal here. (500 character max)" id="solutionSummaryForm"/>
                </label><br />

                <div id="solutionDescriptionFormLabel">
                  description
                </div>
                <div id="proposalFormButtonContainer">
                  <div id="proposalFormButtonLeftActive" onClick={this.showPDF}>
                      pdf
                  </div>
                  <div id="proposalFormButtonRight" onClick={this.showProse}>
                      prose
                  </div>
                </div>

                <div id="pdfProposalContainerShow">
                    <input type="file" id="fileProposal" 
                    />
                </div>

              {/* <div onClick={this.testFileInput}>testHTML</div> */}

                <div id="proseProposalContainer">
                  {/* <label htmlFor="solutionDescription" id="solutionDescriptionFormLabel">description<br /> */}
                    <textarea name="solutionDescription" required="required" placeholder="Please describe your proposal here." id="solutionDescriptionForm">
                    </textarea>
                  {/* </label> */}
                </div>


                <br />
                <label htmlFor="solutionReferences" id="solutionReferenceFormLabel">sources <span id="gray">(optional)</span><br />
                    <textarea name="solutionReferences" placeholder="Please provide your sources here." id="solutionReferencesForm">
                    </textarea></label><br />
                  <Link to={`/project/${this.props.probID}/subprojects`}>
                      <input type="button" ref='btn' value="Create" onClick={this.postSolution} id="submitSolution"/>
                  </Link>
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