import React from 'react';
import axios from 'axios';
import DiscussUnit from '../components/discuss/DiscussUnit.jsx';
import DiscussUnitPrivate from '../components/discuss/DiscussUnitPrivate.jsx';
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
            return axios.get( Config.API + '/questions/typeID?id='+this.props.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    questions: response.data
                })
            }) 
    }
    componentWillReceiveProps(nextProps){
        var self = this;
            return axios.get( Config.API + '/questions/typeID?id='+nextProps.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    questions: response.data
                })
            }) 
    }
   
   render() {
    if (window.location.pathname.include('private')) {

        return (
            <div id="questionContainer">
                private
                {/* {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})} */}
                {/* <DiscussUnitPrivate questions={this.state.questions} /> */}
            </div>
      
        );
} else {
    return (
        <div id="questionContainer">
            {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
            <DiscussUnit questions={this.state.questions} />
        </div>
  
    );
}
}
}