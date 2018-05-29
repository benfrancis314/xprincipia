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
      prose: '',
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
      prose: '0',
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
      prose: '1',
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
        parentTitle: this.props.projectTitle,
        pdf: this.state.dataString,
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
      <div>
        {randomImg()}
        <div id="createSolutionBox">
            <ScrollableAnchor id={'proposalForm'}>
              <div id="proposalFormCreateTitle">
                    <span id="blue">new </span>proposal
              </div>
            </ScrollableAnchor>

            <form id="createForm">
              <fieldset id="fieldSetSideBorder">
                <label htmlFor="solutionTitle" id="projectTitleProposalFormLabel">project title<br />
                  <h1 id="proposalCreateProjectTitle">{this.props.projectTitle}</h1>
                </label><br />

                <label htmlFor="solutionTitle" id="solutionTitleFormLabel">proposal title<br />
                    <input name="solutionTitle" required="required" maxLength="140" id="solutionTitleForm" />
                  </label><br />


                  <div id="projectFormRadioContainer">
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow1">
                          proposal<span id="grayLessSpacing"> | default</span>
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
                
                
                {/* <div id="solutionSummary" onClick={this.showDataURL}>XXX</div>{this.state.dataURL} */}

                <div id="proseProposalContainerShow">
                    <textarea name="solutionDescription" required="required" placeholder="Please describe your proposal here." id="solutionDescriptionForm">
                    </textarea>
                </div>

                  <Link to={this.state.linkPath+this.props.probID+'/subprojects'} onClick={this.checkLoginProposal}>
                      <input type="button" ref='btn' value="create" id="submitSolution"/>
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
} else if (Math.random() < 1){
  return <img src={require('../../assets/greatBearConstellation.svg')} id="middleAlignOrion" width='70' height='100' alt="Back arrow, blue up arrow" />
}
}