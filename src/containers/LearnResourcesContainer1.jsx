import React from 'react';
import axios from 'axios';
import LearnUnit from '../components/learn/LearnUnit.jsx';
import LearnResourcesEmbed from '../components/learn/LearnResourcesEmbed.jsx';
import {Config} from '../config.js'

export default class LearnResourcesContainer1 extends React.Component {
constructor(props){
        super(props);

        this.state = {
            resources: []
        }
        
    };
    componentDidMount(){
        var self = this;
        if(this.props.params.solutionID){
            return axios.get( Config.API + '/resources/typeID?id='+this.props.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    resources: response.data
                })
            })  
        } else {
            return axios.get( Config.API + '/resources/typeID?id='+this.props.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    resources: response.data
                })
            }) 
        }
    }
    componentWillReceiveProps(nextProps){
        var self = this;
        if(this.props.params.solutionID){
            return axios.get( Config.API + '/resources/typeID?id='+nextProps.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    resources: response.data
                })
            })  
        } else {
            return axios.get( Config.API + '/resources/typeID?id='+nextProps.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    resources: response.data
                })
            }) 
        }
    }
   render() {
       return (
            <div>
                <div id="suggestionContainer">
                    {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                    <LearnUnit resources={this.state.resources} />
                </div>  
            </div>
      );
    }  
}
