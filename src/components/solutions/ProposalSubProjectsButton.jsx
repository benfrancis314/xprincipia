import React from 'react';
import { Link  } from 'react-router';


export default class Empty extends React.Component {

   render() {
      return (
        <div>
          <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/subprojects`} activeClassName="activeWhite">
            <div id="proposalSubProjectsButton">
              project breakdown
            </div>
          </Link>
        </div>
      );
   }
}