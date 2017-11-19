import React from 'react';
import { Link  } from 'react-router';

export default class ProblemFollowButton extends React.Component {
  

   render() {
       if (0) {
       return (
        <div>
            <Link>
                <div id="SBButtonFollow">track</div>
                {/* Also consider "Monitor" */}
            </Link>
        </div>
       );
    } else {
        return (
            <div>
                <Link>
                    <div id="SBButtonFollowed">tracking</div>
                    {/* Also consider "Monitor" */}
                </Link>
            </div>);
    }
    }
}
 