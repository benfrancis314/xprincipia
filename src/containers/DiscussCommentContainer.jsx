import React from 'react';
import axios from 'axios';
import DiscussUnit from '../components/discuss/DiscussUnit.jsx';
import DiscussUnitPrivate from '../components/discuss/DiscussUnitPrivate.jsx';
import {Config} from '../config.js';
import $ from 'jquery';

export default class DiscussContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            discuss: [],
            newTopID: '',
            parent: [],
            parentType: ''
           
        }
        this.selectAll = this.selectAll.bind(this)
        this.selectQuestions = this.selectQuestions.bind(this)
        this.selectSuggestions = this.selectSuggestions.bind(this)
        this.selectDebates = this.selectDebates.bind(this)
    };
    componentDidMount(){
        var self = this;
            axios.get( Config.API + '/comments/bytype/question?problem_id='+this.props.params.probID).then(function (response) {
                if (response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data
                    })
                }
            }) 
            axios.get( Config.API + '/comments/ID?id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    parent: response.data
                })
            }) 
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
            // if ()
            // IF CALL, saying IF parent type is SUGGESTION OR DEBATE, then return 'DISCUSS',
            // ELSE return COMMENT (or THREAD or something)
    }
    componentWillReceiveProps(nextProps){
        var self = this;
            axios.get( Config.API + '/comments/bytype/question?problem_id='+nextProps.params.probID).then(function (response) {
                if (response.data.length > 0) {
                    self.setState({
                        empty: 'discussListSelectButton',
                        discuss: response.data
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data
                    })
                }
            }) 
            axios.get( Config.API + '/comments/ID?id='+nextProps.params.discussID).then(function (response) {
                self.setState({
                    parent: response.data
                })
            }) 
            axios.get( Config.API + '/questions/number?id='+nextProps.params.probID).then(function (response) {
                self.setState({
                    questionNumber: response.data
                })
            })
            axios.get( Config.API + '/suggestions/number?id='+nextProps.params.probID).then(function (response) {
                self.setState({
                    suggestionNumber: response.data
                })
            })
            axios.get( Config.API + '/freeForms/number?id='+nextProps.params.probID).then(function (response) {
                self.setState({
                    debateNumber: response.data
                })
            })
    }
    selectAll() {
        $(document).ready(function() {
            $('#discussGroupSelectAllInactive').attr('id','discussGroupSelectAllActive');                
        });
        $(document).ready(function() {
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
        });
        $(document).ready(function() {
            $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
        });
        $(document).ready(function() {
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        axios.get( Config.API + '/comments/bytype/discuss?problem_id='+this.props.params.probID).then(function (response) {
            self.setState({
                discuss: response.data
            })
        }) 
    }
    
    selectQuestions() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
        });
        $(document).ready(function() {
            $('#discussSelectButtonLeftInactive').attr('id','discussSelectButtonLeftActive');               
        });
        $(document).ready(function() {
            $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
        });
        $(document).ready(function() {
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        axios.get( Config.API + '/comments/bytype/question?problem_id='+this.props.params.probID).then(function (response) {
            self.setState({
                discuss: response.data
            })
        }) 
    }
    selectSuggestions() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
        });
        $(document).ready(function() {
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
        });
        $(document).ready(function() {
            $('#discussSelectButtonCenterInactive').attr('id','discussSelectButtonCenterActive');               
        });
        $(document).ready(function() {
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        axios.get( Config.API + '/comments/bytype/suggestion?problem_id='+this.props.params.probID).then(function (response) {
            self.setState({
                discuss: response.data
            })
        }) 
    }
    selectDebates() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');             
        });
        $(document).ready(function() {
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
        });
        $(document).ready(function() {
            $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
        });
        $(document).ready(function() {
            $('#discussSelectButtonRightInactive').attr('id','discussSelectButtonRightActive');               
        });
        var self = this;
        axios.get( Config.API + '/comments/bytype/freeform?problem_id='+this.props.params.probID).then(function (response) {
            self.setState({
                discuss: response.data
            })
        }) 
    }

   render() {
    if (parent.Type == '2') {

        return (
            <div id="questionContainer">
                <div id="answerQuestionHeader">
                    {/* <Link to={`/project/${this.props.params.probID}/question/${this.props.params.questID}/answers`}> */}
                        <div id="backSolutionArrowDiv">
                            <img src={require('../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                        </div>
                    {/* </Link> */}
                    <div id="answerQuestionLabel">return to discuss</div>
                </div>
                {/* EDIT LINK */}
                {/* <Link to={`/project/${this.props.params.probID}/question/${this.props.params.discussID}/answers`}> */}
                    <div id="answerQuestionUnit">
                        <div id="answerQuestionContent">
                            <div id="discussHeader">
                                {this.state.parent.Username}
                            </div>
                            <div id="suggestionText">
                                {this.state.parent.Description}
                            </div>
                        </div>
                    </div>
                {/* </Link> */}
                <div id="sidebarDiscussMenu">
                    <div id="discussGroupSelectAllActive" onClick={this.selectAll}>
                        omni<span id="greenSmall">  {this.state.questionNumber}</span>
                    </div>
                    <div id="discussGroupSelection">
                    <div id="discussGroupSelection">
                        <div id="discussSelectButtonLeftInactive" onClick={this.selectQuestions}>
                            answers
                            <span id="greenSmall">  {this.state.questionNumber}</span>
                        </div>

                        <div id="discussSelectButtonRightInactive" onClick={this.selectDebates}>                                            
                            comments
                            <span id="greenSmall">  {this.state.debateNumber}</span>
                        </div>
                    </div>
                    </div>
                </div>
                {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                <div id={this.state.newTopID}>
                    <div id="discussListNewButtonActive">
                        new
                    </div>
                    <div id="discussListTopButtonInactive">
                        top
                    </div>
                </div>
                <DiscussUnit questions={this.state.discuss} />
            </div>
      
        );
} else {
    return (
        <div id="questionContainer">
            <div id="answerQuestionHeader">
                {/* <Link to={`/project/${this.props.params.probID}/question/${this.props.params.questID}/answers`}> */}
                    <div id="backSolutionArrowDiv">
                        <img src={require('../assets/upArrow.svg')} id="backSolutionArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                    </div>
                {/* </Link> */}
                <div id="answerQuestionLabel">return to {this.state.parentTye}</div>
            </div>
            {/* EDIT LINK */}
            {/* <Link to={`/project/${this.props.params.probID}/question/${this.props.params.discussID}/answers`}> */}
                <div id="answerQuestionUnit">
                    <div id="answerQuestionContent">
                        <div id="discussHeader">
                            {this.state.parent.Username}
                        </div>
                        <div id="suggestionText">
                            {this.state.parent.Description}
                        </div>
                    </div>
                </div>
            {/* </Link> */}
            <div id="sidebarDiscussMenu">
                <div id="discussGroupSelectAllActive" onClick={this.selectAll}>
                    omni<span id="greenSmall">  {this.state.questionNumber}</span>
                </div>
                <div id="discussGroupSelection">
                    <div id="discussSelectButtonLeftInactive" onClick={this.selectQuestions}>
                        pros/cons
                        <span id="greenSmall">  {this.state.questionNumber}</span>
                    </div>

                    <div id="discussSelectButtonRightInactive" onClick={this.selectDebates}>                                            
                        comments
                        <span id="greenSmall">  {this.state.debateNumber}</span>
                    </div>
                </div>
            </div>
            {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
            <div id={this.state.newTopID}>
                <div id="discussListNewButtonActive">
                    new
                </div>
                <div id="discussListTopButtonInactive">
                    top
                </div>
            </div>
            <DiscussUnit questions={this.state.discuss} />
        </div>
  
    );
}
}
}
function floatToDecimal(float) {
	return Math.round(float*100)+'%';
};