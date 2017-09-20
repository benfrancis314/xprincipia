import React from 'react';
import { Link  } from 'react-router';


export default class Empty extends React.Component {

   render() {
      return (
        <div>
          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/questions`} activeClassName="activeProposalOption">
            <div id="proposalDiscussButton">
              Brainstorm
            </div>
          </Link>
          <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/subprojects`} activeClassName="activeWhite">
            <div id="proposalSubProjectsButton">
              Sub Projects
            </div>
          </Link>
        </div>
      );
   }
}