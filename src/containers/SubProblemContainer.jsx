import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
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
            linkPath: '',
            breakdownOriginal: [],
            destinationPath: '',
            private: false,
        }
        this.renderItem = this.renderItem.bind(this);  
        this.renderPrivateItem = this.renderPrivateItem.bind(this);  
        this.renderBranch = this.renderBranch.bind(this);
        this.hoverText = this.hoverText.bind(this);
        this.unHoverText = this.unHoverText.bind(this);
        this.clickBranch = this.clickBranch.bind(this);
        this.hoverBranch = this.hoverBranch.bind(this);
        this.unHoverBranch = this.unHoverBranch.bind(this);
        this.hoverNewBranch = this.hoverNewBranch.bind(this);
        this.unHoverNewBranch = this.unHoverNewBranch.bind(this);
        this.showProblemForm = this.showProblemForm.bind(this);
        this.showProblemFormFirst = this.showProblemFormFirst.bind(this);
        this.hoverProject = this.hoverProject.bind(this);
        this.unHoverProject = this.unHoverProject.bind(this);
    };

    hoverText() {
		$(document).ready(function() {
			$('#privateContainerMotto').html('<span id="blue">NEW </span>SUB<span id="blue">PROJECT</span>').fadeIn(7500);
			$('#privateContainerMotto').attr('id','privateContainerMottoWhite');
		});
	}
	unHoverText() {
		$(document).ready(function() {
			$('#privateContainerMottoWhite').html("<span id='blueOpaque'>PROJECT </span><span id='whiteOpaque'>TREE</span>");
			$('#privateContainerMottoWhite').attr('id','privateContainerMotto');
		});
    }
    clickBranch() {
		$(document).ready(function() {
			$('#privateContainerMotto').html('<span id="blue">ALTERNATE </span>BREAKDOWNS').fadeIn(7500);
            $('#privateContainerMotto').attr('id','privateContainerMottoWhite');
            // $('#branchesProjectButton').attr('id','branchesProjectButtonClick');
		});
    }
    hideBranch() {
		$(document).ready(function() {
			$('#privateContainerMottoWhite').html("<span id='blueOpaque'>PROJECT </span><span id='whiteOpaque'>TREE</span>").fadeIn(7500);
            $('#privateContainerMottoWhite').attr('id','privateContainerMotto');
            $('#branchesProjectButtonClick').attr('id','branchesProjectButton');
		});
	}
	hoverBranch() {
		$(document).ready(function() {
			$('#privateContainerMotto').html('<span id="blue">ALTERNATE </span>BREAKDOWNS').fadeIn(7500);
			$('#privateContainerMotto').attr('id','privateContainerMottoWhite');
		});
	}
	unHoverBranch() {
		$(document).ready(function() {
			$('#privateContainerMottoWhite').html("<span id='blueOpaque'>PROJECT </span><span id='whiteOpaque'>TREE</span>");
			$('#privateContainerMottoWhite').attr('id','privateContainerMotto');
		});
    }
    hoverNewBranch() {
        $(document).ready(function() {
                $('#privateContainerMotto').html('NEW<span id="blue"> BREAKDOWN</span>').fadeIn(7500);
                $('#privateContainerMotto').attr('id','privateContainerMottoWhite');
        });
    }
    unHoverNewBranch() {
            $(document).ready(function() {
                    $('#privateContainerMottoWhite').html("<span id='blueOpaque'>PROJECT </span><span id='whiteOpaque'>TREE</span>");
                    $('#privateContainerMottoWhite').attr('id','privateContainerMotto');
            });
    }
    showProblemFormFirst() {
        $(document).ready(function() {
            $('#problemFormContainerHide').attr('id','problemFormContainerShow');
            $('#noProjectsContainerShow').attr('id','noProjectsContainerHide');
        });
    }
    showProblemForm() {
        $(document).ready(function() {
            $('#problemFormContainerHide').attr('id','problemFormContainerShow');
            $('#SPUnitNew').attr('id','SPUnitNewHide');
        });
    }
    hoverProject() {
        $(document).ready(function() {
            $('#privateContainerMotto').html('<span id="blue">VIEW </span>SUB<span id="blue">PROJECT</span>').fadeIn(7500);
            $('#privateContainerMotto').attr('id','privateContainerMottoWhite');
        });
    }
    unHoverProject() {
        $(document).ready(function() {
            $('#privateContainerMottoWhite').html("<span id='blueOpaque'>PROJECT </span><span id='whiteOpaque'>TREE</span>");
            $('#privateContainerMottoWhite').attr('id','privateContainerMotto');
        });
    }
    
    // componentDidMount(){
    //     var self = this;
    //     if (window.location.pathname.includes('private')) {
    //         self.setState({
    //             linkPath: '/project/private/',
    //         })
    //     } else {
    //         self.setState({
    //             linkPath: '/project/',
    //         })
    //     }
        // axios.get( Config.API + '/breakdowns/byproblemnumber?parentID='+this.props.params.probID + '&parentNumber=1').then(function (response) {
        //     self.setState({
        //         breakdownOriginal: response.data.ID,
        //     })
        // })  
    //     this.setState({
    //         probID: self.props.probID,
    //     })
    //     axios.get( Config.API + '/problems/breakdown?breakdownID='+this.props.breakdownOriginal).then(function (response) {
    //         self.setState({
    //             problems: response.data,
    //         })
    //     }) 
    //     // axios.get( Config.API + '/breakdowns/byproblem?parentID='+this.props.probID).then(function (response) {
    //     //     self.setState({
    //     //         branches: response.data
    //     //     })
    //     // })   
    // }
    componentDidMount() {
        var self = this;
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
        if (window.location.pathname.includes('private')) {
            self.setState({
                linkPath: '/project/private/',
                private: true,
            })
        } else {
            self.setState({
                linkPath: '/project/',
                private: false,
            })
        }
        if (window.location.pathname.includes('discuss')) {
            self.setState({
                destinationPath: '/discuss',
            })
        } else if (window.location.pathname.includes('learn')) {
            self.setState({
                destinationPath: '/learn',
            })
        } else {
            self.setState({
                destinationPath: '/subprojects',
            })
        }
    }
    componentWillReceiveProps (nextProps){
        var self = this;
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
        if (window.location.pathname.includes('private')) {
            self.setState({
                linkPath: '/project/private/',
            })
        } else {
            self.setState({
                linkPath: '/project/',
            })
        }
        if (window.location.pathname.includes('discuss')) {
            self.setState({
                destinationPath: '/discuss',
            })
        } else if (window.location.pathname.includes('learn')) {
            self.setState({
                destinationPath: '/learn',
            })
        } else {
            self.setState({
                destinationPath: '/subprojects',
            })
        }
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

        if (this.state.problems === undefined || this.state.problems.length == 0) {
            return (
                <div>
                    <div id="noProjectsContainerShow">
                            <div id="noProjectsPromptFlare"><br /></div>
                            <div id="noProjectsPrompt" onMouseOver={this.hoverText} onMouseOut={this.unHoverText} onClick={this.showProblemFormFirst}>
                                <span id="blue">begin </span>project <span id="blue">breakdown</span>
                            </div>
                    </div>
                    <div id="SPwrapper">
                        <ul id="SPUnitList"> 
                            {/* <li>
                                <img src={require('../assets/leftArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                            </li> */}
                            {/* <Link to={this.state.linkPath+this.props.probID+'/create'} activeClassName="activePrivateCreateButton"> */}
                                
                            {/* </Link> */}
                            {this.state.problems.map(this.renderItem)}
                            {/* <li>
                                <img src={require('../assets/rightArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                            </li> */}
                        </ul>
                    </div>
                    {/* <Link to={this.state.linkPath+this.props.probID+'/create/breakdown'} activeClassName="activePrivateCreateButton">
                        <div id="branchesProjectButton" onMouseOver={this.hoverBranch} onMouseOut={this.unHoverBranch} onClick={this.clickBranch}>
                        </div>
                    </Link> */}
                    {/* <div id="SPUnitNew">
                            <div id="SPHeaderNew" onMouseOver={this.hoverText} onMouseOut={this.unHoverText} onClick={this.showProblemForm}>
                                    <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="50" height="50" alt="User avatar, DNA Helix" />
                            </div>
                    </div> */}
                </div>
            );
        } else if (this.state.private === true) {
            return (
                  <div>
                      <div id="SPwrapper">
                          <ul id="SPUnitList"> 
                              {this.state.problems.map(this.renderPrivateItem)}
                          </ul>
                      </div>
                      <div id="SPUnitNew">
                              <div id="SPHeaderNew" onMouseOver={this.hoverText} onMouseOut={this.unHoverText} onClick={this.showProblemForm}>
                                      <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="50" height="50" alt="User avatar, DNA Helix" />
                              </div>
                      </div>
                  </div>    
            );
        } else {
          return (
                <div>
                    <div id="SPwrapper">
                        <ul id="SPUnitList"> 
                            {/* <li>
                                <img src={require('../assets/leftArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                            </li> */}
                            {/* <Link to={this.state.linkPath+this.props.probID+'/create'} activeClassName="activePrivateCreateButton"> */}
                                
                            {/* </Link> */}
                            {this.state.problems.map(this.renderItem)}
                            {/* <li>
                                <img src={require('../assets/rightArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                            </li> */}
                        </ul>
                    </div>
                    {/* <Link to={this.state.linkPath+this.props.probID+'/create/breakdown'} activeClassName="activePrivateCreateButton">
                        <div id="branchesProjectButton" onMouseOver={this.hoverBranch} onMouseOut={this.unHoverBranch} onClick={this.clickBranch}>
                        </div>
                    </Link> */}
                    <div id="SPUnitNew">
                            <div id="SPHeaderNew" onMouseOver={this.hoverText} onMouseOut={this.unHoverText} onClick={this.showProblemForm}>
                                    <img src={require('../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="50" height="50" alt="User avatar, DNA Helix" />
                            </div>
                    </div>
                </div>    
          );
       }  
    }
        renderItem(problem) {
            // var distance = 1;
            // var spID = "SPUnit" + String(problem.ID)
            // var spIDDiv = document.getElementById(spID)
            // var spDist = document.getElementById("SPUnit").offsetLeft * 10
            // // console.log(spID)
            // // console.log(document.getElementById("SPUnit").offsetLeft)
            // console.log(spIDDiv.getBoundingClientRect())

            // const divStyle = {
            //     transform: 'rotateY(' + spDist + 'deg)',
            //     border: '1px solid pink'
            //   };

            if (problem.ParentType === 1) {
                    return (
                        <div key={problem.ID} id="nodisplay">
                        </div>
                    );
            } else if (problem.Title.length > 50) {
            return (
                <Link key={problem.ID} to={this.state.linkPath+problem.ID + this.state.destinationPath}>
                    <li id="SPUnit">
                        <div id="SPHeader" onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
                            <div id="SPTitleSmall">{problem.Title}</div>
                            <div id="SPPercent">{problem.Rank}</div>
                        </div>
                    </li>
                </Link>
            );
            } else if (problem.Class == '2') {
                return (
                    <Link key={problem.ID} to={this.state.linkPath+problem.ID + this.state.destinationPath}>
                        <li id="SPUnit">
                            <div id="SPHeaderRed" onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
                                <div id="SPTitleRed">
                                    <span id="redProject">problem</span>
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
                    <Link key={problem.ID} to={this.state.linkPath+problem.ID + this.state.destinationPath}>
                        <li id="SPUnit">
                            <div id="SPHeaderGreen" onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
                                <div id="SPTitleGreen">
                                    <span id="greenProject">goal</span>
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
                    <Link key={problem.ID} to={this.state.linkPath+problem.ID + this.state.destinationPath}>
                        <li id="SPUnit"
                        // style={divStyle}
                        >
                        {/* <div id={"SPUnit" + String(problem.ID)}> */}
                            <div id="SPHeader" onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
                                <div id="SPTitle">{problem.Title}</div>
                                <div id="SPPercent">{problem.Rank}</div>
                            </div>
                        {/* </div> */}
                        </li>
                    </Link>
                )
            };
        }
        renderPrivateItem(problem) {
            if (problem.ParentType === 1) {
                    return (
                        <div key={problem.ID} id="nodisplay">
                        </div>
                    );
            } else if (problem.Title.length > 50) {
            return (
                <Link key={problem.ID} to={this.state.linkPath+problem.ID + this.state.destinationPath}>
                    <li id="SPUnit">
                        <div id="SPHeader" onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
                            <div id="SPTitleSmall">{problem.Title}</div>
                        </div>
                    </li>
                </Link>
            );
            } else if (problem.Class == '2') {
                return (
                    <Link key={problem.ID} to={this.state.linkPath+problem.ID + this.state.destinationPath}>
                        <li id="SPUnit">
                            <div id="SPHeaderRed" onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
                                <div id="SPTitleRed">
                                    <span id="redProject">problem</span>
                                    <br />
                                    {problem.Title}
                                </div>
                            </div>
                        </li>
                    </Link>
                );
            } else if (problem.Class == '1') {
                return (
                    <Link key={problem.ID} to={this.state.linkPath+problem.ID + this.state.destinationPath}>
                        <li id="SPUnit">
                            <div id="SPHeaderGreen" onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
                                <div id="SPTitleGreen">
                                    <span id="greenProject">goal</span>
                                    <br />
                                    {problem.Title}
                                </div>
                            </div>
                        </li>
                    </Link>
                );
            } else {
                return (
                    <Link key={problem.ID} to={this.state.linkPath+problem.ID + this.state.destinationPath}>
                        <li id="SPUnit">
                            <div id="SPHeader" onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
                                <div id="SPTitle">{problem.Title}</div>
                            </div>
                        </li>
                    </Link>
                )
            };
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
                $('#privateContainerMottoRed').html('<span id="blue">ALTERNATE </span>BREAKDOWNS').fadeIn(7500);
                $('#privateContainerMottoRed').attr('id','privateContainerMottoWhite');
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
                $('#privateContainerMottoWhite').html("PROJECTS CHANGED").fadeIn(7500);
                $('#privateContainerMottoWhite').attr('id','privateContainerMottoRed');
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
