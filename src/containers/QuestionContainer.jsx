import React from 'react';
import axios from 'axios';
import QuestionUnit from '../components/QuestionUnit.jsx';
import QuestionForm from '../components/QuestionForm.jsx';
import SideBarMore from '../components/SideBarMore.jsx';

export default class QuestionContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            questions: [],
           
        }
        
    };
        componentDidMount(){
        var self = this;
        return axios.get('http://ec2-13-58-19-50.us-east-2.compute.amazonaws.com/auth/questions/typeID?id='+this.props.params.probID).then(function (response) {
            self.setState({
                questions: response.data
            })
        })  
    }
   
   render() {
      return (
        <div id="questionContainer">
          <QuestionForm probID={this.props.params.probID} questID={this.props.params.questID}/>
            <QuestionUnit probID={this.props.params.probID} questID={this.props.params.questID} questions={this.state.questions} />
            <SideBarMore />
        </div>
      
      );
   }
}

