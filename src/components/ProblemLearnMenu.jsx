import React from 'react';
import {Link} from 'react-router';
import axios from 'axios'

export default class ProblemSolutionsMenu extends React.Component {
  constructor(props){
        super(props);

        this.state = {
            solutions: []
        }

    };
        componentDidMount(){
        var self = this;
        window.scrollTo(0,0);
        return axios.get('http://localhost:10000/auth/solutions/problemID?id='+this.props.params.probID).then(function (response) {
            self.setState({
                solutions: response.data
            })
        })
    }

   render() {
      return (
        <div id="solutions">
            <div id="solutionsTitleRightSB">Learn</div>
            <div id="solutionsHeader">
                <Link to={`/problem/${this.props.params.probID}/learn/content`} activeClassName="activeWhite">
                    <div id="contentLearnButtonRightSB">Content</div>
                </Link>

                <Link to={`/problem/${this.props.params.probID}/learn/resources`}  activeClassName="activeWhite">
                    <div id="resourcesLearnButtonRightSB">Resources</div>
                </Link>
            </div>
            <div id="intensityHeader">
                <div id="intensityLabel">Intensity</div>
                <div id="intensityNumber">1</div>
                <div id="intensityNumber">2</div>
                <div id="intensityNumber">3</div>
            </div>
            {/*{React.cloneElement(this.props.children, {probID: this.state.probID})}*/}
        </div>

      );
   }
}