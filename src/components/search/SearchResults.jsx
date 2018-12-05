import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import axios from 'axios';
import {Config} from '../../config.js';

export default class SearchResults extends React.Component {
    
    constructor(){
        super();

        this.state = {
           searchResults : [],
           searchText: '',
           currentType: '',
        }
        this.hoverText = this.hoverText.bind(this);
        this.unHoverText = this.unHoverText.bind(this);
        this.filterSearchProjects = this.filterSearchProjects.bind(this);
        this.filterSearchProposals = this.filterSearchProposals.bind(this);
        this.filterSearchUsers = this.filterSearchUsers.bind(this);
    };

    componentDidMount(){
        var self = this;
        self.setState({ 
            searchResults: self.props.searchResults,
            searchText: self.props.searchText,
            currentType: 'projects'
        })
        // axios.get( Config.API + '/problems/search?q='+self.state.searchText).then(function (response) {
        //     self.setState({
        //         searchResults: response.data
        //     })
        // })
        // console.log(self.props.searchText)
    }
    componentWillReceiveProps(nextProps) {
        var self = this;
        self.setState({ 
            searchResults: nextProps.searchResults,
            searchText: nextProps.searchText
        })
        // if (nextProps.searchText == '') {
        //     $(document).ready(function() {
        //       $('#searchResultsContainer').attr('id','searchResultsContainerHide');
        //   });
        // }
        // else 
        // // if(self.state.currentType === 'problems') 
        // {
        //     axios.get( Config.API + '/problems/search?q='+nextProps.searchText).then(function (response) {
        //         self.setState({
        //             searchResults: response.data
        //         })
        //         console.log(response.data)
        //     })
        // }
        // // } else if (self.state.currentType === 'proposals') {
        // //     axios.get( Config.API + '/auth/solutions/search?q='+self.props.searchText).then(function (response) {
        // //         self.setState({
        // //             searchResults: response.data
        // //         })
        // //     })
        // // } else {
        // //     axios.get( Config.API + '/auth/users/search?q='+self.props.searchText).then(function (response) {
        // //         self.setState({
        // //             searchResults: response.data
        // //         })
        // //     })
        // // }
        // console.log(nextProps.searchText)
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
    filterSearchProjects() {
        document.getElementById('exploreHeaderInput').focus();
        var self = this
        axios.get( Config.API + '/problems/search?q='+self.state.searchText).then(function (response) {
            self.setState({
                searchResults: response.data
            })
        })
        self.setState({ 
            currentType: 'projects',
        })
    }
    filterSearchProposals() {
        document.getElementById('exploreHeaderInput').focus();
        var self = this
        axios.get( Config.API + '/auth/solutions/search?q='+self.state.searchText).then(function (response) {
            self.setState({
                searchResults: response.data
            })
        })
        self.setState({ 
            currentType: 'proposals',
        })
    }
    filterSearchUsers() {
        document.getElementById('exploreHeaderInput').focus();
        var self = this
        axios.get( Config.API + '/users/search?q='+self.state.searchText).then(function (response) {
            self.setState({
                searchResults: response.data
            })
        })
        self.setState({ 
            currentType: 'creators',
        })
    }
    render() {
        // console.log('searchText')
        // console.log(this.state.searchText)
        // console.log(this.props.searchText)
        if(this.props.searchResults.length > 0) {
            return (
                <div id="searchResultsUnitContainer">
                    <div id="searchTypeProjectLabel" onClick={this.filterSearchProjects}>
                        projects
                    </div>
                    {/* <div id="searchTypeProjectLabel" onClick={this.filterSearchProposals}>
                        proposals
                    </div>
                    <div id="searchTypeProjectLabel" onClick={this.filterSearchUsers}>
                        creators
                    </div> */}
                    {this.props.searchResults.map(this.renderItem)} 
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
       function hideSearch() {
            $(document).ready(function() {
                $('#searchResultsContainer').attr('id','searchResultsContainerHide');
                document.getElementById("exploreFormHeader").reset();
            });
        }

        if (problem.Private == '1') {
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
                // OLD PROJECT LINK
                // <Link key={problem.ID} to={'/project/'+problem.ID +'/subprojects'} onClick={hideSearch}>
                // NEW TOPIC LINK
                <Link key={problem.ID} to={'/home/'+problem.ID} onClick={hideSearch}>
                    <div id="searchResultsUnitHeader">
                        {/* OLD, FROM PROJECT LINK */}
                        {/* <div id="searchResultsUnitPercent">
                            {problem.Rank}
                        </div> */}
                        <div id="searchResultsUnitTitle">
                            {problem.Title}
                        </div>
                    </div>
                </Link>
            );
        }

}
