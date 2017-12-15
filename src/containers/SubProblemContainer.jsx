import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import SubProblemUnit from '../components/problems/SubProblemUnit.jsx';
import ProjectBranchesList from '../components/problems/ProjectBranchesList.jsx';
import {Config} from '../config.js';
import $ from 'jquery';

export default class SubProblemContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problems: [],
            branches: []
        }
        this.renderItem = this.renderItem.bind(this);  
        this.renderBranch = this.renderBranch.bind(this);  
        
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
        axios.get( Config.API + '/problems/subproblems?id='+this.props.probID).then(function (response) {
            self.setState({
                problems: response.data
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
        axios.get( Config.API + '/problems/subproblems?id='+nextProps.probID).then(function (response) {
            self.setState({
                problems: response.data
            })
        }) 
        axios.get( Config.API + '/breakdowns/byproblem?parentID='+nextProps.probID).then(function (response) {
            self.setState({
                branches: response.data
            })
        })  
    }

// Is this being used?
//         //On recieving next props
//     componentWillReceiveProps(nextProps){
//         var self = this
//         self.setState({problems: nextProps.problems})
//         console.log(self.state.problems)
//     }


    render() {
            return (
            // OLD: Using SubProblemUnit as separate component
                // <div id="sidebarSBProjects">
                //     <SubProblemUnit problems={this.state.problems} probID={this.props.probID} />
                // </div>
                <div id="SPwrapper">
                    {/* <Link to={`/project/branches`} activeClassName="activeBranchesProjectButton"> */}
                            <div id="branchesProjectButton" onMouseOver={this.hoverBranch} onMouseOut={this.unHoverBranch}>
                                <img src={require('../assets/branchWhite1.svg')} id="branchesProjectImg" width="60" height="60" alt="User avatar, DNA Helix" />
                                <div id="branchUnitList"> 
                                    <li>
                                        <img src={require('../assets/leftArrow.svg')} id="branchArrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                                    </li>
                                    <Link to={`/project/${this.props.probID}/create/breakdown`} activeClassName="activePrivateCreateButton">
                                        <li id="branchUnit">
                                            <div id="branchHeader" onMouseOver={this.hoverNewBranch} onMouseOut={this.unHoverNewBranch}>
                                                <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="80" height="80" alt="User avatar, DNA Helix" />
                                            </div>
                                        </li>
                                    </Link>
                                    {this.state.branches.map(this.renderBranch)}
                                    <li>
                                        <img src={require('../assets/rightArrow.svg')} id="branchArrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                                    </li>
                                </div>
                            </div>
                    {/* </Link> */}
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
            
                // 			function handleClick() {
                // 				ReactGA.event({
                // 						category: 'Project',
                // 						action: 'Clicked Link',
                // 				});
                // 				// alert('success');
                // }
            if (problem.ParentType === 1) {
                    return (
                        <div key={problem.ID} id="nodisplay">
                        </div>
                    );
            
            // Ensure to copy this so that it works for Goals and Problems too
            // This makes text smaller if problem length is larger
            } else if (problem.Title.length > 50) {
            return (
                <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'}>
                    <li key={problem.ID} id="SPUnit">
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
                        <li key={problem.ID} id="SPUnit">
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
                        <li key={problem.ID} id="SPUnit">
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
                        <li key={problem.ID} id="SPUnit">
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
                    });
                }
                    // Use if title is longer than certain amount
                //  if (branch.Title.length > 50) {
                    // if (1) {
                return (
                    <Link key={branch.ID} to={'/project/'+branch.ParentID +'/subprojects/'+branch.ParentID}>
                        <li key={branch.ID} id="branchUnit">
                            <div id="branchHeader" className={branch.ID} onMouseOver={hoverBranchText} onMouseOut={unHoverBranchText}>
                                {branch.Title}
                            </div>
                        </li>
                    </Link>
                
                );
            }
                  
        }
