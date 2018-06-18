import React from 'react';
import ReactGA from 'react-ga';
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
        if (this.state.random < 0.25) {
            return (
                <div id="featuredProjectContainer" onClick={()=>{handleClick1()}}>
                    <div id="featuredProjectLabel">
                        featured projects
                    </div>
                    <Link to={'/project/13/subprojects'}>
                        <div id="featuredProjectButton1">
                            structure and dynamics
                            <br />of the human mind
                        </div>
                    </Link>
                    <img src={require('../../assets/rightArrow.svg')} id="featuredProjectButtonNext" width="30" height="30" alt="Close button, red X symbol" onClick={this.randomFeatured} />            
                </div>
            );
        } else if (this.state.random < 0.5) {
            return (
                <div id="featuredProjectContainer" onClick={()=>{handleClick2()}}>
                    <div id="featuredProjectLabel">
                        featured projects
                    </div>
                    <Link to={'/project/15/subprojects'}>
                        <div id="featuredProjectButton3">
                            artificial general intelligence
                        </div>
                    </Link>
                    <img src={require('../../assets/rightArrow.svg')} id="featuredProjectButtonNext" width="30" height="30" alt="Close button, red X symbol" onClick={this.randomFeatured} />            
                </div>
            );
        } else if (this.state.random < 0.75) {
            return (
                <div id="featuredProjectContainer" onClick={()=>{handleClick2()}}>
                    <div id="featuredProjectLabel">
                        featured projects
                    </div>
                    <Link to={'/project/15/subprojects'}>
                        <div id="featuredProjectButton3">
                            abiogenesis
                        </div>
                    </Link>
                    <img src={require('../../assets/rightArrow.svg')} id="featuredProjectButtonNext" width="30" height="30" alt="Close button, red X symbol" onClick={this.randomFeatured} />            
                </div>
            );
        } else if (this.state.random < 0.875) {
            return (
            
            <div id="featuredProjectContainer" onClick={()=>{handleClick2()}}>
                <div id="featuredProjectLabel">
                    featured projects
                </div>
                <Link to={'/project/5/subprojects'}>
                    <div id="featuredProjectButton5">
                        colonizing the moon
                    </div>
                </Link>
                <img src={require('../../assets/rightArrow.svg')} id="featuredProjectButtonNext" width="30" height="30" alt="Close button, red X symbol" onClick={this.randomFeatured} />            
            </div>
            );
        } else {
            return (
                <div id="featuredProjectContainer" onClick={()=>{handleClick2()}}>
                    <div id="featuredProjectLabel">
                        featured projects
                    </div>
                    <Link to={'/project/51/subprojects'}>
                        <div id="featuredProjectButton4">
                            plant intelligence
                        </div>
                    </Link>
                    <img src={require('../../assets/rightArrow.svg')} id="featuredProjectButtonNext" width="30" height="30" alt="Close button, red X symbol" onClick={this.randomFeatured} />            
                </div>
            );
        }
   }
}

function handleClick1() {
    ReactGA.event({
        // Replace with "Created project", "voted question", etc. 
        category: 'View Featured',
        // Replace action with project ID, etc. for various things
        action: 'Mind',
    });
    // alert('click');
  }
  function handleClick2() {
    ReactGA.event({
        // Replace with "Created project", "voted question", etc. 
        category: 'View Featured',
        // Replace action with project ID, etc. for various things
        action: 'AI',
    });
    // alert('click');
  }