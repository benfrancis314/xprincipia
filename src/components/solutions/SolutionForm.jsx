import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Link  } from 'react-router';



export default class SolutionForm extends React.Component {
  
  constructor(props){
    
    super(props);

    this.state= {
      title: '',
      summary: '',
      description: '',
      class: '',
      parentTitle: '',
      file: '',
      pdf: '',
      linkPath: '',
      private: '',
      dataString: '',
    }

    this.postSolution = this.postSolution.bind(this);
    this.showPDF = this.showPDF.bind(this);
    this.showProse = this.showProse.bind(this);
    this.checkLoginProposal = this.checkLoginProposal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showDataURL = this.showDataURL.bind(this);
    this.radioChangeProposal = this.radioChangeProposal.bind(this);
    this.radioChangePlan = this.radioChangePlan.bind(this);
    this.radioChangeSolution = this.radioChangeSolution.bind(this);
  };


  componentDidMount(){
    var self = this;
    if (window.location.pathname.includes('private')) {
			self.setState({
        linkPath: '/project/private/',
        private: '1',
			})
		} else {
			self.setState({
        linkPath: '/project/',
        private: '0',
			})
    }
  }

  componentWillReceiveProps(nextState, nextProps){
    var self = this;
    if (window.location.pathname.includes('private')) {
			self.setState({
        linkPath: '/project/private/',
        private: '1',
			})
		} else {
			self.setState({
        linkPath: '/project/',
        private: '0',
			})
		}
    // S3 CALL HERE      
  }

  showPDF() {
    $(document).ready(function() {
      $('#pdfProposalContainer').attr('id','pdfProposalContainerShow');    
      $('#proseProposalContainerShow').attr('id','proseProposalContainer');  
      $('#proposalFormButtonRight').attr('id','proposalFormButtonRightActive');   
      $('#proposalFormButtonLeftActive').attr('id','proposalFormButtonLeft');  
    });
    this.setState({
      pdf: '1',
    })
  }



  showProse() {
    $(document).ready(function() {
      $('#pdfProposalContainerShow').attr('id','pdfProposalContainer');    
      $('#proseProposalContainer').attr('id','proseProposalContainerShow');
      $('#proposalFormButtonLeft').attr('id','proposalFormButtonLeftActive');  
      $('#proposalFormButtonRightActive').attr('id','proposalFormButtonRight');       
    });
    this.setState({
      pdf: '0',
    })
  }

  checkLoginProposal() {
    if (cookie.load('userName')) {
      this.postSolution()
    } else {
      $(document).ready(function() {
        $('#notification').attr('id','notificationShow').hide().slideDown();
        $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
        $('#notificationContent').html('please <span id="blue">login </span>to join this discussion');
      });
    }
  }

  postSolution() {
    //Read field items into component state
    var self = this
    self.refs.proposalbtn.setAttribute("disabled", "disabled");

    // FILE UPLOAD

    this.state.title = document.getElementById('solutionTitleForm').value
    this.state.summary = document.getElementById('solutionSummaryForm').value
    this.state.description = document.getElementById('solutionDescriptionForm').value

    if (document.getElementById('checkmark3ProposalActive')) {
      this.state.class = '2' 
    } else if (document.getElementById('checkmark2ProposalActive')) {
      this.state.class = '1' 
    } else {
      this.state.class = '0' 
    }

    if (this.state.pdf == '1') {
      console.log(this.state.dataString)
    // $('#pdfUploadLoaderHide').attr('id','pdfUploadLoaderShow');
    axios.post( Config.API + '/auth/solutions/create', {
      username: cookie.load('userName'),
      problemID:this.props.probID,
      title : this.state.title,
      summary : this.state.summary,
      // description : this.state.description,
      class : this.state.class,
      private: this.state.private,
      parentTitle: this.props.parentTitle,
      pdf: this.state.dataString,
    })
    .then(function (result) {
      // $('#pdfUploadLoaderShow').attr('id','pdfUploadLoaderHide');
      // document.getElementById("proposalSectionHeader").scrollIntoView();
      self.refs.proposalbtn.removeAttribute("disabled");
      $(document).ready(function() {
        $('#solutionFormContainerShow').attr('id','solutionFormContainerHide');
        $('#proposalsPromptContainerHide').attr('id','proposalsPromptContainerShow');
      });
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
  self.refs.proposalbtn.removeAttribute("disabled");
    });


    } else {
      axios.post( Config.API + '/auth/solutions/create', {
        username: cookie.load('userName'),
        problemID:this.props.probID,
        title : this.state.title,
        summary : this.state.summary,
        description : this.state.description,
        class : this.state.class,
        private: this.state.private,
        parentTitle: this.props.parentTitle,
      })
      .then(function (result) {
        self.refs.proposalbtn.removeAttribute("disabled");
        $(document).ready(function() {
          $('#solutionFormContainerShow').attr('id','solutionFormContainerHide');
          $('#proposalsPromptContainerHide').attr('id','proposalsPromptContainerShow');
        });
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
            self.refs.proposalbtn.removeAttribute("disabled");
      });
    }
}


onChange() {
  // GETS FILE
  var self = this;
  var files = document.getElementById('fileProposal').files;
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

showDataURL() {
  console.log(this.state.dataString)
}

radioChangeProposal() {
  $('#checkmark1Proposal').attr('id','checkmark1ProposalActive');
  $('#checkmark2ProposalActive').attr('id','checkmark2Proposal');
  $('#checkmark3ProposalActive').attr('id','checkmark3Proposal');
}
radioChangePlan() {
  $('#checkmark1ProposalActive').attr('id','checkmark1Proposal');
  $('#checkmark2Proposal').attr('id','checkmark2ProposalActive');
  $('#checkmark3ProposalActive').attr('id','checkmark3Proposal');
}
radioChangeSolution() {
  $('#checkmark1ProposalActive').attr('id','checkmark1Proposal');
  $('#checkmark2ProposalActive').attr('id','checkmark2Proposal');
  $('#checkmark3Proposal').attr('id','checkmark3ProposalActive');
}







  // alert(this.state.dataURL)

  // FOR REPLACING
  // var res = str.replace("data:application/pdf;base64,", "");



// }

  render() {

    // var x = document.getElementById("myFile");
    // var txt = "";
    // if ('files' in x) {
    //     if (x.files.length == 0) {
    //         txt = "Select one or more files.";
    //     } else {
    //         for (var i = 0; i < x.files.length; i++) {
    //             txt += "<br><strong>" + (i+1) + ". file</strong><br>";
    //             var file = x.files[i];
    //             if ('name' in file) {
    //                 txt += "name: " + file.name + "<br>";
    //             }
    //             if ('size' in file) {
    //                 txt += "size: " + file.size + " bytes <br>";
    //             }
    //         }
    //     }
    // } 
    // document.getElementById ("demo").innerHTML = txt;



      return (
      // <div>
        // {randomImg()}
        <div id="createSolutionBox">
            <ScrollableAnchor id={'proposalForm'}>
              <div id="proposalFormCreateTitle">
                    <span id="blue">new </span>proposal
              </div>
            </ScrollableAnchor>

            <form id="createForm">
              {/* <fieldset id="fieldSetSideBorder"> */}
                <label htmlFor="solutionTitle" id="projectTitleProposalFormLabel">project title<br />
                  <h1 id="proposalCreateProjectTitle">{this.props.parentTitle}</h1>
                </label><br />

                <label htmlFor="solutionTitle" id="solutionTitleFormLabel">proposal title<br />
                    <input name="solutionTitle" required="required" maxLength="140" id="solutionTitleForm" />
                  </label><br />


                  <div id="projectFormRadioContainer">
                      <div id="projectFormRadioColumn">
                        <div id='checkmark1ProposalActive' onClick={this.radioChangeProject}></div>
                        <div id="projectFormRadioRow1">
                          proposal
                        </div>    
                      </div>
                      <div id="projectFormRadioColumn">
                        <div id='checkmark2Proposal' onClick={this.radioChangePlan}></div>
                        <div id="projectFormRadioRow2">
                          plan
                        </div>    
                      </div>
                      <div id="projectFormRadioColumn">
                        <div id='checkmark3Proposal' onClick={this.radioChangeSolution}></div>
                        <div id="projectFormRadioRow3">
                          solution
                        </div>    
                      </div>
                    </div>


                <label htmlFor="solutionSummary" id="solutionSummaryFormLabel">summary<br />
                  <textarea name="solutionSummary" required="required" maxLength="500" placeholder="Please summarize your proposal here. (500 ch)" id="solutionSummaryForm"/>
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
                    <input type="file" id="fileProposal" onChange={this.onChange} />
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
                
                
                {/* <div id="solutionSummary" onClick={this.showDataURL}>XXX</div> */}

                <div id="proseProposalContainerShow">
                    <textarea name="solutionDescription" required="required" placeholder="Please describe your proposal here." id="solutionDescriptionForm">
                    </textarea>
                </div>

                  <Link to={this.state.linkPath+this.props.probID+'/subprojects'} onClick={this.checkLoginProposal}>
                      <input type="button" ref='proposalbtn' value="create" id="submitSolution"/>
                  </Link>
              {/* </fieldset> */}
            </form>
        </div>
      // </div>
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
} else if (Math.random() < 1){
  return <img src={require('../../assets/greatBearConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
}
}