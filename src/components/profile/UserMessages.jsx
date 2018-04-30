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
            rerender: '',
            user1: '',
            user2: '',
            message: '',
        }

        this.renderItem = this.renderItem.bind(this)
        this.postMessage = this.postMessage.bind(this)
        this.startConversation = this.startConversation.bind(this)
        this.causeRerender = this.causeRerender.bind(this)
    // this.submitVote = this.submitVote.bind(this)
};

componentDidMount(){
    var self = this;
    return axios.get( Config.API + '/messages/convo?user1='+this.props.params.username+'&user2='+cookie.load('userName')).then(function (response) {
        self.setState({
            messages: response.data,
            rerender: '0',
        })
    })  
}
componentWillReceiveProps (nextProps){
    var self = this;
    return axios.get( Config.API + '/messages/convo?user1='+nextProps.params.username+'&user2='+cookie.load('userName')).then(function (response) {
        self.setState({
            messages: response.data,
            rerender: '0',
        })
    })  

}
postMessage() {
    var self = this;
    self.refs.btn.setAttribute("disabled", "disabled");

    this.state.description = document.getElementById('conversationEntry').value
    axios.post( Config.API + '/auth/messages/create', {
        user1 : cookie.load('userName'),
        user2 : this.props.params.username,
        // description : this.state.description,
      })
      .then(function (response) {
        // return axios.get( Config.API + '/messages/convo?user1='+nextProps.params.user1+'&user2='+nextProps.params.user2).then(function (response) {
        //     self.setState({
        //         messages: response.data
        //     })
        // })  
        document.getElementById("conversationSubmit").reset();
        self.refs.btn.removeAttribute("disabled");
        document.location = window.location.pathname 

        
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
      });
    };
   startConversation() {
        var self = this;
        self.refs.messagebtn.setAttribute("disabled", "disabled");
    
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
            self.refs.messagebtn.removeAttribute("disabled");
            // document.location = window.location.pathname 
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
              self.refs.messagebtn.removeAttribute("disabled");
          });
        };

// Attempt to keep autofocus on without page always scrolling down to it
// componentDidMount() {
//     window.scrollTo(0,0);
// }

causeRerender() {
    alert('rerender');
}

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
                {this.props.params.user2}
            </div>
            <form id='conversationSubmit'>
                <textarea id="conversationEntry" autoFocus autoComplete="off"></textarea>
                <Link to={window.location.pathname}>
                    <input id="conversationSubmitButton" ref='btn' type="button" value="submit" onClick={this.postMessage}></input>
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
                    {this.props.params.user2}
                    {/* <br />
                    {this.props.params.user1} */}
                </div>
                <form id='conversationSubmit'>
                    <textarea id="conversationEntry" placeholder="Start a dialogue with a fellow member." autoFocus autoComplete="off"></textarea>
                    <Link to={window.location.pathname}>
                        <input id="conversationSubmitButton" ref='messagebtn' type="button" value="submit" onClick={this.startConversation}></input>
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