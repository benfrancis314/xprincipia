import React from 'react';
import axios from 'axios';
import DiscussUnit from '../components/discuss/DiscussUnit.jsx';
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
            commentNumber: '',
            proConNumber: '',
            answerNumber: '',
            proConComNumber: '',
            answerComNumber: '',

            proposalID: '',
            proposalPath: '',
        }
        this.selectProConCom = this.selectProConCom.bind(this)
        this.selectComments = this.selectComments.bind(this)
        this.selectProsCons = this.selectProsCons.bind(this)
        this.selectAnswers = this.selectAnswers.bind(this)
        this.selectAnswerCom = this.selectAnswerCom.bind(this)
        this.selectNew = this.selectNew.bind(this)
        this.selectTop = this.selectTop.bind(this)
    };
    componentDidMount(){
        var self = this;
        document.getElementById("answerQuestionUnit").scrollIntoView();
            if (window.location.pathname.includes('private')) {
                self.setState({
                    linkPath: `/project/private/${self.props.params.probID}`,
                })
            } else {
                self.setState({
                    linkPath: `/project/${self.props.params.probID}`,
                })
            }
            
            axios.get( Config.API + '/comments/ID?id='+self.props.params.discussID).then(function (response) {
                if(response.data.ParentID === 0) {
                    self.setState({
                        parent: response.data,
                        parentLink: `/discuss`,
                    })
                } else {
                    self.setState({
                        parent: response.data,
                        parentLink: `/discuss/${response.data.ParentID}/comments`
                    })
                }
                if(response.data.Type === 2) {
                    self.setState({
                        parentType: 'Question',
                    })
                } else if(response.data.Type === 3) {
                    self.setState({
                        parentType: 'Suggestion',
                    })
                } else if(response.data.Type === 4) {
                    self.setState({
                        parentType: 'Answer',
                    })
                } else if(response.data.Type === 5) {
                    self.setState({
                        parentType: 'Comment',
                    })
                } else if(response.data.Type === 6) {
                    self.setState({
                        parentType: 'Debate',
                    })
                } else if(response.data.Type === 9) {
                    self.setState({
                        parentType: 'Pro',
                    })
                } else if(response.data.Type === 10) {
                    self.setState({
                        parentType: 'Con',
                    })
                } else {
                    self.setState({
                        parentType: 'Discuss',
                    })
                }

                if(response.data.Type === 2) {
                    axios.get( Config.API + '/comments/bytype/answercom?problem_id='+self.props.params.discussID).then(function (response) {
                        if(response.data.length > 0) {
                            self.setState({
                                newTopID: 'discussListSelectButton',
                                discuss: response.data,
                                newTopSelect: 'new',
                                currentType: 'answercom',
                            })
                        } else {
                            self.setState({
                                newTopID: 'discussListSelectButtonHide',
                                discuss: response.data,
                                newTopSelect: 'new',
                                currentType: 'answercom',
                            })
                        }
                    }) 
                } else {
                    axios.get( Config.API + '/comments/bytype/proconcom?problem_id='+self.props.params.discussID).then(function (response) {
                        if(response.data.length > 0) {
                            self.setState({
                                newTopID: 'discussListSelectButton',
                                discuss: response.data,
                                newTopSelect: 'new',
                                currentType: 'proconcom',
                            })
                        } else {
                            self.setState({
                                newTopID: 'discussListSelectButtonHide',
                                discuss: response.data,
                                newTopSelect: 'new',
                                currentType: 'proconcom',
                            })
                        }
                    }) 
                }
            }) 
            axios.get( Config.API + '/comments/bytype/comment/number?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    commentNumber: response.data
                })
            })
            axios.get( Config.API + '/comments/bytype/procon/number?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    proConNumber: response.data
                })
            })
            axios.get( Config.API + '/comments/bytype/answer/number?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    answerNumber: response.data
                })
            })
            axios.get( Config.API + '/comments/bytype/proconcom/number?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    proConComNumber: response.data
                })
            })
            axios.get( Config.API + '/comments/bytype/answercom/number?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    answerComNumber: response.data
                })
            })
            if (window.location.pathname.includes('proposal')) {
                self.setState({
                    proposalID: 'proposalInteractDiscussMenu',
                    proposalPath: '/proposal/'+this.props.params.solutionID,
                })
            } else {
                self.setState({
                    proposalID: 'projectInteractDiscussMenu',
                    proposalPath: '',
                })
            }

    }
    componentWillReceiveProps(nextProps){
        var self = this;
        if (window.location.pathname.includes('private')) {
            self.setState({
                linkPath: `/project/private/${self.props.params.probID}`,
            })
        } else {
            self.setState({
                linkPath: `/project/${self.props.params.probID}`,
            })
        }
        // document.getElementById("answerQuestionUnit").scrollIntoView();
            axios.get( Config.API + '/comments/ID?id='+nextProps.params.discussID).then(function (response) {
                if(response.data.ParentID === 0) {
                    self.setState({
                        parent: response.data,
                        parentLink: `/discuss`,
                    })
                } else {
                    self.setState({
                        parent: response.data,
                        parentLink: `/discuss/${response.data.ParentID}/comments`
                    })
                }
                if(response.data.Type === 2) {
                    self.setState({
                        parentType: 'Question',
                    })
                } else if(response.data.Type === 3) {
                    self.setState({
                        parentType: 'Suggestion',
                    })
                } else if(response.data.Type === 4) {
                    self.setState({
                        parentType: 'Answer',
                    })
                } else if(response.data.Type === 5) {
                    self.setState({
                        parentType: 'Comment',
                    })
                } else if(response.data.Type === 6) {
                    self.setState({
                        parentType: 'Debate',
                    })
                } else if(response.data.Type === 9) {
                    self.setState({
                        parentType: 'Pro',
                    })
                } else if(response.data.Type === 10) {
                    self.setState({
                        parentType: 'Con',
                    })
                } else {
                    self.setState({
                        parentType: 'Discuss',
                    })
                }
                if(response.data.Type === 2) {
                    axios.get( Config.API + '/comments/bytype/answercom?problem_id='+nextProps.params.discussID).then(function (response) {
                        if(response.data.length > 0) {
                            self.setState({
                                newTopID: 'discussListSelectButton',
                                discuss: response.data,
                                newTopSelect: 'new',
                                currentType: 'answercom',
                            })
                        } else {
                            self.setState({
                                newTopID: 'discussListSelectButtonHide',
                                discuss: response.data,
                                newTopSelect: 'new',
                                currentType: 'answercom',
                            })
                        }
                    }) 
                } else {
                    axios.get( Config.API + '/comments/bytype/proconcom?problem_id='+nextProps.params.discussID).then(function (response) {
                        if(response.data.length > 0) {
                            self.setState({
                                newTopID: 'discussListSelectButton',
                                discuss: response.data,
                                newTopSelect: 'new',
                                currentType: 'proconcom',
                            })
                        } else {
                            self.setState({
                                newTopID: 'discussListSelectButtonHide',
                                discuss: response.data,
                                newTopSelect: 'new',
                                currentType: 'proconcom',
                            })
                        }
                    }) 
                }
            }) 
            axios.get( Config.API + '/comments/bytype/comment/number?problem_id='+nextProps.params.discussID).then(function (response) {
                self.setState({
                    commentNumber: response.data
                })
            })
            axios.get( Config.API + '/comments/bytype/procon/number?problem_id='+nextProps.params.discussID).then(function (response) {
                self.setState({
                    proConNumber: response.data
                })
            })
            axios.get( Config.API + '/comments/bytype/answer/number?problem_id='+nextProps.params.discussID).then(function (response) {
                self.setState({
                    answerNumber: response.data
                })
            })
            axios.get( Config.API + '/comments/bytype/proconcom/number?problem_id='+nextProps.params.discussID).then(function (response) {
                self.setState({
                    proConComNumber: response.data
                })
            })
            axios.get( Config.API + '/comments/bytype/answercom/number?problem_id='+nextProps.params.discussID).then(function (response) {
                self.setState({
                    answerComNumber: response.data
                })
            })
            if (window.location.pathname.includes('proposal')) {
                self.setState({
                    proposalID: 'proposalInteractDiscussMenu',
                    proposalPath: '/proposal/'+this.props.params.solutionID,
                })
            } else {
                self.setState({
                    proposalID: 'projectInteractDiscussMenu',
                    proposalPath: '',
                })
            }
    }
    selectProConCom() {
        $(document).ready(function() {
            $('#discussCommentGroupSelectAllInactive').attr('id','discussCommentGroupSelectAllActive');                
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        if(this.state.newTopSelect === 'new') {
            axios.get( Config.API + '/comments/bytype/proconcom?problem_id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'proconcom',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'proconcom',
                    })
                }
            })
        } else {
            // NOT SETUP TO DO 'TOP' YET
            axios.get( Config.API + '/comments/bytype/proconcom/byrank?problem_id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'proconcom',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'proconcom',
                    })
                }
            })  
        }
    }
    selectAnswerCom() {
        $(document).ready(function() {
            $('#discussCommentGroupSelectAllInactive').attr('id','discussCommentGroupSelectAllActive');                
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        if(this.state.newTopSelect === 'new') {
            axios.get( Config.API + '/comments/bytype/answercom?problem_id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'answercom',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'answercom',
                    })
                }
            })
        } else {
            // NOT SETUP TO DO 'TOP' YET
            axios.get( Config.API + '/comments/bytype/answercom/byrank?problem_id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'answercom',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'answercom',
                    })
                }
            })  
        }
    }
    
    selectComments() {
        if (this.state.parentType === 'Question') {
            $(document).ready(function() {
                $('#discussCommentGroupSelectAllActive').attr('id','discussCommentGroupSelectAllInactive');               
                $('#discussSelectButtonRightInactive').attr('id','discussSelectButtonRightActive');               
                $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
                $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            });
        } else {
            $(document).ready(function() {
                $('#discussCommentGroupSelectAllActive').attr('id','discussCommentGroupSelectAllInactive');               
                $('#discussSelectButtonLeftInactive').attr('id','discussSelectButtonLeftActive');               
                $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
                $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
            });
        }
        var self = this;
        if(this.state.newTopSelect === 'new') {
            axios.get( Config.API + '/comments/bytype/comment?problem_id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'comment',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'comment',
                    })
                }
            }) 
        } else {
            axios.get( Config.API + '/comments/bytype/comment/byrank?problem_id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'comment',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'comment',
                    })
                }
            })  
        }
    }
    selectProsCons() {
        $(document).ready(function() {
            $('#discussCommentGroupSelectAllActive').attr('id','discussCommentGroupSelectAllInactive');               
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            // $('#discussSelectButtonCenterInactive').attr('id','discussSelectButtonCenterActive');               
            $('#discussSelectButtonRightInactive').attr('id','discussSelectButtonRightActive');               
        });
        var self = this;
        if(this.state.newTopSelect === 'new') {
            axios.get( Config.API + '/comments/bytype/procon?problem_id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'procon',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'procon',
                    })
                }
            }) 
        } else {
            axios.get( Config.API + '/comments/bytype/procon/byrank?problem_id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'procon',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'procon',
                    })
                }
            })  
        }
    }
    selectAnswers() {
        $(document).ready(function() {
            $('#discussCommentGroupSelectAllActive').attr('id','discussCommentGroupSelectAllInactive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
            $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
            $('#discussSelectButtonLeftInactive').attr('id','discussSelectButtonLeftActive');               
        });
        var self = this;
        if(this.state.newTopSelect === 'new') {
            axios.get( Config.API + '/comments/bytype/answer?problem_id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'answer',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'answer',
                    })
                }
            }) 
        } else {
            axios.get( Config.API + '/comments/bytype/answer/byrank?problem_id='+this.props.params.discussID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'answer',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'answer',
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
        if (this.state.currentType === 'comment') {
            axios.get( Config.API + '/comments/bytype/comment?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else if (this.state.currentType === 'procon') {
            axios.get( Config.API + '/comments/bytype/procon?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else if (this.state.currentType === 'answer') {
            axios.get( Config.API + '/comments/bytype/answer?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else if (this.state.currentType === 'proconcom') {
            axios.get( Config.API + '/comments/bytype/proconcom?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else {
            axios.get( Config.API + '/comments/bytype/answercom?problem_id='+this.props.params.discussID).then(function (response) {
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
        if (this.state.currentType === 'comment') {
            axios.get( Config.API + '/comments/bytype/comment/byrank?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else if (this.state.currentType === 'procon') {
            axios.get( Config.API + '/comments/bytype/procon/byrank?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else if (this.state.currentType === 'answer') {
            axios.get( Config.API + '/comments/bytype/answer/byrank?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else if (this.state.currentType === 'proconcom') {
            axios.get( Config.API + '/comments/bytype/proconcom/byrank?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        } else {
            axios.get( Config.API + '/comments/bytype/answercom/byrank?problem_id='+this.props.params.discussID).then(function (response) {
                self.setState({
                    discuss: response.data,
                })
            }) 
        }
    }


   render() {
    if (this.state.parentType === 'Question') {
        return (
            <div id={this.state.proposalID}>
                <Link to={this.state.linkPath+ this.state.proposalPath +'/discuss'}>
                    <div id="discussGroupSelectAllInactive">discuss</div>
                </Link>
                <Link to={this.state.linkPath + this.state.proposalPath + this.state.parentLink}>
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
                <div id="discussCommentGroupSelectAllActive" onClick={this.selectAnswerCom}>
                    responses<span id="greenSmall">  {this.state.answerComNumber}</span>
                </div>
                <div id="discussSelectionMenuContainer">
                    <div id="sidebarDiscussMenu">
                        <div id="discussGroupSelection">
                            <div id="discussSelectButtonLeftInactive" onClick={this.selectAnswers}>                                           
                                answers
                                <span id="greenSmall">  {this.state.answerNumber}</span>
                            </div>
                            <div id="discussSelectButtonRightInactive" onClick={this.selectComments}>
                                comments
                                <span id="greenSmall">  {this.state.commentNumber}</span>
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
                <DiscussUnit linkPath={this.state.linkPath} solutionID={this.props.params.solutionID} discussID={this.props.params.discussID} questions={this.state.discuss} />
                <div id="proposalsTitleRightSBEnd"><br /></div>
            </div>
        )
    } else {
    return (
        <div id={this.state.proposalID}>
            <Link to={this.state.linkPath + this.state.proposalPath + '/discuss'}>
                <div id="discussGroupSelectAllInactive">discuss</div>
            </Link>
            <Link to={this.state.linkPath + this.state.proposalPath + this.state.parentLink}>
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
            <div id="discussCommentGroupSelectAllActive" onClick={this.selectProConCom}>
                responses<span id="greenSmall">  {this.state.proConComNumber}</span>
            </div>
            <div id="discussSelectionMenuContainer">
                <div id="sidebarDiscussMenu">
                    <div id="discussGroupSelection">
                        <div id="discussSelectButtonLeftInactive" onClick={this.selectComments}>
                            comments
                            <span id="greenSmall">  {this.state.commentNumber}</span>
                        </div>

                        <div id="discussSelectButtonRightInactive" onClick={this.selectProsCons}>                                           
                            pros/cons
                            <span id="greenSmall">  {this.state.proConNumber}</span>
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
            <DiscussUnit linkPath={this.state.linkPath} solutionID={this.props.params.solutionID} discussID={this.props.params.discussID} questions={this.state.discuss} />
            <div id="proposalsTitleRightSBEnd"><br /></div>
        </div>
  
    );
}
}
}

