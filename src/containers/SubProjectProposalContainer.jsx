import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import SubProjectUnitProposal from '../components/problems/SubProjectUnitProposal.jsx';
import {Config} from '../config.js'

export default class SubProjectProposalContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            problems: []
        }
        
    };

    componentDidMount(){
        var self = this;
        return axios.get( Config.API + '/problems/subproblems?id='+this.props.params.solutionID).then(function (response) {
            self.setState({
                problems: response.data
            })
        })  
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        return axios.get( Config.API + '/problems/subproblems?id='+nextProps.params.solutionID).then(function (response) {
            self.setState({
                problems: response.data
            })
        }) 
    }

// Is this being used?
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
                <div>
                    <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                        <div >
                            <img src={require('../assets/redX.svg')} id="closeRedX" width="35" height="35" alt="Close button, red X symbol" />
                        </div>
                    </Link>
                    <div id="privateContainerMottoContainer">
                        <div id="privateContainerMotto">
                            PROPOSAL BREAKDOWN
                        </div>
                    </div>
                    <div id="sidebarSBProjects">
                        <SubProjectUnitProposal problems={this.state.problems} probID={this.props.params.probID} solutionID={this.props.params.solutionID} />
                    </div>
                </div>
            );
        }
    }
// }