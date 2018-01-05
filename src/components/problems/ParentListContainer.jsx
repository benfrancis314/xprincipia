import React from 'react';
import { Link  } from 'react-router';
import $ from 'jquery';



export default class Empty extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
        }
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
                    <div id="parentListUnit">
                        ecological measurements against climate change
                    </div>
                    <div id="parentListUnit">
                        wildlife conservation studies
                    </div>
                    <div id="parentListUnit">
                        parent title 1
                    </div>
                </div>
                <div id="parentListQuestion" onClick={this.showParentListQuestion}>
                    {/* On click, make text below visible */}
                    <img src={require('../../assets/tutorial.svg')} id="parentListQuestionImg" width="25" height="25" alt="Project Tree Button, white tree" />
                </div>
                <div id="parentListExplain" onClick={this.hideParentListQuestion}>
                    Existing projects can be linked to other projects as sub projects. 
                    <br />
                    A project may thus have multiple parents, shown here. 
                </div>
            </div>
      );
   }
}