import React from 'react';
import { Link  } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js'

export default class FullProblem extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            parent: [],
            solutionInfo: []

        }
    };


    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/solutions/ID?id='+this.props.parentID).then(function (response) {
            self.setState({
                solutionInfo: response.data,
            })
            // var solutionInfo = self.state.solutionInfo
            // self.setState({
            //     solutionInfo : solutionInfo
            // })

        })
        axios.get( Config.API + '/problems/ID?id='+self.props.parentID).then(function (response) {
                self.setState({
                    parent: response.data
                })
            }) 
    }
    // componentDidMount(){
    //     var self = this;
    //         axios.get( Config.API + '/solutions/ID?id='+self.props.parentID).then(function (response) {
    //             self.setState({
    //                 solutionInfo: response.data
    //             })
    //         }) 
            
    //         axios.get( Config.API + '/problems/ID?id='+self.props.parentID).then(function (response) {
    //             self.setState({
    //                 parent: response.data
    //             })
    //         }) 
    // }

componentWillReceiveProps (nextProps){
     var self = this;
        axios.get( Config.API + '/solutions/ID?id='+nextProps.parentID).then(function (response) {
            self.setState({
                solutionInfo: response.data,
            })
        })
        axios.get( Config.API + '/problems/ID?id='+nextProps.parentID).then(function (response) {
            self.setState({
                parent: response.data
            })
        }) 
}
   render() {

    if (this.props.parentType === 1) {

      return (
            <div>
                <Link to={`/project/${this.state.solutionInfo.ProblemID}/proposal/${this.props.parentID}`}>
                    <div id="parentButton">
                        <span id='blue'>Proposal: </span>{this.state.solutionInfo.Title}
                    </div>
                </Link>
            </div>
      );		 
} else if (this.props.parentID === 0) {
		return (
            <div>
                <Link to={`/welcome`}>
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
                <Link to={`/project/${this.props.parentID}/subprojects`}>
                    <div id="parentButton">
                        <span id='blue'>Parent: </span>{this.state.parent.Title}
                    </div>
                </Link>
            </div>
			);
		}
	}
}
