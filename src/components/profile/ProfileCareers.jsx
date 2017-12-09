import React from 'react';

export default class ProfileAbout extends React.Component {
   render() {
      return (
        <div>
              <div id="aboutProseDescriptions">
              <span id="blue">XPrincipia is a startup</span>. We envision a world where
                                humanity's greatest goals are accomplished and most daunting problems solved, 
                                all by an inspired citizenry connected through the internet. 
                 <br />
                 <br />
              <span id="blue">However, XPrincipia is currently a young company</span>, attempting to survive. 
                We need help on this journey, yet have little to give.
                <br />
                <br />
              <span id="blue">If you are interested </span>in working with us, 
                either as a volunteer or as a long-term employee, then the following is for you:
                 <br />
                 <br />
              <div id="careersSign">
                <span id="blue">We are looking</span> for <span id="blue">high-level team members <br />
                who are passionate about progressing humanity and civilization</span>. 
                    <br />
                    <br />
                    {/* <span id="blue">XPrincipia</span> is a startup looking for <span id="blue">high-level team members</span>. 
                    <br />
                    <br /> */}
                    <span id="blue">Expertise</span> is desired in <span id="blue">one or more</span> of the following areas:
                    <br />
                    <div id="aboutList">
                    1. <span id="blue">Backend</span> or <span id="blue">Frontend Programming</span>
                    <br />
                    2. <span id="blue">Sales </span> or <span id="blue">Business Development</span> 
                    <br />
                    3. <span id="blue">Science</span> or <span id='blue'>Technology Consultation</span>
                    </div>
                    <br />
                    <span id="blue">In website design</span>, we aim to create an experience that connects art and science as intimately as their natures allow. 
                    {/* Would be cool to weave in the Einstein quote about mystery, art and science */}
                    <br />
                    <br />
                    {/* <span id="blue">In business</span>, we are looking for well-intentioned, yet savy employees who can creatively see beyond what has been done before.  */}

                    <span id="blue">If you would like to fight </span>for <span id="blue">our cause</span>, contact us:
                </div>
              </div>
            <div id="profileAboutContact">
                careers@xprincipia.com
            </div>
            <div id="profileAboutQuote">
                All our science, measured against reality, is primitive and childlike &ndash; and yet 
                it is the most precious thing we have.
                <br />
                <br />
                - Albert Einstein
            </div>
        </div>
      );
   }
}
