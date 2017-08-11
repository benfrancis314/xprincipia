import React from 'react';
import axios from 'axios';
import SubProblemUnit from '../components/problems/SubProblemUnit.jsx';
import {Config} from '../config.js'

export default class SubProblemContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problems: []
        }
        
    };
    // componentDidMount(){
    //     var self = this;
    //     window.scrollTo(0,0);
    //     return axios.get( Config.API + '/auth/problems/subproblems?id='+this.props.probID).then(function (response) {
    //         self.setState({
    //             problems: response.data
    //         })
    //     })  
    // }


    getInitialState(){
        var self = this;
        window.scrollTo(0,0);
        return axios.get( Config.API + '/auth/problems/subproblems?id='+this.props.probID).then(function (response) {
            self.setState({
                problems: response.data
            })
        })  
    }

    componentWillMount(){
        var self = this;
        window.scrollTo(0,0);
        return axios.get( Config.API + '/auth/problems/subproblems?id='+this.props.probID).then(function (response) {
            self.setState({
                problems: response.data
            })
        })  
    }
componentWillReceiveProps (nextProps){
        var self = this;
        window.scrollTo(0,0);
        return axios.get( Config.API + '/auth/problems/subproblems?id='+nextProps.probID).then(function (response) {
            self.setState({
                problems: response.data
            })
        }) 
}

//         //On recieving next props
//     componentWillReceiveProps(nextProps){
//         var self = this
//         self.setState({problems: nextProps.problems})
//         console.log(self.state.problems)
//     }


    render() {
      return (
        <div id="sidebarSBProjects">
            <SubProblemUnit problems={this.state.problems} />
        </div>
      
      );
   }
}