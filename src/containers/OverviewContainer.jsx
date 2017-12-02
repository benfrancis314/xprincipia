import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {Config} from '../config.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import OverviewGrandChildUnits from '../components/overview/OverviewGrandChildUnits.jsx';
import OverviewChildUnits from '../components/overview/OverviewChildUnits.jsx';
import OverviewUnits from '../components/overview/OverviewUnits.jsx';
import OverviewGrandParentUnits from '../components/overview/OverviewGrandParentUnits.jsx';
import OverviewParentUnits from '../components/overview/OverviewParentUnits.jsx';




export default class ErrorContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            parentID: [],
            parentTitle: [],
            parentID: [],
            parentTitle: [],
            probID: [],
            problemInfo: [],
            level1Problems: [],
            level2Problems: [],
            level3Problems: [],
            level4Problems: [],
            level5Problems: [],
        }
    };
    componentDidMount(){
        var self = this;
            axios.get( Config.API + '/problems/subproblems?id='+this.props.params.probID).then(function (response) {
                self.setState({
                    // probID: this.props.params.probID,
                    level4Problems: response.data,
                })
            })
            axios.get( Config.API + '/problems/ID?id='+this.props.params.probID).then(function (response) {
                self.setState({
                    problemInfo: response.data,
                    // parentID: response.data.parentID
                })
            })
       
    }


    render() {
      return (
        <div id="overViewWide">
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={2000}
                transitionEnter={false}
                transitionLeave={false}>
                <Link to={`/project/${this.props.params.probID}/subprojects`}>
                    <div id="exitTreeButton">
                        <img src={require('../assets/redX.svg')} id="exitTreeLogo" width="35" height="35" alt="Delete Button, Red X" />
                    </div>
                </Link>
            {/* Link this to current project (top of projects column) */}
            {/* <Link to={`/project/${this.props.params.probID}/subprojects`}>
                <img src={require('../assets/redX.svg')} id="overViewX" width="30" height="30" alt="Close button, red X symbol" />
            </Link> */}
            <div id="overViewHeader">
                <img src={require('../assets/treeWhite1.svg')} width="50" height="50" alt="User avatar, DNA Helix" />
                <br />
                {/* x{this.props.params.probID}x
                <br />
                x{this.state.problemInfo.ID}x
                <br />
                x{this.state.problemInfo.Title}x */}
                <br />
                x{this.state.problemInfo.ParentID}x
                <br />
                x{this.state.problemInfo.GrandParentID}x
            </div>
            <div id="overViewContainer">
                <OverviewGrandParentUnits problems={this.state.level4Problems} />
                <OverviewParentUnits parentTitle={this.state.problemInfo.ParentTitle} grandParentID={this.state.problemInfo.GrandParentID}/>
                <OverviewUnits projectTitle={this.state.problemInfo.Title} projectID={this.props.params.probID} parentID={this.state.problemInfo.ParentID} />
                <OverviewChildUnits problems={this.state.level4Problems} />
                <OverviewGrandChildUnits problems={this.state.level4Problems} />
            </div>
            {this.props.children}
            </ReactCSSTransitionGroup>
        </div>
      );
   }
}