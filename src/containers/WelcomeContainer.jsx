import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
// import Sound from 'react-sound';
// Currently unused, may use later. Loading only loads part of page, currently looks weird
import {Config} from '../config.js';
import $ from 'jquery';


export default class WelcomeContainer extends React.Component {
   

  hoverText() {
    if (cookie.load('userName')) {
      $(document).ready(function() {
          $('#logoName').html('review <span id="brightWhite">mission</span>');
          $('#logoName').attr('id','logoNameGuide');
      });
    } else {
        $(document).ready(function() {
            $('#logoName').html('begin <span id="brightWhite">experience</span>');
            $('#logoName').attr('id','logoNameGuide');
        });
    }
  }
  unHoverText() {
      $(document).ready(function() {
          // $('#privateContainerMottoBlue').html("ORGANIZE YOUR THOUGHTS");
          $('#logoNameGuide').html('<span id="xBlue">x</span>principia');             
          $('#logoNameGuide').attr('id','logoName');
      });
  }

    constructor(props){
        super(props);

        this.state = {
           problems : [],
           userproblems : [],
           searchText: [],
           introductionTitle: '',
        }
        this.queryProblem = this.queryProblem.bind(this);
        // this.startSound = this.startSound.bind(this);
    };


     queryProblem () {
         //get search text box data
        this.state.searchText = document.getElementById('welcomeSearchFormLabel').value

        var self = this
        return axios.get( Config.API + '/problems/search?q='+this.state.searchText).then(function (response) {
            self.setState({
              userproblems: response.data
            })
        })
        .catch(function (error) {
          // console.log(error.response.data)
            // $(document).ready(function() {
            //     $('#notification').attr('id','notificationShow').hide().slideDown();
            //     if (error.response.data != '') {
            //       $('#notificationContent').text(error.response.data);
            //     }
            //     else if (error.response.data == '[object Object]') {
            //       return (
            //         $(document).ready(function() {
            //           $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
            //           $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
            //         })
            //       );
            //     } 
            // });
        });
      }
        // componentDidMount(){
        //   window.scrollTo(0,0);
        // }
        componentDidMount(){
        var self = this;
        window.scrollTo(0,0);
        if (cookie.load('userName')) {
          self.setState({
              introductionTitle: 'introduction',
          })
        } else {
            self.setState({
                introductionTitle: 'introduction',
            })
        }
        axios.get( Config.API + '/problems/all').then(function (response) {
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

    //  startSound () {
    //     var self = this;

    //     return  self.setState({ volume: 100 });
    //     }
   
   render() {
      return (
        <div id="privateContainer">
            {/*<Sound
                url={require('../assets/jfkSpeech.mp3')}
                autoLoad={false}
                playStatus={Sound.status.PLAYING}
                playFromPosition={87500 //in ms}
                onLoading={this.handleSongLoading}
                onPlaying={this.handleSongPlaying}
                onFinishedPlaying={this.handleSongFinishedPlaying} 
                volume={0}/>*/}
         <Link to="/introduction" activeClassName="activeIntroductionButton">
            <div id="welcomeIntroductionLabel" onMouseOver={this.hoverText} onMouseOut={this.unHoverText}>
                {this.state.introductionTitle}
            </div>
         </Link>
         {this.props.children}
        </div>
      );
   }
}