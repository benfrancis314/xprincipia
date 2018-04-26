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
            newTopSelect: '',
            currentType: '',
           
        }
        this.selectAll = this.selectAll.bind(this)
        this.selectQuestions = this.selectQuestions.bind(this)
        this.selectSuggestions = this.selectSuggestions.bind(this)
        this.selectDebates = this.selectDebates.bind(this)
        this.selectNew = this.selectNew.bind(this)
        this.selectTop = this.selectTop.bind(this)
    };
    componentDidMount(){
        var self = this;
            axios.get( Config.API + '/comments/bytype/discuss?problem_id='+this.props.params.probID).then(function (response) {
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
    componentWillReceiveProps(nextProps){
        var self = this;
            axios.get( Config.API + '/comments/bytype/discuss?problem_id='+nextProps.params.probID).then(function (response) {
                if (response.data.length > 0) {
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
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        if(this.state.newTopSelect == 'new') {
            axios.get( Config.API + '/comments/bytype/discuss?problem_id='+this.props.params.probID).then(function (response) {
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
            axios.get( Config.API + '/comments/bytype/discuss/byrank?problem_id='+this.props.params.probID).then(function (response) {
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
    
    selectQuestions() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
            $('#discussSelectButtonLeftInactive').attr('id','discussSelectButtonLeftActive');               
            $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        if(this.state.newTopSelect == 'new') {
            axios.get( Config.API + '/comments/bytype/question?problem_id='+this.props.params.probID).then(function (response) {
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
            axios.get( Config.API + '/comments/bytype/question/byrank?problem_id='+this.props.params.probID).then(function (response) {
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
    selectSuggestions() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            $('#discussSelectButtonCenterInactive').attr('id','discussSelectButtonCenterActive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        if(this.state.newTopSelect == 'new') {
            axios.get( Config.API + '/comments/bytype/suggestion?problem_id='+this.props.params.probID).then(function (response) {
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
            axios.get( Config.API + '/comments/bytype/suggestion/byrank?problem_id='+this.props.params.probID).then(function (response) {
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
    selectDebates() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');             
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            $('#discussSelectButtonCenterActive').attr('id','discussSelectButtonCenterInactive');               
            $('#discussSelectButtonRightInactive').attr('id','discussSelectButtonRightActive');               
        });
        var self = this;
        if(this.state.newTopSelect == 'new') {
            axios.get( Config.API + '/comments/bytype/freeform?problem_id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'debate',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'debate',
                    })
                }
            }) 
        } else {
            axios.get( Config.API + '/comments/bytype/freeform/byrank?problem_id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        discuss: response.data,
                        currentType: 'debate',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        discuss: response.data,
                        currentType: 'debate',
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
    // if (window.location.pathname.includes('private')) {

    //     return (
    //         <div id="questionContainer">
    //             private
    //             {/* {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})} */}
    //             {/* <DiscussUnitPrivate questions={this.state.questions} /> */}
    //         </div>
      
    //     );
// } else {
    return (
        <div id="projectInteractDiscussMenu">
            <div id="proposalsTitleRightSB">DISCUSS</div>
            <div id="discussSelectionMenuContainer">
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
                {React.cloneElement(this.props.children, {parentTitle: this.props.parentTitle})}
                <div id={this.state.newTopID}>
                    <div id="discussListNewButtonActive" onClick={this.selectNew}>
                        new
                    </div>
                    <div id="discussListTopButtonInactive" onClick={this.selectTop}>
                        top
                    </div>
                </div>
            </div>
            <DiscussUnit questions={this.state.discuss} />
        </div>
  
    );
// }
}
}