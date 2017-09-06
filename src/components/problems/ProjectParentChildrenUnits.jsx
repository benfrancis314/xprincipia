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
	  if (self.props.problem !== null ){
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
			document.location = '/project/'+ self.props.params.probID +'/subprojects';
					ProjectParentChildrenUnits.forceUpdate()
		}
		
		//  Trying to get nothing to show up if it has no siblings

		if (problem.Title === 'self.props.projectTitle') {
			 		 return (
							// T
							<Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'} onClick={refreshPage} >
								<li key={problem.ID} id="parentChildrenSelfButton">
									{problem.Title}
								</li>
							</Link>);
			} else {
				return (
					<Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'} onClick={refreshPage} >
						<li key={problem.ID} id="parentChildrenSelfButton">
							{problem.Title}
						</li>
					</Link>);
		}
	}
}