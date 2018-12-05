import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import IdeaUnit from './IdeaUnit.jsx';


export default class IdeaList extends React.Component {
   
//   unHoverText() {
//       $(document).ready(function() {
//           $('#logoNameGuide').html('<span id="xBlue">x</span>principia');             
//           $('#logoNameGuide').attr('id','logoName');
//       });
//   }

    constructor(props){
        super(props);
        this.state = {
           ideas : [],
           tutorial: '',
           ideaRefresh: '',
        }
        this.newIdeaTitleChange = this.newIdeaTitleChange.bind(this);
    };

    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/solutions/problemID?id='+this.props.currentTopic).then(function (response) {
            self.setState({
                ideas: response.data,
                ideaRefresh: self.props.ideaRefresh,
            })
        })
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        axios.get( Config.API + '/solutions/problemID?id='+nextProps.currentTopic).then(function (response) {
            self.setState({
                ideas: response.data,
                ideaRefresh: nextProps.ideaRefresh,
                newIdeaTitle: nextProps.newIdeaTitle,
            })
        })
    }

    newIdeaTitleChange(event) {
        document.getElementById('ideaFormTitle').value = document.getElementById('ideaListUnitNew').value;
    }

   render() {
    
            return (
                <div id="ideaListContainer">
                    <div id="ideaListTitle">
                        [ - -  IDEAS  - - ]
                    </div>
                    <div id="ideaListBody">
                        <input onChange={this.newIdeaTitleChange} type="text" required="required" maxLength="70" id="ideaListUnitNew" placeholder="ADD A NEW IDEA" autoFocus/>
                        <IdeaUnit ideasProps={this.state.ideas} />
                        {/* <div id="ideaListMore">
                        </div> */}
                    </div>
                </div>
            );
    }
}