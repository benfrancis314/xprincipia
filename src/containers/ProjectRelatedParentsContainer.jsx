import React from 'react';
// Will be uesd with componentDidUpdate
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import axios from 'axios';
import {Config} from '../config.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ProjectRelatedParentsUnit from '../components/problems/ProjectRelatedParentsUnit.jsx';

export default class ProjectRelatedParentsContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: []
        }

    };
    // Change this later to what it corresponds to in backend
        // componentDidMount(){
        // var self = this;
        // return axios.get( Config.API + '/solutions/problemID?id='+this.props.params.probID).then(function (response) {
        //     self.setState({
        //         solutions: response.data
        //     })
        // })
        
    // }

// Removing this isn't stopping the scrolling from happening, not sure why
// componentDidUpdate() {
//         ReactDOM.findDOMNode(this).scrollIntoView();
//   }      

   render() {
      return (
        <div>
            <Link to={`/project/${this.props.params.probID}/subprojects`}>
                <img src={require('../assets/redX.svg')} id="closeRedX" width="40" height="40" alt="Close button, red X symbol" />
            </Link>
            <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}>
                <div id="relatedParentContainer">
                    <div id="relatedParentTitle">
                        Related Parents
                    </div>
                    <div id="relatedParentInstructions">
                        <span id="grayOpenChat">To add a related parent, submit the </span><span id="redOpenChat"> project #</span><span id="grayOpenChat">, shown in</span><span id="redOpenChat"> red </span><span id="grayOpenChat">in the URL. </span>
                    </div>
                    <div id="relatedParentURL">
                        <span id="whiteOpenChat">xprincipia.com/project/</span><span id="redChat">XX</span><span id="whiteOpenChat">/ ... </span>
                    </div>
                    {/*I don't currently think this is necessary*/}
                    {/*<div id="relatedParentFormTitle">
                        Related Form Title (if necessary)
                    </div>*/}
                    <input id="relatedParentForm" type="text" name="email" required="required" maxLength="30" placeholder="PROJECT#" />
                    <input type="button" value="Add" id="relatedParentAdd"/>
                    <ProjectRelatedParentsUnit />
                </div>

            </ReactCSSTransitionGroup>
        </div>

      );
   }
}