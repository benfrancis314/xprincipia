import React from 'react';
import { browserHistory } from 'react-router';

export default class EarthSphere extends React.Component {
   
   componentDidUpdate() {
        // this.$el = $(this.el);
        // this.el.somePlugin
   }

   componentWillUnmount() {

   }
   
    render() {
      return (
        <div id="sphere" ref={el => this.el = el} />
      );
   }
}

