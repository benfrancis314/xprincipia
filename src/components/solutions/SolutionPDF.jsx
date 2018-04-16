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
            dataString: '',
        }
        this.Uint8ToBase64 = this.Uint8ToBase64.bind(this)
    };

    Uint8ToBase64(u8Arr) {
        var CHUNK_SIZE = 0x8000; //arbitrary number
        var index = 0;
        var length = u8Arr.length;
        var result = '';
        var slice;
        while (index < length) {
          slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length)); 
          result += String.fromCharCode.apply(null, slice);
          index += CHUNK_SIZE;
        }
        return btoa(result);
      }

    componentDidMount(){
      var self = this;
          self.setState({
              keyURL: ("https://s3.us-east-2.amazonaws.com/xprincipiabucket/" + String(this.props.solutionInfo.Key)),
          })

        s3.getObject(params, function(err, data) {

            if (err) {
                console.log(err, err.stack);
            }
            else {
                // console.log(data);
                var b64encoded = self.Uint8ToBase64(data.Body)

                self.setState({
                    dataString: b64encoded,
                })
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
        <div id="fullWide"> 
            <object id="proposalPDF" data={"data:application/pdf;base64," + this.state.dataString}></object>
        </div>
      );
   }
}}


 