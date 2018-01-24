import React from 'react';
import { Link  } from 'react-router';
import $ from 'jquery';



export default class ParentListContainer extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            parentList: [],
        }
        this.renderItem = this.renderItem.bind(this);  
        this.showParentListQuestion = this.showParentListQuestion.bind(this);
        this.hideParentListQuestion = this.hideParentListQuestion.bind(this);
        this.hideParentList = this.hideParentList.bind(this);
        
    };
    showParentListQuestion() {
        $(document).ready(function() {
            // $('#privateContainerMotto').html("ALTERNATE PARENTS").fadeIn(7500);
            $('#parentListExplain').attr('id','parentListExplainShow');
            $('#parentListQuestionImg').attr('id','parentListQuestionImgSelect');
        });
    }
    hideParentListQuestion() {
        $(document).ready(function() {
            // $('#privateContainerMottoBlue').html("PROJECT BREAKDOWN");
            $('#parentListExplainShow').attr('id','parentListExplain');
            $('#parentListQuestionImgSelect').attr('id','parentListQuestionImg');
        });
    }
    hideParentList() {
        $(document).ready(function() {
            $('#parentListContainerShow').attr('id','parentListContainer');
            $('#parentListImgHover').attr('id','parentListImg');
        });
    }

   render() {
      return (
            <div id="parentListContainer">
                <div id="parentListTitleContainer">
                    <img src={require('../../assets/redX.svg')} id="closeRedXLowOpacity" width="28" height="28" alt="Project Tree Button, white tree"  onClick={this.hideParentList} />
                    <div id="parentListTitle">
                        alternate parents
                    </div>
                </div>
                <div id="parentListUnitList">
                    {this.props.parentList.map(this.renderItem)}
                </div>
                <div id="parentListQuestion" onClick={this.showParentListQuestion}>
                    {/* <img src={require('../../assets/questionRed2.svg')} id="parentListQuestionImg" width="25" height="25" alt="Project Tree Button, white tree" /> */}
                    <div id="parentListQuestionImg">
                        . . .
                    </div>
                </div>
                <div id="parentListExplain" onClick={this.hideParentListQuestion}>
                    Existing projects can be linked to other projects as sub projects. 
                    <br />
                    A project may thus have multiple parents, shown here. 
                </div>
            </div>
      );
   }

   renderItem(parent) {
        return (
            <Link key={parent.ID} to={`/project/${parent.ID}/subprojects`} activeClassName="activeProblemFlagButton">
                <div id="parentListUnit">
                    {parent.Title}
                </div>  
            </Link>  
        );
    }
}