import React from 'react';
import {Link} from 'react-router';
import axios from 'axios'

export default class SolutionContainer extends React.Component {

   render() {
      return (
        <div id="solutions">
            <div id="noteBooksTitle">Notebooks</div>
            <div>
                <div id="createNoteBookButton">
                    Create New
                </div>
                <ul> 
                {/*They should be organized by recency*/}
                    <li>
                        <div id="noteBookUnit">
                            <div id="noteBookUnitContainer">
                                <div id="noteBookUnitTitle">Physics Notes</div>
                            </div>
                        </div>
                    </li>
                </ul>     
            </div>
        </div>

      );
   }
}
