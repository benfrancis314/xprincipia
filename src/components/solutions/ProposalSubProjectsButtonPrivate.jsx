import React from 'react';
import { Link  } from 'react-router';


export default class Empty extends React.Component {

   render() {
      return (
        <Link to={`/project/private/${this.props.params.probID}/proposal/${this.props.params.solutionID}/subprojects`} activeClassName="activeWhite">
                <div id="proposalSubProjectsButton">
                  Sub Projects
                </div>
        </Link>
      );
   }
}