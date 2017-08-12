import React from 'react';
import { Link  } from 'react-router';

export default class ProblemDiscussMenu extends React.Component {

   render() {
      return (
        <div>
          <Link to={`/problem/${this.props.params.probID}/create`} activeClassName="activeBlueText">
            <div id="SBButton">
              Create a Sub Project
            </div>
          </Link>
        </div>
      );
   }
}