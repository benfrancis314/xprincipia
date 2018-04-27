import React from 'react';
import axios from 'axios';
import LearnContentUnitPrivate from '../components/learn/LearnContentUnitPrivate.jsx';
import {Config} from '../config.js'

export default class LearnContentContainerPrivate extends React.Component {
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
                {this.props.children}
                <LearnContentUnitPrivate learnItems={this.state.learnItems} />
            </div>  
      );
    }  
}
