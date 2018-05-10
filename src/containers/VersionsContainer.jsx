import React from 'react';
import {Link} from 'react-router';
import SideBarMore from '../components/SideBarMore.jsx';
import VersionsUnit from '../components/versions/VersionsUnit.jsx';
import axios from 'axios'
import {Config} from '../config.js'

export default class VersionsContainer extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: []
        }

    };
    componentDidMount(){
        var self = this;
        return axios.get( Config.API + '/solutions/versions?id='+this.props.params.solutionID).then(function (response) {
            self.setState({
                solutions: response.data
            })
        })
    }

   render() {
      return (
          
        <div id="fullVersions">
            <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}`}>
                <img src={require('../assets/redX.svg')} id="closeRedX" width="30" height="30" alt="Close button, red X symbol" />            
            </Link>
            <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/versions/create`}>
                <div id="versionsContainerHeader">proposal versions</div>
            </Link>
            <VersionsUnit solutions={this.state.solutions} probID={this.props.params.probID} solutionID={this.props.params.solutionID} />
        </div>
      );
   }
}