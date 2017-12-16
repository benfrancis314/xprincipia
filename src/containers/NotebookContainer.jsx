import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import NotebookFull from '../components/notebooks/NotebookFull.jsx';
import NotebookUnit from '../components/notebooks/NotebookUnit.jsx';
import $ from 'jquery';

var tomquickfix = 2


export default class NotebookContainer extends React.Component {
  constructor(){
        super();

        this.state = {
            currentNotebook: '',
            notebooks: [],
            rerender: '',
        }
        this.renderItem = this.renderItem.bind(this)        
        this.createNotebook = this.createNotebook.bind(this)
        this.updateList = this.updateList.bind(this)
        this.setCurrentNotebook = this.setCurrentNotebook.bind(this)
        this.saveNotebook = this.saveNotebook.bind(this)
        this.saveNotebookClick = this.saveNotebookClick.bind(this)
        this.hoverUnsaved = this.hoverUnsaved.bind(this)
        this.unHoverUnsaved = this.unHoverUnsaved.bind(this)
    };

// When mounting and getting the call, do an IF statement first,
// where IF there is the notebookContainerShow, THEN mount, otherwise don't.
// This will prevent it from always mounting and make the site faster


componentWillMount(){
    var self = this;
    // Axios call getting most recent notebook
    return axios.get( Config.API + '/notebooks/username?username='+cookie.load('userName')).then(function (response) {
        self.setState({
            // Set to result of axios call getting most recent notebook

            // currentNotebook: '1',
            notebooks: response.data,
            rerender: '0',
        })
  })
}
// componentWillReceiveProps(nextProps) {
// }

setCurrentNotebook(notebookID) {
    var self = this;
    self.setState({
        currentNotebook: notebookID,
    });
    // alert('success at setting current notebook');
}


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
        title : 'new notebook',
        description : '',
        sources: '',
        })
    
    .then(function (result) {
        axios.get( Config.API + '/notebooks/username?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                // currentNotebook: '2',
                notebooks: response.data,
                rerender: '1',
            })
      })
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
// Note working currently, use when ready
    //   self.setState({
    //     // Set to result of axios call getting most recent notebook
    //     currentNotebook: '3',
    // });
    // alert('afterStateChange');
    // this.setState({
    //     rerender: '1',
    // });

updateList() {
    var self = this;
    axios.get( Config.API + '/notebooks/username?username='+cookie.load('userName')).then(function (response) {
        self.setState({
            notebooks: response.data,
        })
  })
}

hoverUnsaved() {
    $(document).ready(function() {
        $('#notebookUnsavedLabel').html("save").fadeIn(7500);
        $('#notebookUnsavedLabel').attr('id','notebookSaveLabel');
    });
    // alert('hoversaved')
}
unHoverUnsaved() {
    $(document).ready(function() {
        $('#notebookSaveLabel').html("unsaved").fadeIn(7500);
        $('#notebookSaveLabel').attr('id','notebookUnsavedLabel');
    });
}

saveNotebookClick() {
    this.refs.full.updateNotebook()
    $(document).ready(function() {
        $('#notebookSaveLabel').html("saved").fadeIn(7500);
        $('#notebookSaveLabel').attr('id','notebookSavedLabel');
    });
}


   render() {
    
      return (
        <div id="notebookContainer">
            {/* <div id="notebookRow"> */}
                <div id="notebookContainerRow">
                    <div id="notebookUnitContainer">
                        <div id="notebookAddButton" onClick={this.createNotebook}
                            onMouseOver={this.hoverAdd} onMouseOut={this.unHoverAdd}>
                                <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="30" height="30" alt="User avatar, DNA Helix" />
                        </div>
                        <div id="notebookUnitHeader">
                            notebooks
                        </div>
                        <div id="notebookSavedLabel" onClick={this.saveNotebookClick} onMouseOver={this.hoverUnsaved} onMouseOut={this.unHoverUnsaved}>
                            saved
                        </div>
                        
                        <div id="fullWide">   
                            <ul id="notebootUnitList">
                                {this.state.notebooks.map(this.renderItem)}
                            </ul>
                        </div>
                        {/* <NotebookUnit notebooks={this.state.notebooks} test={'1'} /> */}
                    </div>
                    <NotebookFull ref="full" 
                    updateList={this.updateList} 
                    setCurrentNotebook={this.setCurrentNotebook}
                    currentNotebook={this.state.currentNotebook}
                    />
                </div>
            {/* </div> */}
        </div>
      );
    }
    renderItem(notebook) {
        
        function notebookChange() {
            var self = this;
            self.setState({
                currentNotebook: notebook.ID,
            });
            this.updateList();

            // $(document).ready(function() {
            //     $('#privateContainerMottoBlue').html("PROJECTS CHANGED").fadeIn(7500);
            //     $('#privateContainerMottoBlue').attr('id','privateContainerMottoRed');
            // });

        }

        return (
            <li key={notebook.ID} id="notebookUnit" 
                onClick={notebookChange.bind(this)} 
                >
                {notebook.Title}
                {/* <NotebookSubUnit id={notebook.ID} testAlert={this.testAlert} title={notebook.Title}/> */}
            </li>
        );
        
  }
}