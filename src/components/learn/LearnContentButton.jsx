import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class WelcomeContainer extends React.Component {

   render() {
      return (
        <div id="lessonAddButtonContainer">
            <Link to={`/project/${this.props.params.probID}/learn/content/new`}>
                <div id="learnLessonAddButton" onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                    new lesson
                </div>
            </Link>
        </div>
      );
   }
}