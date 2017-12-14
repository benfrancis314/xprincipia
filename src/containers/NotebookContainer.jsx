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
        this.newNotebook = this.newNotebook.bind(this)
        this.bigNotebook = this.bigNotebook.bind(this)
        // this.hoverThread = this.hoverThread.bind(this)
    };

// When mounting and getting the call, do an IF statement first,
// where IF there is the notebookContainerShow, THEN mount, otherwise don't.
// This will prevent it from always mounting and make the site faster


componentWillMount(){
    var self = this;
    // Axios call getting most recent notebook
//     return axios.get( Config.API + '/notebooks/username?username='+cookie.load('userName')).then(function (response) {
//         self.setState({
//             // Set to result of axios call getting most recent notebook

//             currentNotebook: '1',
//             notebooks: response.data,
//             rerender: '0',
//         })
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
newNotebook() {
    var self = this;
    alert('initiateNewNotebook');
    // alert(notebookID)

    // self.setState({
    //     currentNotebook: notebookID,
    // });
    self.setState({
        currentNotebook: '2',
    });
    // bigNotebook();
    // alert('successChangeNotebook');
} 

bigNotebook() {
    var self = this;
    self.setState({
        currentNotebook: tomquickfix
    })
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
                currentNotebook: '2',
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






   render() {
    
      return (
        <div id="notebookContainer">
            <div id="notebookButtonRow">
                {/* <img src={require('../assets/save2.svg')} id="saveNotebookButton" onClick={this.saveNotebook.bind(this)} width="30" height="30" alt="Close button, red X symbol" /> */}
                <img src={require('../assets/redX.svg')} id="exitNotebookButton" onClick={this.hideNotebook.bind(this)} width="30" height="30" alt="Close button, red X symbol" />  
            </div>
            <div id="notebookContainerRow">
                <div id="notebookUnitContainer">
                <div id="notebookUnitHeader" onClick={this.newNotebook}>
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
                <div id="fullWide">   
                    <ul id="notebootUnitList">
                        {this.state.notebooks.map(this.renderItem)}
                    </ul>
                </div>
                {/* <NotebookUnit notebooks={this.state.notebooks} switchNotebook={this.newNotebook} test={'1'} /> */}
                x{this.state.notebooks.length}x
            </div>
                {/* <NotebookFull ref="full"  */}
                {/* // currentNotebook={tomquickfix} 
                currentNotebook={this.state.currentNotebook}
                /> */}
                x{tomquickfix}x
            </div>
        </div>
      );
    }
    renderItem(notebook) {
        // $(document).ready(function() {
            
            // $(document).ready(function() {           
            //     // $('#notebookContainerShow').attr('id','notebookContainer');
            //     $("#notebookID").click(
            //         function(){
            //         // alert('successfuljQuery' + $("#notebookUnit").text());
            //             alert('5');
    
            //         // $('#notebookID').attr('id','blue');
            //         }
            //     );
            // });  

            
        // });
        
        return (
            <li key={notebook.ID} id="notebookUnit" 
                // onClick={this.bigNotebook}
                >
                {notebook.Title}
                <div id="notebookID">
                    {notebook.ID}
                </div>
                {/* <NotebookSubUnit id={notebook.ID} testAlert={this.testAlert} title={notebook.Title}/> */}
            </li>
        );
    function hoverNotebook(notebookTitle) {
        // var self = this;
        // $(document).ready(function() {
        //     $('#notebookID').attr('id','discussHoverTextShow'+String(notebook.ID));
        // });
        tomquickfix = notebook.ID
        // notebookstate(tomquickfix)
        alert(tomquickfix)
        // alert(notebook.ID)

        // newNotebook()

        // self.setState({
        //         currentNotebook: '2',
        //     });
    }
}
}
// function notebookstate(noteid) {
//     NotebookContainer.setState({
//         currentNotebook: noteid
//     })
// }