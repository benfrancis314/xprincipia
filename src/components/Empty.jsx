import React from 'react';
import { Link  } from 'react-router';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

configureAnchors({offset: -50, scrollDuration: 1000});

export default class ProblemDiscussMenu extends React.Component {

   render() {
      return (
        <div>
          <Link to={`/problem/${this.props.params.probID}/create`} activeClassName="activeBlueText">
            {/*Will need react-scroll to implement, problem is changes page*/}
            {/*Worst case scenario*/}
            <a href='#newSubProject'>
              <div id="SBButton">
                Create a Sub Project
              </div>
            </a>
          </Link>
        </div>
      );
   }
}