import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';


export default class SearchResults extends React.Component {
    hideSearch() {
        $(document).ready(function() {
            $('#searchResultsContainer').attr('id','searchResultsContainerHide');
        });
      }
    hoverText() {
        $(document).ready(function() {
                $('#searchMotto').html("NULLIUS IN VERBA").fadeIn(7500);
                $('#searchMotto').attr('id','searchMotto2');
        });
    }
    unHoverText() {
        $(document).ready(function() {
                $('#searchMotto2').html("||||||| || |||||");
                $('#searchMotto2').attr('id','searchMotto');
        });
    }
    render() {
        if(this.props.problems.length > 0) {
            return (
                <div id="searchResultsUnitContainer">
                    <div id="searchTypeProjectLabel">
                        projects
                    </div>
                    {this.props.problems.map(this.renderItem)} 
                </div>
            );
        } else {
            return (
                <div id="fullWide">
                    <div id="searchEmptyAlert">
                        <span id="gray">explore </span><span id="blue">x</span><span id="gray">principia</span>              
                    </div>
                    <div id="ouroborosContainer">
                        <div id="ouroborosImg"></div>
                        <div id="searchMotto"
                         onMouseOver={this.hoverText} onMouseOut={this.unHoverText}
                        >
                            ||||||| || |||||
                        </div>
                    </div>
                </div>
            )
        }
    }
	renderItem(problem) {
  
if (problem.Private === true) {
        return (
            <div key={problem.ID} id="nodisplay">
            </div>
        );

} else if (problem.ParentType === 1) {

      return (
            <li key={problem.ID} id="nodisplay">
            </li>
      );
} else 
      return (
        <li key={problem.ID} id="searchResultsUnit">
            <Link to={'/project/'+problem.ID +'/subprojects'} onClick={this.hideSearch}>
                <div id="searchResultsUnitHeader">
                    <div id="searchResultsUnitTitle">
                        <div id="searchResultsUnitPercent">
                            {problem.Rank}
                        </div>
                        <div id="searchResultsUnitTitleText">
                            {problem.Title}
                        </div>
                    </div>
                </div>
            </Link>
        </li>
      );
   }
}
