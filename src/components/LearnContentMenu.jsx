import React from 'react';
import {Link} from 'react-router';
import axios from 'axios'

export default class LearnContentMenu extends React.Component {
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
        <div>
            <div id="intensityHeader">
                <div id="intensityLabel">Complexity</div>
                <Link to={`/problem/${this.props.params.probID}/learn/content/1`} activeClassName="activeWhite">
                    <div id="intensityNumber">1</div>
                </Link>
                <Link to={`/problem/${this.props.params.probID}/learn/content/2`} activeClassName="activeWhite">
                    <div id="intensityNumber">2</div>
                </Link>
                <Link to={`/problem/${this.props.params.probID}/learn/content/3`} activeClassName="activeWhite">
                    <div id="intensityNumber">3</div>
                </Link>
            </div>
            {/*{React.cloneElement(this.props.children, {probID: this.state.probID})}*/}
        </div>

      );
   }
}