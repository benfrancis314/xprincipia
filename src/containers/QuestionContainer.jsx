import React from 'react';
import axios from 'axios';
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
            return axios.get( Config.API + '/questions/typeID?id='+this.props.params.probID).then(function (response) {
                self.setState({
                    questions: response.data
                })
            }) 
    }
   
   render() {
        //If user is on fullsolution make use solutionID
    if (this.props.params.solutionID){
        return (
            <div id="questionContainer">
                {this.props.children}
                {/*<QuestionUnit questions={this.state.questions} />*/}
            </div>
        );
    } else {
        return (
            <div id="questionContainer">
                {this.props.children}
                <QuestionUnit questions={this.state.questions} />
            </div>
      
        );
    }
      
}

}