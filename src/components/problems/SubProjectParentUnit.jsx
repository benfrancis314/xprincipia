import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js'

export default class FullProblem extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            parent: [],
        }
    };


    getInitialState(){
        var self = this;
            return axios.get( Config.API + '/problems/ID?id='+self.props.parentID).then(function (response) {
                self.setState({
                    parent: response.data
                })
            }) 
    }

    componentWillMount(){
        var self = this;
            return axios.get( Config.API + '/problems/ID?id='+self.props.parentID).then(function (response) {
                self.setState({
                    parent: response.data
                })
            }) 
    }


   render() {
		 
	if (this.props.parentID == 0) {
		return (
			<div id="parentButton">
                XPrincipia Projects
            </div>
            );
		}
	else {
		 return (
			<div id="parentButton">
                {this.state.parent.Title}
            </div>
			);
		}
	}
}
