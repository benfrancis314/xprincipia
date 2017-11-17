import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6



export default class ProfileNotifications extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            member1: 'XPrincipia',
            member2: 'benfrancis',
        }

        this.renderItem = this.renderItem.bind(this)
    // this.submitVote = this.submitVote.bind(this)
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
                XPrincipia
            </div>
            <form id='conversationSubmit' onSubmit={this.onSubmit} action=''>
                <textarea id="conversationEntry" value={this.state.message} onChange={this.updateInputValue} autoFocus autoComplete="off"></textarea>
                <input id="conversationSubmitButton" type='submit' ></input>
            </form>
            <ul id="conversationMessagesList"> 
                {/* {this.props.displayItems.map(this.renderItem)}  */}
                <li>
                    <div id='conversationMessages1'> 
                        <div id="blueConversation1">XPrincipia</div>
                        <div id="whiteConversation1">message message</div>
                    </div>
                </li>
                <li>
                    <div id='conversationMessages2'> 
                        <div id="blueConversation2">benfrancis</div>
                        <div id="whiteConversation2">dialoge dialogue</div>
                    </div>
                </li>
                <li>
                    <div id='conversationMessages2'> 
                        <div id="blueConversation2">benfrancis</div>
                        <div id="whiteConversation2">dialoge dialogue</div>
                    </div>
                </li>
                <li>
                    <div id='conversationMessages1'> 
                        <div id="blueConversation1">XPrincipia</div>
                        <div id="whiteConversation1">dialoge dialogue</div>
                    </div>
                </li>
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

   renderItem(item) {
       if (cookie.load('userName') == this.state.member1) {
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
    } else {
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
        )
    }
   }
}
