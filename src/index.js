import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-104103231-1'); //Unique Google Analytics tracking number

//Load Components

import ActivityFeedFilter from './components/feed/ActivityFeedFilter.jsx';
import ActivityFeedDebateUnits from './components/feed/ActivityFeedDebateUnits.jsx';
import ActivityFeedLessonsUnits from './components/feed/ActivityFeedLessonsUnits.jsx';
import ActivityFeedOmniUnits from './components/feed/ActivityFeedOmniUnits.jsx';
import ActivityFeedProjectsUnits from './components/feed/ActivityFeedProjectsUnits.jsx';
import ActivityFeedProposalsUnits from './components/feed/ActivityFeedProposalsUnits.jsx';
import ActivityFeedQuestionsUnits from './components/feed/ActivityFeedQuestionsUnits.jsx';
import ActivityFeedResourcesUnits from './components/feed/ActivityFeedResourcesUnits.jsx';
import ActivityFeedSuggestionsUnits from './components/feed/ActivityFeedSuggestionsUnits.jsx';
import AnswerDeleteForm from './components/answers/AnswerDeleteForm.jsx';
import AnswerDeleteFormPrivate from './components/answers/AnswerDeleteFormPrivate.jsx';
import AnswerEditForm from './components/answers/AnswerEditForm.jsx';
import AnswerEditFormPrivate from './components/answers/AnswerEditFormPrivate.jsx';
import AnswerFlagForm from './components/answers/AnswerFlagForm.jsx';
import AnswerForm from './components/answers/AnswerForm.jsx';
import AnswerFormPrivate from './components/answers/AnswerFormPrivate.jsx';
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
import DiscussForm from './components/discuss/DiscussForm.jsx';
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
import LearnContentButton from './components/learn/LearnContentButton.jsx';
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
import OverviewProjectForm from './components/overview/OverviewProjectForm.jsx';
import PasswordResetContainer from './components/profile/PasswordResetContainer.jsx';
import PasswordResetFinish from './components/profile/PasswordResetFinish.jsx';
import PasswordResetStart from './components/profile/PasswordResetStart.jsx';
import PrivateProjectForm from './components/problems/PrivateProjectForm.jsx';
import PrivateSubProjectForm from './components/problems/PrivateSubProjectForm.jsx';
import ProblemForm from './components/problems/ProblemForm.jsx';
import ProblemFormContainer from './components/problems/ProblemFormContainer.jsx';
import ProblemFormContainerPrivate from './components/problems/ProblemFormContainerPrivate.jsx';
import ProblemFormContainerProposal from './components/problems/ProblemFormContainerProposal.jsx';
import ProblemFormContainerProposalPrivate from './components/problems/ProblemFormContainerProposalPrivate.jsx';
import ProblemFormProposal from './components/problems/ProblemFormProposal.jsx';
import ProblemFormProposalPrivate from './components/problems/ProblemFormProposalPrivate.jsx';
import ProblemDiscussMenu from './components/problems/ProblemDiscussMenu.jsx';
import ProblemDiscussPrivateMenu from './components/problems/ProblemDiscussPrivateMenu.jsx';
import ProblemLearnMenu from './components/problems/ProblemLearnMenu.jsx';
import ProblemLearnPrivateMenu from './components/problems/ProblemLearnPrivateMenu.jsx';
import ProblemLeftSB from './components/problems/ProblemLeftSB.jsx';
import ProblemSolutionsMenu from './components/problems/ProblemSolutionsMenu.jsx';
import ProblemTopSolutions from './components/problems/ProblemTopSolutions.jsx';
import ProjectBreakdownForm from './components/problems/ProjectBreakdownForm.jsx';
import ProjectBreakdownFormCreate from './components/problems/ProjectBreakdownFormCreate.jsx';
import ProjectDeleteForm from './components/problems/ProjectDeleteForm.jsx';
import ProjectDeletePrivateForm from './components/problems/ProjectDeletePrivateForm.jsx';
import ProjectEditForm from './components/problems/ProjectEditForm.jsx';
import ProjectEditPrivateForm from './components/problems/ProjectEditPrivateForm.jsx';
import ProjectFlagForm from './components/problems/ProjectFlagForm.jsx';
import ProjectLinkForm from './components/problems/ProjectLinkForm.jsx';
import ProfileAbout from './components/profile/ProfileAbout.jsx';
import ProfileCareers from './components/profile/ProfileCareers.jsx';
import ProfileDisclaimer from './components/profile/ProfileDisclaimer.jsx';
import ProfileMessagesAddButton from './components/profile/ProfileMessagesAddButton.jsx';
import ProfileMessagesCenter from './components/profile/ProfileMessagesCenter.jsx';
import ProfileMessagesForm from './components/profile/ProfileMessagesForm.jsx';
import ProfileMessagesUnit from './components/profile/ProfileMessagesUnit.jsx';
import ProfileNotifications from './components/profile/ProfileNotifications.jsx';
import ProfilePoints from './components/profile/ProfilePoints.jsx';
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
import Redirection from './components/Redirection.jsx';
import RegisterUnit from './components/RegisterUnit.jsx';
import SideBarProblem from './components/problems/SideBarProblem';
import SolutionDeleteForm from './components/solutions/SolutionDeleteForm.jsx';
import SolutionDeleteFormPrivate from './components/solutions/SolutionDeleteFormPrivate.jsx';
import SolutionEditForm from './components/solutions/SolutionEditForm.jsx';
import SolutionEditFormPrivate from './components/solutions/SolutionEditFormPrivate.jsx';
import SolutionFlagForm from './components/solutions/SolutionFlagForm.jsx';
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
import UserMessages from './components/profile/UserMessages.jsx';
import UserPassions from './components/profile/UserPassions.jsx';
import UserProblemsSolutions from './components/profile/UserProblemsSolutions.jsx';
import VersionForm from './components/versions/VersionForm.jsx';
import WelcomeCreateButton from './components/welcome/WelcomeCreateButton.jsx';
import WelcomeCreateForm from './components/welcome/WelcomeCreateForm.jsx';


//Load Containers
import ActivityFeedDebateContainer from './containers/feed/ActivityFeedDebateContainer.jsx';
import ActivityFeedLessonsContainer from './containers/feed/ActivityFeedLessonsContainer.jsx';
import ActivityFeedOmniContainer from './containers/feed/ActivityFeedOmniContainer.jsx';
import ActivityFeedProjectsContainer from './containers/feed/ActivityFeedProjectsContainer.jsx';
import ActivityFeedProposalsContainer from './containers/feed/ActivityFeedProposalsContainer.jsx';
import ActivityFeedQuestionsContainer from './containers/feed/ActivityFeedQuestionsContainer.jsx';
import ActivityFeedResourcesContainer from './containers/feed/ActivityFeedResourcesContainer.jsx';
import ActivityFeedSuggestionsContainer from './containers/feed/ActivityFeedSuggestionsContainer.jsx';
import AnswerContainer from './containers/AnswerContainer.jsx';
import AnswerContainerPrivate from './containers/AnswerContainerPrivate.jsx';
import BenPaperContainer from './containers/BenPaperContainer.jsx';
import CommentAnswerContainer from './containers/comments/CommentAnswerContainer.jsx';
import CommentAnswerContainerPrivate from './containers/comments/CommentAnswerContainerPrivate.jsx';
import CommentConContainer from './containers/comments/CommentConContainer.jsx';
import CommentConContainerPrivate from './containers/comments/CommentConContainerPrivate.jsx';
import CommentSubCommentContainer from './containers/comments/CommentSubCommentContainer.jsx';
import CommentSubCommentContainerPrivate from './containers/comments/CommentSubCommentContainerPrivate.jsx';
import CommentDebateContainer from './containers/comments/CommentDebateContainer.jsx';
import CommentDebateContainerPrivate from './containers/comments/CommentDebateContainerPrivate.jsx';
import CommentLessonContainer from './containers/comments/CommentLessonContainer.jsx';
import CommentLessonContainerPrivate from './containers/comments/CommentLessonContainerPrivate.jsx';
import CommentProContainer from './containers/comments/CommentProContainer.jsx';
import CommentProContainerPrivate from './containers/comments/CommentProContainerPrivate.jsx';
import CommentResourceContainer from './containers/comments/CommentResourceContainer.jsx';
import CommentResourceContainerPrivate from './containers/comments/CommentResourceContainerPrivate.jsx';
import CommentSuggestionContainer from './containers/comments/CommentSuggestionContainer.jsx';
import CommentSuggestionContainerPrivate from './containers/comments/CommentSuggestionContainerPrivate.jsx';
import ConsContainer from './containers/ConsContainer.jsx';
import ConsContainerPrivate from './containers/ConsContainerPrivate.jsx';
import DiscussContainer from './containers/DiscussContainer.jsx';
import EntranceContainer from './containers/EntranceContainer.jsx';
import ErrorContainer from './containers/ErrorContainer.jsx';
import FreeFormContainer from './containers/FreeFormContainer.jsx';
import FreeFormContainerPrivate from './containers/FreeFormContainerPrivate.jsx';
import LearnContentContainer1 from './containers/LearnContentContainer1.jsx';
import LearnContentContainerPrivate from './containers/LearnContentContainerPrivate.jsx';
import LearnResourcesContainer1 from './containers/LearnResourcesContainer1.jsx';
import LearnResourcesContainerPrivate from './containers/LearnResourcesContainerPrivate.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import MindTempleContainer from './containers/MindTempleContainer.jsx';
import NewsFeedContainer from './containers/NewsFeedContainer.jsx';
import OverviewContainer from './containers/OverviewContainer.jsx';
import ProfileAboutContainer from './containers/ProfileAboutContainer.jsx';
import ProfileContainer from './containers/ProfileContainer.jsx';
import ProfileContainer2 from './containers/ProfileContainer2.jsx';
import ProjectRelatedParentsContainer from './containers/ProjectRelatedParentsContainer.jsx';
import ProsContainer from './containers/ProsContainer.jsx';
import ProsContainerPrivate from './containers/ProsContainerPrivate.jsx';
import RelatedProposalsContainer from './containers/RelatedProposalsContainer.jsx';
import SearchContainer from './containers/SearchContainer.jsx';
import ShortStoryContainer from './containers/ShortStoryContainer.jsx';
import SubProblemContainer from './containers/SubProblemContainer.jsx';
import SubProjectProposalContainer from './containers/SubProjectProposalContainer.jsx';
import SubProjectProposalPrivateContainer from './containers/SubProjectProposalPrivateContainer.jsx';
import SuggestionContainer from './containers/SuggestionContainer.jsx';
import SuggestionContainerPrivate from './containers/SuggestionContainerPrivate.jsx';
import UserContainer from './containers/UserContainer.jsx'
import VersionsContainer from './containers/VersionsContainer.jsx'
import WelcomeContainer from './containers/WelcomeContainer.jsx';
import WelcomeProjectsContainer from './containers/WelcomeProjectsContainer.jsx';

//Assets
import './assets/index.css';




// This may be needed for Google Analytics:
// One thing to note is we may need to adjust the 
// window.location argument we push to the ReactGA.pageview() function. 
// It will really depend how we have set up React Router.


function fireTracking() {
  ReactGA.pageview(window.location.hash);
}

ReactDOM.render(
  // When we have Google Analytics working it should be:
  <Router 
  onUpdate={fireTracking} 
   history={browserHistory}>
    <Route path='/' component={App}>    
    <Route path='/newsfeed' component={NewsFeedContainer}></Route>
    <Route path='/instructions' component={Instructions}></Route>
    <IndexRoute component={Layout}></IndexRoute>
    <Route path='/home' component={Layout}>
      <Route path='/shortstory' component={ShortStoryContainer}></Route>
      <Route path='/thementalworld' component={BenPaperContainer}></Route>
      {/* Add :user param later. */}
      <Route path='/passwordreset' component={PasswordResetContainer}>
        <IndexRoute component={PasswordResetStart}></IndexRoute>
        <Route path='/passwordreset/start' component={PasswordResetStart}></Route>
        <Route path='/passwordreset/finish/:userID' component={PasswordResetFinish}></Route>
      </Route>

      <Route path='/error' component={ErrorContainer}>
        <IndexRoute component={Redirection}></IndexRoute>
        <Route path='/404' component={Error404}></Route>
        <Route path='/redirection' component={Redirection}></Route>
        <Route path='/load' component={Load}></Route>
      </Route>
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
            <Route path='/welcome/old' component={TrueEmpty}/>
          </Route>
          <Route path='/welcome/feed' component={ActivityFeedOmniContainer}>
            <IndexRoute component={ActivityFeedProjectsUnits}></IndexRoute>
            <Route path='/welcome' component={ActivityFeedOmniUnits}></Route>
            <Route path='/welcome/filter' component={ActivityFeedFilter}></Route>
            <Route path='/welcome/create' component={WelcomeCreateForm}></Route>
          </Route>
          <Route path='/welcome/feed/projects' component={ActivityFeedProjectsContainer}>
            <IndexRoute component={ActivityFeedProposalsUnits}></IndexRoute>
            <Route path='/welcome/projects' component={ActivityFeedProjectsUnits}></Route>
          </Route>
          <Route path='/welcome/feed/proposals' component={ActivityFeedProposalsContainer}>
            <IndexRoute component={ActivityFeedProposalsUnits}></IndexRoute>
            <Route path='/welcome/proposals' component={ActivityFeedProposalsUnits}></Route>
          </Route>
          <Route path='/welcome/feed/questions' component={ActivityFeedQuestionsContainer}>
            <IndexRoute component={ActivityFeedQuestionsUnits}></IndexRoute>
            <Route path='/welcome/questions' component={ActivityFeedQuestionsUnits}></Route>
          </Route>
          <Route path='/welcome/feed/suggestions' component={ActivityFeedSuggestionsContainer}>
            <IndexRoute component={ActivityFeedSuggestionsUnits}></IndexRoute>
            <Route path='/welcome/suggestions' component={ActivityFeedSuggestionsUnits}></Route>
          </Route>
          <Route path='/welcome/feed/debate' component={ActivityFeedDebateContainer}>
            <IndexRoute component={ActivityFeedDebateUnits}></IndexRoute>
            <Route path='/welcome/debate' component={ActivityFeedDebateUnits}></Route>
          </Route>
          <Route path='/welcome/feed/resources' component={ActivityFeedResourcesContainer}>
            <IndexRoute component={ActivityFeedResourcesUnits}></IndexRoute>
            <Route path='/welcome/resources' component={ActivityFeedResourcesUnits}></Route>
          </Route>
          <Route path='/welcome/feed/lessons' component={ActivityFeedLessonsContainer}>
            <IndexRoute component={ActivityFeedLessonsUnits}></IndexRoute>
            <Route path='/welcome/lessons' component={ActivityFeedLessonsUnits}></Route>
          </Route>
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
      <Route path='/user/:username' component={UserContainer}>
        <IndexRoute component={UserProblemsSolutions}></IndexRoute>
        <Route path='/user/:username/activity' component={UserProblemsSolutions}></Route>
        <Route path='/user/:username/passions' component={UserPassions}></Route>
        <Route path='/user/:username/messages' component={UserMessages}></Route>
      </Route>
      <Route path='/profile/container' component={ProfileContainer}>
        <IndexRoute component={ProfileProblemsSolutions}></IndexRoute>
        <Route path='/profile' component={ProfileProblemsSolutions}></Route>
        <Route path='/profile/passions' component={UserPassions}></Route>
        <Route path='/profile/resume' component={ProfileResume}></Route>
        <Route path='/profile/feedback' component={FeedbackForm}></Route>
        <Route path='/profile/points' component={ProfilePoints}></Route>
        <Route path='/messages/container' component={ProfileMessagesCenter}>
          <IndexRoute component={ProfileMessagesAddButton}></IndexRoute>
          <Route path='/messages' component={ProfileMessagesAddButton}></Route>
          <Route path='/messages/new' component={ProfileMessagesForm}></Route>
          <Route path='/messages/:user1/:user2' component={ProfileMessagesUnit}></Route>
        </Route>
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
          <Route path='/project/private/:probID/create' component={ProblemFormContainerPrivate}>
              <IndexRoute component={PrivateSubProjectForm}></IndexRoute>
              <Route path='/project/private/:probID/create' component={PrivateSubProjectForm}></Route>
              <Route path='/project/private/:probID/link' component={ProjectLinkForm}></Route>
          </Route>
          <Route path='/project/private/:probID/edit' component={ProjectEditPrivateForm}></Route>
          <Route path='/project/private/:probID/delete' component={ProjectDeletePrivateForm}></Route>
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
            <Route path='/project/private/:probID/proposal/:solutionID/subprojects/create' component={ProblemFormContainerProposalPrivate}>
              <IndexRoute component={ProblemFormProposalPrivate}></IndexRoute>
              <Route path='/project/private/:probID/proposal/:solutionID/create' component={ProblemFormProposalPrivate}></Route>
              <Route path='/project/private/:probID/proposal/:solutionID/link' component={ProjectLinkForm}></Route>
            </Route>
            <Route path='/project/private/:probID/proposal/:solutionID/related' component={RelatedProposalsContainer}></Route>
            <Route path='/project/private/:probID/proposal/:solutionID/discuss' component={ProposalDiscussMenuPrivate}>
              <IndexRoute component={DiscussContainer}></IndexRoute>
              <Route path='/project/private/:probID/proposal/:solutionID/question/container' component={DiscussContainer}>
                <IndexRoute component={DiscussForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/questions' component={DiscussForm}></Route>
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
              <Route path='/project/:probID/question/:questID/answer/:answerID/container' component={CommentAnswerContainerPrivate}>
                <IndexRoute component={CommentFormPrivate}></IndexRoute>
                <Route path='/project/private/:probID/proposal/question/:questID/answer/:answerID/comments' component={CommentFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/question/:questID/answer/:answerID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/question/:questID/answer/:answerID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/question/:questID/answer/:answerID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
              </Route>
              <Route path='/project/private/:probID/proposal/:solutionID/suggestion/container' component={SuggestionContainerPrivate}>
                <IndexRoute component={SuggestionForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestions' component={SuggestionFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestion/:suggID/edit' component={SuggestionEditFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestion/:suggID/flag' component={SuggestionFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/suggestion/:suggID/delete' component={SuggestionDeleteFormPrivate}></Route>
              </Route>
              <Route path='/project/private/:probID/suggestion/:suggID/container' component={CommentSuggestionContainerPrivate}>
                <IndexRoute component={CommentFormPrivate}></IndexRoute>
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
              <Route path='/project/:probID/freeform/:freeFormID/container' component={CommentDebateContainerPrivate}>
                <IndexRoute component={CommentFormPrivate}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/debate/:freeFormID/comments' component={CommentFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/debate/:freeFormID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/debate/:freeFormID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
              </Route>
              <Route path='/project/:probID/comment/:commentID/container' component={CommentSubCommentContainerPrivate}>
                <IndexRoute component={CommentFormPrivate}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/comment/:commentID/subcomments' component={CommentFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/comment/:commentID/subcomment/:subcommentID/edit' component={CommentEditFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/comment/:commentID/subcomment/:subcommentID/delete' component={CommentDeleteFormPrivate}></Route>
              </Route>
            </Route>
            {/* <Route path='/project/private/:probID/proposal/:solutionID/learn' component={ProposalLearnMenu}>
              <Route path='/project/private/:probID/proposal/:solutionID/learn/content/full' component={LearnContentContainer1}>
                <IndexRoute component={LearnContentForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content' component={LearnContentForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content/:learnItemID/edit' component={LearnContentEditForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content/:learnItemID/flag' component={LearnContentFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content/:learnItemID/delete' component={LearnContentDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/learn/content/:learnItemID/container' component={CommentLessonContainerPrivate}>
                <IndexRoute component={CommentFormPrivate}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content/:learnItemID/comments' component={CommentFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content/:learnItemID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content/:learnItemID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/content/:learnItemID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
              </Route>
              <Route path='/project/private/:probID/learn/resources/full' component={LearnResourcesContainer1}>
                <IndexRoute component={LearnResourcesForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources' component={LearnResourcesForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/edit' component={LearnResourcesEditForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/flag' component={LearnResourcesFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/delete' component={LearnResourcesDeleteForm}></Route>  
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/embed' component={LearnResourcesEmbed}></Route>            
              </Route>
              <Route path='/project/:probID/learn/resources/:resourceID/container' component={CommentResourceContainerPrivate}>
                <IndexRoute component={CommentFormPrivate}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/comments' component={CommentFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/learn/resources/:resourceID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
              </Route>
            </Route> */}
            <Route path='/proposal/private/:probID/:solutionID/pros' component={ProsContainerPrivate}>
              <IndexRoute component={ProsFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/:solutionID/pros/pros' component={ProsFormPrivate}></Route>
              <Route path='/project/private/:probID/:solutionID/pros/:proID/edit' component={ProsEditFormPrivate}></Route>
              <Route path='/project/private/:probID/:solutionID/pros/:proID/flag' component={ProsFlagForm}></Route>
              <Route path='/project/private/:probID/:solutionID/pros/:proID/delete' component={ProsDeleteFormPrivate}></Route>
            </Route>
            <Route path='/project/:probID/proposal/:solutionID/pros/:proID/container' component={CommentProContainerPrivate}>
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
            <Route path='/project/:probID/proposal/:solutionID/cons/:conID/container' component={CommentConContainerPrivate}>
              <IndexRoute component={CommentFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/proposal/:solutionID/cons/:conID/comments' component={CommentFormPrivate}></Route>
              <Route path='/project/private/:probID/proposal/:solutionID/cons/:conID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
              <Route path='/project/private/:probID/proposal/:solutionID/cons/:conID/comment/:commentID/flag' component={CommentFlagForm}></Route>
              <Route path='/project/private/:probID/proposal/:solutionID/cons/:conID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
            </Route>   
          </Route>
          <Route path='/proposal/private/:probID/:solutionID/versions' component={VersionsContainer}></Route>
          <Route path='/proposal/private/:probID/:solutionID/fullversion' component={FullVersion}></Route>
          <Route path='/proposal/private/:probID/:solutionID/versionform' component={VersionForm}></Route>
        </Route>
        <Route path='/project/private/:probID/discuss' component={ProblemDiscussPrivateMenu}>
            <IndexRoute component={DiscussContainer}></IndexRoute>
            <Route path='/project/private/:probID/questions/container' component={DiscussContainer}>
              <IndexRoute component={DiscussForm}></IndexRoute>
              <Route path='/project/private/:probID/questions' component={DiscussForm}></Route>
              <Route path='/project/private/:probID/question/:questID/edit' component={QuestionEditFormPrivate}></Route>
              <Route path='/project/private/:probID/question/:questID/flag' component={QuestionFlagForm}></Route>
              <Route path='/project/private/:probID/question/:questID/delete' component={QuestionDeleteFormPrivate}></Route>
            </Route> 
            <Route path='/project/private/:probID/question/:questID/answers/container' component={AnswerContainerPrivate}>
              <IndexRoute component={AnswerFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/question/:questID/answers' component={AnswerFormPrivate}></Route>
              <Route path='/project/private/:probID/question/:questID/answer/:answerID/edit' component={AnswerEditFormPrivate}></Route>
              <Route path='/project/private/:probID/question/:questID/answer/:answerID/flag' component={AnswerFlagForm}></Route>
              <Route path='/project/private/:probID/question/:questID/answer/:answerID/delete' component={AnswerDeleteFormPrivate}></Route>
            </Route>
            <Route path='/project/:probID/question/:questID/answer/:answerID/container' component={CommentAnswerContainerPrivate}>
              <IndexRoute component={CommentFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/question/:questID/answer/:answerID/comments' component={CommentFormPrivate}></Route>
              <Route path='/project/private/:probID/question/:questID/answer/:answerID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
              <Route path='/project/private/:probID/question/:questID/answer/:answerID/comment/:commentID/flag' component={CommentFlagForm}></Route>
              <Route path='/project/private/:probID/question/:questID/answer/:answerID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
            </Route>
            <Route path='/project/private/:probID/suggestions/container' component={SuggestionContainerPrivate}>
              <IndexRoute component={SuggestionFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/suggestions' component={SuggestionFormPrivate}></Route>
              <Route path='/project/private/:probID/suggestion/:suggID/edit' component={SuggestionEditFormPrivate}></Route>
              <Route path='/project/private/:probID/suggestion/:suggID/flag' component={SuggestionFlagForm}></Route>
              <Route path='/project/private/:probID/suggestion/:suggID/delete' component={SuggestionDeleteFormPrivate}></Route>
            </Route>
            <Route path='/project/private/:probID/suggestion/:suggID/container' component={CommentSuggestionContainerPrivate}>
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
            <Route path='/project/:probID/freeform/:freeFormID/container' component={CommentDebateContainerPrivate}>
              <IndexRoute component={CommentFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/open/:freeFormID/comments' component={CommentFormPrivate}></Route>
              <Route path='/project/private/:probID/open/:freeFormID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
              <Route path='/project/private/:probID/open/:freeFormID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
            </Route>
            <Route path='/project/:probID/comment/:commentID/container' component={CommentSubCommentContainerPrivate}>
              <IndexRoute component={CommentFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/comment/:commentID/subcomments' component={CommentFormPrivate}></Route>
              <Route path='/project/private/:probID/comment/:commentID/subcomment/:subcommentID/edit' component={CommentEditFormPrivate}></Route>
              <Route path='/project/private/:probID/comment/:commentID/subcomment/:subcommentID/delete' component={CommentDeleteFormPrivate}></Route>
            </Route>
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
             <Route path='/project/:probID/learn/content/:learnItemID/container' component={CommentLessonContainerPrivate}>
                <IndexRoute component={CommentFormPrivate}></IndexRoute>
                <Route path='/project/private/:probID/learn/content/:learnItemID/comments' component={CommentFormPrivate}></Route>
                <Route path='/project/private/:probID/learn/content/:learnItemID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
                <Route path='/project/private/:probID/learn/content/:learnItemID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/private/:probID/learn/content/:learnItemID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
              </Route>
              <Route path='/project/private/:probID/learn/resources/full' component={LearnResourcesContainerPrivate}>
                <IndexRoute component={LearnResourcesPrivateForm}></IndexRoute>
                <Route path='/project/private/:probID/resources' component={LearnResourcesPrivateForm}></Route>
                <Route path='/project/private/:probID/resources/:resourceID/edit' component={LearnResourcesEditPrivateForm}></Route>
                <Route path='/project/private/:probID/resources/:resourceID/flag' component={LearnResourcesFlagForm}></Route>
                <Route path='/project/private/:probID/resources/:resourceID/delete' component={LearnResourcesDeletePrivateForm}></Route>  
                <Route path='/project/private/:probID/resources/:resourceID/embed' component={LearnResourcesEmbed}></Route>            
              </Route>
              <Route path='/project/:probID/learn/resources/:resourceID/container' component={CommentResourceContainerPrivate}>
                <IndexRoute component={CommentFormPrivate}></IndexRoute>
                <Route path='/project/private/:probID/learn/resources/:resourceID/comments' component={CommentFormPrivate}></Route>
                <Route path='/project/private/:probID/learn/resources/:resourceID/comment/:commentID/edit' component={CommentEditFormPrivate}></Route>
                <Route path='/project/private/:probID/learn/resources/:resourceID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/private/:probID/learn/resources/:resourceID/comment/:commentID/delete' component={CommentDeleteFormPrivate}></Route>
              </Route>
        </Route>
      </Route>
      <Route path='/project/:probID/tree/container' component={OverviewContainer}>
        <IndexRoute component={TrueEmpty}></IndexRoute>
        <Route path='/project/:probID/tree' component={TrueEmpty}></Route>
        <Route path='/project/:probID/tree/create' component={OverviewProjectForm}></Route>
      </Route>
      <Route path='/project/:probID' component={FullProblem}>
        <IndexRoute component={Empty}></IndexRoute>
        <Route path='/project/:probID/add' component={ProblemFormContainer}>
          <IndexRoute component={ProblemForm}></IndexRoute>
          <Route path='/project/:probID/create' component={ProblemForm}></Route>
          <Route path='/project/:probID/link' component={ProjectLinkForm}></Route>
        </Route>
        <Route path='/project/:probID/create/breakdown' component={ProjectBreakdownForm}></Route>
        <Route path='/project/:probID/create/breakdown/:bdID' component={ProjectBreakdownFormCreate}></Route>
        <Route path='/project/:probID/edit' component={ProjectEditForm}></Route>
        <Route path='/project/:probID/flag' component={ProjectFlagForm}></Route>
        <Route path='/project/:probID/delete' component={ProjectDeleteForm}></Route>
        <Route path='/project/:probID/subprojects' component={Empty}></Route>
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
            <Route path='/proposal/:probID/:solutionID/flag' component={SolutionFlagForm}></Route>
            <Route path='/project/:probID/proposal/:solutionID/subprojects' component={SubProjectProposalContainer}></Route>
            <Route path='/project/:probID/proposal/:solutionID/subprojects/create' component={ProblemFormContainerProposal}>
              <IndexRoute component={ProblemFormProposal}></IndexRoute>
              <Route path='/project/:probID/proposal/:solutionID/create' component={ProblemFormProposal}></Route>
              <Route path='/project/:probID/proposal/:solutionID/link' component={ProjectLinkForm}></Route>
            </Route>
            <Route path='/project/:probID/proposal/:solutionID/related' component={RelatedProposalsContainer}></Route>
            <Route path='/project/:probID/proposal/:solutionID/discuss' component={ProposalDiscussMenu}>
              <IndexRoute component={DiscussContainer}></IndexRoute>
              <Route path='/project/:probID/proposal/:solutionID/question/container' component={DiscussContainer}>
                <IndexRoute component={DiscussForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/questions' component={DiscussForm}></Route>
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
              <Route path='/project/:probID/proposal/:solutionID/question/:questID/answer/:answerID/container' component={CommentAnswerContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/question/:questID/answer/:answerID/comments' component={CommentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/question/:questID/answer/:answerID/comment/:commentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/question/:questID/answer/:answerID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/question/:questID/answer/:answerID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/proposal/:solutionID/suggestion/container' component={SuggestionContainer}>
                <IndexRoute component={SuggestionForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/suggestions' component={SuggestionForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/edit' component={SuggestionEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/flag' component={SuggestionFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/delete' component={SuggestionDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/container' component={CommentSuggestionContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/comments' component={CommentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/comment/:commentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/suggestion/:suggID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/proposal/:solutionID/debates/container' component={FreeFormContainer}>
                <IndexRoute component={FreeFormForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/debates' component={FreeFormForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/debate/:freeFormID/edit' component={FreeFormEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/debate/:freeFormID/flag' component={FreeFormFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/debate/:freeFormID/delete' component={FreeFormDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/proposal/:solutionID/freeform/:freeFormID/container' component={CommentDebateContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/debate/:freeFormID/comments' component={CommentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/debate/:freeFormID/comment/:commentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/debate/:freeFormID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/debate/:freeFormID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/proposal/:solutionID/comment/:commentID/container' component={CommentSubCommentContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/comment/:commentID/subcomments' component={CommentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/comment/:commentID/subcomment/:subcommentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/comment/:commentID/subcomment/:subcommentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/comment/:commentID/subcomment/:subcommentID/delete' component={CommentDeleteForm}></Route>
              </Route>
            </Route>
            {/* <Route path='/project/:probID/proposal/:solutionID/learn' component={ProposalLearnMenu}>
              <Route path='/project/:probID/proposal/:solutionID/learn/content/full' component={LearnContentContainerPrivate}>
                <IndexRoute component={LearnContentButton}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/learn/content' component={LearnContentButton}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/content/new' component={LearnContentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/content/:learnItemID/edit' component={LearnContentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/content/:learnItemID/flag' component={LearnContentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/content/:learnItemID/delete' component={LearnContentDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/learn/content/:learnItemID/container' component={CommentLessonContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/learn/content/:learnItemID/comments' component={CommentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/content/:learnItemID/comment/:commentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/content/:learnItemID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/content/:learnItemID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/proposal/:solutionID/learn/resources/full' component={LearnResourcesContainerPrivate}>
                <IndexRoute component={LearnResourcesForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/learn/resources' component={LearnResourcesForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/resources/:resourceID/edit' component={LearnResourcesEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/resources/:resourceID/flag' component={LearnResourcesFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/resources/:resourceID/delete' component={LearnResourcesDeleteForm}></Route>  
                <Route path='/project/:probID/proposal/:solutionID/learn/resources/:resourceID/embed' component={LearnResourcesEmbed}></Route>            
              </Route>
              <Route path='/project/:probID/learn/resources/:resourceID/container' component={CommentResourceContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/learn/resources/:resourceID/comments' component={CommentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/resources/:resourceID/comment/:commentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutoinID/learn/resources/:resourceID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/learn/resources/:resourceID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
              </Route>
            </Route> */}

              <Route path='/project/:probID/proposal/:solutionID/pros/container' component={ProsContainer}>
                <IndexRoute component={ProsForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/pros' component={ProsForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/pros/:proID/edit' component={ProsEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/pros/:proID/flag' component={ProsFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/pros/:proID/delete' component={ProsDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/proposal/:solutionID/pros/:proID/container' component={CommentProContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/pros/:proID/comments' component={CommentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/pros/:proID/comment/:commentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/pros/:proID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/pros/:proID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/proposal/:solutionID/cons/container' component={ConsContainer}>
                <IndexRoute component={ConsForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/cons' component={ConsForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/cons/:conID/edit' component={ConsEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/cons/:conID/flag' component={ConsFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/cons/:conID/delete' component={ConsDeleteForm}></Route>
              </Route>         
              <Route path='/project/:probID/proposal/:solutionID/cons/:conID/container' component={CommentConContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/cons/:conID/comments' component={CommentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/cons/:conID/comment/:commentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/cons/:conID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/cons/:conID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
              </Route>       
            </Route>
            <Route path='/proposal/:probID/:solutionID/versions' component={VersionsContainer}></Route>
            <Route path='/proposal/:probID/:solutionID/fullversion' component={FullVersion}></Route>
            <Route path='/proposal/:probID/:solutionID/versionform' component={VersionForm}></Route>
        </Route>
        <Route path='/project/:probID/discuss' component={ProblemDiscussMenu}>
            <IndexRoute component={DiscussContainer}></IndexRoute>
            <Route path='/project/:probID/questions/container' component={DiscussContainer}>
              <IndexRoute component={DiscussForm}></IndexRoute>
              <Route path='/project/:probID/questions' component={DiscussForm}></Route>
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
            {/* ANSWER COMMENTS */}
            <Route path='/project/:probID/question/:questID/answer/:answerID/container' component={CommentAnswerContainer}>
              <IndexRoute component={CommentForm}></IndexRoute>
              <Route path='/project/:probID/question/:questID/answer/:answerID/comments' component={CommentForm}></Route>
              <Route path='/project/:probID/question/:questID/answer/:answerID/comment/:commentID/edit' component={CommentEditForm}></Route>
              <Route path='/project/:probID/question/:questID/answer/:answerID/comment/:commentID/flag' component={CommentFlagForm}></Route>
              <Route path='/project/:probID/question/:questID/answer/:answerID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
            </Route>
            <Route path='/project/:probID/suggestions/container' component={SuggestionContainer}>
              <IndexRoute component={SuggestionForm}></IndexRoute>
              <Route path='/project/:probID/suggestions' component={SuggestionForm}></Route>
              <Route path='/project/:probID/suggestion/:suggID/edit' component={SuggestionEditForm}></Route>
              <Route path='/project/:probID/suggestion/:suggID/flag' component={SuggestionFlagForm}></Route>
              <Route path='/project/:probID/suggestion/:suggID/delete' component={SuggestionDeleteForm}></Route>
            </Route>
            <Route path='/project/:probID/suggestion/:suggID/container' component={CommentSuggestionContainer}>
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
            <Route path='/project/:probID/freeform/:freeFormID/container' component={CommentDebateContainer}>
              <IndexRoute component={CommentForm}></IndexRoute>
              <Route path='/project/:probID/freeform/:freeFormID/comments' component={CommentForm}></Route>
              <Route path='/project/:probID/freeform/:freeFormID/comment/:commentID/edit' component={CommentEditForm}></Route>
              <Route path='/project/:probID/freeform/:freeFormID/comment/:commentID/flag' component={CommentFlagForm}></Route>
              <Route path='/project/:probID/freeform/:freeFormID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
            </Route>
            <Route path='/project/:probID/comment/:commentID/container' component={CommentSubCommentContainer}>
              <IndexRoute component={CommentForm}></IndexRoute>
              <Route path='/project/:probID/comment/:commentID/subcomments' component={CommentForm}></Route>
              <Route path='/project/:probID/comment/:commentID/subcomment/:subcommentID/edit' component={CommentEditForm}></Route>
              <Route path='/project/:probID/comment/:commentID/subcomment/:subcommentID/flag' component={CommentFlagForm}></Route>
              <Route path='/project/:probID/comment/:commentID/subcomment/:subcommentID/delete' component={CommentDeleteForm}></Route>
            </Route>
        </Route>
          {/*<IndexRoute component={ProblemLearnMenu}></IndexRoute>*/}
        <Route path='/project/:probID/learn' component={ProblemLearnMenu}>
              <Route path='/project/:probID/learn/content/full' component={LearnContentContainer1}>
                <IndexRoute component={LearnContentButton}></IndexRoute>
                <Route path='/project/:probID/learn/content' component={LearnContentButton}></Route>
                <Route path='/project/:probID/learn/content/new' component={LearnContentForm}></Route>
                <Route path='/project/:probID/learn/content/:learnItemID/edit' component={LearnContentEditForm}></Route>
                <Route path='/project/:probID/learn/content/:learnItemID/flag' component={LearnContentFlagForm}></Route>
                <Route path='/project/:probID/learn/content/:learnItemID/delete' component={LearnContentDeleteForm}></Route>
              </Route>
              {/* COMMENTS FOR LESSONS */}
              <Route path='/project/:probID/learn/content/:learnItemID/container' component={CommentLessonContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/learn/content/:learnItemID/comments' component={CommentForm}></Route>
                <Route path='/project/:probID/learn/content/:learnItemID/comment/:commentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/learn/content/:learnItemID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/learn/content/:learnItemID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/learn/resources/full' component={LearnResourcesContainer1}>
                <IndexRoute component={LearnResourcesForm}></IndexRoute>
                <Route path='/project/:probID/learn/resources' component={LearnResourcesForm}></Route>
                <Route path='/project/:probID/learn/resources/:resourceID/edit' component={LearnResourcesEditForm}></Route>
                <Route path='/project/:probID/learn/resources/:resourceID/flag' component={LearnResourcesFlagForm}></Route>
                <Route path='/project/:probID/learn/resources/:resourceID/delete' component={LearnResourcesDeleteForm}></Route>  
                <Route path='/project/:probID/learn/resources/:resourceID/embed' component={LearnResourcesEmbed}></Route>            
              </Route>
              {/* COMMENTS FOR RESOURCES */}
              <Route path='/project/:probID/learn/resources/:resourceID/container' component={CommentResourceContainer}>
                <IndexRoute component={CommentForm}></IndexRoute>
                <Route path='/project/:probID/learn/resources/:resourceID/comments' component={CommentForm}></Route>
                <Route path='/project/:probID/learn/resources/:resourceID/comment/:commentID/edit' component={CommentEditForm}></Route>
                <Route path='/project/:probID/learn/resources/:resourceID/comment/:commentID/flag' component={CommentFlagForm}></Route>
                <Route path='/project/:probID/learn/resources/:resourceID/comment/:commentID/delete' component={CommentDeleteForm}></Route>
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
