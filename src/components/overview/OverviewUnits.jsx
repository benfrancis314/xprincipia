import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class SubProblemUnit extends React.Component {

  constructor(){
  super();
  this.state = {
	  problems: []
  }

  };


componentDidMount(){
    var self = this;
        return axios.get( Config.API + '/problems/subproblems?id='+this.props.parentID).then(function (response) {
            self.setState({
                problems: response.data,
            })
        })
}

componentWillReceiveProps (nextProps){
    var self = this;
    return axios.get( Config.API + '/problems/subproblems?id='+nextProps.parentID).then(function (response) {
        self.setState({
            problems: response.data
        })
    }) 
}
    //On recieving new props
//   componentWillReceiveProps(nextProps){
// 	  var self = this
// 	  self.setState({problems: nextProps.problems})
//   }


	render() {
		return (
        <div id="overViewColumn">
            <div id="overViewLineageLabel3">
                project
                {this.props.parentID}
                {this.state.problems.length}
            </div>
            <Link to={`/project/${this.props.probID}/create`} activeClassName="activePrivateCreateButton">
                <div id="overViewAddButton">
                    <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="30" height="30" alt="User avatar, DNA Helix" />
                </div>
			</Link>
			<ul> 
                <div id="overViewRowUnitTop3">
                    <div id="overViewTitle">
                        {this.props.projectTitle}
                    </div>
                    <Link to={'/project/'+ this.props.projectID +'/subprojects'}>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </Link>
                </div>
				{this.state.problems.map(this.renderItem)}
			</ul>
		</div>
		);
	}
	renderItem(problem) {
        // var self = this;
        // if (problem.Title == this.props.projectID) {
        //     return (
        //         <div key={problem.ID} id="nodisplay">
        //         </div>
        //     );
        // } else if (problem.Private === true) {
    if (problem.Private === true) {
        return (
            <div key={problem.ID} id="nodisplay">
            </div>
        );
    } else {

        return (
            <Link key={problem.ID} to={'/project/'+problem.ID +'/tree'}>
                <li key={problem.ID} id="overViewRowUnit3">
                    <div id="overViewTitle">
                        {problem.Title}
                    </div>
                    <Link to={'/project/'+problem.ID +'/subprojects'}>
                        <div id="overViewViewButton">
                            view
                        </div>
                    </Link>
                </li>
            </Link>
        );

    }
}
}
// }