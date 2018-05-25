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
      class: '',
      parentTitle: '',
      file: '',
      prose: '',
      linkPath: '',
      private: '',
      dataString: '',
    }

    this.updateSolution = this.updateSolution.bind(this);
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
      return axios.get( Config.API + '/solutions/ID?id='+this.props.params.solutionID).then(function (response) {
          //if parent ID is 0 then the problem is at the root of the tree
          // return id as the parentID for routing purposes
          //set other data
          self.setState({
              solutionInfo: response.data
          })
          
          document.getElementById('solutionEditTitleForm').value = self.state.solutionInfo.Title;
          document.getElementById('solutionEditSummaryForm').value = self.state.solutionInfo.Summary;
          document.getElementById('solutionEditDescriptionForm').value = self.state.solutionInfo.Description;

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
  showPDF() {
    $(document).ready(function() {
      $('#pdfProposalContainerVersion').attr('id','pdfProposalContainerShowVersion');    
      $('#proseProposalContainerShowVersion').attr('id','proseProposalContainerVersion');  
      $('#proposalFormButtonRightVersion').attr('id','proposalFormButtonRightActiveVersion');   
      $('#proposalFormButtonLeftActiveVersion').attr('id','proposalFormButtonLeftVersion');  
    });
    this.setState({
      prose: '0',
    })
  }



  showProse() {
    $(document).ready(function() {
      $('#pdfProposalContainerShowVersion').attr('id','pdfProposalContainerVersion');    
      $('#proseProposalContainerVersion').attr('id','proseProposalContainerShowVersion');
      $('#proposalFormButtonLeftVersion').attr('id','proposalFormButtonLeftActiveVersion');  
      $('#proposalFormButtonRightActiveVersion').attr('id','proposalFormButtonRightVersion');       
    });
    this.setState({
      prose: '1',
    })
  }
  checkLoginProposal() {
    if (cookie.load('userName')) {
      this.updateSolution()
    } else {
      $(document).ready(function() {
        $('#notification').attr('id','notificationShow').hide().slideDown();
        $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
        $('#notificationContent').html('please <span id="blue">login </span>to join this discussion');
      });
    }
  }

    updateSolution() {
    //Read field items into component state
    var self = this;

    this.state.title = document.getElementById('solutionEditTitleForm').value
    this.state.summary = document.getElementById('solutionEditSummaryForm').value
    this.state.description = document.getElementById('solutionEditDescriptionForm').value
    // if (document.getElementById('proposalClass2').checked) {
    //   this.state.class = '2' 
    // } else if (document.getElementById('proposalClass1').checked) {
    //   this.state.class = '1' 
    // } else {
    //   this.state.class = '0' 
    // }
  axios.put( Config.API + '/auth/solutions/update?id='+this.props.params.solutionID, {
      username: cookie.load('userName'),
      title : self.state.title,
      summary : self.state.summary,
      description : self.state.description,
    })
    .then(function (result) {
      document.location = '/project/' + self.props.params.probID + '/proposal/' + self.props.params.solutionID

    //  document.location = '/project/' + self.props.params.probID + '/proposal/' + self.props.params.solutionID
    // alert(self.state.references)
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

  onChange() {
    // GETS FILE
    var self = this;
    var files = document.getElementById('fileProposalEdit').files;
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

  render() {
      return (
        <div>
            <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
            </Link>
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
            <div id="createSolutionBox">
                {/* <form id="solutionEditForm">                      
                  <label htmlFor="solutionTitle" id="proposalEditTitleFormLabel">Title<br />
                      <input type="text" name="solutionTitle" required="required" maxLength="140" id="solutionEditTitleForm" autoFocus/>
                  </label><br />

                  <label htmlFor="solutionSummary" id="editSummaryFormLabel">Summary<br />
                      <textarea name="solutionSummary" required="required" maxLength="400" placeholder="Summarize in 250 characters here." id="solutionEditSummaryForm"/>
                  </label><br />

                  <label htmlFor="solutionDescription" id="editDescriptionFormLabel">Description<br />
                      <textarea name="solutionDescription" required="required" placeholder="Describe in detail here." id="solutionEditDescriptionForm">
                      </textarea></label><br />

                  <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                    <div onClick={this.updateSolution} id="editButton">submit</div>
                  </Link>
                  <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                    <div id="returnButton">exit</div>
                  </Link>
                </form> */}
                <form id="createForm">
              <fieldset id="fieldSetSideBorder">
                {/* <label htmlFor="solutionTitle" id="projectTitleProposalFormLabel">project title<br />
                  <h1 id="proposalCreateProjectTitle">{this.props.projectTitle}</h1>
                </label><br /> */}

                <label htmlFor="solutionTitle" id="solutionTitleFormLabel">proposal title<br />
                    <input name="solutionTitle" required="required" maxLength="140" id="solutionEditTitleForm" />
                  </label><br />


                <label htmlFor="solutionSummary" id="solutionSummaryFormLabel">summary<br />
                  <textarea name="solutionSummary" required="required" maxLength="500" placeholder="Please summarize your proposal here. (500 ch)" id="solutionEditSummaryForm"/>
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
                    <textarea name="solutionDescription" required="required" placeholder="Please describe your proposal here." id="solutionEditDescriptionForm">
                    </textarea>
                </div>

                  <Link to={this.state.linkPath+this.props.probID+'/subprojects'}>
                      <input type="button" ref='btn' value="edit" onClick={this.checkLoginProposal} id="submitSolution"/>
                  </Link>
              </fieldset>
            </form>
            </div>
            </ReactCSSTransitionGroup>
        </div>
      );
   }
}
