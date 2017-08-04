import React from 'react';
import axios from 'axios';
import ProjectParentChildrenUnits from '../components/problems/ProjectParentChildrenUnits.jsx';
import {Config} from '../config.js'

export default class ProjectParentChildrenUnitsContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problems: []
        }
        
    };
    componentDidMount(){
        var self = this;
        window.scrollTo(0,0);
        return axios.get( Config.API + '/auth/problems/subproblems?id='+this.props.parentID).then(function (response) {
            self.setState({
                problems: response.data
            })
        })  
    }
        //On recieving new props
    componentWillReceiveProps(newProps){
        var self = this
        self.setState({problems: newProps.problems})
        console.log(self.state.problems)
    }
    render() {
      return (
        <div>
            <ProjectParentChildrenUnits problems={this.state.problems} projectTitle={this.props.problemTitle} />
        </div>
      
      );
   }
}