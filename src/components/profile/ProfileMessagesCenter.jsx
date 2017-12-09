import React from 'react';
import {Link} from 'react-router';
import axios from 'axios'
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProfileNotifications extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            conversations: []
        }

        this.renderItem = this.renderItem.bind(this)
    // this.submitVote = this.submitVote.bind(this)
};
componentWillMount() {
    var self = this;
    return axios.get( Config.API + '/conversations/username?user1='+cookie.load('userName')+'&user2='+cookie.load('userName')).then(function (response) {
        self.setState({
            conversations: response.data
        })
    })  
}
componentWillReceiveProps(nextProps) {
    var self = this;
    return axios.get( Config.API + '/conversations/username?user1='+cookie.load('userName')+'&user2='+cookie.load('userName')).then(function (response) {
        self.setState({
            conversations: response.data
        })
    }) 
}

	render() {

		return (
	    <div id="fullWide">
            {this.props.children}
            <Link to="/messages/1" activeClassName="activeMessage">
                <div id="messagesUnitXP">
                    <div id="messageTitle">
                        XPrincipia
                    </div>
                </div>
            </Link>
            <ul> 
                {this.state.conversations.map(this.renderItem)}
                <br />
                b{this.state.conversations.length}b
			</ul>
		</div>
		);
	}
	renderItem(conversation) {
        if(conversation.user1 == cookie.load('userName')) {
            return (
            <Link key={conversation.ID} to="/messages/3" activeClassName="activeMessage">
                <li key={conversation.ID}>
                    <div id="messagesUnit">
                        <div id="messageTitle">
                            x{conversation.user1}
                        </div>
                    </div>
                </li>
            </Link>
        );
    } else {
        return (
        <Link key={conversation.ID} to={'/messages/'+conversation.ID} activeClassName="activeMessage">
            <li key={conversation.ID}>
                <div id="messagesUnit">
                    <div id="messageTitle">
                        y{String(conversation.user2)}x
                        y{String(conversation.user1)}y
                        z{String(conversation.ID)}z
                    </div>
                </div>
            </li>
        </Link>
        );
    }
   }
}
