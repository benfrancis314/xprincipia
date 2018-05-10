import React from 'react';
import axios from 'axios';
import FreeFormProposalUnit from '../components/freeform/FreeFormProposalUnit.jsx';
import FreeFormUnit from '../components/freeform/FreeFormUnit.jsx';
import {Config} from '../config.js'

export default class FreeFormContainer extends React.Component {
constructor(props){
        super(props);

        this.state = {
            freeForms: []
        }
        
    };
    componentDidMount(){
        var self = this;
        if(this.props.params.solutionID){
            return axios.get( Config.API + '/freeForms/typeID?id='+this.props.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    freeForms: response.data
                })
            })  
        } else {
            return axios.get( Config.API + '/freeForms/typeID?id='+this.props.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    freeForms: response.data
                })
            }) 
        }
    }
    componentWillReceiveProps(nextProps){
        var self = this;
        if(this.props.params.solutionID){
            return axios.get( Config.API + '/freeForms/typeID?id='+nextProps.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    freeForms: response.data
                })
            })  
        } else {
            return axios.get( Config.API + '/freeForms/typeID?id='+nextProps.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    freeForms: response.data
                })
            }) 
        }
    }
   render() {
        if (this.props.params.solutionID){
            return (
                <div id="suggestionContainer">
                    {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                    <FreeFormProposalUnit freeForms={this.state.freeForms} probID={this.props.params.probID} />
                </div>
            );
        } else {
            return (
                <div id="suggestionContainer">
                    {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                    <FreeFormUnit freeForms={this.state.freeForms} />
                </div>       
            );
        }   
}}