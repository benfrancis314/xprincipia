import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class OverviewChildUnits extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        problems: []
    }

  };


    //On recieving new props
  componentWillReceiveProps(nextProps){
	  var self = this
	  self.setState({problems: nextProps.problems})
  }


	render() {
		return (
        <div id="overViewColumn">
            <div id="overViewLineageLabel4">
                children
            </div>
            <Link to={`/project/${this.props.probID}/create`} activeClassName="activePrivateCreateButton">
                <div id="overViewAddButton">
                    <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="30" height="30" alt="User avatar, DNA Helix" />
                </div>
			</Link>
			<ul> 
                {/* <div id="overViewRowUnitTop4">
                    <div id="overViewTitle">
                        Thoughts
                    </div>
                    <div id="overViewViewButton">
                        view
                    </div>
                </div> */}
				{this.state.problems.map(this.renderItem)}
			</ul>
		</div>
		);
	}
	renderItem(problem) {
        return (
            <Link key={problem.ID} to={'/project/'+problem.ID +'/tree'}>
                <li key={problem.ID} id="overViewRowUnit4">
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