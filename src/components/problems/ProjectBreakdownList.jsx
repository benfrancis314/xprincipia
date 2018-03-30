import React from 'react';
import cookie from 'react-cookie';
import {Link} from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class SubProblemUnit extends React.Component {
	constructor(props){
        super(props);

        this.state = {
			problems: [],
			title: '',
			summary: '',
			class: '',
		}
		this.renderItem = this.renderItem.bind(this);  
		this.postProblemBreakdown = this.postProblemBreakdown.bind(this);
		this.showCreateForm = this.showCreateForm.bind(this);
		this.hideCreateForm = this.hideCreateForm.bind(this);
    };
    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/problems/breakdown?breakdownID='+this.props.breakdownID).then(function (response) {
            self.setState({
                problems: response.data,
            })
        })   
    }
    
    componentWillReceiveProps (nextProps){
        var self = this;
        axios.get( Config.API + '/problems/breakdown?breakdownID='+nextProps.breakdownID).then(function (response) {
            self.setState({
                problems: response.data,
            })
        }) 
	}
	
	postProblemBreakdown() {
		var self = this;
		self.refs.btn.setAttribute("disabled", "disabled");
		//Read field items into component state
		this.state.title = document.getElementById('breakdownProblemTitleForm').value
		this.state.summary = document.getElementById('breakdownProblemSummaryForm').value
		if (document.getElementById('projectClass2').checked) {
		  this.state.class = '2' 
		} else if (document.getElementById('projectClass1').checked) {
		  this.state.class = '1' 
		} else {
		  this.state.class = '0' 
		}

		alert(this.state.title)
		alert(this.state.summary)
		alert(this.props.probID)
		alert(this.state.class)
		alert(this.props.breakdownID)

	  
		axios.post( Config.API + '/auth/problems/create', {
		  username: cookie.load('userName'),
		  title : String(this.state.title),
		  summary : String(this.state.summary),
		  parentType : '0',
		  parentID: String(this.props.probID),
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
		  //redirect back to the last page     
		  // document.location = '/project/'+self.props.params.probID+'/subprojects'

		//   USE
		// document.getElementById("createProjectForm").reset();
		alert('SUCCESS')
		  self.refs.btn.removeAttribute("disabled");

		// MAYBE USE
		//   window.scrollTo(0,0);
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
	  showCreateForm() {
		var self = this;
		$(document).ready(function() {
			$('.breakdownCreateProjectFormHide').attr('class', 'breakdownCreateProjectFormShow');
		});
	  }
	  hideCreateForm() {
		var self = this;
		  $(document).ready(function() {
				$('.breakdownCreateProjectFormShow').attr('class', 'breakdownCreateProjectFormHide');
		  });
	  }

	render() {
		return (
			<div id="breakdownProjectsContainer">				
				<div id="breakdownProjectsList">
					<li id="SPUnit"	onClick={this.showCreateForm}>
						<div id="SPHeader">
							<img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="80" height="80" alt="User avatar, DNA Helix" />
						</div>
					</li>
					{this.state.problems.map(this.renderItem)}
				</div>
				<div>
					<div id="createProblemBox"	className='breakdownCreateProjectFormHide'>
					<div id="breakdownProjectFormClose" onClick={this.hideCreateForm}>
							<img src={require('../../assets/redX2.svg')} id="projectModuleClose2" width="22" height="22" alt="Project Tree Button, white tree"  onClick={this.hideParentList} />
					</div>
						<form id="createProjectForm">
							<fieldset id="fieldSetNoBorder">
								<label htmlFor="breakdownProblemTitleForm" id="problemTitleFormLabel">sub project title<br />
								<input type="text" name="problemTitle" required="required" maxLength="70" id="breakdownProblemTitleForm" autoFocus/>
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

							<label htmlFor="breakdownProblemSummaryForm" id="problemSummaryFormLabel">
								synopsis
								<br />
								<textarea name="problemSummary" maxLength="500" 
								placeholder="Please provide any additional information you'd like. (500 ch.)" id="breakdownProblemSummaryForm"/>
							</label>
							<br />
							<Link to={window.location.pathname}>
								<input type="button" ref='btn' value="create" onClick={this.postProblemBreakdown} id="submitProblem"/>
							</Link>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		);
	}
	renderItem(problem) {
		return (
			<Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'}>
				<li id="SPUnit">
					<div id="SPHeader">
						<div id="SPTitle">{problem.Title}</div>
						<div id="SPPercent">{problem.Rank}</div>
					</div>
				</li>
			</Link>
		)};
}