import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProfileNotifications extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            conversations: [],
        }

        this.renderItem = this.renderItem.bind(this)
    // this.submitVote = this.submitVote.bind(this)
};
componentDidMount() {
    var self = this;
    axios.get( Config.API + '/conversations/username?user1='+cookie.load('userName')+'&user2='+cookie.load('userName')).then(function (response) {
        self.setState({
            conversations: response.data
        })
    })  
}
componentWillReceiveProps(nextProps) {
    var self = this;
    axios.get( Config.API + '/conversations/username?user1='+cookie.load('userName')+'&user2='+cookie.load('userName')).then(function (response) {
        self.setState({
            conversations: response.data
        })
    }) 
}

	render() {

		return (
	    <div id="fullWide">
            {this.props.children}
            <ul> 
                {/* {this.state.conversations.length} */}
                {this.state.conversations.map(this.renderItem)}
			</ul>
		</div>
		);
	}
	renderItem(conversation) {
        if(conversation.Notifications > 0) {
            var notificationNumber = conversation.Notifications
        } else {
            var notificationNumber = ''
        }
        
        if(conversation.User1 == cookie.load('userName')) {
            return (
            <Link key={conversation.ID} to={`messages/${conversation.User1}/${conversation.User2}`} activeClassName="activeMessage">
                <li key={conversation.ID}>
                    <div id="messagesUnit">
                        <div id="messageTitle">
                            {conversation.User2}
                        </div>
                        <div id="conversationNotificationNumber">
                            {notificationNumber}
                        </div>
                    </div>   
                </li>
            </Link>
        );
        } else {
            return (
            <Link key={conversation.ID} to={`messages/${conversation.User2}/${conversation.User1}`} activeClassName="activeMessage">
                <li key={conversation.ID}>
                    <div id="messagesUnit">
                        <div id="messageTitle">
                            {conversation.User1}
                        </div>
                        <div id="conversationNotificationNumber">
                            {notificationNumber}
                        </div>
                    </div>
                </li>
            </Link>
        );
    }
   }
}
