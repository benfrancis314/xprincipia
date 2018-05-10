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
  
        function hoverLeaderBoardProjectVotes() {
            $(document).ready(function() {
                    $('#leaderBoardCapTop').html("project votes").fadeIn(7500);
                    $('#leaderBoardCapTop').attr('id','leaderBoardCapTopVotesHover');
            });
          }
        function unHoverLeaderBoardProjectVotes() {
            $(document).ready(function() {
                    $('#leaderBoardCapTopVotesHover').html("top projects");
                    $('#leaderBoardCapTopVotesHover').attr('id','leaderBoardCapTop');
            });
        }
        function hoverLeaderBoardUserPoints() {
            $(document).ready(function() {
                    $('#leaderBoardCapTop').html("user points").fadeIn(7500);
                    $('#leaderBoardCapTop').attr('id','leaderBoardCapTopVotesHover');
            });
        }
        function unHoverLeaderBoardUserPoints() {
            $(document).ready(function() {
                    $('#leaderBoardCapTopVotesHover').html("top members");
                    $('#leaderBoardCapTopVotesHover').attr('id','leaderBoardCapTop');
            });
        }
        function hoverLeaderBoardProposalVotes() {
            $(document).ready(function() {
                    $('#leaderBoardCapTop').html("proposal votes").fadeIn(7500);
                    $('#leaderBoardCapTop').attr('id','leaderBoardCapTopVotesHover');
            });
        }
        function unHoverLeaderBoardProposalVotes() {
            $(document).ready(function() {
                    $('#leaderBoardCapTopVotesHover').html("top proposals");
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

      return (
        <li key={problem.ID} id="welcomeUserProblemsUnit">
            <Link to={'/project/'+problem.ID +'/subprojects'}>
                <div id="welcomeUserProblemsHeader">
                    <div id="welcomeUserProblemsTitle">
                        <div id="welcomeProjectPercent" onMouseOver={hoverLeaderBoardProjectVotes} onMouseOut={unHoverLeaderBoardProjectVotes}>
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
                        <div id="welcomeProjectPercent" onMouseOver={hoverLeaderBoardUserPoints} onMouseOut={unHoverLeaderBoardUserPoints}>
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
    } else if (this.props.leaderboardType == 'proposals') {
        return (
         <li key={problem.ID} id="welcomeUserProblemsUnit">
             <Link to={'/project/'+problem.ID +'/proposal/'+problem.ProblemID}>
                 <div id="welcomeUserProblemsHeader">
                     <div id="welcomeUserProblemsTitle">
                         <div id="welcomeProjectPercent" onMouseOver={hoverLeaderBoardProposalVotes} onMouseOut={unHoverLeaderBoardProposalVotes}>
                             {problem.Rank}
                         </div>
                         <div id="welcomeProblemsTitleText">
                             {problem.Title}
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
