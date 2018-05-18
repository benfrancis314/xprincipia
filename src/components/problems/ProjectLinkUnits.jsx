import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import axios from 'axios';
import {Config} from '../../config.js';
import cookie from 'react-cookie';
// import ReactGA from 'react-ga';

export default class WelcomeUserUnit extends React.Component {
    constructor(){
        super();


        this.state = {
            linkPath: '',
            probID: '',
            problems: [],
        }

        this.hideExplain = this.hideExplain.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.linkIDExplain = this.linkIDExplain.bind(this)           
    };

    componentDidMount() {
        var self = this;
        self.setState({
            probID: this.props.probID,
            problems: this.props.problems
        })
        if (window.location.pathname.includes('private')) {
            self.setState({
                linkPath: '/project/private/',
            })
        } else {
            self.setState({
                linkPath: '/project/',
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        var self = this;
        self.setState({
            probID: nextProps.probID,
            problems: nextProps.problems
        })
        if (window.location.pathname.includes('private')) {
            self.setState({
                linkPath: '/project/private/',
            })
        } else {
            self.setState({
                linkPath: '/project/',
            })
        }
    }

    linkIDExplain() {
        $(document).ready(function() {
            $('#projectIDExplain').attr('id','projectIDExplainShow');
        });
    }
    hideExplain() {
        $(document).ready(function() {           
            $('#projectIDExplainShow').attr('id','projectIDExplain');
        });
    }
	render() {
    
    if(this.props.problems.length > 0) {
        
        return (
	    <div id="linkUnitsContainer">
            <div id="projectIDExplain">
                <span id="red">project id </span> identies each project
                <div id="projectIDExplainURL">
                    xprincipia.com/project/<span id="red">xx</span>/subprojects
                </div>
                <div id="projectIDExplainClose" onClick={this.hideExplain}>
                    return
                </div>
            </div>
            <div id="linkInstructionsContainer">
                <div id="linkInstructions">
                    click to link
                </div>
                <div id="linkExplainButton" onClick={this.linkIDExplain}>
                    project id
                </div>
            </div>
            {this.state.problems.map(this.renderItem)} 
	    </div>
        ); 
    } else {
        return (
            <div>
            </div>
        )
    }
}
	renderItem(problem) {

        function checkLoginLink() {
            if (cookie.load('userName')) {
              createLink.bind(this)
            //   OR
            // createLink()
            } else {
              $(document).ready(function() {
                $('#notification').attr('id','notificationShow').hide().slideDown();
                $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                $('#notificationContent').html('please <span id="blue">login </span>to join this discussion');
              });
            }
          }
        function createLink() {
            $(document).ready(function() {
                $('div.linkConfirmContainerShow').attr('class',problem.ID+'Confirm');      

                $('div.linkAccentuate').attr('class',problem.ID);
                
            });
            var self = this;
            // self.refs.btnlink.setAttribute("disabled", "disabled");
                axios.post( Config.API + '/auth/link/create', {
                    problemID: String(problem.ID),
                    problemTitle: String(problem.Title),
                    newParentID: this.props.probID,
                    newParentTitle: this.props.parentTitle,
                    breakdownID: '1',
                    breakdownTitle: 'original breakdown',
                })
                  .then(function (result) {
                    // self.refs.btnlink.removeAttribute("disabled");
                    document.getElementById("linkForm").reset();
                    // document.getElementById("SPUnitList").scrollIntoView();
                  })
                    .catch(function (error) {
                        $(document).ready(function() {
                            // $('#notification').attr('id','notificationShow').hide().slideDown();
              
                              if (error.response.data == '[object Object]') {
                                return (
                                  $(document).ready(function() {
                                    $('#notification').attr('id','notificationShow').hide().slideDown();
                                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                                    $('#notificationContent').html('please <span id="blue">login </span>to link a project');
                                  })
                                );
                              }  else if (error.response.data != '') {
                            // $('#notificationContent').text(error.response.data);
                            }
                        });
                    });
                    
        }


        function clickLink() {
            $(document).ready(function() {
                $('div.'+problem.ID+'Confirm').attr('class','linkConfirmContainerShow');     
                // Not going to hide currently, just accentuate
                // $('div.'+problem.ID).attr('class','hide'); 
                $('div.'+problem.ID).attr('class','linkAccentuate');                
               
            });
        }
        function closeLink() {
            $(document).ready(function() {
                $('div.linkConfirmContainerShow').attr('class',problem.ID+'Confirm');      
                // See note above in corresponding location
                // $('div.hide').attr('class',problem.ID);
                $('div.linkAccentuate').attr('class',problem.ID);
                
            });
        }
        
if (problem.Private == '1') {
        return (
            <div key={problem.ID} id="nodisplay">
            </div>
        );
} else {
      return (
        <div key={problem.ID} id="linkUnitContainer">
            <div id="linkUnit"  className={problem.ID} onClick={clickLink.bind(this)}>
                <div id="linkUnitTitle">
                    {problem.Title}
                </div>
                <div id="linkUnitID">
                    {problem.ID}
                </div>
            </div>
            <div id="linkConfirmContainer" className={problem.ID+'Confirm'}>
                <div id="linkConfirmExit" onClick={closeLink.bind(this)}>
                    <img src={require('../../assets/redX2.svg')} id="linkConfirmExitX" width="25" height="25" alt="Close button, red X symbol" />
                </div>
                {/* <div id="linkConfirmText">
                    confirm link?
                </div> */}
                <Link to={this.state.linkPath+this.state.probID+'/subprojects'}>
                    <div id="linkConfirmButton" ref='btnlink' onClick={checkLoginLink.bind(this)}>
                        link
                    </div>
                </Link>
            </div>
        </div>
      );
   }
}
}

