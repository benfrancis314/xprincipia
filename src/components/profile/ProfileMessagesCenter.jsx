import React from 'react';
import {Link} from 'react-router'

export default class ProfileNotifications extends React.Component {
    constructor(props){
        super(props);

        this.renderItem = this.renderItem.bind(this)
    // this.submitVote = this.submitVote.bind(this)
};

	render() {

		return (
	    <div id="fullWide">
            {/* <div id="newMessageAddButton">
                <img src={require('../../assets/blueAdd2.svg')} id="newMessageAddButtonImg" width="40" height="40" alt="User avatar, DNA Helix" />
            </div> */}
            {this.props.children}
            <Link to="/messages/1" activeClassName="activeMessage">
                <div id="messagesUnitXP">
                    <div id="messageTitle">
                        XPrincipia
                        {/*{item.Title}*/}
                    </div>
                    {/* <div id="unitSummary">
                        3
                    </div> */}
                </div>
            </Link>
            <ul> 
                {/* {this.props.displayItems.map(this.renderItem)}  */}
                <li>
                    <Link to="/messages/2" activeClassName="activeMessage">
                        <div id="messagesUnit">
                            <div id="messageTitle">
                                jason.kao
                                {/*{item.Title}*/}
                            </div>
                            {/* <div id="unitSummary">
                                2
                            </div> */}
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/messages/3" activeClassName="activeMessage">
                        <div id="messagesUnit">
                            <div id="messageTitle">
                                tfrawlz
                                {/*{item.Title}*/}
                            </div>
                            {/* <div id="unitSummary">
                                3
                            </div> */}
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/messages/4" activeClassName="activeMessage">
                        <div id="messagesUnit">
                            <div id="messageTitle">
                                ben.francis
                                {/*{item.Title}*/}
                            </div>
                            {/* <div id="unitSummary">
                                5
                            </div> */}
                        </div>
                    </Link>
                </li> 
            </ul>
            {/* Have this change the text at top to "start a conversation" */}

	    </div>
		);
	}

   renderItem(item) {
       
    
        // IF conversation.member1 === cookie.load(username),
        // then display with title as conversation.member2
        // ELSE IF conversation.member2 === cookie.load(username),
        // then display with title as conversation.member1
        // ELSE display nothing
    
    
    if (1) {
        return (
            <Link key={item.ID} to={`/proposal/${item.ProblemID}/${item.ID}/solutions`} >
                <li><div id="messagesUnit">
                    <div id="messageTitle">
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
