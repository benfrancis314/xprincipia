import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


// import ReactGA from 'react-ga';

export default class WelcomeUserUnit extends React.Component {
   
hoverFilter() {
    $(document).ready(function() {
            // Something about the blue slogan is broken, not sure at the moment
            $('#feedFilterSlogan').attr('id','feedFilterSloganBlue');    
            $('#feedFilterSloganBlue').html("SEIZE THE NIGHT").fadeIn(7500);
            $('#feedFilterContainer').attr('id','feedFilterContainerHover');
    });
}
unHoverFilter() {
        $(document).ready(function() {
                $('#feedFilterSloganBlue').attr('id','feedFilterSlogan');
                $('#feedFilterSlogan').html("CARPE NOCTUM");
                $('#feedFilterContainerHover').attr('id','feedFilterContainer');
        });
}

	render() {
		return (
            <div>
                <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={2000}
                transitionEnter={false}
                transitionLeave={false}>
                    <Link to={`/welcome`}>
                        <img src={require('../../assets/redX.svg')} id="closeRedXFeed" width="30" height="30" alt="Close button, red X symbol" />
                    </Link>
                    <div id="feedFilterContainer">
                        <div id="filterCapTop">
                            <br />
                        </div>
                        <Link to ={'/welcome'}>
                            <div id="feedFilterUnitsTop">
                                all
                            </div>
                        </Link>
                        <Link to ={'/welcome/projects'}>
                            <div id="feedFilterUnits">
                                projects
                            </div>
                        </Link>
                        <Link to ={'/welcome/proposals'}>
                            <div id="feedFilterUnits">
                                proposals
                            </div>
                        </Link>
                        <Link to ={'/welcome/questions'}>
                            <div id="feedFilterUnits">
                                discuss
                            </div>
                        </Link>
                        <Link to ={'/welcome/resources'}>
                            <div id="feedFilterUnits">
                                learn
                            </div>
                        </Link>
                        <Link to ={'/welcome/questions'}>
                            <div id="filterCapBottom">
                                <br />
                            </div>
                        </Link>
                    </div>
                    <div id="feedFilterSlogan" onMouseOver={this.hoverFilter} onMouseOut={this.unHoverFilter}>
                        CARPE NOCTUM
                    </div>
                </ReactCSSTransitionGroup>
            </div>
		);
	}
}