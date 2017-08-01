import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Introduction from '../components/Introduction.jsx';


export default class WelcomeContainer extends React.Component {
   
   render() {
      return (
        <div>
            <div id="entranceGates">
                <div id="projectsGate">
                    Projects
                </div>
                <div id="competitionsGate">
                    Competitions
                </div>
            </div>
            <Introduction />
        </div>
      );
   }
}
