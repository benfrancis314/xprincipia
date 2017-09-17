import React from 'react';
import {Link} from 'react-router';
import ReactGA from 'react-ga';
import $ from 'jquery';

export default class SubProjectPrivateUnit extends React.Component {
    
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

    constructor(){
        super();
        this.state = {
            problems: []
        }

    };
  componentWillReceiveProps(nextProps){
	  var self = this
	  self.setState({problems: nextProps.problems})
  }


	render() {
		return (
	    <div id="SPwrapper">
			<ul id="SPUnitList"> 
				<li>
					<img src={require('../../assets/leftArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
				</li>
                <Link to={`/project/private/${this.props.probID}/create`} activeClassName="activePrivateCreateButton">
                    <li id="SPUnit">
                        <div id="SPHeader" onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                            <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="80" height="80" alt="User avatar, DNA Helix" />
                        </div>
                    </li>
                </Link>
				{this.state.problems.map(this.renderItem)}
				<li>
					<img src={require('../../assets/rightArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
				</li>
			</ul>
		</div>
		);
	}
	renderItem(problem) {

				function handleClick() {
					ReactGA.event({
							category: 'Project',
							action: 'Clicked Link',
					});
					// alert('success');
    }

    return (

        <Link key={problem.ID} to={'/project/private/'+problem.ID +'/subprojects'} onClick={handleClick}>
					<li key={problem.ID} id="SPUnit">
						<div id="SPHeader">
							<div id="SPTitle">{problem.Title}</div>
							<div id="SPPercent">{problem.Rank}</div>
							{/*<div>
								<img src={require('../assets/voteArrow.png')} id="SPVote" width="20" height="20" alt="Vote arrow, blue up arrow" />
							</div>*/}
						</div>
					</li>
				</Link>

	);
  }
}

//convert float to Decimal
// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }