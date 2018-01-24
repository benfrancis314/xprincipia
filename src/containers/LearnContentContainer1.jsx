import React from 'react';
import axios from 'axios';
import LearnContentUnit1 from '../components/learn/LearnContentUnit1.jsx';
import {Config} from '../config.js'

export default class LearnContentContainer1 extends React.Component {
constructor(props){
        super(props);

        this.state = {
            learnItems: []
        }
        
    };
    componentDidMount(){
        var self = this;
        if(this.props.params.solutionID){
            return axios.get( Config.API + '/learnItems/typeID?id='+this.props.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    learnItems: response.data
                })
            })  
        } else {
            return axios.get( Config.API + '/learnItems/typeID?id='+this.props.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    learnItems: response.data
                })
            }) 
        }
    }
    componentWillReceiveProps(nextProps){
        var self = this;
        if(this.props.params.solutionID){
            return axios.get( Config.API + '/learnItems/typeID?id='+nextProps.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    learnItems: response.data
                })
            })  
        } else {
            return axios.get( Config.API + '/learnItems/typeID?id='+nextProps.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    learnItems: response.data
                })
            }) 
        }
    }
   render() {
       return (
            <div id="suggestionContainer">
                {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                <LearnContentUnit1 learnItems={this.state.learnItems} />
            </div>  
      );
    }  
}
