import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-104103231-1'); //Unique Google Analytics tracking number

//Load Components

import AnswerDeleteForm from './components/answers/AnswerDeleteForm.jsx';
import AnswerDeleteFormPrivate from './components/answers/AnswerDeleteFormPrivate.jsx';
import AnswerEditForm from './components/answers/AnswerEditForm.jsx';
import AnswerEditFormPrivate from './components/answers/AnswerEditFormPrivate.jsx';
import AnswerFlagForm from './components/answers/AnswerFlagForm.jsx';
import AnswerForm from './components/answers/AnswerForm.jsx';
import AnswerFormPrivate from './components/answers/AnswerFormPrivate.jsx';
// import ChatBoxContainer from './components/chatbox/ChatBoxContainer.jsx'
import CommentDeleteForm from './components/comments/CommentDeleteForm.jsx';
import CommentDeleteFormPrivate from './components/comments/CommentDeleteFormPrivate.jsx';
import CommentEditForm from './components/comments/CommentEditForm.jsx';
import CommentEditFormPrivate from './components/comments/CommentEditFormPrivate.jsx';
import CommentFlagForm from './components/comments/CommentFlagForm.jsx';
import CommentForm from './components/comments/CommentForm.jsx';
import CommentFormPrivate from './components/comments/CommentFormPrivate.jsx';
import ConsDeleteForm from './components/proscons/ConsDeleteForm.jsx';
import ConsDeleteFormPrivate from './components/proscons/ConsDeleteFormPrivate.jsx';
import ConsEditForm from './components/proscons/ConsEditForm.jsx';
import ConsEditFormPrivate from './components/proscons/ConsEditFormPrivate.jsx';
import ConsFlagForm from './components/proscons/ConsFlagForm.jsx';
import ConsForm from './components/proscons/ConsForm.jsx';
import ConsFormPrivate from './components/proscons/ConsFormPrivate.jsx';
import Empty from './components/Empty.jsx';
import Error404 from './components/Error404.jsx';
import FeedbackForm from './components/FeedbackForm.jsx';
import FreeFormDeleteForm from './components/freeform/FreeFormDeleteForm.jsx';
import FreeFormDeleteFormPrivate from './components/freeform/FreeFormDeleteFormPrivate.jsx';
import FreeFormEditForm from './components/freeform/FreeFormEditForm.jsx';
import FreeFormEditFormPrivate from './components/freeform/FreeFormEditFormPrivate.jsx';
import FreeFormFlagForm from './components/freeform/FreeFormFlagForm.jsx';
import FreeFormForm from './components/freeform/FreeFormForm.jsx';
import FreeFormFormPrivate from './components/freeform/FreeFormFormPrivate.jsx';
import FullPrivateProblem from './components/problems/FullPrivateProblem.jsx';
import FullProblem from './components/problems/FullProblem.jsx';
import FullSolution from './components/solutions/FullSolution.jsx';
import FullSolutionContent from './components/solutions/FullSolutionContent.jsx';
import FullSolutionContentPrivate from './components/solutions/FullSolutionContentPrivate.jsx';
import FullSolutionPrivate from './components/solutions/FullSolutionPrivate.jsx';
import FullTutorial from './components/tutorials/FullTutorial.jsx';
import FullVersion from './components/versions/FullVersion.jsx';
import Instructions from './components/tutorials/Instructions.jsx';
import Intro from './components/tutorials/Intro.jsx';
import Introduction from './components/Introduction.jsx';
import Layout from './components/Layout.jsx';
import LearnContentDeleteForm from './components/learn/LearnContentDeleteForm.jsx';
import LearnContentDeletePrivateForm from './components/learn/LearnContentDeletePrivateForm.jsx';
import LearnContentEditForm from './components/learn/LearnContentEditForm.jsx';
import LearnContentEditPrivateForm from './components/learn/LearnContentEditPrivateForm.jsx';
import LearnContentFlagForm from './components/learn/LearnContentFlagForm.jsx';
import LearnContentForm from './components/learn/LearnContentForm.jsx';
import LearnContentPrivateForm from './components/learn/LearnContentPrivateForm.jsx';
import LearnResourcesDeleteForm from './components/learn/LearnResourcesDeleteForm.jsx';
import LearnResourcesDeletePrivateForm from './components/learn/LearnResourcesDeletePrivateForm.jsx';
import LearnResourcesEditForm from './components/learn/LearnResourcesEditForm.jsx';
import LearnResourcesEditPrivateForm from './components/learn/LearnResourcesEditPrivateForm.jsx';
import LearnResourcesEmbed from './components/learn/LearnResourcesEmbed.jsx';
import LearnResourcesFlagForm from './components/learn/LearnResourcesFlagForm.jsx';
import LearnResourcesForm from './components/learn/LearnResourcesForm.jsx';
import LearnResourcesPrivateForm from './components/learn/LearnResourcesPrivateForm.jsx';
import Load from './components/Load.jsx';
import LoginUnit from './components/LoginUnit.jsx';
import PrivateProjectForm from './components/problems/PrivateProjectForm.jsx';
import PrivateSubProjectForm from './components/problems/PrivateSubProjectForm.jsx';
import ProblemForm from './components/problems/ProblemForm.jsx';
import ProblemFormProposal from './components/problems/ProblemFormProposal.jsx';
import ProblemFormProposalPrivate from './components/problems/ProblemFormProposalPrivate.jsx';
import ProblemDiscussMenu from './components/problems/ProblemDiscussMenu.jsx';
import ProblemDiscussPrivateMenu from './components/problems/ProblemDiscussPrivateMenu.jsx';
import ProblemLearnMenu from './components/problems/ProblemLearnMenu.jsx';
import ProblemLearnPrivateMenu from './components/problems/ProblemLearnPrivateMenu.jsx';
import ProblemLeftSB from './components/problems/ProblemLeftSB.jsx';
import ProblemSolutionsMenu from './components/problems/ProblemSolutionsMenu.jsx';
import ProblemTopSolutions from './components/problems/ProblemTopSolutions.jsx';
import ProjectEditForm from './components/problems/ProjectEditForm.jsx';
import ProjectEditPrivateForm from './components/problems/ProjectEditPrivateForm.jsx';
import ProjectFlagForm from './components/problems/ProjectFlagForm.jsx';
import ProfileAbout from './components/profile/ProfileAbout.jsx';
import ProfileCareers from './components/profile/ProfileCareers.jsx';
import ProfileDisclaimer from './components/profile/ProfileDisclaimer.jsx';
import ProfileNotifications from './components/profile/ProfileNotifications.jsx';
import ProfileProblemsSolutions from './components/profile/ProfileProblemsSolutions.jsx';
import ProfileResume from './components/profile/ProfileResume.jsx';
import ProfileSettings from './components/profile/ProfileSettings.jsx';
import ProfileWorkspace from './components/profile/ProfileWorkspace.jsx';
import ProposalDiscussMenu from './components/solutions/ProposalDiscussMenu.jsx';
import ProposalDiscussMenuPrivate from './components/solutions/ProposalDiscussMenuPrivate.jsx';
import ProposalLearnMenu from './components/solutions/ProposalLearnMenu.jsx';
import ProposalSubProjectsButton from './components/solutions/ProposalSubProjectsButton.jsx';
import ProposalSubProjectsButtonPrivate from './components/solutions/ProposalSubProjectsButtonPrivate.jsx';

import ProsDeleteForm from './components/proscons/ProsDeleteForm.jsx';
import ProsDeleteFormPrivate from './components/proscons/ProsDeleteFormPrivate.jsx';
import ProsEditForm from './components/proscons/ProsEditForm.jsx';
import ProsEditFormPrivate from './components/proscons/ProsEditFormPrivate.jsx';
import ProsFlagForm from './components/proscons/ProsFlagForm.jsx';
import ProsForm from './components/proscons/ProsForm.jsx';
import ProsFormPrivate from './components/proscons/ProsFormPrivate.jsx';
import QuestionDeleteForm from './components/questions/QuestionDeleteForm.jsx';
import QuestionDeleteFormPrivate from './components/questions/QuestionDeleteFormPrivate.jsx';
import QuestionEditForm from './components/questions/QuestionEditForm.jsx';
import QuestionEditFormPrivate from './components/questions/QuestionEditFormPrivate.jsx';
import QuestionFlagForm from './components/questions/QuestionFlagForm.jsx';
import QuestionForm from './components/questions/QuestionForm.jsx';
import QuestionFormPrivate from './components/questions/QuestionFormPrivate.jsx';
import Redirection from './components/Redirection.jsx';
import RegisterUnit from './components/RegisterUnit.jsx';
import SideBarProblem from './components/problems/SideBarProblem';
import SolutionDeleteForm from './components/solutions/SolutionDeleteForm.jsx';
import SolutionDeleteFormPrivate from './components/solutions/SolutionDeleteFormPrivate.jsx';
import SolutionEditForm from './components/solutions/SolutionEditForm.jsx';
import SolutionEditFormPrivate from './components/solutions/SolutionEditFormPrivate.jsx';
import SolutionForm from './components/solutions/SolutionForm.jsx';
import SuggestionDeleteForm from './components/suggestions/SuggestionDeleteForm.jsx';
import SuggestionDeleteFormPrivate from './components/suggestions/SuggestionDeleteFormPrivate.jsx';
import SuggestionEditForm from './components/suggestions/SuggestionEditForm.jsx';
import SuggestionEditFormPrivate from './components/suggestions/SuggestionEditFormPrivate.jsx';
import SuggestionFlagForm from './components/suggestions/SuggestionFlagForm.jsx';
import SuggestionForm from './components/suggestions/SuggestionForm.jsx';
import SuggestionFormPrivate from './components/suggestions/SuggestionFormPrivate.jsx';
import TrueEmpty from './components/TrueEmpty.jsx';
import TutorialWelcomeButton from './components/tutorials/TutorialWelcomeButton.jsx';
import TutorialWelcomeContent from './components/tutorials/TutorialWelcomeContent.jsx';
import TutorialWelcomePage from './components/tutorials/TutorialWelcomePage.jsx';
import VersionForm from './components/versions/VersionForm.jsx';
import WelcomeCreateButton from './components/welcome/WelcomeCreateButton.jsx';
import WelcomeCreateForm from './components/welcome/WelcomeCreateForm.jsx';


//Load Containers
import AnswerContainer from './containers/AnswerContainer.jsx';
import AnswerContainerPrivate from './containers/AnswerContainerPrivate.jsx';
import ConsContainer from './containers/ConsContainer.jsx';
import ConsContainerPrivate from './containers/ConsContainerPrivate.jsx';
import EntranceContainer from './containers/EntranceContainer.jsx';
import ErrorContainer from './containers/ErrorContainer.jsx';
import FreeFormContainer from './containers/FreeFormContainer.jsx';
import FreeFormContainerPrivate from './containers/FreeFormContainerPrivate.jsx';
import FreeFormCommentContainer from './containers/FreeFormCommentContainer.jsx';
import LearnContentContainer1 from './containers/LearnContentContainer1.jsx';
import LearnContentContainerPrivate from './containers/LearnContentContainerPrivate.jsx';
import LearnResourcesContainer1 from './containers/LearnResourcesContainer1.jsx';
import LearnResourcesContainerPrivate from './containers/LearnResourcesContainerPrivate.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import MindTempleContainer from './containers/MindTempleContainer.jsx';
import NewsFeedContainer from './containers/NewsFeedContainer.jsx';
import ProfileAboutContainer from './containers/ProfileAboutContainer.jsx';
import ProfileContainer from './containers/ProfileContainer.jsx';
import ProfileContainer2 from './containers/ProfileContainer2.jsx';
import ProjectRelatedParentsContainer from './containers/ProjectRelatedParentsContainer.jsx';
import ProsContainer from './containers/ProsContainer.jsx';
import ProsContainerPrivate from './containers/ProsContainerPrivate.jsx';
import QuestionContainer from './containers/QuestionContainer.jsx';
import QuestionContainerPrivate from './containers/QuestionContainerPrivate.jsx';
import RelatedProposalsContainer from './containers/RelatedProposalsContainer.jsx';
import SearchContainer from './containers/SearchContainer.jsx';
import ShortStoryContainer from './containers/ShortStoryContainer.jsx';
import SubProblemContainer from './containers/SubProblemContainer.jsx';
import SubProjectProposalContainer from './containers/SubProjectProposalContainer.jsx';
import SubProjectProposalPrivateContainer from './containers/SubProjectProposalPrivateContainer.jsx';
import SuggestionCommentContainer from './containers/SuggestionCommentContainer.jsx';
import SuggestionCommentContainerPrivate from './containers/SuggestionCommentContainerPrivate.jsx';
import SuggestionContainer from './containers/SuggestionContainer.jsx';
import SuggestionContainerPrivate from './containers/SuggestionContainerPrivate.jsx';
import VersionsContainer from './containers/VersionsContainer.jsx'
import WelcomeContainer from './containers/WelcomeContainer.jsx';
import WelcomeProjectsContainer from './containers/WelcomeProjectsContainer.jsx';

//Assets
import './assets/index.css';




// This may be needed for Google Analytics:
// One thing to note is we may need to adjust the 
// window.location argument we push to the ReactGA.pageview() function. 
// It will really depend how we have set up React Router.

// function fireTracking() {
//     ReactGA.pageview(window.location.hash);
// }



ReactDOM.render(
  // When we have Google Analytics working it should be:
  // <Router onUpdate={fireTracking} history={browserHistory}>
  <Router history={browserHistory}>
    <Route path='/' component={App}>
    <IndexRoute component={Intro}></IndexRoute>
    <Route path='/intro' component={Intro}></Route>
    <IndexRoute component={Intro}></IndexRoute>
    <Route path='/welcome/tutorial' component={TutorialWelcomePage}>
      <IndexRoute component={TutorialWelcomeButton}></IndexRoute>
      <Route path='/welcome/tutorial/hide' component={ProfileProblemsSolutions}></Route>
      <Route path='/welcome/tutorial/show' component={TutorialWelcomeContent}></Route>
    </Route>
    <Route path='/shortstory' component={ShortStoryContainer}></Route>
    <Route path='/error' component={ErrorContainer}>
      <IndexRoute component={Redirection}></IndexRoute>
      <Route path='/404' component={Error404}></Route>
      <Route path='/redirection' component={Redirection}></Route>
      <Route path='/load' component={Load}></Route>
    </Route>
    <Route path='/newsfeed' component={NewsFeedContainer}></Route>
    <Route path='/instructions' component={Instructions}></Route>
    <IndexRoute component={Layout}></IndexRoute>
    <Route path='/home' component={Layout}>
      <IndexRoute component={FullProblem}></IndexRoute>
      <Route path='/entrance' component={EntranceContainer}></Route>
      <Route path='/welcome/container' component={WelcomeContainer}>
        <Route path='/introduction' component={Introduction}></Route>
        <Route path='/demo' component={FullTutorial}></Route>
        <Route path='/welcome/container/project' component={WelcomeProjectsContainer}>
          <IndexRoute component={WelcomeCreateButton}></IndexRoute>
          <Route path='/welcomecreate' component={WelcomeCreateButton}>
            {/* <IndexRoute component={ChatBoxContainer}></IndexRoute> */}
            {/* <Route path='/chatbox' component={ChatBoxContainer}/> */}
            <Route path='/welcome' component={TrueEmpty}/>
          </Route>
          <Route path='/welcome/create' component={WelcomeCreateForm}></Route>
        </Route>
      </Route>
      <Route path='/search' component={SearchContainer}></Route>
      <Route path='/logincontainer' component={LoginContainer}>
        <IndexRoute component={LoginContainer}></IndexRoute>
        <Route path='/login' component={LoginUnit}></Route>
        <Route path='/register' component={RegisterUnit}></Route>
      </Route>
      <Route path='/mindtemple/container' component={MindTempleContainer}>
        <IndexRoute component={TrueEmpty}></IndexRoute>
        <Route path='/mindtemple' component={TrueEmpty}></Route>
        <Route path='/mindtemple/create' component={PrivateProjectForm}></Route>
      </Route>
      <Route path='/profile/container' component={ProfileContainer}>
        <IndexRoute component={ProfileProblemsSolutions}></IndexRoute>
        <Route path='/profile' component={ProfileProblemsSolutions}></Route>
        <Route path='/profile/resume' component={ProfileResume}></Route>
        <Route path='/profile/feedback' component={FeedbackForm}></Route>
        <Route path='/profile/notifications' component={ProfileNotifications}></Route>
        <Route path='/profile/about/container' component={ProfileAboutContainer}>
          <IndexRoute component={ProfileAbout}></IndexRoute>
          <Route path='/profile/about' component={ProfileAbout}></Route>
          <Route path='/profile/careers' component={ProfileCareers}></Route>
          <Route path='/profile/disclaimer' component={ProfileDisclaimer}></Route>
        </Route>
        <Route path='/profile/settings' component={ProfileSettings}></Route>
        <Route path='/profile/workspace' component={ProfileWorkspace}></Route>
      </Route>
      <Route path='/project/private/:probID' component={FullPrivateProblem}>
        <IndexRoute component={SideBarProblem}></IndexRoute>
        <Route path='/project/private/:probID/sideBar' component={SideBarProblem}>
          <IndexRoute component={Empty}></IndexRoute>
          <Route path='/project/private/:probID/create' component={PrivateSubProjectForm}></Route>
          <Route path='/project/private/:probID/edit' component={ProjectEditPrivateForm}></Route>
          <Route path='/project/private/:probID/flag' component={ProjectFlagForm}></Route>
          <Route path='/project/private/:probID/subprojects' component={Empty}></Route>
        </Route>
        <Route path='/project/private/:probID/solutions' component={ProblemSolutionsMenu}>
          <IndexRoute component={ProblemTopSolutions}></IndexRoute>
          <Route path='/project/private/:probID/solutions/create' component={SolutionForm}></Route>
        </Route>
        <Route path='/project/private/:probID/proposal/:solutionID/container' component={FullSolutionPrivate}>
            <IndexRoute component={FullSolutionContent}></IndexRoute>
            <Route path='/project/private/:probID/proposal/:solutionID/content/container' component={FullSolutionContentPrivate}>
            <Route path='/project/private/:probID/proposal/:solutionID' component={ProposalSubProjectsButtonPrivate}></Route>
            <Route path='/proposal/private/:probID/:solutionID/delete' component={SolutionDeleteFormPrivate}></Route>
            <Route path='/proposal/private/:probID/:solutionID/edit' component={SolutionEditFormPrivate}></Route>
            <Route path='/project/private/:probID/proposal/:solutionID/subprojects' component={SubProjectProposalPrivateContainer}></Route>
            <Route path='/project/private/:probID/proposal/:solutionID/subprojects/create' component={ProblemFormProposalPrivate}></Route>
            <Route path='/project/private/:probID/proposal/:solutionID/related' component={RelatedProposalsContainer}></Route>
            <Route path='/project/private/:probID/proposal/:solutionID/discuss' component={ProposalDiscussMenuPrivate}>
              <IndexRoute component={QuestionContainer}></IndexRoute>
              <Route path='/project/private/:probID/proposal/:solutionID/question/container' component={QuestionContainerPrivate}>
                <IndexRoute component={QuestionForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/questions' component={QuestionFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/question/:questID/edit' component={QuestionEditFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/question/:questID/flag' component={QuestionFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/question/:questID/delete' component={QuestionDeleteFormPrivate}></Route>
              </Route>
              <Route path='/project/private/:probID/proposal/:solutionID/question/:questID/answers/container' component={AnswerContainerPrivate}>
                <IndexRoute component={AnswerForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/question/:questID/answers' component={AnswerFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/question/:questID/answer/:answerID/edit' component={AnswerEditFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/question/:questID/answer/:answerID/flag' component={AnswerFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/question/:questID/answer/:answerID/delete' component={AnswerDeleteFormPrivate}></Route>
              </Route>
              <Route path='/project/private/:probID/proposal/:solutionID/suggestion/container' component={SuggestionContainerPrivate}>
                <IndexRoute component={SuggestionForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestions' component={SuggestionFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestion/:suggID/edit' component={SuggestionEditFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestion/:suggID/flag' component={SuggestionFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestion/:suggID/delete' component={SuggestionDeleteFormPrivate}></Route>
              </Route>
              <Route path='/project/private/:probID/suggestion/:suggID/container' component={SuggestionCommentContainerPrivate}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestion/:suggID/comments' component={CommentFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestion/:suggID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestion/:suggID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestion/:suggID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
              </Route>
              <Route path='/project/private/:probID/debates/container' component={FreeFormContainerPrivate}>
                <IndexRoute component={FreeFormForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/debates' component={FreeFormFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/debate/:freeFormID/edit' component={FreeFormEditFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/debate/:freeFormID/flag' component={FreeFormFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/debate/:freeFormID/delete' component={FreeFormDeleteFormPrivate}></Route>
              </Route>
            </Route>
            <Route path='/project/private/:probID/proposal/:solutionID/learn' component={ProposalLearnMenu}>
              <Route path='/project/private/:probID/proposal/:solutionID/learn/content/full' component={LearnContentContainer1}>
                <IndexRoute component={LearnContentForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content' component={LearnContentForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content/:learnItemID/edit' component={LearnContentEditForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content/:learnItemID/flag' component={LearnContentFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content/:learnItemID/delete' component={LearnContentDeleteForm}></Route>
              </Route>
              <Route path='/project/private/:probID/learn/resources/full' component={LearnResourcesContainer1}>
                <IndexRoute component={LearnResourcesForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources' component={LearnResourcesForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/edit' component={LearnResourcesEditForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/flag' component={LearnResourcesFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/delete' component={LearnResourcesDeleteForm}></Route>  
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/embed' component={LearnResourcesEmbed}></Route>            
              </Route>
            </Route>
            <Route path='/proposal/private/:probID/:solutionID/pros' component={ProsContainerPrivate}>
              <IndexRoute component={ProsFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/:solutionID/pros/pros' component={ProsFormPrivate}></Route>
              <Route path='/project/private/:probID/:solutionID/pros/:proID/edit' component={ProsEditFormPrivate}></Route>
              <Route path='/project/private/:probID/:solutionID/pros/:proID/flag' component={ProsFlagForm}></Route>
              <Route path='/project/private/:probID/:solutionID/pros/:proID/delete' component={ProsDeleteFormPrivate}></Route>
            </Route>
            <Route path='/project/private/:probID/suggestion/:suggID/container' component={SuggestionCommentContainer}>
              <IndexRoute component={CommentFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/proposal/:solutionID/pros/:proID/comments' component={CommentFormPrivate}></Route>
              <Route path='/project/private/:probID/proposal/:solutionID/pros/:proID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
              <Route path='/project/private/:probID/proposal/:solutionID/pros/:proID/comment/:commentID/flag' component={CommentFlagForm}></Route>
              <Route path='/project/private/:probID/proposal/:solutionID/pros/:proID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
            </Route>
            <Route path='/proposal/private/:probID/:solutionID/cons' component={ConsContainerPrivate}>
              <IndexRoute component={ConsFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/:solutionID/cons' component={ConsFormPrivate}></Route>
              <Route path='/project/private/:probID/:solutionID/cons/:conID/edit' component={ConsEditFormPrivate}></Route>
              <Route path='/project/private/:probID/:solutionID/cons/:conID/flag' component={ConsFlagForm}></Route>
              <Route path='/project/private/:probID/:solutionID/cons/:conID/delete' component={ConsDeleteFormPrivate}></Route>
            </Route>                
          </Route>
          <Route path='/proposal/private/:probID/:solutionID/versions' component={VersionsContainer}></Route>
          <Route path='/proposal/private/:probID/:solutionID/fullversion' component={FullVersion}></Route>
          <Route path='/proposal/private/:probID/:solutionID/versionform' component={VersionForm}></Route>
        </Route>
        <Route path='/project/private/:probID/discuss' component={ProblemDiscussPrivateMenu}>
            <IndexRoute component={QuestionContainerPrivate}></IndexRoute>
            <Route path='/project/private/:probID/questions/container' component={QuestionContainerPrivate}>
              <IndexRoute component={QuestionFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/questions' component={QuestionFormPrivate}></Route>
              <Route path='/project/private/:probID/question/:questID/edit' component={QuestionEditFormPrivate}></Route>
              <Route path='/project/private/:probID/question/:questID/flag' component={QuestionFlagForm}></Route>
              <Route path='/project/private/:probID/question/:questID/delete' component={QuestionDeleteFormPrivate}></Route>
            </Route> 
            <Route path='/project/:probID/question/:questID/answers/container' component={AnswerContainerPrivate}>
              <IndexRoute component={AnswerFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/question/:questID/answers' component={AnswerFormPrivate}></Route>
              <Route path='/project/private/:probID/question/:questID/answer/:answerID/edit' component={AnswerEditFormPrivate}></Route>
              <Route path='/project/private/:probID/question/:questID/answer/:answerID/flag' component={AnswerFlagForm}></Route>
              <Route path='/project/private/:probID/question/:questID/answer/:answerID/delete' component={AnswerDeleteFormPrivate}></Route>
            </Route>
            <Route path='/project/:probID/suggestions/container' component={SuggestionContainerPrivate}>
              <IndexRoute component={SuggestionFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/suggestions' component={SuggestionFormPrivate}></Route>
              <Route path='/project/private/:probID/suggestion/:suggID/edit' component={SuggestionEditFormPrivate}></Route>
              <Route path='/project/private/:probID/suggestion/:suggID/flag' component={SuggestionFlagForm}></Route>
              <Route path='/project/private/:probID/suggestion/:suggID/delete' component={SuggestionDeleteFormPrivate}></Route>
            </Route>
            <Route path='/project/private/:probID/suggestion/:suggID/container' component={SuggestionCommentContainerPrivate}>
              <IndexRoute component={CommentFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/suggestion/:suggID/comments' component={CommentFormPrivate}></Route>
              <Route path='/project/private/:probID/suggestion/:suggID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
              <Route path='/project/private/:probID/suggestion/:suggID/comment/:commentID/flag' component={CommentFlagForm}></Route>
              <Route path='/project/private/:probID/suggestion/:suggID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
            </Route>
            <Route path='/project/private/:probID/freeforms/container' component={FreeFormContainerPrivate}>
              <IndexRoute component={FreeFormFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/open' component={FreeFormFormPrivate}></Route>
              <Route path='/project/private/:probID/open/:freeFormID/edit' component={FreeFormEditFormPrivate}></Route>
              <Route path='/project/private/:probID/open/:freeFormID/flag' component={FreeFormFlagForm}></Route>
              <Route path='/project/private/:probID/open/:freeFormID/delete' component={FreeFormDeleteFormPrivate}></Route>
            </Route>
            <Route path='/project/private/:probID/freeform/:freeID/comments' component={FreeFormCommentContainer}></Route>
        </Route>
          {/*<IndexRoute component={ProblemLearnMenu}></IndexRoute>*/}
        <Route path='/project/private/:probID/learn' component={ProblemLearnPrivateMenu}>
              <Route path='/project/private/:probID/learn/content/full' component={LearnContentContainerPrivate}>
                <IndexRoute component={LearnContentPrivateForm}></IndexRoute>
                <Route path='/project/private/:probID/notes' component={LearnContentPrivateForm}></Route>
                <Route path='/project/private/:probID/notes/:learnItemID/edit' component={LearnContentEditPrivateForm}></Route>
                <Route path='/project/private/:probID/notes/:learnItemID/flag' component={LearnContentFlagForm}></Route>
                <Route path='/project/private/:probID/notes/:learnItemID/delete' component={LearnContentDeletePrivateForm}></Route>
             </Route>
              <Route path='/project/private/:probID/learn/resources/full' component={LearnResourcesContainerPrivate}>
                <IndexRoute component={LearnResourcesPrivateForm}></IndexRoute>
                <Route path='/project/private/:probID/resources' component={LearnResourcesPrivateForm}></Route>
                <Route path='/project/private/:probID/resources/:resourceID/edit' component={LearnResourcesEditPrivateForm}></Route>
                <Route path='/project/private/:probID/resources/:resourceID/flag' component={LearnResourcesFlagForm}></Route>
                <Route path='/project/private/:probID/resources/:resourceID/delete' component={LearnResourcesDeletePrivateForm}></Route>  
                <Route path='/project/private/:probID/resources/:resourceID/embed' component={LearnResourcesEmbed}></Route>            
              </Route>
        </Route>
      </Route>
      <Route path='/project/:probID' component={FullProblem}>
        <IndexRoute component={SideBarProblem}></IndexRoute>
        <Route path='/project/:probID/sideBar' component={SideBarProblem}>
          <IndexRoute component={Empty}></IndexRoute>
          <Route path='/project/:probID/create' component={ProblemForm}></Route>
          <Route path='/project/:probID/edit' component={ProjectEditForm}></Route>
          <Route path='/project/:probID/flag' component={ProjectFlagForm}></Route>
          <Route path='/project/:probID/subprojects' component={Empty}></Route>
        </Route>
        <Route path='/project/:probID/solutions' component={ProblemSolutionsMenu}>
          <IndexRoute component={ProblemTopSolutions}></IndexRoute>
          <Route path='/project/:probID/solutions/create' component={SolutionForm}></Route>
        </Route>
        <Route path='/project/:probID/proposal/:solutionID/container' component={FullSolution}>
            <IndexRoute component={FullSolutionContent}></IndexRoute>
            <Route path='/project/:probID/proposal/:solutionID/content/container' component={FullSolutionContent}>
            <Route path='/project/:probID/proposal/:solutionID' component={ProposalSubProjectsButton}></Route>
            <Route path='/proposal/:probID/:solutionID/delete' component={SolutionDeleteForm}></Route>
            <Route path='/proposal/:probID/:solutionID/edit' component={SolutionEditForm}></Route>
            <Route path='/project/:probID/proposal/:solutionID/subprojects' component={SubProjectProposalContainer}></Route>
            <Route path='/project/:probID/proposal/:solutionID/subprojects/create' component={ProblemFormProposal}></Route>
            <Route path='/project/:probID/proposal/:solutionID/related' component={RelatedProposalsContainer}></Route>
            <Route path='/project/:probID/proposal/:solutionID/discuss' component={ProposalDiscussMenu}>
              <IndexRoute component={QuestionContainer}></IndexRoute>
              <Route path='/project/:probID/proposal/:solutionID/question/container' component={QuestionContainer}>
                <IndexRoute component={QuestionForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/questions' component={QuestionForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/question/:questID/edit' component={QuestionEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/question/:questID/flag' component={QuestionFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/question/:questID/delete' component={QuestionDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/proposal/:solutionID/question/:questID/answers/container' component={AnswerContainer}>
                <IndexRoute component={AnswerForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/question/:questID/answers' component={AnswerForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/question/:questID/answer/:answerID/edit' component={AnswerEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/question/:questID/answer/:answerID/flag' component={AnswerFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/question/:questID/answer/:answerID/delete' component={AnswerDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/proposal/:solutionID/suggestion/container' component={SuggestionContainer}>
                <IndexRoute component={SuggestionForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/suggestions' component={SuggestionForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/edit' component={SuggestionEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/flag' component={SuggestionFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/delete' component={SuggestionDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/suggestion/:suggID/container' component={SuggestionCommentContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/comments' component={CommentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/comment/:commentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/debates/container' component={FreeFormContainer}>
                <IndexRoute component={FreeFormForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/debates' component={FreeFormForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/debate/:freeFormID/edit' component={FreeFormEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/debate/:freeFormID/flag' component={FreeFormFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/debate/:freeFormID/delete' component={FreeFormDeleteForm}></Route>
              </Route>
            </Route>
            <Route path='/project/:probID/proposal/:solutionID/learn' component={ProposalLearnMenu}>
              <Route path='/project/:probID/proposal/:solutionID/learn/content/full' component={LearnContentContainerPrivate}>
                <IndexRoute component={LearnContentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/learn/content' component={LearnContentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/content/:learnItemID/edit' component={LearnContentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/content/:learnItemID/flag' component={LearnContentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/content/:learnItemID/delete' component={LearnContentDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/learn/resources/full' component={LearnResourcesContainerPrivate}>
                <IndexRoute component={LearnResourcesForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/learn/resources' component={LearnResourcesForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/resources/:resourceID/edit' component={LearnResourcesEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/resources/:resourceID/flag' component={LearnResourcesFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/resources/:resourceID/delete' component={LearnResourcesDeleteForm}></Route>  
                <Route path='/project/:probID/proposal/:solutionID/learn/resources/:resourceID/embed' component={LearnResourcesEmbed}></Route>            
              </Route>
            </Route>

              <Route path='/proposal/:probID/:solutionID/pros' component={ProsContainer}>
                <IndexRoute component={ProsForm}></IndexRoute>
                <Route path='/project/:probID/:solutionID/pros/pros' component={ProsForm}></Route>
                <Route path='/project/:probID/:solutionID/pros/:proID/edit' component={ProsEditForm}></Route>
                <Route path='/project/:probID/:solutionID/pros/:proID/flag' component={ProsFlagForm}></Route>
                <Route path='/project/:probID/:solutionID/pros/:proID/delete' component={ProsDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/suggestion/:suggID/container' component={SuggestionCommentContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/pros/:proID/comments' component={CommentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/pros/:proID/comment/:commentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/pros/:proID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/pros/:proID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
              </Route>
              <Route path='/proposal/:probID/:solutionID/cons' component={ConsContainer}>
                <IndexRoute component={ConsForm}></IndexRoute>
                <Route path='/project/:probID/:solutionID/cons' component={ConsForm}></Route>
                <Route path='/project/:probID/:solutionID/cons/:conID/edit' component={ConsEditForm}></Route>
                <Route path='/project/:probID/:solutionID/cons/:conID/flag' component={ConsFlagForm}></Route>
                <Route path='/project/:probID/:solutionID/cons/:conID/delete' component={ConsDeleteForm}></Route>
              </Route>                
            </Route>
            <Route path='/proposal/:probID/:solutionID/versions' component={VersionsContainer}></Route>
            <Route path='/proposal/:probID/:solutionID/fullversion' component={FullVersion}></Route>
            <Route path='/proposal/:probID/:solutionID/versionform' component={VersionForm}></Route>
        </Route>
        <Route path='/project/:probID/discuss' component={ProblemDiscussMenu}>
            <IndexRoute component={QuestionContainer}></IndexRoute>
            <Route path='/project/:probID/questions/container' component={QuestionContainer}>
              <IndexRoute component={QuestionForm}></IndexRoute>
              <Route path='/project/:probID/questions' component={QuestionForm}></Route>
              <Route path='/project/:probID/question/:questID/edit' component={QuestionEditForm}></Route>
              <Route path='/project/:probID/question/:questID/flag' component={QuestionFlagForm}></Route>
              <Route path='/project/:probID/question/:questID/delete' component={QuestionDeleteForm}></Route>
            </Route> 
            <Route path='/project/:probID/question/:questID/answers/container' component={AnswerContainer}>
              <IndexRoute component={AnswerForm}></IndexRoute>
              <Route path='/project/:probID/question/:questID/answers' component={AnswerForm}></Route>
              <Route path='/project/:probID/question/:questID/answer/:answerID/edit' component={AnswerEditForm}></Route>
              <Route path='/project/:probID/question/:questID/answer/:answerID/flag' component={AnswerFlagForm}></Route>
              <Route path='/project/:probID/question/:questID/answer/:answerID/delete' component={AnswerDeleteForm}></Route>
            </Route>
            <Route path='/project/:probID/suggestions/container' component={SuggestionContainer}>
              <IndexRoute component={SuggestionForm}></IndexRoute>
              <Route path='/project/:probID/suggestions' component={SuggestionForm}></Route>
              <Route path='/project/:probID/suggestion/:suggID/edit' component={SuggestionEditForm}></Route>
              <Route path='/project/:probID/suggestion/:suggID/flag' component={SuggestionFlagForm}></Route>
              <Route path='/project/:probID/suggestion/:suggID/delete' component={SuggestionDeleteForm}></Route>
            </Route>
            <Route path='/project/:probID/suggestion/:suggID/container' component={SuggestionCommentContainer}>
              <IndexRoute component={CommentForm}></IndexRoute>
              <Route path='/project/:probID/suggestion/:suggID/comments' component={CommentForm}></Route>
              <Route path='/project/:probID/suggestion/:suggID/comment/:commentID/edit' component={CommentEditForm}></Route>
              <Route path='/project/:probID/suggestion/:suggID/comment/:commentID/flag' component={CommentFlagForm}></Route>
              <Route path='/project/:probID/suggestion/:suggID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
            </Route>
            <Route path='/project/:probID/freeforms/container' component={FreeFormContainer}>
              <IndexRoute component={FreeFormForm}></IndexRoute>
              <Route path='/project/:probID/freeforms' component={FreeFormForm}></Route>
              <Route path='/project/:probID/freeform/:freeFormID/edit' component={FreeFormEditForm}></Route>
              <Route path='/project/:probID/freeform/:freeFormID/flag' component={FreeFormFlagForm}></Route>
              <Route path='/project/:probID/freeform/:freeFormID/delete' component={FreeFormDeleteForm}></Route>
            </Route>
            <Route path='/project/:probID/freeform/:freeID/comments' component={FreeFormCommentContainer}></Route>
        </Route>
          {/*<IndexRoute component={ProblemLearnMenu}></IndexRoute>*/}
        <Route path='/project/:probID/learn' component={ProblemLearnMenu}>
              <Route path='/project/:probID/learn/content/full' component={LearnContentContainer1}>
                <IndexRoute component={LearnContentForm}></IndexRoute>
                <Route path='/project/:probID/learn/content' component={LearnContentForm}></Route>
                <Route path='/project/:probID/learn/content/:learnItemID/edit' component={LearnContentEditForm}></Route>
                <Route path='/project/:probID/learn/content/:learnItemID/flag' component={LearnContentFlagForm}></Route>
                <Route path='/project/:probID/learn/content/:learnItemID/delete' component={LearnContentDeleteForm}></Route>
             </Route>
              <Route path='/project/:probID/learn/resources/full' component={LearnResourcesContainer1}>
                <IndexRoute component={LearnResourcesForm}></IndexRoute>
                <Route path='/project/:probID/learn/resources' component={LearnResourcesForm}></Route>
                <Route path='/project/:probID/learn/resources/:resourceID/edit' component={LearnResourcesEditForm}></Route>
                <Route path='/project/:probID/learn/resources/:resourceID/flag' component={LearnResourcesFlagForm}></Route>
                <Route path='/project/:probID/learn/resources/:resourceID/delete' component={LearnResourcesDeleteForm}></Route>  
                <Route path='/project/:probID/learn/resources/:resourceID/embed' component={LearnResourcesEmbed}></Route>            
              </Route>
        </Route>
        <Route path='/project/:probID/related' component={ProjectRelatedParentsContainer}></Route>
        <IndexRoute component={ProblemLeftSB}></IndexRoute>
          <Route path='/project/:probID/sb' component={ProblemLeftSB}>
            <IndexRoute component={ProblemSolutionsMenu}></IndexRoute>
            </Route>
            <IndexRoute component={ProblemDiscussMenu}></IndexRoute>
          </Route>
        
        </Route>
      </Route>
    {/*<Redirect from='*' to='/404' />*/}
    <Route path='*' component={Error404}/>
  </Router>,
  document.getElementById('root')
);
