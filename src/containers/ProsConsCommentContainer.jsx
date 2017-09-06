import React from 'react';
import axios from 'axios';
import CommentUnit from '../components/comments/CommentUnit.jsx';
import CommentForm from '../components/comments/CommentForm.jsx';
import SideBarMore from '../components/SideBarMore.jsx';
import {Config} from '../config.js'

export default class ProsConsCommentContainer extends React.Component {
   constructor(props){
        super(props);

        this.state = {
            pro: [],
            comments: [],
           
        }
        
    };
        componentDidMount(){
        var self = this;
         axios.get( Config.API + '/auth/comments/proID?id='+this.props.params.proID).then(function (response) {
            self.setState({
                comments: response.data,
            })
        })  
        return  
    }
 
   render() {
      return (
        <div id="answerContainer">
            {this.props.children}
            {/*<CommentUnit suggestions={this.state.suggestions}/>*/}
            <CommentUnit comments={this.state.comments}/>
            <SideBarMore />
        </div>
      );
   }
}
