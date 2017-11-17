import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

export default class ProfileNotifications extends React.Component {
    constructor(props){
        super(props);

        this.renderItem = this.renderItem.bind(this)
    // this.submitVote = this.submitVote.bind(this)
};

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
            <div id="notificationsHeader">
                updates
            </div>
            <div id="notificationsCheckButton" onMouseOver={this.hoverClearUpdates} onMouseOut={this.unHoverClearUpdates}>
                <img src={require('../../assets/checkRed1.svg')} id="newMessageAddButtonImg" width="40" height="40" alt="Check mark, clears updates" />
            </div>
            <ul> 
                {/* {this.props.displayItems.map(this.renderItem)}  */}
                <li>
                    <div id="notificationsUnit">
                        new sub project in:
                        <br />
                        <span id="blueUpdate">Human-Based General Artificial Intelligence</span>
                    </div>
                </li>
                <li>
                    <div id="notificationsUnit">
                            Test Title1
                    </div>
                </li>
                <li>
                    <div id="notificationsUnit">
                            Test Title2
                    </div>
                </li>
            </ul>
	    </div>
		);
	}

   renderItem(item) {
       if (1) {
        return (
            <Link key={item.ID} to={`/proposal/${item.ProblemID}/${item.ID}/solutions`} >
                <li><div id="profileRightUnit">
                    <div id="profileUnitTitle">
                        Test Title
                        {/*{item.Title}*/}
                    </div>
                    <div id="unitSummary">
                        Test Summary
                        {/*{item.Summary}*/}
                    </div>
                </div></li>
            </Link>
        );
    }
   }
}
