import React from 'react';
import { browserHistory } from 'react-router';
// import {jquery, sphere} from 'earth3d';

export default class EarthSphere extends React.Component {
   
//    componentDidUpdate() {
//         this.$el = $(this.el);
//         this.el.jquery.earth3d;

//    }

//    componentWillUnmount() {

//    }
   
    render() {
      return (
        <div id="sphere" ref={el => this.el = el} />
      );
   }
}

