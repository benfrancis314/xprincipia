import React from 'react';
import { Link  } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js'

export default class FullProblem extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            parent: [],
        }
    };


    componentDidMount(){
        var self = this;
            return axios.get( Config.API + '/problems/ID?id='+self.props.parentID).then(function (response) {
                self.setState({
                    parent: response.data
                })
            }) 
    }

componentWillReceiveProps (nextProps){
     var self = this;
        return axios.get( Config.API + '/problems/ID?id='+nextProps.parentID).then(function (response) {
            self.setState({
                parent: response.data
            })
        }) 
}
   render() {
		 
	if (this.props.parentID === 0) {
		return (
            <div>
                <Link to={`/problem/${this.props.parentID}/subproblems`}>
                    <div id="parentButton">
                        <span id='blue'>Parent: </span>XPrincipia Projects
                    </div>
                </Link>
            </div>
            );
		}
	else {
		 return (
			<div>
                <Link to={`/problem/${this.props.parentID}/subproblems`}>
                    <div id="parentButton">
                        <span id='blue'>Parent: </span>{this.state.parent.Title}
                    </div>
                </Link>
            </div>
			);
		}
	}
}
