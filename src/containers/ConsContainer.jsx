import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ConsUnit from '../components/proscons/ConsUnit.jsx';
import {Config} from '../config.js'

export default class ConsContainer extends React.Component {
constructor(props){
        super(props);

        this.state = {
            cons: []
        }
        
    };

    componentDidMount(){
        var self = this;
        // if(this.props.solutionID){
            return axios.get( Config.API + '/cons/typeID?id='+this.props.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    cons: response.data
                })
            })  
        } 
    componentWillReceiveProps(nextProps){
        var self = this;
        // if(this.props.solutionID){
            return axios.get( Config.API + '/cons/typeID?id='+nextProps.params.solutionID+'&dataType=1').then(function (response) {
                self.setState({
                    cons: response.data
                })
            })  
        } 
    //     } else {
    //         return axios.get( Config.API + '/cons/typeID?id='+this.props.probID+'&dataType=0').then(function (response) {
    //             self.setState({
    //                 cons: response.data
    //             })
    //         }) 
    //     }
    // }
   render() {
           return (
        <div id="suggestionContainer">
            <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                <div >
                    <img src={require('../assets/redX.svg')} id="closeRedX" width="35" height="35" alt="Close button, red X symbol" />
                </div>
             </Link>
        {/*<ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}>*/}
          {this.props.children}
          <ConsUnit cons={this.state.cons} probID={this.props.params.probID} solutionID={this.props.params.solutionID} />
        {/*</ReactCSSTransitionGroup>*/}
        </div>    
      );
   }
}