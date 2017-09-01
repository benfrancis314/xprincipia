import React from 'react';
import { Link  } from 'react-router';


export default class Empty extends React.Component {

   render() {
      return (
        <div>
          <Link to={`/project/${this.props.params.probID}/create`} activeClassName="activeBlueText">
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