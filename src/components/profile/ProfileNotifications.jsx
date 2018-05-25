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
    this.resetNotificationsList = this.resetNotificationsList.bind(this)    
};
componentDidMount(){
    var self = this;
    axios.get( Config.API + '/notifications/new?username='+cookie.load("userName")).then(function (response) {
    self.setState({
        // notifications: response.data
        notifications: self.props.notifications
    })
        }) 
}
componentWillReceiveProps(nextProps) {
    // nextProps.resetNotifications()
    var self = this;
    axios.get( Config.API + '/notifications/new?username='+cookie.load("userName")).then(function (response) {
        
    self.setState({
        // notifications: response.data
        notifications: nextProps.notifications
    })
})
}


resetNotificationsList(props) {
    this.props.resetNotifications();
    // return axios.get( Config.API + '/notifications/clear?username='+cookie.load("userName")).then(function (response) {
    //     self.setState({
    //         notifications: [],
    //     })
    // }) 
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
        // this.props.resetNotifications()
		return (
	    <div id="fullWide">
            <div id="notificationsHeader" >
                updates
            </div>
            <div id="notificationsCheckButton" onClick={this.resetNotificationsList} onMouseOver={this.hoverClearUpdates} onMouseOut={this.unHoverClearUpdates}>
                <img src={require('../../assets/checkRed1.svg')} id="newMessageAddButtonImg" width="40" height="40" alt="Check mark, clears updates" />
            </div>
            <ul> 
                {this.state.notifications.map(this.renderItem)} 
            </ul>
	    </div>
		);
	}

   renderItem(notification) {
       console.log(notification)
    //    if ((notification.Username) == cookie.load('userName')) {
    //        return (
    //            <div id="noDisplay">
    //            </div>
    //        )
    //    }
       if(notification.SecondaryID > 0) {
        return (
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/proposal/${notification.SecondaryID}/discuss/${notification.TypeID}/comments`}>
                <li>
                    <div id="notificationsUnit">
                        new comment in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
        );
       }
       else if (notification.Type == '0') {
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
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/discuss/${notification.TypeID}/comments`}>
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
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/discuss/${notification.TypeID}/comments`}>
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
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/discuss/${notification.TypeID}/comments`}>
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
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/discuss/${notification.TypeID}/comments`}>
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
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/discuss/${notification.TypeID}/comments`}>
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
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/learn`}>
                <li>
                    <div id="notificationsUnit">
                        new educational resource in:
                        <br />
                        <span id="blueUpdate">{notification.ProblemTitle}</span>
                    </div>
                </li>
            </Link>
        );
        
    } else if (notification.Type == '8') { 
        return (
            <Link key={notification.ID} to={`/project/${notification.ProblemID}/learn`}>
                <li>
                    <div id="notificationsUnit">
                        new research in:
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
