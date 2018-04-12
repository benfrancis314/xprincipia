import React from 'react';
// Will be uesd with componentDidUpdate
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class ProblemDiscussMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            questionNumber: '',
            suggestionNumber: '',
            debateNumber: '',
            discussElements: [],
        }

        this.selectAll = this.selectAll.bind(this)
        this.selectQuestions = this.selectQuestions.bind(this)
        this.selectSuggestions = this.selectSuggestions.bind(this)
        this.selectDebates = this.selectDebates.bind(this)

    };
    
    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/questions/number?id='+this.props.params.probID).then(function (response) {
            self.setState({
                questionNumber: response.data
            })
        })
        axios.get( Config.API + '/suggestions/number?id='+this.props.params.probID).then(function (response) {
            self.setState({
                suggestionNumber: response.data
            })
        })
        axios.get( Config.API + '/freeForms/number?id='+this.props.params.probID).then(function (response) {
            self.setState({
                debateNumber: response.data
            })
        })
    }

// Not using this currently, keep in case we decide to switch back
// componentDidUpdate() {
//         ReactDOM.findDOMNode(this).scrollIntoView();
//         window.scrollBy(0, -70);
//   }      

selectAll() {
    $(document).ready(function() {
        $('#discussGroupSelectAllInactive').attr('id','discussGroupSelectAllActive');                
    });
    // AXIOS CALL HERE
    // axios.get( Config.API + '/suggestions/number?id='+this.props.params.probID).then(function (response) {
    //     self.setState({
    //         discussElements: response.data
    //     })
    // })
}

selectQuestions() {
    $(document).ready(function() {
        $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
    });
    // AXIOS CALL HERE
    // axios.get( Config.API + '/suggestions/number?id='+this.props.params.probID).then(function (response) {
    //     self.setState({
    //         discussElements: response.data
    //     })
    // })
}
selectSuggestions() {
    $(document).ready(function() {
        $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
    });
    // AXIOS CALL HERE
    // axios.get( Config.API + '/suggestions/number?id='+this.props.params.probID).then(function (response) {
    //     self.setState({
    //         discussElements: response.data
    //     })
    // })
}
selectDebates() {
    $(document).ready(function() {
        $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');             
    });
    // AXIOS CALL HERE
    // axios.get( Config.API + '/suggestions/number?id='+this.props.params.probID).then(function (response) {
    //     self.setState({
    //         discussElements: response.data
    //     })
    // })
}


   render() {
       
      return (
        <div>
            <Link to={`/project/${this.props.params.probID}/subprojects`}>
                <img src={require('../../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />
            </Link>
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
                <div id="projectInteractDiscussMenu">
                    <div id="proposalsTitleRightSB">DISCUSS</div>
                            <div id="sidebarDiscussMenu">
                                <div id="discussGroupSelectAllActive" onClick={this.selectAll}>
                                    omni<span id="greenSmall">  {this.state.questionNumber}</span>
                                </div>
                                <div id="discussGroupSelection">
                                    <div id="discussSelectButtonLeftInactive" onClick={this.selectQuestions}>
                                        questions
                                        <span id="greenSmall">  {this.state.questionNumber}</span>
                                    </div>

                                    <div id="discussSelectButtonCenterInactive" onClick={this.selectSuggestions}>                                           
                                        suggestions
                                        <span id="greenSmall">  {this.state.suggestionNumber}</span>
                                    </div>

                                    <div id="discussSelectButtonRightInactive" onClick={this.selectDebates}>                                            
                                        debates
                                        <span id="greenSmall">  {this.state.debateNumber}</span>
                                    </div>
                                </div>
                            </div>
                            {React.cloneElement(this.props.children, {probID: this.state.probID, parentTitle: this.props.parentTitle})}
                    <div id="proposalsTitleRightSBEnd"><br /></div>
                </div>
            </ReactCSSTransitionGroup>
        </div>

      );
   }
}