import React from 'react';
import axios from 'axios';
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
            return axios.get( Config.API + '/freeForms/typeID?id='+this.props.params.probID).then(function (response) {
                self.setState({
                    freeForms: response.data
                })
            }) 
    }
   render() {
        if (this.props.params.solutionID){
            return (
                <div id="suggestionContainer">
                    {this.props.children}
                    {/*<FreeFormUnit freeForms={this.state.freeForms} />*/}
                </div>
            );
        } else {
            return (
                <div id="suggestionContainer">
                    {this.props.children}
                    <FreeFormUnit freeForms={this.state.freeForms} />
                </div>       
            );
        }   
}}