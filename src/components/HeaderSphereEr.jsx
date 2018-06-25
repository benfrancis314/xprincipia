import React from 'react';
import $ from 'jquery';


export default class Load extends React.Component {
    
    constructor(){
        super();
    
        this.showMenu = this.showMenu.bind(this)
    
    };
  
    showMenu() {
        // IF MOBILE (and thus can't hover), THEN: 
        if (window.screen.width <= 600) {
            $(document).ready(function() {
                $('#headerSphere').attr('id','headerSphereHide');
                $('#headerOptionsContainerHide').attr('id','headerOptionsContainer');
                $('#exitHeaderMenuMobile').attr('id','exitHeaderMenuMobileShow'); 
                $('#exitHeaderMenuMobileLogout').attr('id','exitHeaderMenuMobileLogoutShow'); 
                $('#headerLeft').attr('id','headerLeftHide');
                $('#exploreHeaderInput').attr('id','exploreHeaderInputHide');
                $('#exploreFormHeader').attr('id','exploreFormHeaderHide');
                $('#headerRight').attr('id','headerRightMobile');
                $('#headerSphereInfo1').attr('id','#headerSphereInfo1Hide');
            });
        }
    }
  
  
  
  
    render() {
      return (

        <div id="headerSphere" onClick={this.showMenu}>
            <div className="containerEr">
                <div className="ball spin">
                    <div className="lat"></div>
                    <div className="lng"></div>
                    <div className="lat"></div>
                    <div className="lng"></div>
                    <div className="lat"></div>
                    <div className="lng"></div>
                    <div className="lat"></div>
                    <div className="lng"></div>
                    <div className="lat"></div>
                    <div className="lng"></div>
                </div>
            </div>
            {/* <div className="shade"></div> */}
        </div>

      );
   }
}













// import React from 'react';
// import 

// export default class Load extends React.Component {
//     .wrapper
//     if props.shouldShowGreeting
//       p.greeting Hello World!

//     button(onClick=props.notify) Click Me

// }


