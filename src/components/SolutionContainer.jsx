import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import SolutionUnit from './SolutionUnit.jsx';
import SideBarMore from './SideBarMore.jsx';
import axios from 'axios'

export default class SolutionContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: []
        }
        
    };
        componentWillMount(){
        var self = this;
        return axios.get('http://localhost:10000/solutions/all').then(function (response) {
            console.log(response.data[0].Title)
            self.setState({
                solutions: response.data
            })
        })  
    }
   render() {
      return (
        <div id="solutions">
          <Link to="/problem/createsolution"><div id="createButton">Create</div></Link>
            <SolutionUnit solutions={this.state.solutions} />
          <SideBarMore />
        </div>
      
      );
   }
}


