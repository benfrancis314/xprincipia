import React from 'react';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';
import Load from '../Load.jsx';
import ProjectBreakdownList from './ProjectBreakdownList.jsx';


export default class ProjectBreakdownFlagForm extends React.Component {

  constructor(){
    super();
    
    //ProblemForm structure in backend
    this.state= {
      title: '',
      summary: '',
      breakdowns: [],
      breakdownCreateTitle: '',
      breakdownTitle: '',
    }

    this.postBranch = this.postBranch.bind(this);
    this.postProblemBreakdown = this.postProblemBreakdown.bind(this);
    this.flagBreakdown = this.flagBreakdown.bind(this);
  };

    componentDidMount(){
        var self = this;
        document.getElementById("flagContainerBreakdown").scrollIntoView();
        axios.get( Config.API + '/breakdowns/byproblem?parentID='+this.props.params.probID).then(function (response) {
            self.setState({
                breakdowns: response.data
            })
        })   
        axios.get( Config.API + '/breakdowns/title?id='+this.props.params.bdID).then(function (response) {
          self.setState({
              breakdownTitle: response.data
          })
      }) 
    }

    componentWillReceiveProps (nextProps){
        var self = this;
        document.getElementById("flagContainerBreakdown").scrollIntoView();
        axios.get( Config.API + '/breakdowns/byproblem?parentID='+nextProps.params.probID).then(function (response) {
            self.setState({
                breakdowns: response.data
            })
        })  
    }

    flagBreakdown() {
        //Read field items into component state
          this.state.description = document.getElementById('flagTextArea').value
          if (document.getElementById('flagReason3').checked) {
            this.state.reason = '3'  
          } else if (document.getElementById('flagReason2').checked) {
            this.state.reason = '2' 
          } else if (document.getElementById('flagReason1').checked) {
            this.state.reason = '1' 
          } else {
            this.state.reason = '0' 
          }
          // this.state.summary = document.getElementById('projectEditSummaryForm').value
        var self = this;
          axios.post( Config.API + '/auth/flags/create', {
            parentType: '11',
            parentID: this.props.params.probID,
            submitUser: cookie.load('userName'),
            // What to do for creator? May need call if we need this
            // flagUser: this.props.creator,
            reason: this.state.reason,
            description : this.state.description,
          })
          .then(function (result) {
            document.location = '/project/'+ self.props.params.probID + '/create/breakdown'
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

  postBranch() {
    //Read field items into component state
    this.state.title = document.getElementById('problemTitleForm').value
    // this.state.summary = document.getElementById('problemSummaryForm').value
  
    var self = this
    axios.post( Config.API + '/auth/breakdowns/create', {
      username: cookie.load('userName'),
      title : this.state.title,
      // description : this.state.summary,
      parentID: this.props.params.probID,
      parentTitle : this.props.parentTitle,
    })
    .then(function (result) {
      //redirect back to the last page     
      // document.location = '/project/'+self.props.params.probID+'/subprojects'
      document.getElementById("createForm").reset();
    })
      .catch(function (error) {
        // alert('why not working');
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



  postProblemBreakdown() {
    var self = this;
    // self.refs.btn.setAttribute("disabled", "disabled");
    //Read field items into component state
    // this.state.title = document.getElementById('breakdownProblemTitleForm').value
    this.state.title = document.getElementById(String('title'+String(this.props.breakdownID))).value
    this.state.summary = document.getElementById('breakdownProblemSummaryForm').value
    if (document.getElementById('projectClass2').checked) {
      this.state.class = '2' 
    } else if (document.getElementById('projectClass1').checked) {
      this.state.class = '1' 
    } else {
      this.state.class = '0' 
    }

    axios.post( Config.API + '/auth/problems/create', {
      username: cookie.load('userName'),
      title : this.state.title,
      summary : this.state.summary,
      parentType : '0',
      parentID: this.props.probID,
      parentTitle : '0',
      parentTitle : '0',
      grandParentID : '0',
      grandParentTitle: '0',
      ggParentID : '0',
      class : String(this.state.class),
      breakdownID: String(this.props.breakdownID),
      private: '0',
    })
    .then(function (result) {
            // document.getElementById("createProjectForm").reset();
            // alert('SUCCESS')
            // self.refs.btn.removeAttribute("disabled");
    })
      .catch(function (error) {
            // alert('failure')
          $(document).ready(function() {
              if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notification').attr('id','notificationShow').hide().slideDown();
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to create a project');
                  })
                );
              }  else if (error.response.data != '') {
            }
          });
      });
  }





  render() {
    // document.getElementById("flagContainerBreakdown").scrollIntoView();

      return (
        <div id="breakdownContainer">


            <div id="breakdownHeaderContainer">
                <Link to={`/project/${this.props.params.probID}/subprojects`}>
                    <div id="breakdownContainerClose" onClick={this.hideBranch}>
                        <img src={require('../../assets/redX2.svg')} id="breakdownCloseImg" width="22" height="22" alt="Project Tree Button, white tree"  onClick={this.hideParentList} />
                    </div>
                </Link>
                <div id="breakdownHeader">
                alternative breakdowns
                </div>
            </div>


      
      <div id="flagContainerBreakdown">
      {/* <Link to={`/project/${this.props.params.probID}/subprojects`}>
        <img src={require('../../assets/redX.svg')} id="exitNotebookButton" width="30" height="30" alt="Close button, red X symbol" /> 
      </Link> */}
      <div>
      <div id="flagHeader">
        flag reasoning
      </div>

      <div id="projectFormRadioContainer">
        <div id="projectFormRadioColumn">
          <div id="projectFormRadioRow3">
            misplaced
          </div>
          <div id="projectFormRadioRow">
            <label id="projectRadioButtonContainer">
              <input type="radio" id="flagReason1" name="flagType" value="1" />
              <span id="checkmark3"></span>
            </label>
          </div>
        </div>
        <div id="projectFormRadioColumn">
          <div id="projectFormRadioRow3">
            inaccurate
          </div>
          <div id="projectFormRadioRow">
            <label id="projectRadioButtonContainer">
              <input type="radio" id="flagReason2" name="flagType" value="2" />
              <span id="checkmark3"></span>
            </label>
          </div>
        </div>
        <div id="projectFormRadioColumn">
          <div id="projectFormRadioRow3">
            bad culture
          </div>
          <div id="projectFormRadioRow">
            <label id="projectRadioButtonContainer">
              <input type="radio" id="flagReason3" name="flagType" value="3" />
              <span id="checkmark3"></span>
            </label>
          </div>
        </div>
      </div>

      <form id="flagForm">
        <textarea id="flagTextArea" name="questionText" placeholder="Why should this breakdown be moved, altered or removed? " 
        autoFocus ></textarea>
        <br />
        <div onClick={this.flagBreakdown} id="flagButton">submit</div>
        <Link to={`/project/${this.props.params.probID}/create/breakdown`}>
          <div id="returnButton">exit</div>
        </Link>
      </form>
      </div>
    </div>



























          
          {this.state.breakdowns.map(this.renderBreakdown)}
                    
          <div id="branchFormTitle">
            new breakdown
          </div>
          <div id="createProblemBox">
              <form id="createForm">
                <fieldset id="fieldSetNoBorder">
                    <label htmlFor="problemTitleForm" id="problemTitleFormLabel">breakdown title<br />
                      <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleForm" 
                      placeholder="alternative method of organizing sub projects" />
                    </label><br />
                  {/* 
                  <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">concept or distinction<br />
                      <textarea name="problemSummary" maxLength="150" 
                      placeholder="What is the concept behind this breakdown or what makes it distinct? (250 ch.)" id="problemSummaryForm"/>
                      </label><br /> */}
                  <Link to={window.location.pathname}>
                    <input type="button" value="Create" onClick={this.postBranch} id="submitBreakdown"/>
                  </Link>
                </fieldset>
              </form>
          </div>
        </div>

      );
   }
   renderBreakdown(breakdown) {

    function hoverBreakdownText() {
        if (breakdown.Description !== '') {
            $(document).ready(function() {
                $('div.'+breakdown.ID).attr('class','branchText');
                $('.branchText').html(breakdown.Description).fadeIn(7500);
            });
        }
    }
    function unHoverBreakdownText() {
        $(document).ready(function() {
            $('.branchText').html(breakdown.Title).fadeIn(7500);
            $('div.branchText').attr('class',breakdown.ID);
            $('#privateContainerMottoRed').html("ALTERNATE BREAKDOWNS").fadeIn(7500);
            $('#privateContainerMottoRed').attr('id','privateContainerMottoBlue');
        });
    }
    function addBreakdownProject() {
      var self = this;
      self.refs.btn.setAttribute("disabled", "disabled");
      //Read field items into component state
      this.state.title = document.getElementById('problemTitleForm').value
      this.state.summary = document.getElementById('problemSummaryForm').value
      if (document.getElementById('projectClass2').checked) {
        this.state.class = '2' 
      } else if (document.getElementById('projectClass1').checked) {
        this.state.class = '1' 
      } else {
        this.state.class = '0' 
      }
    
      axios.post( Config.API + '/auth/problems/create', {
        username: cookie.load('userName'),
        title : this.state.title,
        summary : this.state.summary,
        parentType : '0',
        parentID: this.props.params.probID,
        // parentTitle : this.props.parentTitle,
        // grandParentID : String(this.props.gParentID),
        // grandParentTitle: this.props.gParentTitle,
        // ggParentID : String(this.props.ggParentID),
        class : String(this.state.class),
        breakdownID: breakdown.ID,
        private: '0',
      })
      .then(function (result) {
        self.refs.btn.removeAttribute("disabled");
        // document.location = window.location.pathname 
        // window.scrollTo(0,0);
      })
        .catch(function (error) {
            $(document).ready(function() {
                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notification').attr('id','notificationShow').hide().slideDown();
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to create a project');
                    })
                  );
                }  else if (error.response.data != '') {
              }
            });
        });
    }
    function showForm() {
      $(document).ready(function() {
          $('div.'+breakdown.ID).attr('class','breakdownFormHide');
          // $('.suggestionContentClassBlue > #discussHoverText').attr('id','discussHoverTextShow');
          // $('#discussHoverTextShow').html("answers").fadeIn(7500);
      });
    }
    function hideForm() {
        $(document).ready(function() {
            $('div.breakdownFormHide').attr('class',breakdown.ID);
            // $('div#discussHoverTextShow').attr('id','discussHoverText');
        });
    }

    if (breakdown.Username == cookie.load('userName')) {
        return (
          <div id="breakdownSetsContainer" key={breakdown.ID}>
            <div id="branchHeaderTitle" onClick={hoverBreakdownText}>
                {breakdown.Title}
            </div>
            <ProjectBreakdownList breakdownTitle={String(breakdown.Title)} breakdownID={breakdown.ID} probID={breakdown.ParentID} />
            <Link to={`/project/${breakdown.ParentID}/create/breakdown/${breakdown.ID}/flag`} activeClassName="activeBreakdownFlagButton">
              <div id="flagBreakdownButton">
                <img src={require('../../assets/flag.svg')} id="flagBreakdownLogo" width="24" height="24" alt="Delete Button, Red X" />
              </div>
            </Link>
            <Link to={`/project/${breakdown.ParentID}/create/breakdown/${breakdown.ID}/edit`} activeClassName="activeBreakdownEditButton">
              <div id="editBreakdownButton">
                <img src={require('../../assets/editBlue.svg')} id="editBreakdownLogo" width="24" height="24" alt="Delete Button, Red X" />
              </div>
            </Link>
          </div>               
      );
    } else {
    return (
      <div id="breakdownSetsContainer" key={breakdown.ID}>
            <div id="branchHeaderTitle" 
            // onMouseOver={hoverBreakdownText} 
            // onMouseOut={unHoverBreakdownText}
            onClick={hoverBreakdownText}
            >
                {breakdown.Title}
            </div>
        <ProjectBreakdownList breakdownTitle={breakdown.Title} breakdownID={breakdown.ID} probID={breakdown.ParentID} />
        <Link to={`/project/${breakdown.ParentID}/create/breakdown/${breakdown.ID}/flag`} activeClassName="activeBreakdownFlagButton">
          <div id="flagBreakdownButton">
            <img src={require('../../assets/flag.svg')} id="flagBreakdownLogo" width="24" height="24" alt="Delete Button, Red X" />
          </div>
        </Link>
      </div>               
    );
  }
}
}

