import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import $ from 'jquery';
import {Config} from '../../config.js';
// import {OnUnload} from 'react-window-mixins';
// import Beforeunload from 'react-beforeunload';

// React.createClass({
//     mixins: [ OnUnload ],
  
//     onUnload: function() {
//       // Clean up any resources
//     },
  
//     onBeforeUnload: function() {
//       return 'Are you sure you want to leave the page?';
//     }
//   });

export default class NotebookFull extends React.Component {
   
    constructor(props){
        super(props);

        this.state = {
            solutionInfo: [],
        }

    this.updateNotebook = this.updateNotebook.bind(this);
    this.unSaved = this.unSaved.bind(this);
    this.testUnsaved = this.testUnsaved.bind(this);
    this.testUnsavedTest1 = this.testUnsavedTest1.bind(this);
    this.testUnsavedTest2 = this.testUnsavedTest2.bind(this);
    this.testUnsavedTest3 = this.testUnsavedTest3.bind(this);
    this.testUnsavedTest4 = this.testUnsavedTest4.bind(this);
    
    };
    //initialize the component with this state
    componentWillMount(){
      var self = this;
      return axios.get( Config.API + '/solutions/ID?id='+5).then(function (response) {
          self.setState({
              solutionInfo: response.data,
          })
          document.getElementById('notebookFullTitle').value = self.state.solutionInfo.Title;
          document.getElementById('notebookFullContent').value = self.state.solutionInfo.Description;
          document.getElementById('notebookFullResources').value = self.state.solutionInfo.References;

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
  }
  updateNotebook() {
    //Read field items into component state
    this.state.title = document.getElementById('notebookFullTitle').value
    this.state.description = document.getElementById('notebookFullContent').value
    this.state.references = document.getElementById('notebookFullResources').value

  var self = this;
  axios.put( Config.API + '/auth/solutions/update?id='+5, {
      username: cookie.load('userName'),
      title : self.state.title,
      summary : self.state.summary,
      description : self.state.description,
      references: self.state.references
    })
    .then(function (result) {
        $(document).ready(function() {
            $('#notebookUnsavedLabel').html("saved").fadeIn(7500);
            $('#notebookUnsavedLabel').attr('id','notebookSavedLabel');
            // alert( 'success');
        });
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
  }
// ON UNMOUNT, SAVE PROJECT
componentWillUnmount() {
    //Read field items into component state
    this.state.title = document.getElementById('notebookFullTitle').value
    this.state.description = document.getElementById('notebookFullContent').value
    this.state.references = document.getElementById('notebookFullResources').value

  var self = this;
  axios.put( Config.API + '/auth/solutions/update?id='+5, {
      username: cookie.load('userName'),
      title : self.state.title,
      summary : self.state.summary,
      description : self.state.description,
      references: self.state.references
    })
    .then(function (result) {
    //  document.location = '/project/' + self.props.params.probID + '/proposal/' + self.props.params.solutionID
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
  
  }

  unSaved() {
    $(document).ready(function() {
        $('#notebookSavedLabel').html("unsaved").fadeIn(7500);
        $('#notebookSavedLabel').attr('id','notebookUnsavedLabel');
    });
    setTimeout(this.testUnsavedTest1, 1000);
    // We want to make sure it is unsaved after 1s and 5s, to make sure
    // it is unsaved for at least 5 seconds between saves
  }
testUnsavedTest1() {
  if (document.getElementById('notebookSavedLabel') == null) {
    // this.updateNotebook()
    setTimeout(this.testUnsavedTest2(), 500);
  }
}
testUnsavedTest2() {
  if (document.getElementById('notebookSavedLabel') == null) {
    // this.updateNotebook()
    setTimeout(this.testUnsavedTest3(), 500);
  }
}
testUnsavedTest3() {
  if (document.getElementById('notebookSavedLabel') == null) {
    // this.updateNotebook()
    setTimeout(this.testUnsavedTest4(), 500);
  }
}
testUnsavedTest4() {
  if (document.getElementById('notebookSavedLabel') == null) {
    // this.updateNotebook()
    setTimeout(this.testUnsaved(), 500);
  }
}

testUnsaved() {
  if (document.getElementById('notebookSavedLabel') == null) {
    this.updateNotebook()
    // setTimeout(this.updateNotebook(), 1000);
  }
}

   render() {

// Attempts at Google Docs-like saving every 5 seconds
// Working version is immediately outside of render
// if (document.getElementById('notebookSavedLabel') == null) {
//   setInterval(this.updateNotebook, 5000);
// }

// $('#notebookFullContent').change(function(){
//   if (document.getElementById('notebookUnsavedLabel') !== null) {
//     alert('ifWorks')
//     setTimeout(this.updateNotebook, 1000);
//   }
// })


      return (
        // <div>
            // <Beforeunload onBeforeunload={this.updateNotebook}>
                <div id="notebookFullContainer">
                    <input id="notebookFullTitle" placeholder="notes title" type="text"></input>
                    <textarea id="notebookFullContent" placeholder="Brainstorm or record your thoughts" autoFocus onChange={this.unSaved}></textarea>
                    <div id="notebookFullSourcesTitle">
                        sources
                    </div>
                    <textarea id="notebookFullResources" ></textarea>
                    {/* <div id="noteBookSaveButton">
                        save
                    </div> */}
                    {/* <div onClick={this.updateNotebook} id="notebookFullTimeStamp"> */}
                    {/* Possibly update date each time saved */}
                        {/* updated: [timestamp] save! */}
                    {/* </div> */}
                </div>
            //  </Beforeunload>
        //  </div>
      );
    }
}