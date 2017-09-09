import React from 'react';
import axios from 'axios';
import PrivateProjectUnit from '../components/problems/PrivateProjectUnit.jsx';
import {Config} from '../config.js'

export default class PrivateProjectsContainer extends React.Component {
// Commented out until ready
    //   constructor(props){
    //         super(props);

    //         this.state = {
    //             problems: []
    //         }
            
    //     };

// Commented out until ready
    // componentDidMount(){
    //     var self = this;
    //     return axios.get( Config.API + '/problems/subproblems?id='+this.props.probID).then(function (response) {
    //         self.setState({
    //             problems: response.data
    //         })
    //     })  
    // }

// Commented out until ready
//         //On recieving next props
//     componentWillReceiveProps(nextProps){
//         var self = this
//         self.setState({problems: nextProps.problems})
//         console.log(self.state.problems)
//     }


    render() {
        /*if (this.props.params.solutionID) {
            return (
                <div id="sidebarSBProjects">
                        <SubProblemUnit problems={this.state.problems} />
                </div>
        );
            } else {*/
            return (
                <div id="sidebarSBProjects">
                    <PrivateProjectUnit />
                </div>
            
            );
        }
    }
// }