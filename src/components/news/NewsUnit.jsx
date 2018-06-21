import React from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import { Link } from 'react-router';
ReactGA.initialize('UA-104103231-1'); //Unique Google Analytics tracking number

export default class Load extends React.Component {

    constructor(props){
        super(props);

        this.state = {
           random: '',
        }
        this.randomFeatured = this.randomFeatured.bind(this);
    };

    componentDidMount() {
        this.setState({
            random: Math.random(),
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            random: Math.random(),
        })
    }
    randomFeatured() {
        this.setState({
            random: Math.random(),
        })
    }

    render() {   
        return(
            <div>
                <div id="newsTitleLabel">
                    scientific news
                </div>
                <div id="newsUnitContainer" onClick={()=>{newsClick1()}}>
                    <div id="newsUnit1">
                        <div id="newsUnitTitle">
                            <div id="newsTitlePart1">
                            {/* <span id="blueNews1">signs of </span>ancient life */}
                            signs of <span id="blueNews1">ancient life</span>
                            </div>
                            <div id="newsTitlePart2">
                                {/* &nbsp;<span id="blueNews2">found </span>on mars */}
                                &nbsp;found <span id="blueNews2">on mars</span>
                            </div>
                        </div>
                        <div id="newsProseContainer1Hide">
                            <div id="newsProse">
                                Methane deposits <span id="blueOpen">unexplained by planetary processes</span>
                            </div>
                            <div id="newsProse">
                                Seasonal layers <span id="blueOpen">similar to those caused by Earth life</span>
                            </div>
                            <div id="newsArticleLink" onClick={()=>{article1()}}>
                                washnington post article
                            </div>
                            <div id="newsPaperLink" onClick={()=>{paper1()}}>
                                nasa paper
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
                
        )
   }
}

function newsClick1() {
    $(document).ready(function() {
        $('#newsProseContainer1Hide').attr('id','newsProseContainer1Show');
        $('#newsUnit1').attr('id','newsUnit1Show');
        $('#newsTitlePart1').attr('id','newsTitlePart1Active');
        $('#newsTitlePart2').attr('id','newsTitlePart2Active');
        $('#blueNews1').attr('id','blueNews1Active');
        $('#blueNews2').attr('id','blueNews2Active');
        // .hide().slideDown();
      });
    ReactGA.event({
        // Replace with "Created project", "voted question", etc. 
        category: 'View News',
        // Replace action with project ID, etc. for various things
        action: 'Mars Methane',
    });
    // alert('click');
  }
function article1() {
    ReactGA.event({
        category: 'Article Link',
        action: 'Mars Methane',
    });
}
function paper1() {
    ReactGA.event({
        category: 'Paper Link',
        action: 'Mars Methane',
    });
}