import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import {Config} from '../../config.js';
import $ from 'jquery';

export default class CommentFlagForm extends React.Component {

  constructor(){
    super();
    
    this.state= {
      parentType: '0',
      parentID: [],
      description: '',
      reason: '',
      submitUser: '',
      flagUser: '',
    }

    this.flagComment = this.flagComment.bind(this);
  };

  flagComment() {
  //Read field items into component state
  this.state.description = document.getElementById('questionTextArea').value
  if (document.getElementById('flagReason3').checked) {
    this.state.reason = '3'  
  } else if (document.getElementById('flagReason2').checked) {
    this.state.reason = '2' 
  } else if (document.getElementById('flagReason1').checked) {
    this.state.reason = '1' 
  } else {
    this.state.reason = '0' 
  }

  var self = this;
  axios.post( Config.API + '/auth/flags/create', {
    parentType: '5',
    parentID: this.props.params.subcommentID,
    submitUser: cookie.load('userName'),
    // flagUser: this.props.creator,
    reason: this.state.reason,
    description : this.state.description,
  })
  .then(function (result) {
    document.location = '/project/'+ self.props.params.probID + '/comment' + self.props.params.commentID + '/subcomments'
  })
    .catch(function (error) {
      // console.log(error.response.data)
        $(document).ready(function() {
            $('#notification').attr('id','notificationShow').hide().slideDown();
            if (error.response.data != '') {
              $('#notificationContent').text(error.response.data);
            }
            else if (error.response.data == '[object Object]') {
              return (
                $(document).ready(function() {
                  $('#notificationLoginRegisterContainer').attr('id','notificationLoginRegisterContainerShow');
                  $('#notificationContent').html('Please <span id="blue">login </span>to contribute');
                })
              );
            } 
        });
    });

}
  



   render() {
    // PROPOSAL SUGGESTIONS
    if ((this.props.params.solutionID) && (this.state.comment.ParentType == '3')){
      return (
    
        <div id="flagContainer">
        <div>
        <div id="flagHeader">
          flag reasoning
        </div>
    
        <div id="projectFormRadioContainer">
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              misplaced
               {/* <span id="gray">(default)</span> */}
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason1" name="flagType" value="1"/>
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              inaccurate
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason2" name="flagType" value="2" />
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              bad culture
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason3" name="flagType" value="3" />
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
        </div>
    
        <form id="flagForm">
          <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
          autoFocus ></textarea>
          <br />
          <div onClick={this.flagComment} id="flagButton">submit</div>
          <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/suggestion/${this.props.params.suggID}/comments`}>
              <div id="returnButton">exit</div>
          </Link>
        </form>
        </div>
      </div>
    );
  // PROPOSAL ANSWERS
  } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '4')) {
  return (
    <div id="flagContainer">
    <div>
    <div id="flagHeader">
      flag reasoning
    </div>

    <div id="projectFormRadioContainer">
      <div id="projectFormRadioColumn">
        <div id="projectFormRadioRow3">
          misplaced
           {/* <span id="gray">(default)</span> */}
        </div>
        <div id="projectFormRadioRow">
          <label id="projectRadioButtonContainer">
            <input type="radio" id="flagReason1" name="flagType" value="1"/>
            <span id="checkmark3"></span>
          </label>
        </div>
      </div>
      <div id="projectFormRadioColumn">
        <div id="projectFormRadioRow3">
          inaccurate
        </div>
        <div id="projectFormRadioRow">
          <label id="projectRadioButtonContainer">
            <input type="radio" id="flagReason2" name="flagType" value="2" />
            <span id="checkmark3"></span>
          </label>
        </div>
      </div>
      <div id="projectFormRadioColumn">
        <div id="projectFormRadioRow3">
          bad culture
        </div>
        <div id="projectFormRadioRow">
          <label id="projectRadioButtonContainer">
            <input type="radio" id="flagReason3" name="flagType" value="3" />
            <span id="checkmark3"></span>
          </label>
        </div>
      </div>
    </div>

    <form id="flagForm">
      <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
      autoFocus ></textarea>
      <br />
      <div onClick={this.flagComment} id="flagButton">submit</div>
      <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/question/${this.props.params.questID}/answers/${this.props.params.answerID}/comments`}>
        <div id="returnButton">exit</div>
      </Link>
    </form>
    </div>
  </div>
      
      );
  // PROPOSAL COMMENTS
  } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '5')){
      return (

        <div id="flagContainer">
        <div>
        <div id="flagHeader">
          flag reasoning
        </div>

        <div id="projectFormRadioContainer">
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              misplaced
               {/* <span id="gray">(default)</span> */}
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason1" name="flagType" value="1"/>
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              inaccurate
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason2" name="flagType" value="2" />
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              bad culture
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason3" name="flagType" value="3" />
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
        </div>

        <form id="flagForm">
          <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
          autoFocus ></textarea>
          <br />
          <div onClick={this.flagComment} id="flagButton">submit</div>
          <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/comment/${this.props.params.commentID}/subcomments`}>
            <div id="returnButton">exit</div>
          </Link>
        </form>
        </div>
      </div>
);
  // PROPOSAL DEBATE
  } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '6')){
      return (

        <div id="flagContainer">
        <div>
        <div id="flagHeader">
          flag reasoning
        </div>

        <div id="projectFormRadioContainer">
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              misplaced
               {/* <span id="gray">(default)</span> */}
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason1" name="flagType" value="1"/>
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              inaccurate
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason2" name="flagType" value="2" />
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              bad culture
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason3" name="flagType" value="3" />
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
        </div>

        <form id="flagForm">
          <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
          autoFocus ></textarea>
          <br />
          <div onClick={this.flagComment} id="flagButton">submit</div>
          <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/debate/${this.props.params.freeFormID}/comments`}>
            <div id="returnButton">exit</div>
          </Link>
        </form>
        </div>
      </div>
);
  // PROPOSAL PROS
  } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '9')){
      return (

        <div id="flagContainer">
        <div>
        <div id="flagHeader">
          flag reasoning
        </div>

        <div id="projectFormRadioContainer">
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              misplaced
               {/* <span id="gray">(default)</span> */}
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason1" name="flagType" value="1"/>
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              inaccurate
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason2" name="flagType" value="2" />
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              bad culture
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason3" name="flagType" value="3" />
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
        </div>

        <form id="flagForm">
          <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
          autoFocus ></textarea>
          <br />
          <div onClick={this.flagComment} id="flagButton">submit</div>
          <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/pros/${this.props.params.proID}/comments`}>
            <div id="returnButton">exit</div>
          </Link>
        </form>
        </div>
      </div>  

);
  // PROPOSAL CONS
  } else if ((this.props.params.solutionID) && (this.state.comment.ParentType == '10')){
      return (

            <div id="flagContainer">
            <div>
            <div id="flagHeader">
              flag reasoning
            </div>
    
            <div id="projectFormRadioContainer">
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow3">
                  misplaced
                   {/* <span id="gray">(default)</span> */}
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="flagReason1" name="flagType" value="1"/>
                    <span id="checkmark3"></span>
                  </label>
                </div>
              </div>
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow3">
                  inaccurate
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="flagReason2" name="flagType" value="2" />
                    <span id="checkmark3"></span>
                  </label>
                </div>
              </div>
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow3">
                  bad culture
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="flagReason3" name="flagType" value="3" />
                    <span id="checkmark3"></span>
                  </label>
                </div>
              </div>
            </div>
    
            <form id="flagForm">
              <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
              autoFocus ></textarea>
              <br />
              <div onClick={this.flagComment} id="flagButton">submit</div>
              <Link to={`/project/${this.props.params.probID}/proposal/${this.props.params.solutionID}/cons/${this.props.params.conID}/comments`}>
                <div id="returnButton">exit</div>
              </Link>
            </form>
            </div>
          </div>  
            );
      // SUGGESTIONS
       } else if  (this.state.comment.ParentType == '3'){
          return (
            <div id="flagContainer">
            <div>
            <div id="flagHeader">
              flag reasoning
            </div>
    
            <div id="projectFormRadioContainer">
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow3">
                  misplaced
                   {/* <span id="gray">(default)</span> */}
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="flagReason1" name="flagType" value="1"/>
                    <span id="checkmark3"></span>
                  </label>
                </div>
              </div>
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow3">
                  inaccurate
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="flagReason2" name="flagType" value="2" />
                    <span id="checkmark3"></span>
                  </label>
                </div>
              </div>
              <div id="projectFormRadioColumn">
                <div id="projectFormRadioRow3">
                  bad culture
                </div>
                <div id="projectFormRadioRow">
                  <label id="projectRadioButtonContainer">
                    <input type="radio" id="flagReason3" name="flagType" value="3" />
                    <span id="checkmark3"></span>
                  </label>
                </div>
              </div>
            </div>
    
            <form id="flagForm">
              <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
              autoFocus ></textarea>
              <br />
              <div onClick={this.flagComment} id="flagButton">submit</div>
              <Link to={`/project/${this.props.params.probID}/suggestion/${this.props.params.suggID}/comments`}>
                <div id="returnButton">exit</div>
              </Link>
            </form>
            </div>
          </div>    
);
      // ANSWERS
      } else if (this.state.comment.ParentType == '4') {
      return (
        <div id="flagContainer">
        <div>
        <div id="flagHeader">
          flag reasoning
        </div>

        <div id="projectFormRadioContainer">
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              misplaced
               {/* <span id="gray">(default)</span> */}
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason1" name="flagType" value="1"/>
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              inaccurate
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason2" name="flagType" value="2" />
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
          <div id="projectFormRadioColumn">
            <div id="projectFormRadioRow3">
              bad culture
            </div>
            <div id="projectFormRadioRow">
              <label id="projectRadioButtonContainer">
                <input type="radio" id="flagReason3" name="flagType" value="3" />
                <span id="checkmark3"></span>
              </label>
            </div>
          </div>
        </div>

        <form id="flagForm">
          <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
          autoFocus ></textarea>
          <br />
          <div onClick={this.flagComment} id="flagButton">submit</div>
          <Link to={`/project/${this.props.params.probID}/question/${this.props.params.questID}/answers/${this.props.params.answerID}/comments`}>
            <div id="returnButton">exit</div>
          </Link>
        </form>
        </div>
      </div>            
            );
      // COMMENTS
      } else if (this.state.comment.ParentType == '5') {
          return (
              <div id="flagContainer">
              <div>
              <div id="flagHeader">
                flag reasoning
              </div>
    
              <div id="projectFormRadioContainer">
                <div id="projectFormRadioColumn">
                  <div id="projectFormRadioRow3">
                    misplaced
                     {/* <span id="gray">(default)</span> */}
                  </div>
                  <div id="projectFormRadioRow">
                    <label id="projectRadioButtonContainer">
                      <input type="radio" id="flagReason1" name="flagType" value="1"/>
                      <span id="checkmark3"></span>
                    </label>
                  </div>
                </div>
                <div id="projectFormRadioColumn">
                  <div id="projectFormRadioRow3">
                    inaccurate
                  </div>
                  <div id="projectFormRadioRow">
                    <label id="projectRadioButtonContainer">
                      <input type="radio" id="flagReason2" name="flagType" value="2" />
                      <span id="checkmark3"></span>
                    </label>
                  </div>
                </div>
                <div id="projectFormRadioColumn">
                  <div id="projectFormRadioRow3">
                    bad culture
                  </div>
                  <div id="projectFormRadioRow">
                    <label id="projectRadioButtonContainer">
                      <input type="radio" id="flagReason3" name="flagType" value="3" />
                      <span id="checkmark3"></span>
                    </label>
                  </div>
                </div>
              </div>
    
              <form id="flagForm">
                <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
                autoFocus ></textarea>
                <br />
                <div onClick={this.flagComment} id="flagButton">submit</div>
                <Link to={`/project/${this.props.params.probID}/comment/${this.props.params.commentID}/subcomments`}>
                  <div id="returnButton">exit</div>
                </Link>
              </form>
              </div>
            </div>            
          );
      // DEBATE
      } else if (this.state.comment.ParentType == '6') {
          return (
            <div id="flagContainer">
                <div>
                <div id="flagHeader">
                  flag reasoning
                </div>
      
                <div id="projectFormRadioContainer">
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      misplaced
                       {/* <span id="gray">(default)</span> */}
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason1" name="flagType" value="1"/>
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      inaccurate
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason2" name="flagType" value="2" />
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      bad culture
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason3" name="flagType" value="3" />
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                </div>
      
                <form id="flagForm">
                  <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
                  autoFocus ></textarea>
                  <br />
                  <div onClick={this.flagComment} id="flagButton">submit</div>
                  <Link to={`/project/${this.props.params.probID}/freeform/${this.props.params.freeFormID}/comments`}>
                    <div id="returnButton">exit</div>
                  </Link>
                </form>
                </div>
              </div>
            );
      // LESSONS
      } else if (this.state.comment.ParentType == '7') {
          return (
            <div id="flagContainer">
                <div>
                <div id="flagHeader">
                  flag reasoning
                </div>
      
                <div id="projectFormRadioContainer">
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      misplaced
                       {/* <span id="gray">(default)</span> */}
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason1" name="flagType" value="1"/>
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      inaccurate
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason2" name="flagType" value="2" />
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      bad culture
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason3" name="flagType" value="3" />
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                </div>
      
                <form id="flagForm">
                  <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
                  autoFocus ></textarea>
                  <br />
                  <div onClick={this.flagComment} id="flagButton">submit</div>
                  <Link to={`/project/${this.props.params.probID}/learn/content/${this.props.params.learnItemID}/comments`}>
                    <div id="returnButton">exit</div>
                  </Link>
                </form>
                </div>
              </div>
        );
      // RESOURCES
      } else if (this.state.comment.ParentType == '8'){
          return (
              <div id="flagContainer">
                <div>
                <div id="flagHeader">
                  flag reasoning
                </div>
      
                <div id="projectFormRadioContainer">
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      misplaced
                       {/* <span id="gray">(default)</span> */}
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason1" name="flagType" value="1"/>
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      inaccurate
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason2" name="flagType" value="2" />
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      bad culture
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason3" name="flagType" value="3" />
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                </div>
      
                <form id="flagForm">
                  <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
                  autoFocus ></textarea>
                  <br />
                  <div onClick={this.flagComment} id="flagButton">submit</div>
                  <Link to={`/project/${this.props.params.probID}/learn/resources/${this.props.params.resourceID}/comments`}>
                    <div id="returnButton">exit</div>
                  </Link>
                </form>
                </div>
              </div>
        );      } else if (this.state.comment.ParentType == '8'){
          return (
              <div id="flagContainer">
                <div>
                <div id="flagHeader">
                  flag reasoning
                </div>
      
                <div id="projectFormRadioContainer">
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      misplaced
                       {/* <span id="gray">(default)</span> */}
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason1" name="flagType" value="1"/>
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      inaccurate
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason2" name="flagType" value="2" />
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      bad culture
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason3" name="flagType" value="3" />
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                </div>
      
                <form id="flagForm">
                  <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
                  autoFocus ></textarea>
                  <br />
                  <div onClick={this.flagComment} id="flagButton">submit</div>
                  <Link to={`/project/${this.props.params.probID}/learn/resources/${this.props.params.resourceID}/comments`}>
                    <div id="returnButton">exit</div>
                  </Link>
                </form>
                </div>
              </div>
        );

          } else {
            return (
              <div id="flagContainer">
                <div>
                <div id="flagHeader">
                  flag reasoning
                </div>
      
                <div id="projectFormRadioContainer">
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      misplaced
                       {/* <span id="gray">(default)</span> */}
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason1" name="flagType" value="1"/>
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      inaccurate
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason2" name="flagType" value="2" />
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                  <div id="projectFormRadioColumn">
                    <div id="projectFormRadioRow3">
                      bad culture
                    </div>
                    <div id="projectFormRadioRow">
                      <label id="projectRadioButtonContainer">
                        <input type="radio" id="flagReason3" name="flagType" value="3" />
                        <span id="checkmark3"></span>
                      </label>
                    </div>
                  </div>
                </div>
      
                <form id="flagForm">
                  <textarea id="questionTextArea" name="questionText" placeholder="Why should this project be moved, altered or removed?" 
                  autoFocus ></textarea>
                  <br />
                  <div onClick={this.flagComment} id="flagButton">submit</div>
                  <Link to={`/project/${this.props.params.probID}/questions`}>
                    <div id="returnButton">exit</div>
                  </Link>
                </form>
                </div>
              </div>
              );
          }

      
   }
}
