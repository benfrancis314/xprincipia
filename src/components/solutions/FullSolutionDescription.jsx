import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js'

export default class FullSolutionDescription extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutionInfo: [],
            probID: [],
            solutionID: []
        }
    };
    //initialize the component with this state
    componentDidMount(){
      var self = this;
      return axios.get( Config.API + '/solutions/ID?id='+this.props.params.solutionID).then(function (response) {
          self.setState({
              solutionInfo: response.data,
          })
    }) 
    }

  //On recieving new props
  componentWillReceiveProps(nextProps){
	  var self = this
	        return axios.get( Config.API + '/solutions/ID?id='+nextProps.params.solutionID).then(function (response) {
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
              <div id="solutionFormLabel">Description</div>
              <p id="solutionDescription">
                  {this.state.solutionInfo.Description}
              </p>
            </div>
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
              <div id="solutionFormLabel">Description</div>
              <p id="solutionDescription">
                  {this.state.solutionInfo.Description}
              </p>
            </div>
            <div>
              <div id="solutionFormLabel">References</div>
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


 
  function dateTime(str) {
     if(str != undefined){
        var result = str.substring(0,9);
        return result
     }
}