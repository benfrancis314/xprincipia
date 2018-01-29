import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';
import OverviewGrandChildUnits from './OverviewGrandChildUnits.jsx';


export default class OverviewGrandChildContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problems: [],
        }
        
    };

    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/problems/subproblems?id='+this.props.topChild.ID).then(function (response) {
            self.setState({
                problems: response.data,
            })
        })  
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        axios.get( Config.API + '/problems/subproblems?id='+nextProps.topChild.ID).then(function (response) {
            self.setState({
                problems: response.data,
            })
        })  
    }

    render() {
            return (
                <div id="sidebarSBProjects">
                    <OverviewGrandChildUnits problems={this.state.problems} />
                </div>
            );
        }
    }