import React from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import { Link } from 'react-router';

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
                            <span id="blueNews1">SIGNS OF </span>ANCIENT LIFE
                            </div>
                            <div id="newsTitlePart2">
                                &nbsp;<span id="blueNews2">FOUND </span>ON MARS
                            </div>
                        </div>
                        <div id="newsProseContainer1Hide">
                            <div id="newsProse">
                                <span id="blueNewsProse">Methane deposits unexplained </span>
                                <br />
                                by planetary processes
                            </div>
                            <div id="newsProse">
                                <span id="blueNewsProse">Seasonal layers similar to those </span>
                                <br />
                                caused by Earth life
                            </div>
                            <a href="https://www.washingtonpost.com/news/speaking-of-science/wp/2018/06/07/newest-nasa-discoveries-make-search-for-martian-life-a-lot-more-opportune/?noredirect=on&utm_term=.06070ebc1880" target="_blank"  
                            // onClick={()=>{article1()}} 
                            onMouseOver={article1Hover}  onMouseOut={article1Unhover}>
                                <div id="newsArticleLink1">
                                    ARTICLE
                                </div>
                            </a>
                            {/* CNN */}
                            {/* https://www.cnn.com/2018/06/08/opinions/nasa-curiosity-rover-mars-organic-matter-opinion-lunine/index.html */}
                            <a href="http://science.sciencemag.org/content/360/6393/1093.full" target="_blank" 
                            // onClick={()=>{paper1()}} 
                            onMouseOver={paper1Hover}  onMouseOut={paper1Unhover}>
                                <div id="newsPaperLink1">
                                    PAPER
                                </div>
                            </a>
                            {/*  */}
                            <div id="newsDate">
                                <span id="blueNewsDate">JUNE </span>2018
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
    console.log('paper event')
    ReactGA.event({
        category: 'Paper Link',
        action: 'Mars Methane',
    });
}
function article1Hover() {
    $(document).ready(function() {
        $('#newsArticleLink1').html('GO TO <span id="whiteEncode">WASH POST</span>');
    });
}
function article1Unhover() {
    $(document).ready(function() {
        $('#newsArticleLink1').html('ARTICLE');
    });
}
function paper1Hover() {
    $(document).ready(function() {
        $('#newsPaperLink1').html('GO TO <span id="blueEncode">SCIENCE</span>');
    });
}
function paper1Unhover() {
    $(document).ready(function() {
        $('#newsPaperLink1').html('PAPER');
    });
}