import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import ProjectBreakdownList from '../components/problems/ProjectBreakdownList.jsx';
import SubProblemUnit from '../components/problems/SubProblemUnit.jsx';
import {Config} from '../config.js';
import $ from 'jquery';

export default class SubProblemContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problemsArray: [],
            branches: [],
            probID: '',
        }
        // this.renderBranch = this.renderBranch.bind(this);
        this.clickBranch = this.clickBranch.bind(this);
        this.hoverBranch = this.hoverBranch.bind(this);
        this.unHoverBranch = this.unHoverBranch.bind(this);
        this.hoverNewBranch = this.hoverNewBranch.bind(this);
        this.unHoverNewBranch = this.unHoverNewBranch.bind(this);
        this.showProblemFormFirst = this.showProblemFormFirst.bind(this);
        
    };

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
    
    componentDidMount() {
        var self = this;
        axios.get( Config.API + '/problems/breakdown?breakdownID='+self.props.probID).then(function (response) {
            self.setState({
                problemsArray: response.data,
            })
        }) 
        // axios.get( Config.API + '/breakdowns/byproblem?parentID='+self.props.probID).then(function (response) {
        //     self.setState({
        //         branches: response.data
        //     })
        // }) 
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        axios.get( Config.API + '/problems/breakdown?breakdownID='+nextProps.probID).then(function (response) {
            self.setState({
                problemsArray: response.data,
            })
        }) 
        // axios.get( Config.API + '/breakdowns/byproblem?parentID='+nextProps.probID).then(function (response) {
        //     self.setState({
        //         branches: response.data
        //     })
        // }) 
    }

    // shouldComponentUpdate (nextProps, nextState) {
        
    //         if((nextState.probID !== nextProps.probID) 
    //         || (nextState.problems !== this.state.problems)) {
    //             return true
    //         } else {
    //             return false
    //         }
    // }


    render() {
        // console.log(this.state.problemsArray)
        if (this.state.problemsArray === undefined || this.state.problemsArray.length == 0) {
            // console.log('Problems Array')
            // console.log(this.state.problemsArray)
            return (
                <div>
                    {/* {this.props.breakdownOriginal}SubProb<br />
                    {this.state.problemsArray.length} */}
                    <div id="noProjectsContainerShow">
                            <div id="noProjectsPromptFlare"><br /></div>
                            <div id="noProjectsPrompt" onMouseOver={this.hoverText} onMouseOut={this.unHoverText} onClick={this.showProblemFormFirst}>
                                <span id="blue">begin </span>project <span id="blue">breakdown</span>
                            </div>
                    </div>
                    {/* <Link to={this.state.linkPath+this.props.probID+'/create/breakdown'} activeClassName="activePrivateCreateButton">
                        <div id="branchesProjectButton" onMouseOver={this.hoverBranch} onMouseOut={this.unHoverBranch} onClick={this.clickBranch}>
                        </div>
                    </Link> */}
                </div>
            );
        } else {
          return (
                <div>
                    <SubProblemUnit problemsList={this.state.problemsArray}/>
                </div>    
          );
       }  
    }

    //     renderBranch(branch) {
        
    //     function hoverBranchText() {
    //         if (branch.Description !== '') {
    //             $(document).ready(function() {
    //                 $('div.'+branch.ID).attr('class','branchText');
    //                 $('.branchText').html(branch.Description).fadeIn(7500);
    //             });
    //         }
    //     }
    //     function unHoverBranchText() {
    //         $(document).ready(function() {
    //             $('.branchText').html(branch.Title).fadeIn(7500);
    //             $('div.branchText').attr('class',branch.ID);
    //             $('#privateContainerMottoRed').html('<span id="blue">ALTERNATE </span>BREAKDOWNS').fadeIn(7500);
    //             $('#privateContainerMottoRed').attr('id','privateContainerMottoWhite');
    //         });
    //     }
    //     function branchChange() {
    //         // CURRENTLY DISABLED PART NECESSARY TO ADD NEW PROJECTS IN EACH BREAKDOWN
    //         // NEED TO DISABLE RERENDER OF PROBLEMS WHEN FULLPROBLEM RERENDERS FROM STATE CHANGE
    //         this.props.differentBreakdown(branch.ID);
    //         var self = this;
    //         axios.get( Config.API + '/problems/breakdown?breakdownID='+branch.ID).then(function (response) {
    //             self.setState({
    //                 problems: response.data
    //             })
    //         })  
    //         $(document).ready(function() {
    //             $('#privateContainerMottoWhite').html("PROJECTS CHANGED").fadeIn(7500);
    //             $('#privateContainerMottoWhite').attr('id','privateContainerMottoRed');
    //         });
    //     }

    //         // Use if title is longer than certain amount
    //     //  if (branch.Title.length > 50) {
    //         // if (1) {
    //     return (
    //             <li key={branch.ID} id="branchUnit">
    //                 <div id="branchHeader" className={branch.ID} onClick={branchChange.bind(this)} onMouseOver={hoverBranchText} onMouseOut={unHoverBranchText}>
    //                     {branch.Title}
    //                 </div>
    //             </li>                
    //     );
    // }
            
}
