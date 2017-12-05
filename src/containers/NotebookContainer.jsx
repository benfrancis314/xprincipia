import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import NotebookFull from '../components/notebooks/NotebookFull.jsx';
import NotebookUnit from '../components/notebooks/NotebookUnit.jsx';
import $ from 'jquery';


export default class NotebookContainer extends React.Component {
  constructor(){
        super();

        this.state = {
            currentNotebook: '',
        }
    };


// When mounting and getting the call, do an IF statement first,
// where IF there is the notebookContainerShow, THEN mount, otherwise don't.
// This will prevent it from always mounting and make the site faster


componentWillMount(){
    var self = this;
    // Axios call getting most recent notebook
    // return axios.get( Config.API + '/solutions/ID?id='+this.props.currentNotebook).then(function (response) {
        self.setState({
            // Set to result of axios call getting most recent notebook
            currentNotebook: '5',
        })
//   })
//     .catch(function (error) {
//       // console.log(error.response.data)
//         $(document).ready(function() {
//             $('#notification').attr('id','notificationShow').hide().slideDown();
//             if (error.response.data != '') {
//               $('#notificationContent').text(error.response.data);
//             }
//             else if (error.response.data == '[object Object]') {
//               return (
//                 $(document).ready(function() {
//                   $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
//                   $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
//                 })
//               );
//             } 
//         });
//     });
}
// componentWillReceiveProps(nextState) {
//     nextState =  { 
//         currentNotebook: '6',
//     };
//   }




saveNotebook() {
    // Get this to automatically save a notebook if one is open
    this.refs.full.updateNotebook()
    // $(document).ready(function() {           
    //     $('#notebookContainerShow').attr('id','notebookContainer');
    // });

}

hideNotebook() {
    // Get this to automatically save a notebook if one is open
    this.refs.full.updateNotebook()
    $(document).ready(function() {           
        $('#notebookContainerShow').attr('id','notebookContainer');
    });
}

createNotebook() {    
  var self = this;
  axios.post( Config.API + '/auth/notebooks/create', {
      username: cookie.load('userName'),
      title : 'test',
      description : '',
      sources: '',
    })
    .then(function (result, self) {
        // $(document).ready(function() {
        //     $('#notebookUnsavedLabel').html("saved").fadeIn(7500);
        //     $('#notebookUnsavedLabel').attr('id','notebookSavedLabel');
        //     // alert( 'success');
        // });

        // Go to new notebook
        alert('success');
        // document.location = '/project/' + self.props.probID + '/subprojects'
    })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });
      self.setState({
        // Set to result of axios call getting most recent notebook
        currentNotebook: '6',
    });
    alert('afterStateChange');
  }





   render() {
    
      return (
        <div id="notebookContainer">
            <div id="notebookButtonRow">
                {/* <img src={require('../assets/save2.svg')} id="saveNotebookButton" onClick={this.saveNotebook.bind(this)} width="30" height="30" alt="Close button, red X symbol" /> */}
                <img src={require('../assets/redX.svg')} id="exitNotebookButton" onClick={this.hideNotebook.bind(this)} width="30" height="30" alt="Close button, red X symbol" />  
            </div>
            <div id="notebookContainerRow">
                <div id="notebookUnitContainer">
                <div id="notebookUnitHeader">
                    notebooks
                </div>
                <div id="notebookSavedLabel">
                    saved
                </div>
                <div id="notebookAddButton" onClick={this.createNotebook}
                /* onMouseOver={this.hoverAdd} onMouseOut={this.unHoverAdd} */
                >
                    <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="35" height="35" alt="User avatar, DNA Helix" />
                </div>
                <NotebookUnit />
            </div>
                <NotebookFull ref="full" currentNotebook={this.state.currentNotebook} />
            </div>
        </div>
      );
    }
}