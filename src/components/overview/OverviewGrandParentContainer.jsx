import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';
import OverviewGrandParentUnits from './OverviewGrandParentUnits.jsx';


export default class SubProblemContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problems: []
        }
        
    };

    componentDidMount(){
        var self = this;
        return axios.get( Config.API + '/problems/subproblems?id='+this.props.ggParentID).then(function (response) {
            self.setState({
                problems: response.data
            })
        })  
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        return axios.get( Config.API + '/problems/subproblems?id='+nextProps.ggParentID).then(function (response) {
            self.setState({
                problems: response.data
            })
        }) 
    }

    render() {
            return (
                <div id="sidebarSBProjects">
                    {/* GrandParentID */}
                    <OverviewGrandParentUnits problems={this.state.problems} grandParentID={this.props.grandParentID} grandParentTitle={this.props.grandParentTitle} ggParentID={this.props.ggParentID}/>
                </div>
            );
        }
    }