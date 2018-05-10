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
            linkPath: '',
            baseParentTitle1: '',
            baseParentTitle2: '',
            baseParentLinkPath: '',



        }
        this.hoverParentListButton = this.hoverParentListButton.bind(this);
        this.unHoverParentListButton = this.unHoverParentListButton.bind(this);
        
    };


    componentDidMount(){
        var self = this;
        if (window.location.pathname.includes('private')) {
            self.setState({
                linkPath: '/project/private/',
                baseParentTitle1: 'mind',
                baseParentTitle2: 'temple',
                baseParentLinkPath: '/mindtemple',
            })
        } else {
            self.setState({
                linkPath: '/project/',
                baseParentTitle1: 'centralized',
                baseParentTitle2: 'projects',
                baseParentLinkPath: '/welcome',
            })
        }
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
        if (window.location.pathname.includes('private')) {
            self.setState({
                linkPath: '/project/private/',
                baseParentTitle1: 'mind',
                baseParentTitle2: 'temple',
                baseParentLinkPath: '/mindtemple',
            })
        } else {
            self.setState({
                linkPath: '/project/',
                baseParentTitle1: 'centralized',
                baseParentTitle2: 'projects',
                baseParentLinkPath: '/welcome',
            })
        }
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
                <Link to={this.state.linkPath+this.state.solutionInfo.ProblemID+'/proposal/'+this.props.parentID}>
                    <div id="parentButton">
                        <span id='blue'>proposal: </span>{this.state.solutionInfo.Title}
                    </div>
                </Link>
            </div>
      );		 
    } else if ((this.props.parentID === 0)&&(this.state.parentList.length > 0)) {
		return (
            <div id="fullWide">
                <ParentListContainer parentList={this.state.parentList}/>
                <div id="parentButtonContainer">
                    <Link to={this.state.baseParentLinkPath}>
                        <div id="parentButton">
                            <span id='blue'>{this.state.baseParentTitle1} </span>{this.state.baseParentTitle2}
                        </div>
                    </Link>
                    <div id="parentListButton" onMouseOver={this.hoverParentListButton} onMouseOut={this.unHoverParentListButton}>
                        <img src={require('../../assets/alternateBlue1.svg')} id="parentListImg" width="45" height="45" alt="Project Tree Button, white tree"  onClick={this.showParentList}/>
                    </div>
                </div>
            </div>
            );
    } else if (this.props.parentID === 0) {
        return (
            <div id="fullWide">
                {/* <ParentListContainer parentList={this.state.parentList}/> */}
                <div id="parentButtonContainer">
                    <Link to={this.state.baseParentLinkPath}>
                        <div id="parentButton">
                            <span id='blue'>{this.state.baseParentTitle1} </span>{this.state.baseParentTitle2}
                        </div>
                    </Link>
                    {/* <div id="parentListButton" onMouseOver={this.hoverParentListButton} onMouseOut={this.unHoverParentListButton}>
                        <img src={require('../../assets/alternateBlue1.svg')} id="parentListImg" width="45" height="45" alt="Project Tree Button, white tree"  onClick={this.showParentList}/>
                    </div> */}
                </div>
            </div>
            );
    } else if (this.state.parentList.length > 0) {
		return (
            <div id="fullWide">
                <ParentListContainer parentList={this.state.parentList}/>
                <div id="parentButtonContainer">
                    <Link to={this.state.linkPath+this.props.parentID+'/subprojects'}>
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
	else {
		 return (
            //  If possible, only show this if a project has multiple parents
            //  Using an IF statement. 
			<div id="fullWide">
                {/* <ParentListContainer parentList={this.state.parentList}/> */}
                <div id="parentButtonContainer">
                    <Link to={this.state.linkPath+this.props.parentID+'/subprojects'}>
                        <div id="parentButton">
                            <span id="parentText"><span id='blue'>parent: </span>{this.state.parent.Title}</span>
                        </div>
                    </Link>
                    {/* <div id="parentListButton" onMouseOver={this.hoverParentListButton} onMouseOut={this.unHoverParentListButton}>
                        <img src={require('../../assets/alternateBlue1.svg')} id="parentListImg" width="45" height="45" alt="Project Tree Button, white tree"  onClick={this.showParentList}/>
                    </div> */}
                </div>
            </div>
			);
		}
	}
}
