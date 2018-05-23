import React from 'react';
import axios from 'axios';
import {Config} from '../../config.js';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:48435c33-63c3-4825-a3de-0c06e01d2c90',
});


export default class SolutionPDF extends React.Component {
  
    constructor(props){
        super(props);

        this.state = {
            solutionInfo: [],
        }
    };

      componentDidMount() {
        var self = this;

    }
    componentWillReceiveProps(nextProps) {
        var self = this;
    }

   render() {
      
    if (this.props.solutionInfo.PDF == '') {
        return (
          <div> 
              {/* NO PDF */}
          </div>
        )
    } else if (this.props.solutionInfo.ID === '1') {
        return (
          <div> 
              <object id="benPaperContainer" data={require('../../assets/TheMentalWorldXPrincipiaVersion.pdf')}></object>
          </div>
        )
    } else {
      return (
        <div id="fullWide">     
            <object id="proposalPDF" data={"data:application/pdf;base64," + this.props.solutionInfo.PDF}></object>
        </div>
      );
   }
}}


 