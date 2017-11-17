import React from 'react';
import { Link } from 'react-router';

export default class SideBarFullSolutionMenu extends React.Component {

   render() {
      return (
      <div id="sidebarMenu">
        <div id="solveMenu">
                <div id="solveTitle">solve</div>
                  <Link to={`/proposal/${this.props.probID}/${this.props.solutionID}/solutions`} activeClassName="activeGreen"><div id="solutionsButton">top solutions</div></Link>
                  <Link to={`/proposal/${this.props.probID}/${this.props.solutionID}/subprojects`} activeClassName="activeGreen"><div id="subproblemButton">sub problems</div></Link>
        </div>
        <div id="developMenu">
                <div id="developTitle">develop</div>
                  <Link to={`/proposal/${this.props.probID}/${this.props.solutionID}/questions`} activeClassName="activeGreen"><div id="questionsButton">questions</div></Link>
                  <Link to={`/proposal/${this.props.probID}/${this.props.solutionID}/suggestions`} activeClassName="activeGreen"><div id="suggestionsButton">suggestions</div></Link>
        </div>
      </div>

      );
   }
}
