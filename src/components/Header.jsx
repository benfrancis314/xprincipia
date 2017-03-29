import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';

export default class Header extends React.Component {
   render() {
      return (
      <div id="headerSection">
        <ul id="header">
            <li id="explore">
                <form action="http://www.xprincipia.com/search.php" method="get" id="exploreForm">
                    <input type="search" name="search"
                        placeholder="Explore" id="exploreInput" autofocus/>
                    <input type="submit" value="Go" id="submitExplore" />
                </form>
            </li>
            <li id="logo">
              <a href="./home.html"><div>XPrincipia</div></a>
            </li>
            <li id="avatarHeader">
              <img src="../assets/dnablackinvert.png" id="img-rounded" id="avatarButton" width="33" height="33" />
            </li>
        </ul>
      </div>
      );
   }
}
