import React from 'react';
import axios from 'axios';
import PrivateProjectUnit from '../components/problems/PrivateProjectUnit.jsx';
import {Config} from '../config.js';
import $ from 'jquery';

export default class PrivateProjectsContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
           problems : [],
           userproblems : [],
           searchText: [],
        }
        this.queryProblem = this.queryProblem.bind(this);
        this.stopEnter = this.stopEnter.bind(this);
    };
    componentDidMount(){
        var self = this;
        axios.get( Config.API + '/problems/subproblems?id=0&Private=1').then(function (response) {
            self.setState({
                problems: response.data,
                userproblems: response.data
            })
        }) 
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });
     }
     componentWillReceiveProps(nextProps){
        var self = this;
        axios.get( Config.API + '/problems/subproblems?id=0&Private=1').then(function (response) {
            self.setState({
                problems: response.data,
                userproblems: response.data
            })
        }) 
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });
     }
     stopEnter(e) {
        e.preventDefault();
      }
     queryProblem () {
         //get search text box data
        this.state.searchText = document.getElementById('privateExploreInput').value

        var self = this
        axios.get( Config.API + '/problems/search?q='+this.state.searchText).then(function (response) {
            if (self.state.searchText == '') {
                self.setState({
                    userproblems: self.state.problems
                  })
            } else {
                self.setState({
                    userproblems: response.data
                  })
            }
        })
      .catch(function (error) {
        // console.log(error.response.data)
          $(document).ready(function() {
              $('#notification').attr('id','notificationShow').hide().slideDown();
              if (error.response.data != '') {
                $('#notificationContent').text(error.response.data);
              }
              else if (error.response.data == '[object Object]') {
                return (
                  $(document).ready(function() {
                    $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                    $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                  })
                );
              } 
          });
      });
        }
        // componentDidMount(){
        //   window.scrollTo(0,0);
        // }


    render() {
            return (
                <div>
                    <div id="sidebarSBProjects">
                        <PrivateProjectUnit problems={this.state.userproblems}/>
                    </div>
                    <form id="privateSearchForm" onSubmit={this.stopEnter}>
                        <input type="search" name="search" id="privateExploreInput" onKeyUp={this.queryProblem} autoFocus/>
                    </form>
                </div>
            
            );
        }
    }
// }