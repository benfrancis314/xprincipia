import React from 'react';
import { Link } from 'react-router';

export default class SideBarFullSolutionMenu extends React.Component {

   render() {
      return (
      <div id="sidebarMenu">
        <div id="solveMenu">
                <div id="solveTitle">Solve</div>
                  <Link to={`/fullsolution/${this.props.probID}/${this.props.solutionID}/solutions`}><div id="solutionsButton">Top Solutions</div></Link>
                  <Link to={`/fullsolution/${this.props.probID}/${this.props.solutionID}/subproblems`}><div id="subproblemButton">Sub Problems</div></Link>
        </div>
        <div id="developMenu">
                <div id="developTitle">Develop</div>
                  <Link to={`/fullsolution/${this.props.probID}/${this.props.solutionID}/questions`}><div id="questionsButton">Questions</div></Link>
                  <Link to={`/fullsolution/${this.props.probID}/${this.props.solutionID}/suggestions`}><div id="suggestionsButton">Suggestions</div></Link>
        </div>
      </div>

      );
   }
}