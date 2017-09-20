import React from 'react';
import SolutionUnitPrivate from '../solutions/SolutionUnitPrivate.jsx';
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
    componentDidMount(){
        var self = this;
        return axios.get( Config.API + '/solutions/problemID?id='+this.props.probID).then(function (response) {
            self.setState({
                solutions: response.data,
            })
        })
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        return axios.get( Config.API + '/solutions/problemID?id='+nextProps.probID).then(function (response) {
            self.setState({
                solutions: response.data,
                probID: nextProps.probID
            })
        })
    }

   render() {
    
    if (this.state.solutions === null) {
        // alert('a1');
        return (
            <div>
                XP
            </div>
        );
    } else {
      return (
        <div>
            <SolutionUnitPrivate solutions={this.state.solutions} probID={this.props.probID}/>
        </div>

      );
   }}
}