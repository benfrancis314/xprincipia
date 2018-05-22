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
        axios.get( Config.API + '/learnItems/bytype/combined?id='+this.props.params.probID+'&dataType=0').then(function (response) {
            if(response.data.length > 0) {
                self.setState({
                    newTopID: 'discussListSelectButton',
                    learnItems: response.data,
                    newTopSelect: 'new',
                    currentType: 'combined',
                })
            } else {
                self.setState({
                    newTopID: 'discussListSelectButtonHide',
                    learnItems: response.data,
                    newTopSelect: 'new',
                    currentType: 'combined',
                })
            } 
        }) 
        axios.get( Config.API + '/learnItems/bytype/combined/number?id='+this.props.params.probID).then(function (response) {
            self.setState({
                learnNumber: response.data
            })
        })
        axios.get( Config.API + '/learnItems/bytype/learnitem/number?id='+this.props.params.probID).then(function (response) {
            self.setState({
                educationalNumber: response.data
            })
        })
        axios.get( Config.API + '/learnItems/bytype/resource/number?id='+this.props.params.probID).then(function (response) {
            self.setState({
                researchNumber: response.data
            })
        })
    }
    componentWillReceiveProps(nextProps){
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
        axios.get( Config.API + '/learnItems/bytype/combined?id='+nextProps.params.probID+'&dataType=0').then(function (response) {
            self.setState({
                learnItems: response.data
            })
        }) 
        axios.get( Config.API + '/learnItems/bytype/combined/number?id='+nextProps.params.probID).then(function (response) {
            self.setState({
                learnNumber: response.data
            })
        })
        axios.get( Config.API + '/learnItems/bytype/learnitem/number?id='+nextProps.params.probID).then(function (response) {
            self.setState({
                educationalNumber: response.data
            })
        })
        axios.get( Config.API + '/learnItems/bytype/resource/number?id='+nextProps.params.probID).then(function (response) {
            self.setState({
                researchNumber: response.data
            })
        })
    }

    selectAll() {
        $(document).ready(function() {
            $('#discussGroupSelectAllInactive').attr('id','discussGroupSelectAllActive');                
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        if(this.state.newTopSelect === 'new') {
            axios.get( Config.API + '/learnItems/bytype/combined?id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        learnItems: response.data,
                        currentType: 'combined',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        learnItems: response.data,
                        currentType: 'combined',
                    })
                }
            }) 
        } else {
            axios.get( Config.API + '/learnItems/bytype/combined/byrank?id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        learnItems: response.data,
                        currentType: 'combined',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        learnItems: response.data,
                        currentType: 'combined',
                    })
                }
            })  
        }
    }
    
    selectEducational() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
            $('#discussSelectButtonLeftInactive').attr('id','discussSelectButtonLeftActive');               
            $('#discussSelectButtonRightActive').attr('id','discussSelectButtonRightInactive');               
        });
        var self = this;
        if(this.state.newTopSelect === 'new') {
            axios.get( Config.API + '/learnItems/bytype/learnitem?id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        learnItems: response.data,
                        currentType: 'educational',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        learnItems: response.data,
                        currentType: 'educational',
                    })
                }
            }) 
        } else {
            axios.get( Config.API + '/learnItems/bytype/learnitem/byrank?id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        learnItems: response.data,
                        currentType: 'educational',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        learnItems: response.data,
                        currentType: 'educational',
                    })
                }
            })  
        }
    }

    selectResearch() {
        $(document).ready(function() {
            $('#discussGroupSelectAllActive').attr('id','discussGroupSelectAllInactive');               
            $('#discussSelectButtonLeftActive').attr('id','discussSelectButtonLeftInactive');               
            $('#discussSelectButtonRightInactive').attr('id','discussSelectButtonRightActive');               
        });
        var self = this
        if(this.state.newTopSelect === 'new') {
            axios.get( Config.API + '/learnItems/bytype/resource?id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        learnItems: response.data,
                        currentType: 'research',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        learnItems: response.data,
                        currentType: 'research',
                    })
                }
            }) 
        } else {
            axios.get( Config.API + '/learnItems/bytype/resource/byrank?id='+this.props.params.probID).then(function (response) {
                if(response.data.length > 0) {
                    self.setState({
                        newTopID: 'discussListSelectButton',
                        learnItems: response.data,
                        currentType: 'research',
                    })
                } else {
                    self.setState({
                        newTopID: 'discussListSelectButtonHide',
                        learnItems: response.data,
                        currentType: 'research',
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
        if (this.state.currentType === 'educational') {
            axios.get( Config.API + '/learnItems/bytype/learnitem?id='+this.props.params.probID).then(function (response) {
                self.setState({
                    learnItems: response.data,
                })
            }) 
        } else if (this.state.currentType === 'research') {
            axios.get( Config.API + '/learnItems/bytype/resource?id='+this.props.params.probID).then(function (response) {
                self.setState({
                    learnItems: response.data,
                })
            }) 
        } else {
            axios.get( Config.API + '/learnItems/bytype/combined?id='+this.props.params.probID).then(function (response) {
                self.setState({
                    learnItems: response.data,
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
        if (this.state.currentType === 'educational') {
            axios.get( Config.API + '/learnItems/bytype/learnitem/byrank?id='+this.props.params.probID).then(function (response) {
                self.setState({
                    learnItems: response.data,
                })
            }) 
        } else if (this.state.currentType === 'research') {
            axios.get( Config.API + '/learnItems/bytype/resource/byrank?id='+this.props.params.probID).then(function (response) {
                self.setState({
                    learnItems: response.data,
                })
            }) 
        } else {
            axios.get( Config.API + '/learnItems/bytype/combined/byrank?id='+this.props.params.probID).then(function (response) {
                self.setState({
                    learnItems: response.data,
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
                            <div id="discussSelectButtonLeftInactive" onClick={this.selectEducational}>
                                educational
                                <span id="greenSmall">  {this.state.educationalNumber}</span>
                            </div>

                            <div id="discussSelectButtonRightInactive" onClick={this.selectResearch}>                                           
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
                <LearnUnit linkPath={this.state.linkPath} learnItems={this.state.learnItems} />
                <div id="proposalsTitleRightSBEnd"><br /></div>
            </div>  
      );
    }  
}
