import React from 'react';
import axios from 'axios';
import {Config} from '../../config.js';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:48435c33-63c3-4825-a3de-0c06e01d2c90',
});

var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'xprincipiabucket'}
  });
  
  var params = {
    Bucket: "xprincipiabucket", 
    Key: "6"
   };



export default class SolutionPDF extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            keyURL: [],
            s3get: [],
        }

    };
    //initialize the component with this state
    componentDidMount(){
      var self = this;
          self.setState({
              keyURL: ("https://s3.us-east-2.amazonaws.com/xprincipiabucket/" + String(this.props.solutionInfo.Key)),
          })

    // ATTEMPT AT S3 GET CALL
    // var params = {
    //     Bucket: "xprincipiabucket", 
    //     Key: String(this.props.solutionInfo.Key)
    // };

        s3.getObject(params, function(err, data) {

            if (err) {
                console.log(err, err.stack);
            }
            else {
                console.log(data)
                self.setState({
                    s3get: data,
                })
                // console.log(String(this.props.solutionInfo.Key));
            }
        });
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
            Length: {this.state.s3get.length}
            <br />
            Data ETag: 
            <br />
            <br />
            <br />


            STRING{String(this.props.solutionInfo.Key)}STRING
            {/* <iframe id="proposalPDFContainer" src={this.state.keyURL}/> */}
            {/* <embed id="benPaperContainer" src={String(this.state.keyURL)}></embed> */}
            
            
            {/* BEST OPTION SO FAR */}
            {/* <object type="text/html" data={String(this.state.keyURL)} id="embedLink">
            </object> */}


            {/* <object type="text/html" data='https://1wyrmshadow1.deviantart.com/art/Io-Terraformed-166829014' id="embedLink">
            </object> */}
            {/* <img id="proposalPDFContainer" src={this.state.keyURL}/> */}
            <br />
            --{this.state.keyURL}--
            <br />
            End URL

            {/* <div id="proposalPDFContainer" src={this.state.keyURL}> </div> */}
        </div>
      );
   }
}}


 