import React from 'react';
import axios from 'axios';
import SuggestionUnit from '../components/suggestions/SuggestionUnit.jsx';
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
   render() {
    if (this.props.params.solutionID){
        return (
            <div id="suggestionContainer">
                {this.props.children}
                <SuggestionUnit suggestions={this.state.suggestions} />
            </div>
        );
    } else {
        return (
            <div id="suggestionContainer">
                {this.props.children}
                <SuggestionUnit suggestions={this.state.suggestions} />
            </div>
      
        );
    }
      
}}