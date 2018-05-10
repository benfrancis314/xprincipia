import React from 'react';
import axios from 'axios';
import LearnUnit from '../components/learn/LearnUnit.jsx';
import {Config} from '../config.js';
import $ from 'jquery';

export default class LearnContainer extends React.Component {
constructor(props){
        super(props);

        this.state = {
            learnItems: [],
            newTopID: '',
            newTopSelect: '',
            currentType: '',
            linkPath: '',
            learnNumber: '',
            educationalNumber: '',
            researchNumber: '',
        }
        this.selectAll = this.selectAll.bind(this)
        this.selectResearch = this.selectResearch.bind(this)
        this.selectEducational = this.selectEducational.bind(this)
        this.selectNew = this.selectNew.bind(this)
        this.selectTop = this.selectTop.bind(this)
    };
    // componentDidMount(){
    //     var self = this;
    //         if (window.location.pathname.includes('private')) {
    //             self.setState({
    //                 linkPath: '/project/private/',
    //             })
    //         } else {
    //             self.setState({
    //                 linkPath: '/project/',
    //             })
    //         }
    //         axios.get( Config.API + '/comments/bytype/discuss?problem_id='+this.props.params.probID).then(function (response) {
    //             if(response.data.length > 0) {
    //                 self.setState({
    //                     newTopID: 'discussListSelectButton',
    //                     discuss: response.data,
    //                     newTopSelect: 'new',
    //                     currentType: 'discuss',
    //                 })
    //             } else {
    //                 self.setState({
    //                     newTopID: 'discussListSelectButtonHide',
    //                     discuss: response.data,
    //                     newTopSelect: 'new',
    //                     currentType: 'discuss',
    //                 })
    //             }
    //         }) 
    //         
    // }
    componentDidMount(){
        var self = this;
        if(this.props.params.solutionID){
            axios.get( Config.API + '/learnItems/bytype/combined?problem_id='+this.props.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    learnItems: response.data
                })
            })  
        } else {
            axios.get( Config.API + '/learnItems/bytype/combined?problem_id='+this.props.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    learnItems: response.data
                })
            }) 
        }
        axios.get( Config.API + '/learnItems/bytype/combined/number?problem_id='+this.props.params.probID).then(function (response) {
            self.setState({
                learnNumber: response.data
            })
        })
        axios.get( Config.API + '/learnItems/bytype/learnitem/number?problem_id='+this.props.params.probID).then(function (response) {
            self.setState({
                educationalNumber: response.data
            })
        })
        axios.get( Config.API + '/learnItems/bytype/resource/number?problem_id='+this.props.params.probID).then(function (response) {
            self.setState({
                researchNumber: response.data
            })
        })
    }
    componentWillReceiveProps(nextProps){
        var self = this;
        if(this.props.params.solutionID){
            return axios.get( Config.API + '/learnItems/typeID?id='+nextProps.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    learnItems: response.data
                })
            })  
        } else {
            return axios.get( Config.API + '/learnItems/typeID?id='+nextProps.params.probID+'&dataType=0').then(function (response) {
                self.setState({
                    learnItems: response.data
                })
            }) 
        }
    }

    selectAll() {
        $(document).ready(function() {
            $('#discussGroupSelectAllInactive').attr('id','discussGroupSelectAllActive');                
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        // var self = this;
        // if(this.state.newTopSelect == 'new') {
        //     axios.get( Config.API + '/comments/bytype/discuss?problem_id='+this.props.params.probID).then(function (response) {
        //         if(response.data.length > 0) {
        //             self.setState({
        //                 newTopID: 'discussListSelectButton',
        //                 discuss: response.data,
        //                 currentType: 'discuss',
        //             })
        //         } else {
        //             self.setState({
        //                 newTopID: 'discussListSelectButtonHide',
        //                 discuss: response.data,
        //                 currentType: 'discuss',
        //             })
        //         }
        //     }) 
        // } else {
        //     axios.get( Config.API + '/comments/bytype/discuss/byrank?problem_id='+this.props.params.probID).then(function (response) {
        //         if(response.data.length > 0) {
        //             self.setState({
        //                 newTopID: 'discussListSelectButton',
        //                 discuss: response.data,
        //                 currentType: 'discuss',
        //             })
        //         } else {
        //             self.setState({
        //                 newTopID: 'discussListSelectButtonHide',
        //                 discuss: response.data,
        //                 currentType: 'discuss',
        //             })
        //         }
        //     })  
        // }
    }
    
    selectResearch() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
            $('#discussSelectButtonLeftInactive').attr('id','discussSelectButtonLeftActive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        // var self = this;
        // if(this.state.newTopSelect == 'new') {
        //     axios.get( Config.API + '/comments/bytype/question?problem_id='+this.props.params.probID).then(function (response) {
        //         if(response.data.length > 0) {
        //             self.setState({
        //                 newTopID: 'discussListSelectButton',
        //                 discuss: response.data,
        //                 currentType: 'question',
        //             })
        //         } else {
        //             self.setState({
        //                 newTopID: 'discussListSelectButtonHide',
        //                 discuss: response.data,
        //                 currentType: 'question',
        //             })
        //         }
        //     }) 
        // } else {
        //     axios.get( Config.API + '/comments/bytype/question/byrank?problem_id='+this.props.params.probID).then(function (response) {
        //         if(response.data.length > 0) {
        //             self.setState({
        //                 newTopID: 'discussListSelectButton',
        //                 discuss: response.data,
        //                 currentType: 'question',
        //             })
        //         } else {
        //             self.setState({
        //                 newTopID: 'discussListSelectButtonHide',
        //                 discuss: response.data,
        //                 currentType: 'question',
        //             })
        //         }
        //     })  
        // }
    }
    selectEducational() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            $('#discussSelectButtonRightInactive').attr('id','discussSelectButtonRightActive');               
        });
        // var self = this;
        // if(this.state.newTopSelect == 'new') {
        //     axios.get( Config.API + '/comments/bytype/suggestion?problem_id='+this.props.params.probID).then(function (response) {
        //         if(response.data.length > 0) {
        //             self.setState({
        //                 newTopID: 'discussListSelectButton',
        //                 discuss: response.data,
        //                 currentType: 'suggestion',
        //             })
        //         } else {
        //             self.setState({
        //                 newTopID: 'discussListSelectButtonHide',
        //                 discuss: response.data,
        //                 currentType: 'suggestion',
        //             })
        //         }
        //     }) 
        // } else {
        //     axios.get( Config.API + '/comments/bytype/suggestion/byrank?problem_id='+this.props.params.probID).then(function (response) {
        //         if(response.data.length > 0) {
        //             self.setState({
        //                 newTopID: 'discussListSelectButton',
        //                 discuss: response.data,
        //                 currentType: 'suggestion',
        //             })
        //         } else {
        //             self.setState({
        //                 newTopID: 'discussListSelectButtonHide',
        //                 discuss: response.data,
        //                 currentType: 'suggestion',
        //             })
        //         }
        //     })  
        // }
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
       return (
            <div id="projectInteractDiscussMenu">
                <div id="discussGroupSelectAllActive" onClick={this.selectAll}>learn<span id="greenSmall">  {this.state.learnNumber}</span></div>
                <div id="discussSelectionMenuContainer">
                    <div id="sidebarDiscussMenu">
                        <div id="discussGroupSelection">
                            <div id="discussSelectButtonLeftInactive" onClick={this.selectResearch}>
                                educational
                                <span id="greenSmall">  {this.state.educationalNumber}</span>
                            </div>

                            <div id="discussSelectButtonRightInactive" onClick={this.selectEducational}>                                           
                                research
                                <span id="greenSmall">  {this.state.researchNumber}</span>
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
                <LearnUnit learnItems={this.state.learnItems} />
                <div id="proposalsTitleRightSBEnd"><br /></div>
            </div>  
      );
    }  
}
