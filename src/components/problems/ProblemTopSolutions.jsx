import React from 'react';
import SolutionUnit from '../solutions/SolutionUnit.jsx';
import SideBarMore from '../SideBarMore.jsx';
import axios from 'axios';
import {Config} from '../../config.js';

export default class ProblemSolutionsMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: [],
            probID: []
        }

    };
    getInitialState(){
        var self = this;
        window.scrollTo(0,0);
        return axios.get( Config.API + '/solutions/problemID?id='+this.props.probID).then(function (response) {
            self.setState({
                solutions: response.data,
                probID: this.props.probID
            })
        })
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        window.scrollTo(0,0);
        return axios.get( Config.API + '/solutions/problemID?id='+nextProps.probID).then(function (response) {
            self.setState({
                solutions: response.data,
                probID: nextProps.probID
            })
        })
    }

   render() {
    
    if (this.state.solutions === null) {
        alert('a1');
        console.log('Solutions state1' + this.state.solutions + 'x');
        return (
            <div>
                Hello
            </div>
        );
    } else {
        console.log('Solutions state2' + this.state.solutions + 'x');
      return (
        <div>
            <SolutionUnit solutions={this.state.solutions} probID={this.state.probID}/>
        </div>

      );
   }}
}