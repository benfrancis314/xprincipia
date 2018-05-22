import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class VersionsUnit extends React.Component {
	
	constructor(props){
        super(props);

        // this.state = {
        // }

         this.renderItem = this.renderItem.bind(this);
	};
	
	render() {
		return (
	    <div>
			<ul> {this.props.solutions.map(this.renderItem)} </ul>     
	    </div>

		);
	}

	renderItem(solution) {

	function showNotification() {
		$(document).ready(function() {
			$('#versionChangeHide').attr('id','versionChangeShow');
			$('#versionChangeShow').html(solution.Evidence).fadeIn(7500);
		});
	};

    return (
		<div id="versionUnit">
			<Link key={solution.ID} to={`/project/${this.props.probID}/proposal/${solution.ID}`}>
				<div id="versionUnitTitle">
					v.{solution.Version}
				</div>
			</Link>
			{/* <div id="versionUnitChangesButton">
				changes
			</div>
			<div id="versionChangesDisplayHide">

			</div> */}
		</div>
			
				
		);
  }
}


//convert float to Decimal
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
}