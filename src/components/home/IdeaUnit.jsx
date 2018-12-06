import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import {Config} from '../../config.js';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ReactGA from 'react-ga';
ReactGA.initialize('UA-104103231-1'); //Unique Google Analytics tracking number


export default class IdeaUnit extends React.Component {

    constructor(props){
        super(props);

        this.state = {
           ideas : [],
        }
        this.renderItem = this.renderItem.bind(this);
    };
    
    componentWillReceiveProps(nextProps){
        var self = this;
        self.setState({
            ideas: nextProps.ideasProps,
        })
    }

   render() {
    
            return (
                <div id="fullWide">
                    {this.state.ideas.map(this.renderItem)}
                </div>
            );
    }

    renderItem(idea) {

        function gaIdeaView() {
            ReactGA.event({
                category: 'Ideas',
                action: 'Idea View',
                label: idea.Title,
            });
        }

        return(
            <Link key={idea.ID} to={`/idea/${idea.ID}`} onClick={gaIdeaView} activeClassName="ideaListUnitActive">
                <div id="ideaListUnit">
                    {idea.Title}
                </div>
            </Link>
        )
    }

}

{/* <Link to={'/idea'}>
                            <div id="ideaListUnit">
                                Nanorobots used for cleaning up mitochondria rust
                            </div>
                        </Link>
                        <Link to={'/idea'}>
                            <div id="ideaListUnit">
                                Genetic Engineering for fixing telomeric disintegration
                            </div>
                        </Link>
                        <Link to={'/idea'}>
                            <div id="ideaListUnit">
                                Pharmaceudical cocktail to address seven central problems
                            </div>
                        </Link> */}


