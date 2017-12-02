import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';
import OverviewProjectUnits from './OverviewProjectUnits.jsx';


export default class SubProblemContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problems: []
        }
        
    };

    componentDidMount(){
        var self = this;
        return axios.get( Config.API + '/problems/subproblems?id='+this.props.parentID).then(function (response) {
            self.setState({
                problems: response.data
            })
        })  
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        return axios.get( Config.API + '/problems/subproblems?id='+nextProps.parentID).then(function (response) {
            self.setState({
                problems: response.data
            })
        }) 
    }

    render() {
        /*if (this.props.params.solutionID) {
            return (
                <div id="sidebarSBProjects">
                        <SubProblemUnit problems={this.state.problems} />
                </div>
        );
            } else {*/
            return (
                <div id="sidebarSBProjects">
                    <OverviewProjectUnits problems={this.state.problems} projectTitle={this.props.projectTitle}/>
                </div>
            
            );
        }
    }