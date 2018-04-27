import React from 'react';
import axios from 'axios';
import DiscussCommentUnit from '../components/discuss/DiscussCommentUnit.jsx';
import DiscussUnitPrivate from '../components/discuss/DiscussUnitPrivate.jsx';
import {Config} from '../config.js';
import $ from 'jquery';
import { Link } from 'react-router';

export default class DiscussContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            discuss: [],
            newTopID: '',
            newTopSelect: '',
            currentType: '',
           
            parent: [],
            parentType: '',
            parentID: '',
            linkPath: '',
            parentLink: '',
        }
        this.selectAll = this.selectAll.bind(this)
        this.selectComments = this.selectComments.bind(this)
        this.selectProsCons = this.selectProsCons.bind(this)
        this.selectAnswers = this.selectAnswers.bind(this)
        this.selectNew = this.selectNew.bind(this)
        this.selectTop = this.selectTop.bind(this)
    };
    componentDidMount(){
        var self = this;
            if (window.location.pathname.includes('private')) {
                self.setState({
                    linkPath: '/project/private/',
                })
            } else {
                self.setState({
                    linkPath: '/project/',
                })
            }
            axios.get( Config.API + '/comments/parentType?id='+self.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        newTopSelect: 'new',
                        currentType: 'discuss',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        newTopSelect: 'new',
                        currentType: 'discuss',
                    })
                }
            }) 
            axios.get( Config.API + '/comments/ID?id='+self.props.params.discussID).then(function (response) {
                if(response.data.ParentID == '0') {
                    self.setState({
                        parent: response.data,
                        parentLink: `${self.props.params.probID}/discuss`
                    })
                } else {
                    self.setState({
                        parent: response.data,
                        parentLink: `${self.props.params.probID}/discuss/${response.data.ParentID}/comments`
                    })
                }
                if(response.data.Type === '2') {
                    self.setState({
                        parentType: 'Question',
                    })
                } else if(response.data.Type === '3') {
                    self.setState({
                        parentType: 'Suggestion',
                    })
                } else if(response.data.Type === '4') {
                    self.setState({
                        parentType: 'Answer',
                    })
                } else if(response.data.Type === '5') {
                    self.setState({
                        parentType: 'Comment',
                    })
                } else if(response.data.Type === '6') {
                    self.setState({
                        parentType: 'Debate',
                    })
                } else if(response.data.Type === '9') {
                    self.setState({
                        parentType: 'Pro',
                    })
                } else if(response.data.Type === '10') {
                    self.setState({
                        parentType: 'Con',
                    })
                } else {
                    self.setState({
                        parentType: 'Discuss',
                    })
                }
            }) 
// GET NUMBER OF COMMENTS, PROS/CONS, ANSWERS, COMMENTS&PROSCONS, COMMMENTS&ANSWERS
            // axios.get( Config.API + '/questions/number?id='+this.props.params.probID).then(function (response) {
            //     self.setState({
            //         questionNumber: response.data
            //     })
            // })
            // axios.get( Config.API + '/suggestions/number?id='+this.props.params.probID).then(function (response) {
            //     self.setState({
            //         suggestionNumber: response.data
            //     })
            // })
            // axios.get( Config.API + '/freeForms/number?id='+this.props.params.probID).then(function (response) {
            //     self.setState({
            //         debateNumber: response.data
            //     })
            // })
    }
    componentWillReceiveProps(nextProps){
        var self = this;
            axios.get( Config.API + '/comments/parentType?id='+nextProps.params.discussID).then(function (response) {                if (response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        newTopSelect: 'new',
                        currentType: 'discuss',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        newTopSelect: 'new',
                        currentType: 'discuss',
                    })
                }
            }) 
            axios.get( Config.API + '/comments/ID?id='+nextProps.params.discussID).then(function (response) {
                if(response.data.ParentID == '0') {
                    self.setState({
                        parent: response.data,
                        parentLink: `${nextProps.params.probID}/discuss`
                    })
                } else {
                    self.setState({
                        parent: response.data,
                        parentLink: `${nextProps.params.probID}/discuss/${response.data.ParentID}/comments`
                    })
                }
                if(response.data.Type == '2') {
                    self.setState({
                        parentType: 'Question',
                    })
                } else if(response.data.Type == '3') {
                    self.setState({
                        parentType: 'Suggestion',
                    })
                } else if(response.data.Type == '4') {
                    self.setState({
                        parentType: 'Answer',
                    })
                } else if(response.data.Type == '5') {
                    self.setState({
                        parentType: 'Comment',
                    })
                } else if(response.data.Type == '6') {
                    self.setState({
                        parentType: 'Debate',
                    })
                } else if(response.data.Type == '9') {
                    self.setState({
                        parentType: 'Pro',
                    })
                } else if(response.data.Type == '10') {
                    self.setState({
                        parentType: 'Con',
                    })
                } else {
                    self.setState({
                        parentType: 'Discuss',
                    })
                }
            }) 
            // axios.get( Config.API + '/questions/number?id='+nextProps.params.probID).then(function (response) {
            //     self.setState({
            //         questionNumber: response.data
            //     })
            // })
            // axios.get( Config.API + '/suggestions/number?id='+nextProps.params.probID).then(function (response) {
            //     self.setState({
            //         suggestionNumber: response.data
            //     })
            // })
            // axios.get( Config.API + '/freeForms/number?id='+nextProps.params.probID).then(function (response) {
            //     self.setState({
            //         debateNumber: response.data
            //     })
            // })
    }
    selectAll() {
        $(document).ready(function() {
            $('#discussGroupSelectAllInactive').attr('id','discussGroupSelectAllActive');                
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        if(this.state.newTopSelect == 'new') {
            axios.get( Config.API + '/comments/parentType?id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'discuss',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'discuss',
                    })
                }
            })
        } else {
            // NOT SETUP TO DO 'TOP' YET
            axios.get( Config.API + '/comments/parentType?id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'discuss',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'discuss',
                    })
                }
            })  
        }
    }
    
    selectComments() {
        if (this.state.parentType == 'Question') {
            $(document).ready(function() {
                $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
                $('#discussSelectButtonRightInactive').attr('id','discussSelectButtonRightActive');               
                $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
                $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            });
        } else {
            $(document).ready(function() {
                $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
                $('#discussSelectButtonLeftInactive').attr('id','discussSelectButtonLeftActive');               
                $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
                $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
            });
        }
        var self = this;
        if(this.state.newTopSelect == 'new') {
            axios.get( Config.API + '/comments/bytype/comment?problem_id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'question',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'question',
                    })
                }
            }) 
        } else {
            axios.get( Config.API + '/comments/bytype/comment/byrank?problem_id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'question',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'question',
                    })
                }
            })  
        }
    }
    selectProsCons() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            $('#discussSelectButtonCenterInactive').attr('id','discussSelectButtonCenterActive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        if(this.state.newTopSelect == 'new') {
            axios.get( Config.API + 'comments/bytype/procon?problem_id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'suggestion',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'suggestion',
                    })
                }
            }) 
        } else {
            axios.get( Config.API + 'comments/bytype/procon/byrank?problem_id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'suggestion',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'suggestion',
                    })
                }
            })  
        }
    }
    selectAnswers() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
            $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
            $('#discussSelectButtonLeftInactive').attr('id','discussSelectButtonLeftActive');               
        });
        var self = this;
        if(this.state.newTopSelect == 'new') {
            axios.get( Config.API + '/comments/bytype/procon?problem_id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'suggestion',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'suggestion',
                    })
                }
            }) 
        } else {
            axios.get( Config.API + '/comments/bytype/procon/byrank?problem_id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'suggestion',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'suggestion',
                    })
                }
            })  
        }
    }
    selectNew() {
        var self = this;
        $(document).ready(function() {
            $('#discussListNewButtonInactive').attr('id','discussListNewButtonActive');    
            $('#discussListTopButtonActive').attr('id','discussListTopButtonInactive');                                              
        });
        self.setState({
            newTopSelect: 'new',
        })
        if (this.state.currentType === 'question') {
            axios.get( Config.API + '/comments/bytype/question?problem_id='+this.props.params.probID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else if (this.state.currentType === 'suggestion') {
            axios.get( Config.API + '/comments/bytype/suggestion?problem_id='+this.props.params.probID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else if (this.state.currentType === 'debate') {
            axios.get( Config.API + '/comments/bytype/debate?problem_id='+this.props.params.probID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else {
            axios.get( Config.API + '/comments/bytype/discuss?problem_id='+this.props.params.probID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        }
    }
    selectTop() {
        var self = this;
        $(document).ready(function() {
            $('#discussListNewButtonActive').attr('id','discussListNewButtonInactive');    
            $('#discussListTopButtonInactive').attr('id','discussListTopButtonActive');  
        });
        self.setState({
            newTopSelect: 'top',
        })
        if (this.state.currentType === 'question') {
            axios.get( Config.API + '/comments/bytype/question/byrank?problem_id='+this.props.params.probID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            })  
        } else if (this.state.currentType === 'suggestion') {
            axios.get( Config.API + '/comments/bytype/suggestion/byrank?problem_id='+this.props.params.probID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else if (this.state.currentType === 'debate') {
            axios.get( Config.API + '/comments/bytype/debate/byrank?problem_id='+this.props.params.probID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            })  
        } else {
            axios.get( Config.API + '/comments/bytype/discuss/byrank?problem_id='+this.props.params.probID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        }

    }


   render() {
//     if (window.location.pathname.includes('private')) {

//         return (
//             <div id="questionContainer">
//                 private
//                 {/* {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})} */}
//                 {/* <DiscussUnitPrivate questions={this.state.questions} /> */}
//             </div>
      
//         );
// } else {
    if (this.state.parentType == 'Question') {
        return (
            <div id="projectInteractDiscussMenu">
            <div id="proposalsTitleRightSB">DISCUSS</div>
                {/* <div id="answerQuestionLabel">return to {this.state.parentType}</div> */}
                <Link to={this.state.linkPath + this.state.parentLink}>
                    <div id="answerQuestionUnit">
                        <div id={"answerQuestionContent"+this.state.parentType}>
                            <div id={"discussHeader"+this.state.parentType}>
                                {this.state.parentType}
                            </div>
                            <div id="suggestionText">
                                {this.state.parent.Description}
                            </div>
                        </div>
                        <img src={require('../assets/upArrow.svg')} id="discussCommentBackArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                    </div>
                </Link>
            <div id="discussSelectionMenuContainer">
                <div id="sidebarDiscussMenu">
                    <div id="discussGroupSelectAllActive" onClick={this.selectAll}>
                        responses<span id="greenSmall">  {this.state.questionNumber}</span>
                    </div>
                    <div id="discussGroupSelection">
                        <div id="discussSelectButtonLeftInactive" onClick={this.selectAnswers}>                                           
                            answers
                            <span id="greenSmall">  {this.state.suggestionNumber}</span>
                        </div>
                        <div id="discussSelectButtonRightInactive" onClick={this.selectComments}>
                            comments
                            <span id="greenSmall">  {this.state.questionNumber}</span>
                        </div>
                    </div>
                </div>
                {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle, parentType: this.state.parentType})}
                <div id={this.state.newTopID}>
                    <div id="discussListNewButtonActive" onClick={this.selectNew}>
                        new
                    </div>
                    <div id="discussListTopButtonInactive" onClick={this.selectTop}>
                        top
                    </div>
                </div>
            </div>
            <DiscussCommentUnit linkPath={this.state.linkPath} questions={this.state.discuss} />
        </div>
        )
    } else {
    return (
        <div id="projectInteractDiscussMenu">
            <div id="proposalsTitleRightSB">DISCUSS</div>
                {/* <div id="answerQuestionLabel">return to {this.state.parentType}</div> */}
                <Link to={this.state.linkPath + this.state.parentLink}>
                    <div id="answerQuestionUnit">
                        <div id={"answerQuestionContent"+this.state.parentType}>
                            <div id={"discussHeader"+this.state.parentType}>
                                {this.state.parentType}
                            </div>
                            <div id="suggestionText">
                                {this.state.parent.Description}
                            </div>
                        </div>
                        <img src={require('../assets/upArrow.svg')} id="discussCommentBackArrow" width="50" height="30" alt="Back arrow, blue up arrow" />
                    </div>
                </Link>
            <div id="discussSelectionMenuContainer">
                <div id="sidebarDiscussMenu">
                    <div id="discussGroupSelectAllActive" onClick={this.selectAll}>
                        responses<span id="greenSmall">  {this.state.questionNumber}</span>
                    </div>
                    <div id="discussGroupSelection">
                        <div id="discussSelectButtonLeftInactive" onClick={this.selectComments}>
                            comments
                            <span id="greenSmall">  {this.state.questionNumber}</span>
                        </div>

                        <div id="discussSelectButtonRightInactive" onClick={this.selectProsCons}>                                           
                            pros/cons
                            <span id="greenSmall">  {this.state.suggestionNumber}</span>
                        </div>
                    </div>
                </div>
                {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle, parentType: this.state.parentType})}
                <div id={this.state.newTopID}>
                    <div id="discussListNewButtonActive" onClick={this.selectNew}>
                        new
                    </div>
                    <div id="discussListTopButtonInactive" onClick={this.selectTop}>
                        top
                    </div>
                </div>
            </div>
            <DiscussCommentUnit linkPath={this.state.linkPath} questions={this.state.discuss} />
        </div>
  
    );
}
}
}

