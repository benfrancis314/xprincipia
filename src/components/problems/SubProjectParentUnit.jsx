import React from 'react';
import { Link  } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';
import ParentListContainer from './ParentListContainer.jsx';


export default class FullProblem extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            parent: [],
            solutionInfo: [],
            parentList: [],


        }
        this.hoverParentListButton = this.hoverParentListButton.bind(this);
        this.unHoverParentListButton = this.unHoverParentListButton.bind(this);
        
    };


    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/solutions/ID?id='+this.props.parentID).then(function (response) {
            self.setState({
                solutionInfo: response.data,
            })

        })
        axios.get( Config.API + '/problems/ID?id='+this.props.parentID).then(function (response) {
            self.setState({
                parent: response.data
            })
        }) 
        axios.get( Config.API + '/problems/linkparents?problemid='+this.props.probID).then(function (response) {
            self.setState({
                parentList: response.data
            })
        }) 
    }
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
        axios.get( Config.API + '/problems/linkparents?problemid='+nextProps.probID).then(function (response) {
            self.setState({
                parentList: response.data
            })
        }) 
}


hoverParentListButton() {
    $(document).ready(function() {
        // $('#privateContainerMotto').html("ALTERNATE PARENTS").fadeIn(7500);
        // $('#privateContainerMotto').attr('id','privateContainerMottoBlue');
    });
}
unHoverParentListButton() {
    $(document).ready(function() {
        // $('#privateContainerMottoBlue').html("PROJECT BREAKDOWN");
        // $('#privateContainerMottoBlue').attr('id','privateContainerMotto');
    });
}
showParentList() {
    $(document).ready(function() {
        $('#parentListContainer').attr('id','parentListContainerShow');
        $('#parentListImg').attr('id','parentListImgHover');
    });
}

   render() {

    if (this.props.parentType === 1) {

      return (
            <div>
                <Link to={`/project/${this.state.solutionInfo.ProblemID}/proposal/${this.props.parentID}`}>
                    <div id="parentButton">
                        <span id='blue'>proposal: </span>{this.state.solutionInfo.Title}
                    </div>
                </Link>
            </div>
      );		 
} else if (this.props.parentID === 0) {
		return (
            <div id="fullWide">
                <ParentListContainer parentList={this.state.parentList}/>
                <div id="parentButtonContainer">
                    <Link to={`/welcome`}>
                        <div id="parentButton">
                            <span id='blue'>parent: </span>xprincipia projects
                        </div>
                    </Link>
                    <div id="parentListButton" onMouseOver={this.hoverParentListButton} onMouseOut={this.unHoverParentListButton}>
                        <img src={require('../../assets/alternateBlue1.svg')} id="parentListImg" width="45" height="45" alt="Project Tree Button, white tree"  onClick={this.showParentList}/>
                    </div>
                </div>
            </div>
            );
		}
	else {
		 return (
            //  If possible, only show this if a project has multiple parents
            //  Using an IF statement. 
			<div id="fullWide">
                <ParentListContainer parentList={this.state.parentList}/>
                <div id="parentButtonContainer">
                    <Link to={`/project/${this.props.parentID}/subprojects`}>
                        <div id="parentButton">
                            <span id="parentText"><span id='blue'>parent: </span>{this.state.parent.Title}</span>
                        </div>
                    </Link>
                    <div id="parentListButton" onMouseOver={this.hoverParentListButton} onMouseOut={this.unHoverParentListButton}>
                        <img src={require('../../assets/alternateBlue1.svg')} id="parentListImg" width="45" height="45" alt="Project Tree Button, white tree"  onClick={this.showParentList}/>
                    </div>
                </div>
            </div>
			);
		}
	}
}
