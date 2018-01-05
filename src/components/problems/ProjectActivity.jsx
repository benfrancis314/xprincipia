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
    //   tracked: '',
    }
    // this.track = this.track.bind(this)
};



render() {
    if (0) {
       return (
            <div id="projectNoActivity">
              NO ACTIVITY
            </div>
       );
    } else {
        return (
            <div id="feedContainerProject">
                {/* <div id="feedTitleProject">
                    activity
                </div> */}
                {/* {React.cloneElement(this.props.children, {problems: this.state.feedProjectsSlice})} */}
                <div id="projectActivityLabel">
                    activity
                </div>
                <li 
                // key={problem.ID} 
                id="feedListUnitProject">
                    {/* <Link to={'/project/'+problem.ID +'/subprojects'}> */}
                        <div id="feedUnitsProject">               
                            <div id="blueFeedProject">new sub project</div>
                            <div id="whiteFeedProject">
                                mining the asteroid belt
                                {/* {problem.Title} */}
                            </div>
                        </div>
                    {/* </Link> */}
                </li>
                <li 
                // key={problem.ID} 
                id="feedListUnitProject">
                    {/* <Link to={'/project/'+problem.ID +'/subprojects'}> */}
                        <div id="feedUnitsProject">               
                            <div id="blueFeedProject">new sub project</div>
                            <div id="whiteFeedProject">
                                mining the asteroid belt
                                {/* {problem.Title} */}
                            </div>
                        </div>
                    {/* </Link> */}
                </li>
                <li 
                // key={problem.ID} 
                id="feedListUnitProject">
                    {/* <Link to={'/project/'+problem.ID +'/subprojects'}> */}
                        <div id="feedUnitsProject">               
                            <div id="blueFeedProject">new sub project</div>
                            <div id="whiteFeedProject">
                                mining the asteroid belt
                                {/* {problem.Title} */}
                            </div>
                        </div>
                    {/* </Link> */}
                </li>
                <li 
                // key={problem.ID} 
                id="feedListUnitProject">
                    {/* <Link to={'/project/'+problem.ID +'/subprojects'}> */}
                        <div id="feedUnitsProject">               
                            <div id="blueFeedProject">new sub project</div>
                            <div id="whiteFeedProject">
                                mining the asteroid belt
                                {/* {problem.Title} */}
                            </div>
                        </div>
                    {/* </Link> */}
                </li>
                
                {/* <div id="feedBottom">
                    <br />
                </div> */}
                {/* <div onClick={this.pagingMore}>
                    Paging
                </div> */}
            </div>
            
        );
    }

// USE AS IF STATEMENT TO CUSTOMIZE ACTIVITY TO TYPE (question vs. project, etc.)
    // renderItem(problem) {
        
    
    //   if (problem.Private === true) {
    //           return (
    //               <div key={problem.ID} id="nodisplay">
    //               </div>
    //           );
      
    //   } else if (problem.ParentType === 1) {
      
    //         return (
            
    //               <li key={problem.ID} id="nodisplay">
    //               </li>
            
            
    //         );
      
    //   } else if (problem.Title === 'Interstellar Civilization') {
      
    //         return (
            
    //           <li key={problem.ID} id="nodisplay">
    //           </li>
            
            
    //         );
      
    //   } else if (problem.Title === 'Evolving Humanity') {
    //         return (
    //           <li key={problem.ID} id="nodisplay">
    //           </li>
            
    //         );
    //   } else if (problem.Title === 'Theoretical Knowledge') {
    //         return (
    //           <li key={problem.ID} id="nodisplay">
    //           </li>
            
    //         );
    //   } else if (problem.Title === 'Technology Development') {
    //         return (
    //           <li key={problem.ID} id="nodisplay">
    //           </li>
            
    //         );
    //   } else 
    //         return (
    //           <li key={problem.ID} id="feedListUnit">
    //               <Link to={'/project/'+problem.ID +'/subprojects'}>
    //                   <div id="feedUnits">               
    //                       <div id="blueFeed">project by {problem.OriginalPosterUsername}</div>
    //                       <div id="whiteFeed">{problem.Title}</div>
    //                       <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
    //                   </div>
    //               </Link>
    //           </li>
    //         );
    //      }
    //   }

    }
}

function dateTime(str) {
    if(str != undefined){
       var result = str.substring(0,10);
       return result
    }
}