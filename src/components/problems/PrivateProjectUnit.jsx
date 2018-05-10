import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import ReactGA from 'react-ga';
import $ from 'jquery';

export default class PrivateProjectUnit extends React.Component {

    hoverText() {
        $(document).ready(function() {
            $('#privateContainerMotto').html('<span id="blue">NEW </span>SUB PROJECT').fadeIn(7500);
            $('#privateContainerMotto').attr('id','privateContainerMottoWhite');
        });
    }
    unHoverText() {
        $(document).ready(function() {
            $('#privateContainerMottoWhite').html("ORGANIZE YOUR THOUGHTS");
            $('#privateContainerMottoWhite').attr('id','privateContainerMotto');
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
        if (problem.Private === true && (problem.OriginalPosterUsername === cookie.load('userName')) && problem.Title.length > 50) {
        return (
            <Link key={problem.ID} to={'/project/private/'+problem.ID +'/subprojects'}>
                <li key={problem.ID} id="SPUnit">
                    <div id="SPHeader">
                        <div id="SPTitleSmall">{problem.Title}</div>
                        <div id="SPPercent">{problem.Rank}</div>
                    </div>
                </li>
            </Link>
        
        );
        } else if (problem.Private === true && (problem.OriginalPosterUsername === cookie.load('userName')) && problem.Class == '2') {
            return (
                <Link key={problem.ID} to={'/project/private/'+problem.ID +'/subprojects'}>
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
        } else if (problem.Private === true && (problem.OriginalPosterUsername === cookie.load('userName')) && problem.Class == '1') {
            return (
                <Link key={problem.ID} to={'/project/private/'+problem.ID +'/subprojects'}>
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
        } else if (problem.Private === true && (problem.OriginalPosterUsername === cookie.load('userName'))) {
            return (
               <Link key={problem.ID} to={'/project/private/'+problem.ID +'/subprojects'}>
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