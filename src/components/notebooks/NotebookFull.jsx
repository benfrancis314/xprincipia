import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import $ from 'jquery';
import {Config} from '../../config.js';

export default class NotebookFull extends React.Component {
   
    constructor(props){
        super(props);

        this.state = {
            // timer: '0',
            notebook: [],
        }

        this.updateNotebook = this.updateNotebook.bind(this);
        this.unSavedTitle = this.unSavedTitle.bind(this);
        this.unSaved = this.unSaved.bind(this);
        this.testUnsaved = this.testUnsaved.bind(this);
        this.testUnsavedTest1 = this.testUnsavedTest1.bind(this);
        this.testUnsavedTest2 = this.testUnsavedTest2.bind(this);
        this.testUnsavedTest3 = this.testUnsavedTest3.bind(this);
        this.testUnsavedTest4 = this.testUnsavedTest4.bind(this);
        this.showDelete = this.showDelete.bind(this);
        this.hideDelete = this.hideDelete.bind(this);
        this.hoverCloseNotebook = this.hoverCloseNotebook.bind(this)
        this.unHoverCloseNotebook = this.unHoverCloseNotebook.bind(this)
        
    };
    //initialize the component with this state
    componentWillMount(){
      var self = this;
      return axios.get( Config.API + '/notebooks/username/top?username='+cookie.load('userName')).then(function (response) {
          self.setState({
              notebook: response.data,
          })
          document.getElementById('notebookFullTitle').value = self.state.notebook.Title;
          document.getElementById('notebookFullContent').value = self.state.notebook.Description;
          document.getElementById('notebookFullResources').value = self.state.notebook.Sources;
    })
  }
  componentWillReceiveProps(nextProps){
    var self = this;
    return axios.get( Config.API + '/notebooks/ID?id='+nextProps.currentNotebook).then(function (response) {
        self.setState({
            notebook: response.data,
        })
        document.getElementById('notebookFullTitle').value = self.state.notebook.Title;
        document.getElementById('notebookFullContent').value = self.state.notebook.Description;
        document.getElementById('notebookFullResources').value = self.state.notebook.References;
  })
}
  updateNotebook() {
    
    // if (document.getElementById('notebookSavedLabel') == null) {
    //Read field items into component state
    this.state.title = document.getElementById('notebookFullTitle').value
    this.state.description = document.getElementById('notebookFullContent').value
    this.state.references = document.getElementById('notebookFullResources').value

  var self = this;
  axios.put( Config.API + '/auth/notebooks/update?id='+self.state.notebook.ID, {
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
  // }
}
// ON UNMOUNT, SAVE PROJECT
componentWillUnmount() {
    //Read field items into component state
    this.state.title = document.getElementById('notebookFullTitle').value
    this.state.description = document.getElementById('notebookFullContent').value
    this.state.references = document.getElementById('notebookFullResources').value

  var self = this;
  axios.put( Config.API + '/auth/notebooks/update?id='+this.props.currentNotebook, {
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
  unSavedTitle() {
    $(document).ready(function() {
        $('#notebookSavedLabel').html("unsaved").fadeIn(7500);
        $('#notebookSavedLabel').attr('id','notebookUnsavedLabel');
    });
    // self.setState({
    //   timer: '0',
    // })
    // setTimeout(this.props.updateList(), 10000);

    setTimeout(this.testUnsavedTest1(), 1000);
  }
  unSaved() {
    $(document).ready(function() {
        $('#notebookSavedLabel').html("unsaved").fadeIn(7500);
        $('#notebookSavedLabel').attr('id','notebookUnsavedLabel');
    });
    // self.setState({
    //   timer: '0',
    // })
    setTimeout(this.testUnsavedTest1(), 1000);
  }
testUnsavedTest1() {
  if (document.getElementById('notebookSavedLabel') == null) {
    setTimeout(this.testUnsavedTest2(), 1000);
  }
  // self.setState({
  //   timer: '1',
  // })
}
testUnsavedTest2() {
  if (document.getElementById('notebookSavedLabel') == null) {
    setTimeout(this.testUnsavedTest3(), 1000);
}
}
testUnsavedTest3() {
  if (document.getElementById('notebookSavedLabel') == null) {
    setTimeout(this.testUnsavedTest4(), 1000);
  }
}
testUnsavedTest4() {
  if (document.getElementById('notebookSavedLabel') == null) {
    setTimeout(this.testUnsaved(), 1000);
  }
}

testUnsaved() {
  if (document.getElementById('notebookSavedLabel') != true) {
    this.updateNotebook()
    setTimeout(this.updateNotebook(), 1000);
  }
}
hideNotebook() {
  // Get this to automatically save a notebook if one is open
  this.updateNotebook()
  $(document).ready(function() {           
      $('#notebookContainerShow').attr('id','notebookContainer');
  });
}
showDelete() {
  $(document).ready(function() {           
      $('#notebookDeleteContainer').attr('id','notebookDeleteContainerShow');
  });
}
hideDelete() {
  $(document).ready(function() {           
      $('#notebookDeleteContainerShow').attr('id','notebookDeleteContainer');
  });
}

hoverCloseNotebook() {
  $(document).ready(function() {
      $('#notebookUnitHeader').html("save and exit").fadeIn(7500);
      $('#notebookUnitHeader').attr('id','notebookUnitHeaderRed');
  });
  // alert('hoversaved')
}

unHoverCloseNotebook() {
  $(document).ready(function() {
      $('#notebookUnitHeaderRed').html("notebooks").fadeIn(7500);
      $('#notebookUnitHeaderRed').attr('id','notebookUnitHeader');
  });
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
        <div id="notebookFullContainer">
            <div id="notebookButtonRow">
                {/* <img src={require('../assets/save2.svg')} id="saveNotebookButton" onClick={this.saveNotebook.bind(this)} width="30" height="30" alt="Close button, red X symbol" /> */}
                <img src={require('../../assets/redX.svg')} id="exitNotebookButton" onClick={this.hideNotebook.bind(this)} onMouseOver={this.hoverCloseNotebook} onMouseOut={this.unHoverCloseNotebook} width="30" height="30" alt="Close button, red X symbol" />  
            </div>
          {/* {this.props.currentNotebook} */}
            <input id="notebookFullTitle" placeholder="notebook title" type="text" onChange={this.unSavedTitle}></input>
            <textarea id="notebookFullContent" placeholder="Brainstorm or record your thoughts. " autoFocus onChange={this.unSaved}></textarea>
            <div id="notebookFullSourcesTitle">
                sources
            </div>
            <textarea id="notebookFullResources" onChange={this.unSaved}  placeholder="add sources here"></textarea>
            {/* <div id="noteBookSaveButton">
                save
            </div> */}
            {/* <div onClick={this.updateNotebook} id="notebookFullTimeStamp"> */}
            {/* Possibly update date each time saved */}
                {/* updated: [timestamp] save! */}
            {/* </div> */}
            <div id="notebookDeleteButton" onClick={this.showDelete}>
              delete
            </div>
            <div id="notebookDeleteContainer">
              confirm to permanently delete notebook
              <div id="notebookDeleteOptions">
                <div id="notebookDeleteReturn" onClick={this.hideDelete}>
                  return
                </div>
                <div id="notebookDeleteConfirm">
                  delete
                </div>
              </div>
            </div>
        </div>
      );
    }
}