import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import {Config} from '../../config.js';
import $ from 'jquery';

// import ReactGA from 'react-ga';

export default class WelcomeUserUnit extends React.Component {
   
    hoverFeedText() {
        $(document).ready(function() {
                $('#feedTitle').html("select filter").fadeIn(7500);
                $('#feedTitle').attr('id','feedTitleHover');
                $('#feedBottom').attr('id','feedBottomBlue');
        });
    }
    unHoverFeedText() {
            $(document).ready(function() {
                    $('#feedTitleHover').html("new activity");
                    $('#feedTitleHover').attr('id','feedTitle');
                    $('#feedBottomBlue').attr('id','feedBottom');
            });
    }
    hoverAdd() {
        $(document).ready(function() {
                $('#feedTitle').html("new project").fadeIn(7500);
                $('#feedTitle').attr('id','feedTitleHover');
                $('#feedBottom').attr('id','feedBottomBlue');
        });
    }
    unHoverAdd() {
            $(document).ready(function() {
                    $('#feedTitleHover').html("new activity");
                    $('#feedTitleHover').attr('id','feedTitle');
                    $('#feedBottomBlue').attr('id','feedBottom');
            });
    }
    hoverLabel() {
        $(document).ready(function() {
                $('#feedTitle').html("all activity").fadeIn(7500);
                $('#feedTitle').attr('id','feedTitleHover');
                $('#feedBottom').attr('id','feedBottomBlue');
        });
    }
    unHoverLabel() {
            $(document).ready(function() {
                    $('#feedTitleHover').html("new activity");
                    $('#feedTitleHover').attr('id','feedTitle');
                    $('#feedBottomBlue').attr('id','feedBottom');
            });
    }

    constructor(props){
        super(props);

        this.state = {
           feedProjects: [],
           feedProjectsSlice: []
        }

        this.renderItem = this.renderItem.bind(this);        
    };

    componentDidMount(){
        var self = this;
        // window.scrollTo(0,0);
        return axios.get( Config.API + '/problems/omnifeed').then(function (response) {
            self.setState({
                feedProjects: response.data.reverse(),
                // feedProjectsSlice: response.data.reverse().slice(1,3)
                feedProjectsSlice: response.data.reverse().slice(0,9)
            })
        }) 
    }
	render() {
        $(document).ready(function() {
            $('#feedTitleHover').html("new activity");
            $('#feedTitleHover').attr('id','feedTitle');
            $('#feedBottomBlue').attr('id','feedBottom');
        });
		return (
            <div id="feedUnitContainer">
                <div id="feedListDiv">
                    <ul id="feedUnitList"> 
                        {this.props.problems.map(this.renderItem)}
                    </ul>	 
                </div>
                <div id="feedOptionsBar">
                    <div id="feedListType" onMouseOver={this.hoverLabel} onMouseOut={this.unHoverLabel}>
                        all
                    </div>
                    <div id="feedOptionsButton">
                        <Link to="/welcome/filter" activeClassName="activeBlue">
                            {/* <a href='#proposals'> */}
                                <img src={require('../../assets/feedCircle1.svg')} id="feedCircleImg" onMouseOver={this.hoverFeedText} onMouseOut={this.unHoverFeedText} width="60" height="60" alt="User avatar, DNA Helix" />
                            {/* </a> */}
                        </Link>
                    </div>
                    {/* <Link to="/welcome/create" activeClassName="activeBlue">
                        <div id="feedAddButton" onMouseOver={this.hoverAdd} onMouseOut={this.unHoverAdd}>
                            <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="35" height="35" alt="User avatar, DNA Helix" />
                        </div>
                    </Link> */}
                </div>
            </div>
		);
	}
	renderItem(problem) {
  

if (problem.Private === true) {
        return (
            <div key={problem.ID} id="nodisplay">
            </div>
        );

} else if (problem.ParentType === 1) {

      return (
    //   We do actually want to show projects on proposals here:
        <div key={problem.ID} id="nodisplay">
        </div>
      
      );
    } else if (problem.BackupParentID > 0) {

        return (
      //   We do actually want to show projects on proposals here:
          <div key={problem.ID} id="nodisplay">
          </div>
        
        );
  
// NEED MORE IF STATEMENTS TO SEE IF THEY'RE ON PROPOSALS
    } else if (problem.Type == '0') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/'+problem.ProblemID +'/subprojects'}>
                <div id="omniActivityUnit">
                    project
                    <br />
                    <span id="omniTitle">
                        {problem.Description}
                    </span>
                    <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
                </div>
            </Link>
        </li>);
    } else if (problem.Type == '1') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/'+problem.ProblemID +'/proposal/'+problem.TypeID}>
                <div id="omniActivityUnit">
                    proposal
                    <br />
                    <span id="omniTitle">
                        {problem.Description}
                    </span>
                    <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
                </div>
            </Link>
        </li>);
    } else if (problem.Type == '2') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/'+problem.ProblemID +'/discuss/'+problem.TypeID +'/comments'}>
                <div id="omniActivityUnit">
                    question in:
                    <br />
                    <span id="omniTitle">
                        {problem.ProblemTitle}
                    </span>
                    <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
                </div>
            </Link>
        </li>);
    } else if (problem.Type == '3') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/'+problem.ProblemID +'/discuss/'+problem.TypeID +'/comments'}>
                <div id="omniActivityUnit">
                    suggestion in:
                    <br />
                    <span id="omniTitle">
                        {problem.ProblemTitle}
                    </span>
                    <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
                </div>
            </Link>
        </li>
        );
    } else if (problem.Type == '4') {
        return (
        <div key={problem.ID} id="nodisplay">
        </div>
        );
    } else if (problem.Type == '5') {
        return (
        <div key={problem.ID} id="nodisplay">
        </div>
);
    } else if (problem.Type == '6') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/'+problem.ProblemID +'/discuss/'+problem.TypeID +'/comments'}>
                <div id="omniActivityUnit">
                    debate in:
                    <br />
                    <span id="omniTitle">
                        {problem.ProblemTitle}
                    </span>
                    <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
                </div>
            </Link>
            
        </li>);
    
    } else if (problem.Type == '7') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/'+problem.ProblemID +'/learn'}>
            <div id="omniActivityUnit">
                educational resource in:
                <br />
                <span id="omniTitle">
                    {problem.ProblemTitle}
                </span>
                <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
            </div>
            </Link>
        </li>);
    } else if (problem.Type == '8') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/'+problem.ProblemID +'/learn'}>
            <div id="omniActivityUnit">
                research in:
                <br />
                <span id="omniTitle">
                    {problem.ProblemTitle}
                </span>
                <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
            </div>
            </Link>
        </li>);
    } else if (problem.Type == '9') {
        return (
        <div key={problem.ID} id="nodisplay">
        </div>);
    } else if (problem.Type == '10') {
        return (
        <div key={problem.ID} id="nodisplay">
        </div>);
    } else {
          return (
            <div id="noDisplay">
            </div>
          );
        }
       }
    }

// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }
function dateTime(str) {
    if(str != undefined){
       var result = str.substring(0,10);
       return result
    }
}
