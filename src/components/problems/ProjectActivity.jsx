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
      linkPath: '',
    }
    this.renderItem = this.renderItem.bind(this)
};

componentDidMount(){
    var self = this;
    // window.scrollTo(0,0);
    axios.get( Config.API + '/problems/onproblemfeed?problem_id='+this.props.probID).then(function (response) {
        self.setState({
            projectFeed: response.data,
        })
    }) 
    if (window.location.pathname.includes('private')) {
        self.setState({
            linkPath: '/project/private/',
        })
    } else {
        self.setState({
            linkPath: '/project/',
        })
    }

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
                </div>      
            </div>
        );
    } else {
    
    return (
        <div id="feedContainer">
            <div id="feedContainerProject">
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
    if (problem.ParentType === 1) {

      return (
        <div key={problem.ID} id="nodisplay">
        </div>
      
      );
} else if (problem.BackupParentID > 0) {

    return (
      <div key={problem.ID} id="nodisplays">
        x
      </div>
    
    );

    } else if (problem.Type == 0) {

        return (
            <li key={problem.ID} id="feedListUnit">
                <Link to={'/project/'+problem.TypeID +'/subprojects'}>
                    <div id="feedUnitsProject">               
                        <div id="blueFeedProject">new sub project:</div>
                        <div id="whiteFeedProject">
                            {problem.Description}
                        </div>
                    </div>
                </Link>  
            </li>
        );
    } else if (problem.Type == 1) {
        return (
            <li key={problem.ID} id="feedListUnit">
                <Link to={'/project/'+problem.ProblemID +'/proposal/'+problem.TypeID}>
                    <div id="feedUnitsProject">               
                        <div id="blueFeedProject">new proposal:</div>
                        <div id="whiteFeedProject">
                            {problem.Description}
                        </div>
                    </div>
                </Link>  
            </li>
            );
    } else if (problem.Type == 2) {
        return (
            <li key={problem.ID} id="feedListUnit">
                <Link to={'/project/'+problem.ProblemID +'/discuss/'+problem.TypeID +'/comments'}>
                    <div id="feedUnitsProject">               
                        <div id="blueFeedProject">new question:</div>
                        <div id="whiteFeedProjectDescription">
                            {problem.Description}
                        </div>
                    </div>
                </Link>
            </li>
        );
    } else if (problem.Type == 3) {
        return (
            <li key={problem.ID} id="feedListUnit">
                <Link to={'/project/'+problem.ProblemID +'/suggestion/'+problem.TypeID +'/comments'}>
                    <div id="feedUnitsProject">               
                        <div id="blueFeedProject">new suggestion:</div>
                        <div id="whiteFeedProjectDescription">
                            {problem.Description}
                        </div>
                    </div>
                </Link>
            </li>
        );
    } else if (problem.Type == 6) {
        return (
            <li key={problem.ID} id="feedListUnit">
                <Link to={'/project/'+problem.ProblemID +'/suggestion/'+problem.TypeID +'/comments'}>
                    <div id="feedUnitsProject">               
                        <div id="blueFeedProject">new debate:</div>
                        <div id="whiteFeedProjectDescription">
                            {problem.Description}
                        </div>
                    </div>
                </Link>
            </li>
        );
    } else if (problem.Type == 7) {
        return (
        <li key={problem.ID} id="feedListUnit">
            <Link to={'/project/'+problem.ProblemID +'/learn/content/'+problem.TypeID +'/comments'}>
                <div id="feedUnitsProject">               
                    <div id="blueFeedProject">new lesson:</div>
                    <div id="whiteFeedProject">
                        {problem.Description}
                    </div>
                </div>
            </Link>
        </li>);
    } else if (problem.Type == 8) {
        return (
            <li key={problem.ID} id="feedListUnit">
                <Link to={'/project/'+problem.ProblemID +'/learn/resources/'+problem.TypeID +'/comments'}>
                    <div id="feedUnitsProject">               
                        <div id="blueFeedProject">new resource:</div>
                        <div id="whiteFeedProject">
                            {problem.Description}
                        </div>
                    </div>
                </Link>
            </li>);
    } else {
        return (
            <div key={problem.ID} id="nodisplays">
                {problem.BackupParentID}.
            </div>
        );
    }
}
}


    
//     } else {
//         return (
            
                
//                 <li 
//                 // key={problem.ID} 
//                 id="feedListUnitProject">
//                     {/* <Link to={'/project/'+problem.ID +'/subprojects'}> */}
//                         <div id="feedUnitsProject">               
//                             <div id="blueFeedProject">new sub project</div>
//                             <div id="whiteFeedProject">
//                                 mining the asteroid belt
//                                 {/* {problem.Title} */}
//                             </div>
//                         </div>
//                     {/* </Link> */}
//                 </li>
//                 <li 
//                 // key={problem.ID} 
//                 id="feedListUnitProject">
//                     {/* <Link to={'/project/'+problem.ID +'/subprojects'}> */}
//                         <div id="feedUnitsProject">               
//                             <div id="blueFeedProject">new sub project</div>
//                             <div id="whiteFeedProject">
//                                 mining the asteroid belt
//                                 {/* {problem.Title} */}
//                             </div>
//                         </div>
//                     {/* </Link> */}
//                 </li>
//                 <li 
//                 // key={problem.ID} 
//                 id="feedListUnitProject">
//                     {/* <Link to={'/project/'+problem.ID +'/subprojects'}> */}
//                         <div id="feedUnitsProject">               
//                             <div id="blueFeedProject">new sub project</div>
//                             <div id="whiteFeedProject">
//                                 mining the asteroid belt
//                                 {/* {problem.Title} */}
//                             </div>
//                         </div>
//                     {/* </Link> */}
//                 </li>
                
//                 {/* <div id="feedBottom">
//                     <br />
//                 </div> */}
//                 {/* <div onClick={this.pagingMore}>
//                     Paging
//                 </div> */}
//             </div>
            
//         );
//     }
// }

// // USE AS IF STATEMENT TO CUSTOMIZE ACTIVITY TO TYPE (question vs. project, etc.)
//     renderItem(problem) {
        
    
//       if (problem.Private === true) {
//               return (
//                   <div key={problem.ID} id="nodisplay">
//                   </div>
//               );
      
//       } else if (problem.ParentType === 1) {
      
//             return (
            
//                   <li key={problem.ID} id="nodisplay">
//                   </li>
            
            
//             );
      
//       } else if (problem.Title === 'Interstellar Civilization') {
      
//             return (
            
//               <li key={problem.ID} id="nodisplay">
//               </li>
            
            
//             );
      
//       } else if (problem.Title === 'Evolving Humanity') {
//             return (
//               <li key={problem.ID} id="nodisplay">
//               </li>
            
//             );
//       } else if (problem.Title === 'Theoretical Knowledge') {
//             return (
//               <li key={problem.ID} id="nodisplay">
//               </li>
            
//             );
//       } else if (problem.Title === 'Technology Development') {
//             return (
//               <li key={problem.ID} id="nodisplay">
//               </li>
            
//             );
//       } else 
//             return (
//               <li key={problem.ID} id="feedListUnit">
//                   <Link to={'/project/'+problem.ID +'/subprojects'}>
//                       <div id="feedUnits">               
//                           <div id="blueFeed">project by {problem.OriginalPosterUsername}</div>
//                           <div id="whiteFeed">{problem.Title}</div>
//                           <div id="feedDate">{dateTime(problem.CreatedAt)}</div>
//                       </div>
//                   </Link>
//               </li>
//             );
//          }
//       }


// function dateTime(str) {
//     if(str != undefined){
//        var result = str.substring(0,10);
//        return result
//     }
// }