import React from 'react';
import axios from 'axios';
import SuggestionProposalUnitPrivate from '../components/suggestions/SuggestionProposalUnitPrivate.jsx';
import SuggestionUnitPrivate from '../components/suggestions/SuggestionUnitPrivate.jsx';
import {Config} from '../config.js'

export default class SuggestionContainer extends React.Component {
constructor(props){
        super(props);

        this.state = {
            suggestions: []
        }
        
    };
    componentDidMount(){
        var self = this;
        if(this.props.params.solutionID){
            return axios.get( Config.API + '/suggestions/typeID?id='+this.props.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    suggestions: response.data
                })
            })  
        } else {
            return axios.get( Config.API + '/suggestions/typeID?id='+this.props.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    suggestions: response.data
                })
            }) 
        }
    }
    componentWillReceiveProps(nextProps){
        var self = this;
        if(this.props.params.solutionID){
            return axios.get( Config.API + '/suggestions/typeID?id='+nextProps.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    suggestions: response.data
                })
            })  
        } else {
            return axios.get( Config.API + '/suggestions/typeID?id='+nextProps.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    suggestions: response.data
                })
            }) 
        }
    }
   render() {
    if (this.props.params.solutionID){
        return (
            <div id="suggestionContainer">
                {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                <SuggestionProposalUnitPrivate suggestions={this.state.suggestions} probID={this.props.params.probID} solutionID={this.props.params.solutionID} />
            </div>
        );
    } else {
        return (
            <div id="suggestionContainer">
                {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                <SuggestionUnitPrivate suggestions={this.state.suggestions} />
            </div>
      
        );
    }
      
}}