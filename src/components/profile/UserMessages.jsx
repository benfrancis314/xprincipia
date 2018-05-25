import React from 'react';
import {Link} from 'react-router';
import axios from 'axios'
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import $ from 'jquery';



export default class ProfileNotifications extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            messages: [],
            description: '',
            user1: '',
            user2: '',
            message: '',
        }

        this.renderItem = this.renderItem.bind(this)
        this.postMessage = this.postMessage.bind(this)
        this.startConversation = this.startConversation.bind(this)
    // this.submitVote = this.submitVote.bind(this)
};

componentDidMount(){
    var self = this;
    axios.get( Config.API + '/messages/convo?user1='+this.props.params.username+'&user2='+cookie.load('userName')).then(function (response) {
        self.setState({
            messages: response.data,
            rerender: '0',
        })
    })  
}
componentWillReceiveProps (nextProps){
    var self = this;
    axios.get( Config.API + '/messages/convo?user1='+nextProps.params.username+'&user2='+cookie.load('userName')).then(function (response) {
        self.setState({
            messages: response.data,
            rerender: '0',
        })
    })  

}
postMessage() {
    var self = this;
    // self.refs.messagebtn.setAttribute("disabled", "disabled");

    this.state.message = document.getElementById('conversationEntry').value
    axios.post( Config.API + '/auth/messages/create', {
        user1 : cookie.load('userName'),
        user2 : this.props.params.username,
        description : this.state.message,
      })
      .then(function (response) {
        // return axios.get( Config.API + '/messages/convo?user1='+nextProps.params.user1+'&user2='+nextProps.params.user2).then(function (response) {
        //     self.setState({
        //         messages: response.data
        //     })
        // })  
        document.getElementById("conversationSubmit").reset();
        // self.refs.messagebtn.removeAttribute("disabled");

      })
      .catch(function (error) {
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();

                if (error.response.data == '[object Object]') {
                  return (
                    $(document).ready(function() {
                      $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                      $('#notificationContent').html('Please <span id="blue">login </span>to create a project');
                    })
                  );
                }  else if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
          });
        //   self.refs.messagebtn.removeAttribute("disabled");
      });
    };
   startConversation() {
        var self = this;
        // self.refs.messagebtn.setAttribute("disabled", "disabled");
    
        this.state.user1 = cookie.load('userName')
        this.state.user2 = this.props.params.username
        this.state.message = document.getElementById('conversationEntry').value
        axios.post( Config.API + '/auth/messages/create', {
            user1 : this.state.user1,
            user2 : this.state.user2,
            description : this.state.message,
          })
          axios.post( Config.API + '/auth/conversations/create', {
            user1 : this.state.user1,
            user2 : this.state.user2,
          })
          .then(function (response) {
            document.getElementById("conversationSubmit").reset();
            // self.refs.messagebtn.removeAttribute("disabled");
          })
          .catch(function (error) {
    
              $(document).ready(function() {
                  $('#notification').attr('id','notificationShow').hide().slideDown();
    
                    if (error.response.data == '[object Object]') {
                      return (
                        $(document).ready(function() {
                          $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                          $('#notificationContent').html('Please <span id="blue">login </span>to create a project');
                        })
                      );
                    }  else if (error.response.data != '') {
                    $('#notificationContent').text(error.response.data);
                  }
              });
            //   self.refs.messagebtn.removeAttribute("disabled");
          });
        };


	render() {
        // setInterval(this.causeRerender(), 5000);
        
        if (this.state.messages.length !== 0) {
        
        return (
	    <div id="conversationContainer">
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={2000}
                transitionEnter={false}
                transitionLeave={false}>
            <Link to={`/messages`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
            </Link>
            <div id="conversationTop">
                <br />
            </div>
            <div id="conversationInstructions">
                {this.props.params.username}
            </div>
            <form id='conversationSubmit'>
                <textarea id="conversationEntry" autoFocus autoComplete="off"></textarea>
                <Link to={window.location.pathname} onClick={this.postMessage}>
                    <input id="conversationSubmitButton" ref='messagebtn' type="button" value="submit"></input>
                </Link>
            </form>
            <ul id="conversationMessagesList"> 
                {this.state.messages.map(this.renderItem)} 

            </ul>
            </ReactCSSTransitionGroup>
	    </div>
        );
    } else {
        return (
            <div id="conversationContainer">
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={2000}
                    transitionEnter={false}
                    transitionLeave={false}>
                <Link to={`/messages`}>
                    <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
                </Link>

                <div id="conversationTop">
                    <br />
                </div>
                <div id="conversationInstructions">
                    {this.props.params.username}
                </div>
                <form id='conversationSubmit'>
                    <textarea id="conversationEntry" placeholder="Start a dialogue with a fellow member." autoFocus autoComplete="off"></textarea>
                    <Link to={window.location.pathname} onClick={this.startConversation}>
                        <input id="conversationSubmitButton" ref='messagebtn' type="button" value="send"></input>
                    </Link>
                </form>
                {/* <ul id="conversationMessagesList"> 
                    {this.state.messages.map(this.renderItem)} 

                </ul> */}
                </ReactCSSTransitionGroup>
            </div>
        )  
    }
	}

   renderItem(message) {
       if (cookie.load('userName') == message.User1) {
        return (
            <li key={message.ID}>
                <div id='conversationMessages2'> 
                    <div id="blueConversation2">
                        {message.User1}
                    </div>
                    <div id="whiteConversation2">
                        {message.Description}
                    </div>
                </div>
            </li>
        );
    } else {
        return (
            <li key={message.ID}>
                <div id='conversationMessages1'> 
                    <div id="blueConversation1">
                        {message.User1}
                    </div>
                    <div id="whiteConversation1">
                        {message.Description}
                    </div>
                </div>
            </li>
        )
    }
   }
}
