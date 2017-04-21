import React from 'react';

export default class HandoutBack extends React.Component {
   render() {
      return (
     <div>
      <div id="handoutBack">
        <div id="timeline">
            <div id="betaDate">
                    <div id="timelineTitle">Beta</div>
                    <div id="blueDot">.</div>
                    <div id="timelineDate">2017</div>
            </div>
            <div id="launchDate">
                    <div id="timelineTitle">Launch</div>
                    <div id="blueDot">.</div>
                    <div id="timelineDate">2018</div>
            </div>
        </div>
        <div id="backContent">
                <div id="backLarge">Get involved in cutting edge science</div>
                .<br/>
                <div id="backLarge">Submit and Breakdown today’s scientific problems</div>
                .<br/>
                <div id="backLarge">Create and vote on solutions</div>
                .<br />
                .<br />
                Contact us to learn more<br />
                info@xprincipia.com
        </div>

      </div>
    </div>
      );
   }
}