import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import ReactGA from 'react-ga';
import $ from 'jquery';

export default class SubProblemUnit extends React.Component {

  constructor(){
    super();
    this.state = {
        problems: []
    }
  };


		// Not sure what this is used for
    // componentDidMount(){
    //   var self = this;
	  // if (self.props.problem != null ){
		//   self.setState({problems: this.props.problems})
	  // }
    //   return
    // }

    //On recieving new props
  componentWillReceiveProps(nextProps){
	  var self = this
	  self.setState({problems: nextProps.problems})
  }


	render() {
		return (
        <div id="overViewColumn">
            <div id="overViewLineageLabel1">
                grand parent
            </div>
            <Link to={`/project/${this.props.probID}/create`} activeClassName="activePrivateCreateButton">
                <div id="overViewAddButton">
                    <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="30" height="30" alt="User avatar, DNA Helix" />
                </div>
			</Link>
			<ul> 
                <div id="overViewRowUnitTop1">
                    {/* <div id="overViewVoteButton">
                        &#9650;
                    </div> */}
                    <div id="overViewTitle">
                        human-based general artificial intelligence
                    </div>
                    <div id="overViewViewButton">
                        view
                    </div>
                </div>
				{this.state.problems.map(this.renderItem)}
			</ul>
		</div>
		);
	}
	renderItem(problem) {
        if (problem.Private === true) {
            return (
                <div key={problem.ID} id="nodisplay">
                </div>
            );
        } else {
        return (
            <Link key={problem.ID} to={'/project/'+problem.ID +'/tree'}>
                <li key={problem.ID} id="overViewRowUnit1">
                    <div id="overViewTitle">
                        {problem.Title}
                    </div>
                    <div id="overViewViewButton">
                        view
                    </div>
                </li>
            </Link>
        );

    }
}
}