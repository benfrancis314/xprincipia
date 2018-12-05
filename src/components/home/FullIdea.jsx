import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import IdeaComments from './IdeaComments.jsx';


export default class FullIdea extends React.Component {
   
//   unHoverText() {
//       $(document).ready(function() {
//           $('#logoNameGuide').html('<span id="xBlue">x</span>principia');             
//           $('#logoNameGuide').attr('id','logoName');
//       });
//   }

    constructor(props){
        super(props);
        this.state = {
           fullIdea : [],
           tutorial: '',
           date: '',
           author: ''
        }
        // this.queryProblem = this.queryProblem.bind(this);
    };

    componentDidMount(){
        // ReactDOM.findDOMNode(this).scrollIntoView();
        var self = this;
        axios.get( Config.API + '/solutions/ID?id='+this.props.params.ideaID).then(function (response) {
            self.setState({
                fullIdea: response.data,
                date: response.data.CreatedAt.slice(0,10),
                author: response.data.OriginalPosterUsername,
            })
        })
    }

   render() {
            return (
                <div id="fullIdeaContainer">
                    <div id="fullIdeaBody">
                        <div id="fullIdeaHeader">
                            <Link to={'/home/'+this.state.fullIdea.ProblemID}>
                                <div id="ideaCloseButton">
                                    Close
                                </div>
                            </Link>
                            <div id="fullIdeaTopicName">
                                <span id="blueMontserrat">>>>   TOPIC: </span>{this.state.fullIdea.ParentTitle}
                            </div>
                            <div id="fullIdeaMetaData">
                                <div id="fullIdeaAuthor">
                                    >>> {this.state.author}
                                </div>
                                <div id="fullIdeaDate">
                                    >>> {this.state.date}
                                </div>
                            </div>
                        </div>      
                        <div id="fullIdeaTitle">
                            {this.state.fullIdea.Title}
                        </div>
                        <div id="fullIdeaDescription">
                            {this.state.fullIdea.Description}
                        </div>
                    </div>
                    <IdeaComments ideaID={this.props.params.ideaID} ideaTitle={this.state.fullIdea.Title} />
                </div>
            );
    }
}