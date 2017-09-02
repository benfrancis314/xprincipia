import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-104103231-1'); //Unique Google Analytics tracking number

//Load Components

import AnswerDeleteForm from './components/answers/AnswerDeleteForm.jsx';
import AnswerEditForm from './components/answers/AnswerEditForm.jsx';
import AnswerFlagForm from './components/answers/AnswerFlagForm.jsx';
import AnswerForm from './components/answers/AnswerForm.jsx';
import ChatBoxContainer from './components/chatbox/ChatBoxContainer.jsx'
import CommentDeleteForm from './components/comments/CommentDeleteForm.jsx';
import CommentEditForm from './components/comments/CommentEditForm.jsx';
import CommentFlagForm from './components/comments/CommentFlagForm.jsx';
import CommentForm from './components/comments/CommentForm.jsx';
import ConsDeleteForm from './components/proscons/ConsDeleteForm.jsx';
import ConsEditForm from './components/proscons/ConsEditForm.jsx';
import ConsFlagForm from './components/proscons/ConsFlagForm.jsx';
import ConsForm from './components/proscons/ConsForm.jsx';
import Empty from './components/Empty.jsx';
import Error404 from './components/Error404.jsx';
import FeedbackForm from './components/FeedbackForm.jsx';
import FreeFormDeleteForm from './components/freeform/FreeFormDeleteForm.jsx';
import FreeFormEditForm from './components/freeform/FreeFormEditForm.jsx';
import FreeFormFlagForm from './components/freeform/FreeFormFlagForm.jsx';
import FreeFormForm from './components/freeform/FreeFormForm.jsx';
import FullProblem from './components/problems/FullProblem.jsx';
import FullSolution from './components/solutions/FullSolution.jsx';
import FullSolutionContent from './components/solutions/FullSolutionContent.jsx';
import FullTutorial from './components/tutorials/FullTutorial.jsx';
import FullVersion from './components/versions/FullVersion.jsx';
import Instructions from './components/tutorials/Instructions.jsx';
import Intro from './components/tutorials/Intro.jsx';
import Introduction from './components/Introduction.jsx';
import Layout from './components/Layout.jsx';
import LearnContentDeleteForm from './components/learn/LearnContentDeleteForm.jsx';
import LearnContentEditForm from './components/learn/LearnContentEditForm.jsx';
import LearnContentFlagForm from './components/learn/LearnContentFlagForm.jsx';
import LearnContentForm from './components/learn/LearnContentForm.jsx';
import LearnResourcesDeleteForm from './components/learn/LearnResourcesDeleteForm.jsx';
import LearnResourcesEditForm from './components/learn/LearnResourcesEditForm.jsx';
import LearnResourcesEmbed from './components/learn/LearnResourcesEmbed.jsx';
import LearnResourcesFlagForm from './components/learn/LearnResourcesFlagForm.jsx';
import LearnResourcesForm from './components/learn/LearnResourcesForm.jsx';
import LoginUnit from './components/LoginUnit.jsx';
import ProblemForm from './components/problems/ProblemForm.jsx';
import ProblemDiscussMenu from './components/problems/ProblemDiscussMenu.jsx';
import ProblemLearnMenu from './components/problems/ProblemLearnMenu.jsx';
import ProblemLeftSB from './components/problems/ProblemLeftSB.jsx';
import ProblemSolutionsMenu from './components/problems/ProblemSolutionsMenu.jsx';
import ProblemTopSolutions from './components/problems/ProblemTopSolutions.jsx';
import ProjectEditForm from './components/problems/ProjectEditForm.jsx';
import ProjectFlagForm from './components/problems/ProjectFlagForm.jsx';
import ProfileAbout from './components/profile/ProfileAbout.jsx';
import ProfileCareers from './components/profile/ProfileCareers.jsx';
import ProfileDisclaimer from './components/profile/ProfileDisclaimer.jsx';
import ProfileNotifications from './components/profile/ProfileNotifications.jsx';
import ProfileProblemsSolutions from './components/profile/ProfileProblemsSolutions.jsx';
import ProfileResume from './components/profile/ProfileResume.jsx';
import ProfileSettings from './components/profile/ProfileSettings.jsx';
import ProfileWorkspace from './components/profile/ProfileWorkspace.jsx';
import ProsDeleteForm from './components/proscons/ProsDeleteForm.jsx';
import ProsEditForm from './components/proscons/ProsEditForm.jsx';
import ProsFlagForm from './components/proscons/ProsFlagForm.jsx';
import ProsForm from './components/proscons/ProsForm.jsx';
import QuestionDeleteForm from './components/questions/QuestionDeleteForm.jsx';
import QuestionEditForm from './components/questions/QuestionEditForm.jsx';
import QuestionFlagForm from './components/questions/QuestionFlagForm.jsx';
import QuestionForm from './components/questions/QuestionForm.jsx';
import Redirection from './components/Redirection.jsx';
import RegisterUnit from './components/RegisterUnit.jsx';
import SideBarProblem from './components/problems/SideBarProblem';
import SolutionDeleteForm from './components/solutions/SolutionDeleteForm.jsx';
import SolutionEditForm from './components/solutions/SolutionEditForm.jsx';
import SolutionForm from './components/solutions/SolutionForm.jsx';
import SuggestionDeleteForm from './components/suggestions/SuggestionDeleteForm.jsx';
import SuggestionEditForm from './components/suggestions/SuggestionEditForm.jsx';
import SuggestionFlagForm from './components/suggestions/SuggestionFlagForm.jsx';
import SuggestionForm from './components/suggestions/SuggestionForm.jsx';
import TrueEmpty from './components/TrueEmpty.jsx';
import TutorialWelcomeButton from './components/tutorials/TutorialWelcomeButton.jsx';
import TutorialWelcomeContent from './components/tutorials/TutorialWelcomeContent.jsx';
import TutorialWelcomePage from './components/tutorials/TutorialWelcomePage.jsx';
import VersionForm from './components/versions/VersionForm.jsx';
import WelcomeCreateButton from './components/welcome/WelcomeCreateButton.jsx';
import WelcomeCreateForm from './components/welcome/WelcomeCreateForm.jsx';


//Load Containers
import AnswerContainer from './containers/AnswerContainer.jsx';
import ConsContainer from './containers/ConsContainer.jsx';
import EntranceContainer from './containers/EntranceContainer.jsx';
import ErrorContainer from './containers/ErrorContainer.jsx';
import FreeFormContainer from './containers/FreeFormContainer.jsx';
import FreeFormCommentContainer from './containers/FreeFormCommentContainer.jsx';
import LearnContentContainer1 from './containers/LearnContentContainer1.jsx';
import LearnResourcesContainer1 from './containers/LearnResourcesContainer1.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import NewsFeedContainer from './containers/NewsFeedContainer.jsx';
import ProfileAboutContainer from './containers/ProfileAboutContainer.jsx';
import ProfileContainer from './containers/ProfileContainer.jsx';
import ProjectRelatedParentsContainer from './containers/ProjectRelatedParentsContainer.jsx';
import ProsContainer from './containers/ProsContainer.jsx';
import QuestionContainer from './containers/QuestionContainer.jsx';
import SearchContainer from './containers/SearchContainer.jsx';
import SuggestionCommentContainer from './containers/SuggestionCommentContainer.jsx';
import SuggestionContainer from './containers/SuggestionContainer.jsx';
import VersionsContainer from './containers/VersionsContainer.jsx'
import WelcomeContainer from './containers/WelcomeContainer.jsx';

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
    <Route path='/error' component={ErrorContainer}>
      <IndexRoute component={Redirection}></IndexRoute>
      <Route path='/404' component={Error404}></Route>
      <Route path='/redirection' component={Redirection}></Route>
    </Route>
    <Route path='/newsfeed' component={NewsFeedContainer}></Route>
    <Route path='/instructions' component={Instructions}></Route>
    <IndexRoute component={Layout}></IndexRoute>
    <Route path='/home' component={Layout}>
      <Route path='/introduction' component={Introduction}></Route>
      <Route path='/tutorial' component={FullTutorial}></Route>
      <IndexRoute component={FullProblem}></IndexRoute>
      <Route path='/entrance' component={EntranceContainer}></Route>
      <Route path='/welcomecontainer' component={WelcomeContainer}>
        <IndexRoute component={WelcomeCreateButton}></IndexRoute>
        <Route path='/welcomecreate' component={WelcomeCreateButton}>
          <IndexRoute component={ChatBoxContainer}></IndexRoute>
          <Route path='/chatbox' component={ChatBoxContainer}/>
          <Route path='/welcome' component={TrueEmpty}/>
        </Route>
        <Route path='/welcome/create' component={WelcomeCreateForm}></Route>
      </Route>
      <Route path='/search' component={SearchContainer}></Route>
      <Route path='/logincontainer' component={LoginContainer}>
        <IndexRoute component={LoginContainer}></IndexRoute>
        <Route path='/login' component={LoginUnit}></Route>
        <Route path='/register' component={RegisterUnit}></Route>
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
            <Route path='/project/:probID/proposal/:solutionID' component={FullSolutionContent}>
            <Route path='/proposal/:probID/:solutionID/delete' component={SolutionDeleteForm}></Route>
            <Route path='/proposal/:probID/:solutionID/edit' component={SolutionEditForm}></Route>
              <Route path='/proposal/:probID/:solutionID/pros' component={ProsContainer}>
                <IndexRoute component={ProsForm}></IndexRoute>
                <Route path='/project/:probID/:solutionID/pros/pros' component={ProsForm}></Route>
                <Route path='/project/:probID/:solutionID/pros/:proID/edit' component={ProsEditForm}></Route>
                <Route path='/project/:probID/:solutionID/pros/:proID/flag' component={ProsFlagForm}></Route>
                <Route path='/project/:probID/:solutionID/pros/:proID/delete' component={ProsDeleteForm}></Route>
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
        <Route path='/project/:probID/related' component={ProjectRelatedParentsContainer}>
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
