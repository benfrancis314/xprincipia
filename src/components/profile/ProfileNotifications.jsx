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
        notifications: [],
        
    }

    this.renderItem = this.renderItem.bind(this)
};
componentDidMount(props){
    var self = this;
        return axios.get( Config.API + '/notifications/new?username='+cookie.load("userName")).then(function (response) {
            self.setState({
                notifications: response.data
            })
        }) 

    self.props.resetNotifications()
}
componentWillReceiveProps(nextProps) {
    // nextProps.resetNotifications()
}

hoverClearUpdates() {
        $(document).ready(function() {
            // $('#privateContainerMotto').html("NEW PROJECT").fadeIn(7500);
            $('#notificationsHeader').html("clear").fadeIn(7500);
            $('#notificationsHeader').attr('id','notificationsHeaderBlue');
        });
    }
unHoverClearUpdates() {
    $(document).ready(function() {
        // $('#privateContainerMottoBlue').html("ORGANIZE YOUR THOUGHTS");
        $('#notificationsHeaderBlue').html("updates");           
        $('#notificationsHeaderBlue').attr('id','notificationsHeader');
    });
}

	render() {
		return (
	    <div id="fullWide">
            <div id="notificationsHeader" >
                updates
            </div>
            <div id="notificationsCheckButton" onClick={this.props.resetNotifications} onMouseOver={this.hoverClearUpdates} onMouseOut={this.unHoverClearUpdates}>
                <img src={require('../../assets/checkRed1.svg')} id="newMessageAddButtonImg" width="40" height="40" alt="Check mark, clears updates" />
            </div>
            <ul> 
                {this.state.notifications.map(this.renderItem)} 
            </ul>
	    </div>
		);
	}

   renderItem(notification) {
       if (notification.Type == '0') {
        return (
            <Link key={notification.ID} to={`/project/${notification.TypeID}/subprojects`}>
                <li>
                    <div id="notificationsUnit">
                        new project in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
        );
    } else if (notification.Type == '1') {
        return (
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/subprojects`}>
                <li>
                    <div id="notificationsUnit">
                        new proposal in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
        );
    } else if (notification.Type == '2') { 
        return (
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/question/${notification.TypeID}/answers`}>
                <li>
                    <div id="notificationsUnit">
                        new question in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
            );

    } else if (notification.Type == '3') { 
        return (
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/suggestion/${notification.TypeID}/comments`}>
                <li>
                    <div id="notificationsUnit">
                        new suggestion in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
            );
        
    } else if (notification.Type == '4') { 
        return (
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/answer/${notification.TypeID}/comments`}>
                <li>
                    <div id="notificationsUnit">
                        new answer in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
            );
        
    } else if (notification.Type == '5') { 
        return (
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/comment/${notification.TypeID}/subcomments`}>
                <li>
                    <div id="notificationsUnit">
                        new comment in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
            );
        
    } else if (notification.Type == '6') { 
        return (
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/freeform/${notification.TypeID}/comments`}>
                <li>
                    <div id="notificationsUnit">
                        new debate in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
            );
        
    } else if (notification.Type == '7') { 
        return (
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/learn/content/${notification.TypeID}/comments`}>
                <li>
                    <div id="notificationsUnit">
                        new lesson in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
        );
        
    } else if (notification.Type == '8') { 
        return (
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/learn/resources/${notification.TypeID}/comments`}>
                <li>
                    <div id="notificationsUnit">
                        new resource in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
        );
        
    } else { 
        return (
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/subprojects`}>
                <li>
                    <div id="notificationsUnit">
                        new update in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
        );
    }
    
    
   }
}
