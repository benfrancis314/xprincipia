import React from 'react'
import {Link} from 'react-router';
import cookie from 'react-cookie';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class ChatBox extends React.Component{
    constructor() {
        super()

        this.state = {
            message : '',
            messages : [],
            typing : [],
            joined : [],
            isJoined: false,
            isTyping : false,
        }
        this.updateInputValue = this.updateInputValue.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.displayMessage = this.displayMessage.bind(this)
    }
    
    updateInputValue (evt){
        this.setState({
            message: evt.target.value
        });
        this.props.socket.emit(`typing`, cookie.load('userName')+' is typing')
    }
    onSubmit (event) {
        this.props.sendMessage(this.state.message )
        this.setState({
            message: ''
        })
        event.preventDefault()
    }

    onTypeMessage () {
        this.props.socket.emit(`typing`, cookie.load('userName')+' is typing')
    }

    componentDidMount() {
        this.props.socket.on(`new message`, data => {
            var messages = this.state.messages
            messages.push(data)
            this.setState({
                messages: messages
            })
            
        })
        this.props.socket.on('typing', data => {
            var typing = this.state.typing
            typing.push(data)
            this.setState({typing : typing})
        })
        this.props.socket.on('user joined', data => {
            var joined = this.state.joined
            joined.push(data)
            this.setState({joined : joined})
        })
    }


// This is causing error when leaving at the moment
    // componentWillUnmount () {
    //     this.props.socket.emit('disconnect')
    //     this.props.on('user left', data => {
    //         this.setState({
    //             left: data
    //         })
    //     })
        
    // }


    render() {
    // $(document).ready(function() {
    //     $('#chatBoxContainer').hide().slideDown(500);
    // });
        
        return(
        <div id="chatBoxContainer">
            <Link to={`/welcome`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
            </Link>
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={2000}
                transitionEnter={false}
                transitionLeave={false}>
            <div id="textBoxTop">
                <br />
            </div>
            <div id='textBox'>
                <ul id='chatBoxMessagesList'>
                    {this.state.messages.map(this.renderMessages)}
                </ul>
                <form id='chatBoxSubmit' onSubmit={this.onSubmit} action=''>
                    <input id="chatBoxEntry" value={this.state.message} onChange={this.updateInputValue} autoFocus autoComplete="off"></input>
                    <input id="chatBoxSubmitButton" type='submit' ></input>
                </form>
                
                {/*<ul id='textBox' style={styles}>{this.state.joined.map(this.renderJoinList)}</ul>*/}
                    {/*<p>{this.state.joined.username + ' just joined the room'}</p>
                    <p>{this.state.left.username + 'just left'}</p>*/}
                    {this.state.isJoined && 
                    <div>
                        {this.displayMessage(this.state.isJoined, this.state.joined, this.renderJoinList)}
                    </div>
                    }
                {/*{this.displayMessage(this.state.isJoined, this.state.joined, this.renderJoinList)}*/}
            </div>
            <div id="textBoxBottom">
                <br />
            </div>
            </ReactCSSTransitionGroup>
        </div>
        )
    }

    renderMessages(message, i) {
      return (
        <li key={i} >
           <div id='chatBoxMessages'> 
               <div id="blueChat">{message.username}</div>
               <div id="whiteChat">{message.message}</div>
            </div>
        </li>

      );
   }

    renderJoinList(message, i) {
      return (
        <li key={message.message} >
           <p> {message.username} just joined the room</p>
        </li>

      );
   }

   displayMessage(isSomething, value, mappingfunction) {
       if (isSomething){
            return (
                <ul id='textBox' >{value.map(mappingfunction)}</ul>
            )
       }    
   }
}
