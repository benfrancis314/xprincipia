import React from 'react';
import axios from 'axios';
import FreeFormProposalUnitPrivate from '../components/freeform/FreeFormProposalUnitPrivate.jsx';
import FreeFormUnitPrivate from '../components/freeform/FreeFormUnitPrivate.jsx';
import {Config} from '../config.js'

export default class FreeFormContainerPrivate extends React.Component {
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
   render() {
        if (this.props.params.solutionID){
            return (
                <div id="suggestionContainer">
                    {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                    <FreeFormProposalUnitPrivate freeForms={this.state.freeForms} probID={this.props.params.probID} solutionID={this.props.params.solutionID} />
                </div>
            );
        } else {
            return (
                <div id="suggestionContainer">
                    {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                    <FreeFormUnitPrivate freeForms={this.state.freeForms} />
                </div>       
            );
        }   
}}