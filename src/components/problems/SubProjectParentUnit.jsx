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

    componentWillMount(){
        var self = this;
            return axios.get( Config.API + '/problems/ID?id='+this.props.parentID).then(function (response) {
                self.setState({
                    parent: response.data
                })
								console.log(parent.Title);
            }) 
    }


   render() {
		 
		 if (this.state.parent.Title == undefined) {
			 		 return (
			<div id="parentButton">XPrincipia Projects</div>);
		}
		else {
		 return (
			<div id="parentButton">{this.state.parent.Title}</div>
			);
		}
	}
}
