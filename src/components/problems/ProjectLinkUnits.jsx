import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
// import ReactGA from 'react-ga';

export default class WelcomeUserUnit extends React.Component {
    constructor(){
        super();

        this.state = {
            currentNotebook: '',
            notebooks: [],
            rerender: '',
        }
        this.hideExplain = this.hideExplain.bind(this)        
    };
    hideExplain() {
        $(document).ready(function() {           
            $('#projectIDExplainShow').attr('id','projectIDExplain');
        });
    }
	render() {
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
            {/* <div id="projectIDExplain">
                <span id="blue">confirm </span>project link
                <div id="projectIDExplainURL">
                    xprincipia.com/project/<span id="red">xx</span>/subprojects
                </div>
                <div id="projectIDExplainClose" onClick={this.hideExplain}>
                    return
                </div>
            </div> */}
            {/* <div id="linkInstructions">
                click to link
            </div> */}
            {this.props.problems.map(this.renderItem)} 
	    </div>
		);
	}
	renderItem(problem) {

        function linkIDExplain() {
            $(document).ready(function() {
                $('#projectIDExplain').attr('id','projectIDExplainShow');
            });
        }
        // function hoverLinkUnit() {
        //     $(document).ready(function() {
        //         $('#problemTitleFormLabel').html("link").fadeIn(7500);
        //         // $('#problemTitleFormLabel').attr('id','problemTitleFormLabelRed');                
        //     });
        // }
        // function unHoverLinkUnit() {
        //     $(document).ready(function() {
        //         $('#problemTitleFormLabelRed').html(problem.ID).fadeIn(7500);
        //         // $('#problemTitleFormLabelRed').attr('id','problemTitleFormLabel');                
        //     });
        // }
        
// For Google Analytics when working
    // function handleClick() {
    //     ReactGA.event({
    //         category: 'Project',
    //         action: 'Clicked Link',
    //     });
    // }
if (problem.Private === true) {
        return (
            <div key={problem.ID} id="nodisplay">
            </div>
        );
} else 
      return (
        <li key={problem.ID} id="linkUnit" 
        // onMouseOver={hoverLinkUnit.bind(this)} onMouseOut={unHoverLinkUnit.bind(this)}
        >
            <div id="linkUnitTitle">
                {problem.Title}
            </div>
            <div id="linkUnitID" onClick={linkIDExplain.bind(this)}>
                {problem.ID}
            </div>
        </li>
      );
   }
}

// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }
