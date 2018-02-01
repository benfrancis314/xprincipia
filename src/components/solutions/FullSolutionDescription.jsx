import React from 'react';
import axios from 'axios';
import {Config} from '../../config.js';
import SolutionPDF from './SolutionPDF.jsx';



export default class FullSolutionDescription extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutionInfo: [],
            solutionID: []
        }
    };
    //initialize the component with this state
    componentDidMount(){
      var self = this;
      return axios.get( Config.API + '/solutions/ID?id='+this.props.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,
          })
    }) 
}
// This doesn't work
    // componentWillReceiveProps(nextProps){
    //     var self = this;
    //         return axios.get( Config.API + '/solutions/ID?id='+nextProps.solutionID).then(function (response) {
    //             self.setState({
    //                 solutionInfo: response.data,
    //                 // solutionID: nextProps.solutionID,
    //             })
    //         })
    // }

//   On recieving new props
  componentWillReceiveProps(nextProps){
	  var self = this
	        return axios.get( Config.API + '/solutions/ID?id='+nextProps.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,  
          })
            })
  }
   render() {
      
      if (this.state.solutionInfo.References === "" ) {
          return (
      <div> 
            <div>
              <br />
              <div id="solutionFormLabel">DESCRIPTION</div>
              <p id="solutionDescription">
                  {this.state.solutionInfo.Description}
              </p>
            </div>
            <SolutionPDF solutionInfo={this.state.solutionInfo} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p id="xp">XP</p>
            <br />
      </div>
          )
      } else {
      return (
      <div> 
            <div>
              <br />
              <div id="solutionFormLabel">DESCRIPTION</div>
              <p id="solutionDescription">
                  {this.state.solutionInfo.Description}
              </p>
            </div>
            <SolutionPDF solutionInfo={this.state.solutionInfo} />
            <div>
              <div id="solutionFormLabel">SOURCES</div>
              <p id="solutionReferences">
                 {this.state.solutionInfo.References}
              </p>
            </div>
            <br />
            <br />
            <p id="xp">XP</p>
            <br />
      </div>
      );
   }
}}


 