import React from 'react';
import { Link  } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class ProblemFollowButton extends React.Component {
  

  constructor(props){
    super(props);

    this.state = {
      projectFeed: [],
    }
    this.renderItem = this.renderItem.bind(this)
};

componentDidMount(){
    var self = this;
    // window.scrollTo(0,0);
    return axios.get( Config.API + '/problems/onproblemfeed?problem_id='+this.props.probID).then(function (response) {
        self.setState({
            projectFeed: response.data,
        })
    }) 

 }
componentWillReceiveProps(nextProps){
    var self = this;
    // window.scrollTo(0,0);
    return axios.get( Config.API + '/problems/onproblemfeed?problem_id='+nextProps.probID).then(function (response) {
        self.setState({
            projectFeed: response.data,
        })
    })     
}

render() {
    
    if(this.state.projectFeed.length == '0') {
        return (
            <div id="feedContainer">
                <div id="feedContainerProject">
                {/* <div id="feedTitleProject">
                    activity
                </div> */}
                {/* {React.cloneElement(this.props.children, {problems: this.state.feedProjectsSlice})} */}
                </div>
                <div id="projectNoActivity">
                  NO ACTIVITY
                  x{this.props.probID}x
                  
                </div>      
            </div>
        );
    } else {
    
    return (
        <div id="feedContainer">
            <div id="feedContainerProject">
            {/* <div id="feedTitleProject">
                activity
            </div> */}
            {/* {React.cloneElement(this.props.children, {problems: this.state.feedProjectsSlice})} */}
            <div id="projectActivityLabel">
                activity
            </div>
            </div>
            {this.state.projectFeed.map(this.renderItem)}        
        </div>
    );
}
}
    
renderItem(problem) {  
    if (problem.ParentType == '1') {

      return (
    //   We do actually want to show projects on proposals here:
        // <li key={problem.ID} id="feedListUnit">
        //     <Link to={'/project/private/'+problem.ID +'/subprojects'}>
        //         <div id="feedUnits">               
        //             <div id="blueFeed">project by <span id="feedCaps">{problem.OriginalPosterUsername}</span></div>
        //             <div id="whiteFeed">{problem.Title}</div>
        //             <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
        //         </div>
        //     </Link>
        // </li>
        <div key={problem.ID} id="nodisplay">
        </div>
      
      );

// NEED MORE IF STATEMENTS TO SEE IF THEY'RE ON PROPOSALS

} else if (problem.Type == '0') {

    return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/private/'+problem.ProblemID +'/subprojects'}>
                <div id="feedUnitsProject">               
                    <div id="blueFeedProject">new sub project</div>
                    <div id="whiteFeedProject">
                        {problem.Description}
                    </div>
                </div>
            </Link>  
        </li>
    );
} else if (problem.Type == '0') {

    return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/private/'+problem.ProblemID +'/subprojects'}>
                <div id="feedUnitsProject">               
                    <div id="blueFeedProject">new proposal</div>
                    <div id="whiteFeedProject">
                        {problem.Description}
                    </div>
                </div>
            </Link>  
        </li>
    );
    } else if (problem.Type == '2') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/private/'+problem.ProblemID +'/question/'+problem.TypeID +'/answers'}>
                <div id="feedUnitsProject">               
                    <div id="blueFeedProject">new question</div>
                    <div id="whiteFeedProjectDescription">
                        {problem.Description}
                    </div>
                </div>
            </Link>  
        </li>);
    } else if (problem.Type == '3') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/private/'+problem.ProblemID +'/suggestion/'+problem.TypeID +'/comments'}>
                <div id="feedUnitsProject">               
                    <div id="blueFeedProject">new suggestion</div>
                    <div id="whiteFeedProjectDescription">
                        {problem.Description}
                    </div>
                </div>
            </Link>
        </li>);
    } else if (problem.Type == '4') {
        return (
        <div key={problem.ID} id="nodisplay">
        </div>);
    } else if (problem.Type == '5') {
        return (
        <div key={problem.ID} id="nodisplay">
        </div>
);
    } else if (problem.Type == '6') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/private/'+problem.ProblemID +'/freeform/'+problem.TypeID +'/comments'}>
                <div id="feedUnitsProject">               
                    <div id="blueFeedProject">new debate</div>
                    <div id="whiteFeedProjectDescription">
                        {problem.Description}
                    </div>
                </div>
            </Link>
            
        </li>);
    
    } else if (problem.Type == '7') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/private/'+problem.ProblemID +'/learn/content/'+problem.TypeID +'/comments'}>
                <div id="feedUnitsProject">               
                    <div id="blueFeedProject">new lesson</div>
                    <div id="whiteFeedProject">
                        {problem.Description}
                    </div>
                </div>
            </Link>
        </li>);
    } else if (problem.Type == '8') {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/private/'+problem.ProblemID +'/learn/resources/'+problem.TypeID +'/comments'}>
                <div id="feedUnitsProject">               
                    <div id="blueFeedProject">new resource</div>
                    <div id="whiteFeedProject">
                        {problem.Description}
                    </div>
                </div>
            </Link>
        </li>);
    } else if (problem.Type == '9') {
        return (
        <div key={problem.ID} id="nodisplay">
        </div>);
    } else if (problem.Type == '10') {
        return (
        <div key={problem.ID} id="nodisplay">
        </div>);
    } else {
          return (
            <li key={problem.ID} id="feedListUnit">
                <Link to={'/project/private/'+problem.ID +'/subprojects'}>
                    <div id="feedUnitsProject">               
                        <div id="blueFeedProject">new update</div>
                        <div id="whiteFeedProject">
                            {problem.Description}
                        </div>
                    </div>
                </Link>
            </li>
          );
        }
       }
    }