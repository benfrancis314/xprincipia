import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class OverviewGrandParentUnits extends React.Component {

  constructor(){
  super();
  this.state = {
	  problems: []
  }

  };

    // On recieving new props
  componentWillReceiveProps(nextProps){
	  var self = this
	  self.setState({
          problems: nextProps.problems
    })
  }


	render() {
		return (
        <div id="overViewColumn">
            <div id="overViewLineageLabel2">
                parent
                {/* x{this.props.grandParentID}x */}
                yxxy
            </div>
            <Link to={`/project/${this.props.probID}/create`} activeClassName="activePrivateCreateButton">
                <div id="overViewAddButton">
                    <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="30" height="30" alt="User avatar, DNA Helix" />
                </div>
			</Link>
			<ul> 
            <Link to={`/project/${this.props.grandParentID}/tree`}>
                    <div id="overViewRowUnitTop2">
                        <div id="overViewTitle">
                            {this.props.grandParentTitle}
                        </div>
                        <Link to={'/project/${this.props.ggParentID}/subprojects'}>
                            <div id="overViewViewButton">
                                view
                            </div>
                        </Link>
                    </div>
                </Link>
				{this.state.problems.map(this.renderItem)}
			</ul>
		</div>
		);
	}
	renderItem(problem, props) {
        if (problem.Private === true) {
            return (
                <div key={problem.ID} id="nodisplay">
                </div>
            );
        } else if (problem.Title === props.grandParentTitle) {
        return (
            <div key={problem.ID} id="nodisplay">
            </div>
        );

        } else {
            return (
                <Link key={problem.ID} to={'/project/'+problem.ID +'/tree'}>
                    <li key={problem.ID} id="overViewRowUnit2">
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