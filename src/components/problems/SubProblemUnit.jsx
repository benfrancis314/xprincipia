import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';



export default class SubProblemUnit extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problems: [],
			probID: [],
            linkPath: '',
            private: false,
            destinationPath: '',
        }
        this.renderItem = this.renderItem.bind(this);
        this.renderPrivateItem = this.renderPrivateItem.bind(this);
        this.hoverText = this.hoverText.bind(this);
        this.unHoverText = this.unHoverText.bind(this);
        this.showProblemForm = this.showProblemForm.bind(this);
        this.hoverProject = this.hoverProject.bind(this);
        this.unHoverProject = this.unHoverProject.bind(this);
		// this.showSolutionForm = this.showSolutionForm.bind(this);
    };

  componentWillReceiveProps(nextProps){
	  var self = this
		if (window.location.pathname.includes('private')) {
			self.setState({
                linkPath: '/project/private/',
                private: true,
                problems: nextProps.problemsList,
			    probID: nextProps.probID,
			})
		} else {
			self.setState({
                linkPath: '/project/',
                private: false,
                problems: nextProps.problemsList,
			    probID: nextProps.probID,
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
		self.setState({
			
		})
  }

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

	render() {
        console.log(this.state.problems)
		if (this.state.private === true) {
            return (
				<div id="SPwrapper">
                    <ul id='SPUnitList'> 
                        {this.state.problems.map(this.renderPrivateItem)}
                        <div id="SPHeaderNew" onMouseOver={this.hoverText} onMouseOut={this.unHoverText} onClick={this.showProblemForm}>
                            <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="50" height="50" alt="User avatar, DNA Helix" />
                        </div>
                    </ul>
				</div>
            );
        } else {
            return (
				<div id="SPwrapper">
                    <ul id='SPUnitList'> 
                        {this.state.problems.map(this.renderItem)}
                        <div id="SPHeaderNew" onMouseOver={this.hoverText} onMouseOut={this.unHoverText} onClick={this.showProblemForm}>
                            <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="50" height="50" alt="User avatar, DNA Helix" />
                        </div>
                    </ul>
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
                    <div id={"SPHeader"+problem.Picture} onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
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
                        <div id={"SPHeaderRed"+problem.Picture} onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
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
                        <div id={"SPHeaderGreen"+problem.Picture} onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
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
                    {/* <li id="SPUnit"> */}
                        <div id={"SPHeader"+problem.Picture} onMouseOver={this.hoverProject} onMouseOut={this.unHoverProject}>
                            <div id="SPTitle">{problem.Title}</div>
                            <div id="SPPercent">{problem.Rank}</div>
                        </div>
                    {/* </li> */}
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
}