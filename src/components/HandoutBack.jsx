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
                Get involved in cutting edge science <br/>
                .<br/>
                Submit and Breakdown today’s scientific problems<br/>
                .<br/>
                Create and vote on solutions<br />
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