import React from 'react'
import cookie from 'react-cookie';
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

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

    componentWillUnmount () {
        this.props.socket.emit('disconnect')
        this.props.on('user left', data => {
            this.setState({
                left: data
            })
        })
        
    }


    render() {

        
        return(
        <div id='textBox'>
            <ul  id='chatBoxMessages' >{this.state.messages.map(this.renderMessages)}</ul>
            <form id='chatBoxSubmit' onSubmit={this.onSubmit} action=''>
                <input value={this.state.message} onChange={this.updateInputValue}></input>
                <input  type='submit' ></input>
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
        )
    }

    renderMessages(message, i) {
      return (
        <li key={i} >
           <p id='chatBoxMessages'> {message.username}: {message.message}</p>
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