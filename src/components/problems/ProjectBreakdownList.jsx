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
	
	render() {
		return (
			<div id="breakdownProjectsContainer">				
				<div id="breakdownProjectsList">
					<Link to={`/project/${this.props.probID}/create/breakdown/${this.props.breakdownID}`}>
						<li id="SPUnit">
							<div id="SPHeader">
								<img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="80" height="80" alt="User avatar, DNA Helix" />
							</div>
						</li>
					</Link>
					{this.state.problems.map(this.renderItem)}
				</div>
				<div>
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