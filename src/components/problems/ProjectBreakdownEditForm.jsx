import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';
import Load from '../Load.jsx';
import ProjectBreakdownList from './ProjectBreakdownList.jsx';


export default class ProjectBreakdownForm extends React.Component {

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

    this.updateBreakdown = this.updateBreakdown.bind(this);
    this.postProblemBreakdown = this.postProblemBreakdown.bind(this);
  };

    componentDidMount(){
        var self = this;
        document.getElementById("closeRedXBreakdownEdit").scrollIntoView();
        axios.get( Config.API + '/breakdowns/byproblem?parentID='+this.props.params.probID).then(function (response) {
            self.setState({
                breakdowns: response.data
            })
        })   
        axios.get( Config.API + '/breakdowns/title?id='+this.props.params.bdID).then(function (response) {
          self.setState({
              breakdownTitle: response.data
          })
          document.getElementById('problemTitleForm').value = response.data;
        }) 
    }

    componentWillReceiveProps (nextProps){
        var self = this;
        document.getElementById("closeRedXBreakdownEdit").scrollIntoView();
        axios.get( Config.API + '/breakdowns/byproblem?parentID='+nextProps.params.probID).then(function (response) {
            self.setState({
                breakdowns: response.data
            })
        })  
        axios.get( Config.API + '/breakdowns/title?id='+nextProps.params.bdID).then(function (response) {
          self.setState({
              breakdownTitle: response.data
          })
          document.getElementById('problemTitleForm').value = response.data;
        }) 
    }

  updateBreakdown() {
    //Read field items into component state
    this.state.title = document.getElementById('problemTitleForm').value
    // this.state.summary = document.getElementById('problemSummaryForm').value
  
    var self = this
    axios.put( Config.API + '/auth/breakdowns/edit?id='+this.props.params.bdID, {
      username: cookie.load('userName'),
      title : this.state.title,
    })
    .then(function (result) {
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
            alert('SUCCESS')
            // self.refs.btn.removeAttribute("disabled");
    })
      .catch(function (error) {
            alert('failure')
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
          
            
          
          <Link to={`/project/${this.props.params.probID}/create/breakdown`}>
            <img src={require('../../assets/redX.svg')} id="closeRedXBreakdownEdit" width="30" height="30" alt="Close button, red X symbol" />            
          </Link>
          <div id="branchFormTitleEdit">
            edit breakdown
          </div>
          <div id="createProblemBox">
              <form id="createForm">
                <fieldset id="fieldSetNoBorder">
                    <label htmlFor="problemTitleForm" id="problemTitleFormLabel">breakdown title<br />
                      <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleForm" 
                      placeholder="alternative method of organizing sub projects" autoFocus/>
                    </label><br />
                  {/* 
                  <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">concept or distinction<br />
                      <textarea name="problemSummary" maxLength="150" 
                      placeholder="What is the concept behind this breakdown or what makes it distinct? (250 ch.)" id="problemSummaryForm"/>
                      </label><br /> */}
                  <Link to={`/project/${this.props.params.probID}/create/breakdown`}>
                    <input type="button" value="edit" onClick={this.updateBreakdown} id="submitBreakdown"/>
                  </Link>
                </fieldset>
              </form>
          </div>

          {this.state.breakdowns.map(this.renderBreakdown)}


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

