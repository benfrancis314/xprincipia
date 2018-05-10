import React from 'react';
import {Link} from 'react-router'

export default class ProfileUnit extends React.Component {
    constructor(props){
        super(props);

        this.renderItem = this.renderItem.bind(this)
};

	render() {
		return (
	    <div>
			<ul> {this.props.displayItems.map(this.renderItem)} </ul>
	               
	    </div>
		);
	}

   renderItem(item) {
     if (item.Private === true) {
         return (
             <div key={item.ID} id="noDisplay">
             </div>
         )
     }  
    else if (this.props.currentType === 'solution') {
        return (
          <Link key={item.ID} to={`/project/${item.ProblemID}/proposal/${item.ID}`} >
            <li>
                <div id="profileRightUnit">
                    <div id="profileUnitTitle">{item.Title}</div>
                </div>
            </li>
          </Link>
      );
       }
      else if (this.props.currentType === 'problem') {
        return (
          <Link key={item.ID} to={`/project/${item.ID}/subprojects`} >
            <li>
                <div id="profileRightUnit">
                    <div id="profileUnitTitle">{item.Title}</div>
                </div>
            </li>
          </Link>
      );
       }
   }
}
