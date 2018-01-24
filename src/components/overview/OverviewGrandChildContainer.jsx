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
            topChild: [],
        }
        
    };

    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/problems/subproblems?id='+this.props.topChild.ID).then(function (response) {
            self.setState({
                problems: response.data
            })
        })  
        // axios.get( Config.API + '/problems/topchild?id='+this.props.projectID).then(function (response) {
        //     self.setState({
        //         topChild: response.data
        //     })
        // })  
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        axios.get( Config.API + '/problems/subproblems?id='+nextProps.topChild.ID).then(function (response) {
            self.setState({
                problems: response.data
            })
        }) 
        // axios.get( Config.API + '/problems/topchild?id='+nextProps.projectID).then(function (response) {
        //     self.setState({
        //         topChild: response.data
        //     })
        // })  
    }

    render() {
            return (
                <div id="sidebarSBProjects">
                    top{this.props.topChild.ProblemID}topID
                    <br />
                    top{this.props.topChild}topNORMAL
                    <br />
                    top{this.props.topChild.length}topLENGTH
                    <OverviewGrandChildUnits problems={this.state.problems} />
                </div>
            );
        }
    }