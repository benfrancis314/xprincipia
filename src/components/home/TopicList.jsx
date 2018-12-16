import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import TopicUnit from './TopicUnit.jsx';
import ReactGA from 'react-ga';


export default class TopicList extends React.Component {
   
//   unHoverText() {
//       $(document).ready(function() {
//           $('#logoNameGuide').html('<span id="xBlue">x</span>principia');             
//           $('#logoNameGuide').attr('id','logoName');
//       });
//   }

    constructor(props){
        super(props);

        this.state = {
           topics : [],
        }

        this.showTopicForm = this.showTopicForm.bind(this);
        this.hideTopicForm = this.hideTopicForm.bind(this);
        this.postTopic = this.postTopic.bind(this);
        this.refreshTopics = this.refreshTopics.bind(this);
    };

    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/topics/all').then(function (response) {
            self.setState({
                topics: response.data,
            })
        }) 
    }
    componentDidReceiveProps(nextProps){
        var self = this;
        axios.get( Config.API + '/topics/all').then(function (response) {
            self.setState({
                topics: response.data,
            })
        }) 
    }

    refreshTopics() {
        var self = this;
        axios.get( Config.API + '/topics/all').then(function (response) {
            self.setState({
                topics: response.data,
            })
        }) 
    }

    postTopic() {
        var self = this;
        this.state.title = document.getElementById('newTopicFormTitle').value
        
        axios.post( Config.API + '/topics/create', {
          title : this.state.title,
        })
        .then(function (result) {
              document.getElementById("newTopicForm").reset();
              self.refreshTopics();
              self.hideTopicForm();
        })
        .catch(function (error) {
              alert(error.response.data);
      });
    }

    showTopicForm() {
		$(document).ready(function() {
            $('#newTopicFormContainerHide').attr('id','newTopicFormContainer');
            $('#newTopicButton').attr('id','newTopicButtonHide');
        });
        ReactGA.event({
            category: 'Topic',
            action: 'Topic Form',
            label: 'Show Form',
        });
    };
    
    hideTopicForm() {
		$(document).ready(function() {
            $('#newTopicFormContainer').attr('id','newTopicFormContainerHide');
            $('#newTopicButtonHide').attr('id','newTopicButton');
        });
        ReactGA.event({
            category: 'Topic',
            action: 'Topic Form',
            label: ('Close Form, ' + document.getElementById("newTopicForm").value),
        });
	};

   render() {
    
    function gaTopicFormTitleClick() {
        ReactGA.event({
            category: 'Topic',
            action: 'Topic Form',
            label: 'Click Title',
        });
    }

    function gaTopicFormTitleWrite() {
        ReactGA.event({
            category: 'Topic',
            action: 'Topic Form',
            label: ('Write Title:'+document.getElementById("newTopicFormTitle").value),
        });
    }

            return (
                <div id="topicListContainer">
                    <div id="topicListTitle">
                        [ - -  TOPICS  - - ]
                    </div>
                    <div id="topicListBody">
                        <TopicUnit topicsProps={this.state.topics} />
                        <div id="newTopicButton" onClick={this.showTopicForm}>
                        </div>
                        {/* Starts hidden unless new topic button is clicked  */}
                        <div id="newTopicFormContainerHide">
                            <div id="newTopicClose" onClick={this.hideTopicForm}>
                                <img src={require('../../assets/redX2.svg')} id="projectModuleClose2" width="22" height="22" alt="Project Tree Button, white tree" />
                            </div>
                            <form id="newTopicForm">
                                <input onClick={gaTopicFormTitleClick} onChange={gaTopicFormTitleWrite} type="text" required="required" maxLength="70" id="newTopicFormTitle" placeholder="NEW TOPIC" autoFocus />
                            </form>
                            <div id="newTopicCreate" onClick={this.postTopic}>
                                ADD
                            </div>
                        </div>
                        {/* End hidden section */}
                    </div>
                </div>
            );
    }
}

// Alt Topic Button
{/* <div id="newTopicButton" onClick={this.showTopicForm}>
    <img src={require('../../assets/addPlusSharpBlue2.svg')} id="newTopicPlus" width="25" height="25" alt="User avatar, DNA Helix" />
</div> */}