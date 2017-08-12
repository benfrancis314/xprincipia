import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ProsDeleteForm from '../components/proscons/ProsDeleteForm.jsx';
import ProsEditForm from '../components/proscons/ProsEditForm.jsx';
import ProsFlagForm from '../components/proscons/ProsFlagForm.jsx';
import ProsForm from '../components/proscons/ProsForm.jsx';
import ProsUnit from '../components/proscons/ProsUnit.jsx';
import SideBarMore from '../components/SideBarMore.jsx';
import {Config} from '../config.js'

export default class ProsContainer extends React.Component {
constructor(props){
        super(props);

        this.state = {
            pros: []
        }
        
    };
    componentDidMount(){
        var self = this;
        if(this.props.solutionID){
            return axios.get( Config.API + '/pros/typeID?id='+this.props.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    pros: response.data
                })
            })  
        } else {
            return axios.get( Config.API + '/pros/typeID?id='+this.props.probID+'&dataType=0').then(function (response) {
                self.setState({
                    pros: response.data
                })
            }) 
        }
    }
   render() {
           return (
        <div id="suggestionContainer">
              <Link to={`/fullsolution/${this.props.probID}/${this.props.solutionID}/description`}>
                 <div id="solutionDescriptionReturn">
                     <img src={require('../assets/upArrow.svg')} id="backArrowBlueHover" width="50" height="30" alt="Back arrow, blue up arrow" />
                 </div>
              </Link>
        {/*<ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}>*/}
          {this.props.children}
          {React.cloneElement(<ProsForm probID={this.state.probID} solutionID={this.state.solutionID} /> )}
          {React.cloneElement(<ProsEditForm probID={this.state.probID} solutionID={this.state.solutionID} /> )}
          {React.cloneElement(<ProsFlagForm probID={this.state.probID} solutionID={this.state.solutionID} /> )}
          {React.cloneElement(<ProsDeleteForm probID={this.state.probID} solutionID={this.state.solutionID} /> )}
          {React.cloneElement(<ProsUnit probID={this.props.probID} solutionID={this.props.solutionID} /> )}
        {/*</ReactCSSTransitionGroup>*/}
        </div>    
      );
   }
}