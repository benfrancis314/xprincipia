import React from 'react';
// Will be uesd with componentDidUpdate
// import ReactDOM from 'react-dom';import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProblemForm extends React.Component {

  constructor(){
    super();
    
    //ProblemForm structure in backend
    this.state= {
      title: '',
      summary: '',
      class: '',
      breakdownID: '',
    }

    this.postProblem = this.postProblem.bind(this);
  };

// componentDidUpdate() {
//         ReactDOM.findDOMNode(this).scrollIntoView();
//   }      

  componentDidMount(){
    var self = this;
    axios.get( Config.API + '/breakdowns/byproblemnumber?parentID='+this.props.params.probID + '&parentNumber=1').then(function (response) {
        self.setState({
            breakdownID: response.data.ID,
        })
    })   
  }
  // componentWillReceiveProps (nextProps){
  //   var self = this;
  //   axios.get( Config.API + '/breakdowns/byproblemnumber?parentID='+nextProps.params.probID+'&parentNumber=1').then(function (response) {
  //       self.setState({
  //           breakdownID: response.data,
  //       })
  //   })   
  // }

  postProblem() {
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
      parentTitle : this.props.parentTitle,
      grandParentID : String(this.props.gParentID),
      grandParentTitle: this.props.gParentTitle,
      ggParentID : String(this.props.ggParentID),
      class : String(this.state.class),
      // Breakdown not used yet
      // breakdownID : String(this.props.breakdownID),
      breakdownID: String(this.state.breakdownID),
      private: '0',
    })
    .then(function (result) {
      //redirect back to the last page     
      // document.location = '/project/'+self.props.params.probID+'/subprojects'
      self.refs.btn.removeAttribute("disabled");
      window.scrollTo(0,0);
      alert(String(this.state.breakdownID));
    })
      .catch(function (error) {
        // alert(error.response.data);
          $(document).ready(function() {
              if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    // Usually outside IF statement, revert when 400 error is fixed
                    $('#notification').attr('id','notificationShow').hide().slideDown();
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to create a project');
                  })
                );
              }  else if (error.response.data != '') {
                // Not using until 400 error is fixed
                // $('#notificationContent').text(error.response.data);
            }
          });
      });
  }

  render() {
      return (
        <div>
          {/* XXX   {this.props.ggParentID}GGPARENT ID */}
          <div id="createProblemBox">
              <form id="createProjectForm">
                <fieldset id="fieldSetNoBorder">
                    <label htmlFor="problemTitleForm" id="problemTitleFormLabel">sub project title<br />
                      <input type="text" name="problemTitle" required="required" maxLength="70" id="problemTitleForm" autoFocus/>
                    </label><br />


                    <div id="projectFormRadioContainer">
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow1">
                          project <span id="grayLessSpacing">(default)</span>
                        </div>
                        <div id="projectFormRadioRow">
                          <label id="projectRadioButtonContainer">
                            <input type="radio" id="projectClass0" name="projectType" value="0"/>
                            <span id="checkmark1"></span>
                          </label>
                        </div>
                      </div>
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow2">
                          goal
                        </div>
                        <div id="projectFormRadioRow">
                          <label id="projectRadioButtonContainer">
                            <input type="radio" id="projectClass1" name="projectType" value="1" />
                            <span id="checkmark2"></span>
                          </label>
                        </div>
                      </div>
                      <div id="projectFormRadioColumn">
                        <div id="projectFormRadioRow3">
                          problem
                        </div>
                        <div id="projectFormRadioRow">
                          <label id="projectRadioButtonContainer">
                            <input type="radio" id="projectClass2" name="projectType" value="2" />
                            <span id="checkmark3"></span>
                          </label>
                        </div>
                      </div>
                    </div>

                  <label htmlFor="problemSummaryForm" id="problemSummaryFormLabel">
                      synopsis
                      <br />
                      <textarea name="problemSummary" maxLength="500" 
                      placeholder="Please provide any additional information you'd like. (500 ch.)" id="problemSummaryForm"/>
                  </label>
                  <br />
                  <Link to={`/project/${this.props.params.probID}/subprojects`}>
                      <input type="button" ref='btn' value="create" onClick={this.postProblem} id="submitProblem"/>
                  </Link>
                </fieldset>
              </form>
          </div>
        </div>

      );
   }
}

