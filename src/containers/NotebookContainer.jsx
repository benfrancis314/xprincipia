import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../config.js';
import NotebookFull from '../components/notebooks/NotebookFull.jsx';
import $ from 'jquery';


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
        this.hoverNewNotebook = this.hoverNewNotebook.bind(this)
        this.unHoverNewNotebook = this.unHoverNewNotebook.bind(this)
    };

// When mounting and getting the call, do an IF statement first,
// where IF there is the notebookContainerShow, THEN mount, otherwise don't.
// This will prevent it from always mounting and make the site faster


componentDidMount(){
    var self = this;
    // OLD
    // if (cookie.load('userName') != undefined) { 
    self.setState({ 
        userToken: cookie.load('userToken'),
        username: cookie.load('userName'),
        notification: this.props.notification,
    })
    // console.log(this.state.username)
    if (cookie.load('userName') !== undefined ) { 
        // console.log('notebook YES')
        axios.get( Config.API + '/notebooks/username/top?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                currentNotebook: response.data.ID,
            })
            document.getElementById('notebookFullTitle').value = response.data.Title;
            document.getElementById('notebookFullContent').value = response.data.Description;
            document.getElementById('notebookFullResources').value = response.data.Sources;
        })
        axios.get( Config.API + '/notebooks/username?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                notebooks: response.data,
                rerender: '0',
            })
        })
    } else {
        // console.log('notebook NO')
    }
}
componentWillReceiveProps(nextProps){
    var self = this;
    // OLD
    // if (cookie.load('userName') != undefined) { 
    self.setState({ 
        userToken: cookie.load('userToken'),
        username: cookie.load('userName'),
        notification: nextProps.notification,
    })
    if (cookie.load('userName') !== undefined ) { 
        // console.log('notebook YES')
        axios.get( Config.API + '/notebooks/username/top?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                currentNotebook: response.data.ID,
            })
            document.getElementById('notebookFullTitle').value = response.data.Title;
            document.getElementById('notebookFullContent').value = response.data.Description;
            document.getElementById('notebookFullResources').value = response.data.Sources;
        })
        axios.get( Config.API + '/notebooks/username?username='+cookie.load('userName')).then(function (response) {
            self.setState({
                notebooks: response.data,
                rerender: '0',
            })
        })
    } else {
        // console.log('notebook NO')
    }
}

setCurrentNotebook(notebookID) {
    var self = this;
    self.setState({
        currentNotebook: notebookID,
    });
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
        title : '',
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

hoverNewNotebook() {
    $(document).ready(function() {
        $('#notebookUnitHeader').html('<span id="brightWhite">new </span>notebook').fadeIn(7500);
        $('#notebookUnitHeader').attr('id','notebookUnitHeaderBlue');
    });
    // alert('hoversaved')
}

unHoverNewNotebook() {
    $(document).ready(function() {
        $('#notebookUnitHeaderBlue').html("notebooks").fadeIn(7500);
        $('#notebookUnitHeaderBlue').attr('id','notebookUnitHeader');
    });
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
    

    // if (this.state.userToken !== undefined ) { 

      return (
        <div id="notebookContainer">
            {/* <div id="notebookRow"> */}
                <div id="notebookContainerRow">
                    <div id="notebookUnitContainer">
                        <div id="notebookAddButton" onClick={this.createNotebook}
                            onMouseOver={this.hoverNewNotebook} onMouseOut={this.unHoverNewNotebook}>
                                <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="30" height="30" alt="User avatar, DNA Helix" />
                        </div>
                        <div id="notebookUnitHeader">
                            notebooks
                        </div>
                        <div id="notebookSavedLabel" 
                        // onClick={this.saveNotebookClick} onMouseOver={this.hoverUnsaved} onMouseOut={this.unHoverUnsaved}
                        >
                            {/* saved */}
                            auto saving
                        </div>
                        
                        <div id="fullWide">   
                            <ul id="notebootUnitList">
                                {this.state.notebooks.map(this.renderItem)}
                            </ul>
                        </div>
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
    // } else {
    //     return (
    //         <div id="noDisplay">
    //         </div>
    //     )
    // }
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

        if (notebook.Title == '') {
            var title = 'new notebook'
        } else {
            var title = notebook.Title
        }

        return (
            <li key={notebook.ID} id="notebookUnit" 
                onClick={notebookChange.bind(this)} 
                >
                {title}
                {/* <NotebookSubUnit id={notebook.ID} testAlert={this.testAlert} title={notebook.Title}/> */}
            </li>
        );
        
  }
}