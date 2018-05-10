import React from 'react';
import axios from 'axios';
import SubProjectPrivateUnit from '../components/problems/SubProjectPrivateUnit.jsx';
import {Config} from '../config.js'

export default class SubProblemContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problems: []
        }
        
    };

    componentDidMount(){
        var self = this;
        return axios.get( Config.API + '/problems/filter/byrank?parentID='+this.props.probID).then(function (response) {
            self.setState({
                problems: response.data
            })
        })  
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        return axios.get( Config.API + '/problems/filter/byrank?parentID='+nextProps.probID).then(function (response) {
            self.setState({
                problems: response.data
            })
        }) 
    }


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
                    <SubProjectPrivateUnit problems={this.state.problems} probID={this.props.probID}/>
                </div>
            
            );
        }
    }
// }