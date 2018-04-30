import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
// import ReactGA from 'react-ga';

export default class LeaderboardUnit extends React.Component {
   

    constructor(props){
        super(props);

        this.state = {
           leaderboard : [],
        }
        this.renderItem = this.renderItem.bind(this);

    };

    componentDidMount(){
        var self = this;
        this.setState({
            leaderboard: self.props.leaderboard,
        })
    }
    componentWillReceiveProps (nextProps){
        var self = this;
        this.setState({
            leaderboard: nextProps.leaderboard,
        })
    }

	render() {
		return (
	    <div id="SPListDivUnitContainer">
            <ul id="welcomeUserProblemsUnitList"> 
                {this.state.leaderboard.map(this.renderItem)} 
            </ul>	               
	    </div>
		);
	}
	renderItem(problem) {
  
        function hoverLeaderBoardTextVotes() {
            $(document).ready(function() {
                    $('#leaderBoardCapTop').html("user points").fadeIn(7500);
                    $('#leaderBoardCapTop').attr('id','leaderBoardCapTopVotesHover');
            });
          }
          function unHoverLeaderBoardTextVotes() {
            $(document).ready(function() {
                    $('#leaderBoardCapTopVotesHover').html("user leaderboard");
                    $('#leaderBoardCapTopVotesHover').attr('id','leaderBoardCapTop');
            });
          }


if (this.props.leaderboardType == 'projects') {

// For Google Analytics when working
    // function handleClick() {
    //     ReactGA.event({
    //         category: 'Project',
    //         action: 'Clicked Link',
    //     });
    // }
// if (problem.Private === true) {
//         return (
//             <div key={problem.ID} id="nodisplay">
//             </div>
//         );

// } else if (problem.ParentType === 1) {

//       return (
      
//             <li key={problem.ID} id="nodisplay">
//             </li>
      
      
//       );

// } else if (problem.Title === 'Interstellar Civilization') {

//       return (
      
//         <li key={problem.ID} id="nodisplay">
//         </li>
      
      
//       );

// } else if (problem.Title === 'Evolving Humanity') {
//       return (
//         <li key={problem.ID} id="nodisplay">
//         </li>
      
//       );
// } else if (problem.Title === 'theoretical knowledge') {
//       return (
//         <li key={problem.ID} id="nodisplay">
//         </li>
      
//       );
// } else if (problem.Title === 'Technology Development') {
//       return (
//         <li key={problem.ID} id="nodisplay">
//         </li>
      
//       );
// } else 
      return (
        <li key={problem.ID} id="welcomeUserProblemsUnit">
            <Link to={'/project/'+problem.ID +'/subprojects'}>
                <div id="welcomeUserProblemsHeader">
                    <div id="welcomeUserProblemsTitle">
                        <div id="welcomeProjectPercent" onMouseOver={hoverLeaderBoardTextVotes} onMouseOut={unHoverLeaderBoardTextVotes}>
                            {problem.Rank}
                        </div>
                        <div id="welcomeProblemsTitleText">
                            {problem.Title}
                        </div>
                    </div>
                </div>
            </Link>
        </li>
      );
   } else if (this.props.leaderboardType == 'users') {
       return (
        <li key={problem.ID} id="welcomeUserProblemsUnit">
            <Link to={'/user/'+problem.username}>
                <div id="welcomeUserProblemsHeader">
                    <div id="welcomeUserProblemsTitle">
                        <div id="welcomeProjectPercent" onMouseOver={hoverLeaderBoardTextVotes} onMouseOut={unHoverLeaderBoardTextVotes}>
                            {problem.Points}
                        </div>
                        <div id="welcomeProblemsTitleText">
                            {problem.username}
                        </div>
                    </div>
                </div>
            </Link>
        </li>
       )
   }
}
}

// function floatToDecimal(float) {
// 	return Math.round(float*100)+'%';
// }
