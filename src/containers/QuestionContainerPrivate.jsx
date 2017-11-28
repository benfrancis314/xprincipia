import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import QuestionForm from '../components/questions/QuestionForm.jsx';
import QuestionProposalUnitPrivate from '../components/questions/QuestionProposalUnitPrivate.jsx';
import QuestionUnitPrivate from '../components/questions/QuestionUnitPrivate.jsx';
import {Config} from '../config.js'

export default class QuestionContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            questions: [],
           
        }
        this.renderItem = this.renderItem.bind(this)
        this.handler = this.handler.bind(this)
    };

    handler(e) {
        e.preventDefault()
        return axios.get( Config.API + '/questions/typeID?id='+this.props.params.probID+'&dataType=0').then(function (response) {
            self.setState({
                questions: response.data
            })
        }) 
      }
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
    componentWillReceiveProps(nextProps, nextState){
        var self = this;
        if(nextProps.params.solutionID){
            return axios.get( Config.API + '/questions/typeID?id='+nextProps.params.solutionID+'&dataType=1').then(function (response) {
                 self.setState({
                     questions: response.data
                 })
             })  

         } else {
             return axios.get( Config.API + '/questions/typeID?id='+nextProps.params.probID+'&dataType=0').then(function (response) {
                 self.setState({
                     questions: response.data
                 })
             }) 
             
     }
            //  self.setState({
            //     questions: nextState.questions
            //  })
    }
   
   render() {
        //If user is on fullsolution make use solutionID
    if (this.props.params.solutionID){
        return (
            <div id="questionContainer">
                {/* {this.props.children} */}
                <QuestionForm handler = {this.handler} />
                <QuestionProposalUnitPrivate questions={this.state.questions} probID={this.props.params.probID} solutionID={this.props.params.solutionID} />
            </div>
        );
    } else {
        return (
            <div id="questionContainer">
                {this.props.children}
                {/* <QuestionUnitPrivate questions={this.state.questions} /> */}
                <ul> {this.state.questions.map(this.renderItem)} </ul>	   
            </div>
      
        );
    }
      
}
renderItem(question) { 
    return (
        <li key={question.ID} id="questionUnit"> 
                <div id="suggestionContent">
                    <div id="discussHeader">
                        {/*{question.Username}*/}
                    </div>
                    <div id="suggestionText">
                        <span id="blue">Q: </span>{question.Description}
                    </div>
                </div>
                <Link to={`/project/private/${question.TypeID}/question/${question.ID}/delete`} >
                <div id="deleteSBButton">
                        <img src={require('../assets/delete.svg')} id="editLogo" width="18" height="18" alt="Delete Button" />
                    </div>
                </Link>
                <Link to={`/project/private/${question.TypeID}/question/${question.ID}/edit`}>
                    <div id="editSBButton">
                        <img src={require('../assets/editBlue.svg')} id="editLogo" width="18" height="18" alt="Edit Button" />
                    </div>
                </Link>
                <Link to={`/project/private/${question.TypeID}/question/${question.ID}/answers`} activeClassName="activeGlow">
                    <div id="commentSBButtonUser">
                            <img src={require('../assets/comments.svg')} id="commentLogo" width="24" height="24" alt="Comments Button" />
                    </div>                
                </Link>
            
        </li>);
}
}