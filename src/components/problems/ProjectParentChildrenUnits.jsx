import React from 'react';
import {Link} from 'react-router';

export default class ProjectParentChildrenUnits extends React.Component {

  constructor(){
  super();
  this.state = {
	  problems: []
  }

  };

    componentWillMount(){
      var self = this;
	  if (self.props.problem != null ){
		  self.setState({problems: this.props.problems})
	  }
      return
    }

    //On recieving new props
  componentWillReceiveProps(newProps){
	  var self = this
	  self.setState({problems: newProps.problems})
	  console.log(self.state.problems)
		console.log(self.props.problemTitle);
  }


	render() {
		return (
			<div>
				<ul id="parentChildrenUnitList"> 
					{this.state.problems.map(this.renderItem)}
				</ul>
			</div>
		);
	}
	renderItem(problem) {
		function refreshPage() {
			// Temporary fix for refreshing sub problems
			document.location = '/problem/'+ self.props.params.probID +'/subproblems';
					ProjectParentChildrenUnits.forceUpdate()
		}
		return (
			<Link key={problem.ID} to={'/problem/'+problem.ID +'/subproblems'} onClick={refreshPage} >
				<li key={problem.ID} id="parentChildrenButton">
					{problem.Title}
				</li>
			</Link>
		);
  }
}

//convert float to Decimal
// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }