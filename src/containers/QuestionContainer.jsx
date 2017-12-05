import React from 'react';
import axios from 'axios';
import QuestionProposalUnit from '../components/questions/QuestionProposalUnit.jsx';
import QuestionUnit from '../components/questions/QuestionUnit.jsx';
import {Config} from '../config.js'

export default class QuestionContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            questions: [],
           
        }
        
    };
    componentDidMount(){
        var self = this;
            if(this.props.params.solutionID){
               return axios.get( Config.API + '/questions/typeID?id='+this.props.params.solutionID+'&dataType=1').then(function (response) {
                    self.setState({
                        questions: response.data
                    })
                })  

            } else {
                return axios.get( Config.API + '/questions/typeID?id='+this.props.params.probID+'&dataType=0').then(function (response) {
                    self.setState({
                        questions: response.data
                    })
                }) 
        }
    }
   
   render() {
        //If user is on fullsolution make use solutionID
    if (this.props.params.solutionID){
        return (
            <div id="questionContainer">
                {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                <QuestionProposalUnit questions={this.state.questions} probID={this.props.params.probID} />
            </div>
        );
    } else {
        return (
            <div id="questionContainer">
                {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                <QuestionUnit questions={this.state.questions} />
            </div>
      
        );
    }
      
}

}