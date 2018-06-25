import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import ReactGA from 'react-ga';
import $ from 'jquery';

export default class PrivateProjectUnit extends React.Component {

    hoverText() {
        $(document).ready(function() {
            $('#privateContainerMotto').html('<span id="blue">NEW </span>SUB<span id="blue">PROJECT</span>').fadeIn(7500);
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
                <Link to={'/project/private/100/subprojects'}>
                    <li id="SPUnit">
                        <div id="SPHeaderEr1">
                            <div id="SPTitleEr">the human mind</div>
                        </div>
                    </li>
                </Link>
                <Link to={'/project/private/100/subprojects'}>
                    <li id="SPUnit">
                        <div id="SPHeaderEr2">
                            <div id="SPTitleEr">artificial minds</div>
                        </div>
                    </li>
                </Link>
                <Link to={'/project/private/100/subprojects'}>
                    <li id="SPUnit">
                        <div id="SPHeaderEr3">
                            <div id="SPTitleEr">brain computer interfaces</div>
                        </div>
                    </li>
                </Link>
                <Link to={'/project/private/100/subprojects'}>
                    <li id="SPUnit">
                        <div id="SPHeaderEr4">
                            <div id="SPTitleEr">simulating reality</div>
                        </div>
                    </li>
                </Link>
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
        if (problem.Private == true && (problem.OriginalPosterUsername === cookie.load('userName')) && problem.Title.length > 50) {
        return (
            <Link key={problem.ID} to={'/project/private/'+problem.ID +'/subprojects'}>
                <li id="SPUnit">
                    <div id="SPHeader">
                        <div id="SPTitleSmall">{problem.Title}</div>
                        {/* <div id="SPPercent">{problem.Rank}</div> */}
                    </div>
                </li>
            </Link>
        
        );
        } else if (problem.Private == true && (problem.OriginalPosterUsername === cookie.load('userName')) && problem.Class == '2') {
            return (
                <Link key={problem.ID} to={'/project/private/'+problem.ID +'/subprojects'}>
                    <li id="SPUnit">
                        <div id="SPHeaderRed">
                            <div id="SPTitleRed">
                                <span id="red">problem</span>
                                <br />
                                {problem.Title}
                            </div>
                            {/* <div id="SPPercent">{problem.Rank}</div> */}
                        </div>
                    </li>
                </Link>
            );
        } else if (problem.Private == true && (problem.OriginalPosterUsername === cookie.load('userName')) && problem.Class == '1') {
            return (
                <Link key={problem.ID} to={'/project/private/'+problem.ID +'/subprojects'}>
                    <li id="SPUnit">
                        <div id="SPHeaderGreen">
                            <div id="SPTitleGreen">
                                <span id="green">goal</span>
                                <br />
                                {problem.Title}
                            </div>
                            {/* <div id="SPPercent">{problem.Rank}</div> */}
                        </div>
                    </li>
                </Link>
            );
        } else if (problem.Private == true && (problem.OriginalPosterUsername === cookie.load('userName'))) {
            return (
               <Link key={problem.ID} to={'/project/private/'+problem.ID +'/subprojects'}>
                    <li id="SPPrivateUnit">
                        <div id="SPHeaderPrivate">
                            <div id="SPTitle">{problem.Title}</div>
                            {/* <div id="SPPercent">{problem.Rank}</div> */}
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