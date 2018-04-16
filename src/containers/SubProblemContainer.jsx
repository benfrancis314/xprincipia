import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import SubProblemUnit from '../components/problems/SubProblemUnit.jsx';
import ProjectBreakdownList from '../components/problems/ProjectBreakdownList.jsx';
import {Config} from '../config.js';
import $ from 'jquery';

export default class SubProblemContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problems: [],
            branches: [],
            probID: '',
        }
        this.renderItem = this.renderItem.bind(this);  
        this.renderBranch = this.renderBranch.bind(this);
        this.hoverText = this.hoverText.bind(this);
        this.unHoverText = this.unHoverText.bind(this);
        this.clickBranch = this.clickBranch.bind(this);
        this.hoverBranch = this.hoverBranch.bind(this);
        this.unHoverBranch = this.unHoverBranch.bind(this);
        this.hoverNewBranch = this.hoverNewBranch.bind(this);
        this.unHoverNewBranch = this.unHoverNewBranch.bind(this);
    };

    hoverText() {
		$(document).ready(function() {
			$('#privateContainerMotto').html("NEW SUB PROJECT").fadeIn(7500);
			$('#privateContainerMotto').attr('id','privateContainerMottoBlue');
		});
	}
	unHoverText() {
		$(document).ready(function() {
			$('#privateContainerMottoBlue').html("PROJECT BREAKDOWN");
			$('#privateContainerMottoBlue').attr('id','privateContainerMotto');
		});
    }
    clickBranch() {
		$(document).ready(function() {
			$('#privateContainerMotto').html("ALTERNATE BREAKDOWNS").fadeIn(7500);
            $('#privateContainerMotto').attr('id','privateContainerMottoBlue');
            // $('#branchesProjectButton').attr('id','branchesProjectButtonClick');
		});
    }
    hideBranch() {
		$(document).ready(function() {
			$('#privateContainerMottoBlue').html("PROJECT BREAKDOWNS").fadeIn(7500);
            $('#privateContainerMottoBlue').attr('id','privateContainerMotto');
            $('#branchesProjectButtonClick').attr('id','branchesProjectButton');
		});
	}
	hoverBranch() {
		$(document).ready(function() {
			$('#privateContainerMotto').html("ALTERNATE BREAKDOWNS").fadeIn(7500);
			$('#privateContainerMotto').attr('id','privateContainerMottoBlue');
		});
	}
	unHoverBranch() {
		$(document).ready(function() {
			$('#privateContainerMottoBlue').html("PROJECT BREAKDOWN");
			$('#privateContainerMottoBlue').attr('id','privateContainerMotto');
		});
    }
    hoverNewBranch() {
        $(document).ready(function() {
                $('#privateContainerMotto').html("NEW BREAKDOWN").fadeIn(7500);
                $('#privateContainerMotto').attr('id','privateContainerMottoWhite');
        });
    }
    unHoverNewBranch() {
            $(document).ready(function() {
                    $('#privateContainerMottoWhite').html("PROJECT BREAKDOWN");
                    $('#privateContainerMottoWhite').attr('id','privateContainerMotto');
            });
    }
    componentDidMount(){
        var self = this;
        this.setState({
            probID: self.props.probID,
        })
        // We are no longer using this for problems, instaed only getting those of the original breakdown
        // axios.get( Config.API + '/problems/subproblems?id='+this.props.probID).then(function (response) {
        //     self.setState({
        //         problems: response.data,
        //     })
        // }) 
        axios.get( Config.API + '/problems/breakdown?breakdownID='+this.props.breakdownOriginal).then(function (response) {
            self.setState({
                problems: response.data,
            })
        }) 
        axios.get( Config.API + '/breakdowns/byproblem?parentID='+this.props.probID).then(function (response) {
            self.setState({
                branches: response.data
            })
        })   
    }
    
    componentWillReceiveProps (nextProps){
        var self = this;
        this.setState({
            probID: nextProps.probID,
        })
        // We are no longer using this for problems, instaed only getting those of the original breakdown
        // axios.get( Config.API + '/problems/subproblems?id='+nextProps.probID).then(function (response) {
        //     self.setState({
        //         problems: response.data,
        //     })
        // }) 
        axios.get( Config.API + '/problems/breakdown?breakdownID='+nextProps.breakdownOriginal).then(function (response) {
            self.setState({
                problems: response.data,
            })
        }) 
        axios.get( Config.API + '/breakdowns/byproblem?parentID='+nextProps.probID).then(function (response) {
            self.setState({
                branches: response.data
            })
        })  
    }

    shouldComponentUpdate (nextProps, nextState) {
        
            if((nextState.probID !== nextProps.probID) 
            || (nextState.problems !== this.state.problems)) {
                return true
            } else {
                return false
            }
    }


    render() {
            return (
                <div id="SPwrapper">
                    <Link to={`/project/${this.props.probID}/create/breakdown`} activeClassName="activePrivateCreateButton">
                        <div id="branchesProjectButton" onMouseOver={this.hoverBranch} onMouseOut={this.unHoverBranch} onClick={this.clickBranch}>
                        </div>
                    </Link>
                    <ul id="SPUnitList"> 
                        <li>
                            <img src={require('../assets/leftArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                        </li>
                        <Link to={`/project/${this.props.probID}/create`} activeClassName="activePrivateCreateButton">
                                <li id="SPUnit">
                                        <div id="SPHeader" onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                                                <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="80" height="80" alt="User avatar, DNA Helix" />
                                        </div>
                                </li>
                        </Link>
                        {this.state.problems.map(this.renderItem)}
                        <li>
                            <img src={require('../assets/rightArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                        </li>
                    </ul>
                </div>
            );
        }
        renderItem(problem) {
            if (problem.ParentType === 1) {
                    return (
                        <div key={problem.ID} id="nodisplay">
                        </div>
                    );
            } else if (problem.Title.length > 50) {
            return (
                <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'}>
                    <li id="SPUnit">
                        <div id="SPHeader">
                            <div id="SPTitleSmall">{problem.Title}</div>
                            <div id="SPPercent">{problem.Rank}</div>
                        </div>
                    </li>
                </Link>
            );
            } else if (problem.Class == '2') {
                return (
                    <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'}>
                        <li id="SPUnit">
                            <div id="SPHeaderRed">
                                <div id="SPTitleRed">
                                    <span id="red">problem</span>
                                    <br />
                                    {problem.Title}
                                </div>
                                <div id="SPPercent">{problem.Rank}</div>
                            </div>
                        </li>
                    </Link>
                );
            } else if (problem.Class == '1') {
                return (
                    <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'}>
                        <li id="SPUnit">
                            <div id="SPHeaderGreen">
                                <div id="SPTitleGreen">
                                    <span id="green">goal</span>
                                    <br />
                                    {problem.Title}
                                </div>
                                <div id="SPPercent">{problem.Rank}</div>
                            </div>
                        </li>
                    </Link>
                );
            } else {
                return (
                    <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'}>
                        <li id="SPUnit">
                            <div id="SPHeader">
                                <div id="SPTitle">{problem.Title}</div>
                                <div id="SPPercent">{problem.Rank}</div>
                            </div>
                        </li>
                    </Link>
                )};
              }
              renderBranch(branch) {
                
                function hoverBranchText() {
                    if (branch.Description !== '') {
                        $(document).ready(function() {
                            $('div.'+branch.ID).attr('class','branchText');
                            $('.branchText').html(branch.Description).fadeIn(7500);
                        });
                    }
                }
                function unHoverBranchText() {
                    $(document).ready(function() {
                        $('.branchText').html(branch.Title).fadeIn(7500);
                        $('div.branchText').attr('class',branch.ID);
                        $('#privateContainerMottoRed').html("ALTERNATE BREAKDOWNS").fadeIn(7500);
                        $('#privateContainerMottoRed').attr('id','privateContainerMottoBlue');
                    });
                }
                function branchChange() {
                    // CURRENTLY DISABLED PART NECESSARY TO ADD NEW PROJECTS IN EACH BREAKDOWN
                    // NEED TO DISABLE RERENDER OF PROBLEMS WHEN FULLPROBLEM RERENDERS FROM STATE CHANGE
                    this.props.differentBreakdown(branch.ID);
                    var self = this;
                    axios.get( Config.API + '/problems/breakdown?breakdownID='+branch.ID).then(function (response) {
                        self.setState({
                            problems: response.data
                        })
                    })  
                    $(document).ready(function() {
                        $('#privateContainerMottoBlue').html("PROJECTS CHANGED").fadeIn(7500);
                        $('#privateContainerMottoBlue').attr('id','privateContainerMottoRed');
                    });
                }

                    // Use if title is longer than certain amount
                //  if (branch.Title.length > 50) {
                    // if (1) {
                return (
                        <li key={branch.ID} id="branchUnit">
                            <div id="branchHeader" className={branch.ID} onClick={branchChange.bind(this)} onMouseOver={hoverBranchText} onMouseOut={unHoverBranchText}>
                                {branch.Title}
                            </div>
                        </li>                
                );
            }
                  
        }
