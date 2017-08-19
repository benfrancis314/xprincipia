import React from 'react';
import { Link  } from 'react-router';
import ScrollableAnchor from 'react-scrollable-anchor';


export default class ProblemDiscussMenu extends React.Component {

   render() {
      return (
        <div>
          <Link to={`/problem/${this.props.params.probID}/create`} activeClassName="activeBlueText">
            {/*ScrollableAnchor doesn't work right now, not sure why*/}
            {/*<a href='#newSubProject'>*/}
              <div id="SBButton">
                Create a Sub Project
              </div>
            {/*</a>*/}
          </Link>
        </div>
      );
   }
}