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
        }

        this.renderItem = this.renderItem.bind(this)
        this.postMessage = this.postMessage.bind(this)
    // this.submitVote = this.submitVote.bind(this)
};

componentDidMount(){
    var self = this;
    return axios.get( Config.API + '/messages/convo?user1='+this.props.params.user1+'&user2='+this.props.params.user2).then(function (response) {
        self.setState({
            messages: response.data
        })
    })  
}
componentWillReceiveProps (nextProps){
    var self = this;
    return axios.get( Config.API + '/messages/convo?user1='+nextProps.params.user1+'&user2='+nextProps.params.user2).then(function (response) {
        self.setState({
            messages: response.data
        })
    })  
}
postMessage() {
    this.state.description = document.getElementById('conversationEntry').value
    axios.post( Config.API + '/auth/messages/create', {
        user1 : this.props.params.user1,
        user2 : this.props.params.user2,
        description : this.state.description,
      })
      .then(function (response) {
        // return axios.get( Config.API + '/messages/convo?user1='+nextProps.params.user1+'&user2='+nextProps.params.user2).then(function (response) {
        //     self.setState({
        //         messages: response.data
        //     })
        // })  
            document.location = window.location.pathname 
            // alert('success ')
        
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


// Attempt to keep autofocus on without page always scrolling down to it
// componentDidMount() {
//     window.scrollTo(0,0);
// }



	render() {
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
            {/* <div id="messageQuillImg">
                <img src={require('../../assets/quillBlue1.svg')} id="newMessageAddButtonImg" width="40" height="40" alt="User avatar, DNA Helix" />
            </div> */}

            <div id="conversationTop">
                <br />
            </div>
            <div id="conversationInstructions">
                {this.props.params.user2}
                {this.state.messages.length}
                {/* <br />
                {this.props.params.user1} */}
            </div>
            <form id='conversationSubmit'>
                <textarea id="conversationEntry" autoFocus autoComplete="off"></textarea>
                <input id="conversationSubmitButton" type="button" value="submit" onClick={this.postMessage}></input>
            </form>
            <ul id="conversationMessagesList"> 
                {this.state.messages.map(this.renderItem)} 

            </ul>
            {/* <div id="textBoxBottom">
                <br />
            </div> */}
            <div id="messageQuillImg">
                <img src={require('../../assets/quillBlue1.svg')} id="newMessageAddButtonImg" width="40" height="40" alt="User avatar, DNA Helix" />
            </div>
            {/* Have this change the text at top to "start a conversation" */}
            </ReactCSSTransitionGroup>
	    </div>
		);
	}

   renderItem(message) {
       if (cookie.load('userName') == this.props.params.user1) {
        return (
            <li key={message.ID}>
                <div id='conversationMessages2'> 
                    <div id="blueConversation2">
                        {this.props.params.user1}
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
                        {this.props.params.user2}
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
