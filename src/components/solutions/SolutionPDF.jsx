import React from 'react';
import axios from 'axios';
import {Config} from '../../config.js';



export default class SolutionPDF extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            keyURL: [],
        }
    };
    //initialize the component with this state
    componentDidMount(){
      var self = this;
          self.setState({
              keyURL: ("https://s3.us-east-2.amazonaws.com/xprincipiabucket/" + String(this.props.solutionInfo.Key)),
          })
    }
    componentWillReceiveProps(nextProps){
        var self = this;
            self.setState({
                keyURL: ("https://s3.us-east-2.amazonaws.com/xprincipiabucket/" + String(nextProps.solutionInfo.Key)),
            })
      }

   render() {
      
      if (this.props.solutionInfo.Key == '0') {
          return (
            <div> 
                {/* NO PDF */}
            </div>
          )
      } else {
      return (
        <div> 
            STRING{String(this.props.solutionInfo.Key)}STRING
            <iframe id="proposalPDFContainer" src={this.state.keyURL}/>
            <img id="proposalPDFContainer" src={this.state.keyURL}/>

            {/* <div id="proposalPDFContainer" src={this.state.keyURL}> </div> */}
        </div>
      );
   }
}}


 