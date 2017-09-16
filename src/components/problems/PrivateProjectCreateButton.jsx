import React from 'react';
import { Link  } from 'react-router';


export default class PrivateProjectCreateButton extends React.Component {

   render() {
      return (
        <div>
          <Link to={`/project/private/${this.props.params.probID}/create`} activeClassName="activeBlueText">
              <div id="SBButton">
                Breakdown Project
              </div>
          </Link>
        </div>
      );
   }
}