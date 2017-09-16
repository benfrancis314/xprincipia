import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import ReactGA from 'react-ga';
import $ from 'jquery';

export default class PrivateProjectUnit extends React.Component {

    hoverText() {
        $(document).ready(function() {
            // $('#fullTutorialMotto').attr('id','fullTutorialMotto2').hide();
            $('#privateContainerMotto').html("NEW PROJECT").fadeIn(7500);
            // Testing this for its strange effect
            // $('#privateContainerMotto').fadeOut(function() {
            //     $(this).text("New Project").fadeIn(1000);
            //     }).fadeIn(1000);
            $('#privateContainerMotto').attr('id','privateContainerMottoBlue');
        });
    }
    unHoverText() {
        $(document).ready(function() {
            $('#privateContainerMottoBlue').html("ORGANIZE YOUR THOUGHTS");
            $('#privateContainerMottoBlue').attr('id','privateContainerMotto');
        });
    }
    
	render() {
            return (
            <div id="SPwrapper">
                <ul id="SPPrivateUnitList"> 
                    <li>
                        <img src={require('../../assets/leftArrow.svg')} id="SParrowImg" width="50" height="50" alt="User avatar, DNA Helix" />
                    </li>
                    {/*Commented out for testing*/}
                    <Link to={`/mindtemple/create`} activeClassName="activePrivateCreateButton">
                        <li id="SPPrivateUnit">
                            <div id="SPHeaderPrivate" onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                                <img src={require('../../assets/blueAdd2.svg')} id="privateNewProjectPlus" width="80" height="80" alt="User avatar, DNA Helix" />
                            </div>
                        </li>
                    </Link>
                    {this.props.problems.map(this.renderItem)} 
                    {/*<li id="SPPrivateUnit">
                        <div id="SPHeaderPrivate">
                            <div id="SPTitle">DMT Theory</div>
                        </div>
                    </li>
                    <li id="SPPrivateUnit">
                        <div id="SPHeaderPrivate">
                            <div id="SPTitle">Evolving Intelligence</div>
                        </div>
                    </li>*/}
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
        if (problem.Private === true && (problem.OriginalPosterUsername === cookie.load('userName'))) {
            return (
               <Link key={problem.ID} to={'/project/private/'+problem.ID +'/subprojects'} onClick={handleClick}>
                    <li id="SPPrivateUnit">
                        <div id="SPHeaderPrivate">
                            <div id="SPTitle">{problem.Title}</div>
                            {/*<div id="SPPercent">{problem.Rank}</div>*/}
                        </div>
                    </li>
               </Link>
        );
            } else {
            return (                
                <div key={problem.ID} id="nodisplay">
                </div>
            );
        }
    }
}