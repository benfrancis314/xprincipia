import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';
import OverviewChildUnits from './OverviewChildUnits.jsx';


export default class OverviewChildContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problems: []
        }
        
    };

    componentDidMount(){
        var self = this;
        return axios.get( Config.API + '/problems/subproblems?id='+this.props.projectID).then(function (response) {
            self.setState({
                problems: response.data
            })
        })  
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        return axios.get( Config.API + '/problems/subproblems?id='+nextProps.projectID).then(function (response) {
            self.setState({
                problems: response.data
            })
        }) 
    }

    render() {
            return (
                <div id="sidebarSBProjects">
                    <OverviewChildUnits problems={this.state.problems} />
                </div>
            
            );
        }
    }