import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-104103231-1'); //Unique Google Analytics tracking number

//Load Components

import ActivityFeedFilter from './components/feed/ActivityFeedFilter.jsx';
import ActivityFeedOmniUnits from './components/feed/ActivityFeedOmniUnits.jsx';
import ActivityFeedProjectsUnits from './components/feed/ActivityFeedProjectsUnits.jsx';
import ActivityFeedProposalsUnits from './components/feed/ActivityFeedProposalsUnits.jsx';
import ActivityFeedDiscussUnits from './components/feed/ActivityFeedDiscussUnits.jsx';
import ActivityFeedLearnUnits from './components/feed/ActivityFeedLearnUnits.jsx';
import AnswerDeleteForm from './components/answers/AnswerDeleteForm.jsx';
import AnswerDeleteFormPrivate from './components/answers/AnswerDeleteFormPrivate.jsx';
import AnswerEditForm from './components/answers/AnswerEditForm.jsx';
import AnswerEditFormPrivate from './components/answers/AnswerEditFormPrivate.jsx';
import AnswerFlagForm from './components/answers/AnswerFlagForm.jsx';
import AnswerForm from './components/answers/AnswerForm.jsx';
import AnswerFormPrivate from './components/answers/AnswerFormPrivate.jsx';
import CommentForm from './components/comments/CommentForm.jsx';
import CommentFormPrivate from './components/comments/CommentFormPrivate.jsx';
import ConsDeleteForm from './components/proscons/ConsDeleteForm.jsx';
import ConsDeleteFormPrivate from './components/proscons/ConsDeleteFormPrivate.jsx';
import ConsEditForm from './components/proscons/ConsEditForm.jsx';
import ConsEditFormPrivate from './components/proscons/ConsEditFormPrivate.jsx';
import ConsFlagForm from './components/proscons/ConsFlagForm.jsx';
import ConsForm from './components/proscons/ConsForm.jsx';
import ConsFormPrivate from './components/proscons/ConsFormPrivate.jsx';
import DiscussDeleteForm from './components/discuss/DiscussDeleteForm.jsx';
import DiscussEditForm from './components/discuss/DiscussEditForm.jsx';
import DiscussFlagForm from './components/discuss/DiscussFlagForm.jsx';
import DiscussForm from './components/discuss/DiscussForm.jsx';
import DiscussCommentForm from './components/discuss/DiscussCommentForm.jsx';
import ProjectBreakdownSlogan from './components/ProjectBreakdownSlogan.jsx';
import Error404 from './components/Error404.jsx';
import FeedbackForm from './components/FeedbackForm.jsx';
import FreeFormDeleteForm from './components/freeform/FreeFormDeleteForm.jsx';
import FreeFormDeleteFormPrivate from './components/freeform/FreeFormDeleteFormPrivate.jsx';
import FreeFormEditForm from './components/freeform/FreeFormEditForm.jsx';
import FreeFormEditFormPrivate from './components/freeform/FreeFormEditFormPrivate.jsx';
import FreeFormFlagForm from './components/freeform/FreeFormFlagForm.jsx';
import FreeFormForm from './components/freeform/FreeFormForm.jsx';
import FreeFormFormPrivate from './components/freeform/FreeFormFormPrivate.jsx';
import FullProblem from './components/problems/FullProblem.jsx';
import FullSolution from './components/solutions/FullSolution.jsx';
import FullSolutionContent from './components/solutions/FullSolutionContent.jsx';
import FullSolutionContentPrivate from './components/solutions/FullSolutionContentPrivate.jsx';
import FullTutorial from './components/tutorials/FullTutorial.jsx';
import FullVersion from './components/versions/FullVersion.jsx';
import Introduction from './components/Introduction.jsx';
import Layout from './components/Layout.jsx';
import LearnDeleteForm from './components/learn/LearnDeleteForm.jsx';
import LearnEditForm from './components/learn/LearnEditForm.jsx';
import LearnFlagForm from './components/learn/LearnFlagForm.jsx';
import LearnForm from './components/learn/LearnForm.jsx';
import Load from './components/Load.jsx';
import LoginUnit from './components/LoginUnit.jsx';
import OverviewProjectForm from './components/overview/OverviewProjectForm.jsx';
import PasswordResetContainer from './components/profile/PasswordResetContainer.jsx';
import PasswordResetFinish from './components/profile/PasswordResetFinish.jsx';
import PasswordResetStart from './components/profile/PasswordResetStart.jsx';
import PrivateProjectForm from './components/problems/PrivateProjectForm.jsx';
import ProblemForm from './components/problems/ProblemForm.jsx';
import ProblemFormContainer from './components/problems/ProblemFormContainer.jsx';
import ProblemFormContainerPrivate from './components/problems/ProblemFormContainerPrivate.jsx';
import ProblemFormContainerProposal from './components/problems/ProblemFormContainerProposal.jsx';
import ProblemFormContainerProposalPrivate from './components/problems/ProblemFormContainerProposalPrivate.jsx';
import ProblemDiscussMenu from './components/problems/ProblemDiscussMenu.jsx';
import ProblemDiscussPrivateMenu from './components/problems/ProblemDiscussPrivateMenu.jsx';
import ProblemLearnMenu from './components/problems/ProblemLearnMenu.jsx';
import ProblemLearnPrivateMenu from './components/problems/ProblemLearnPrivateMenu.jsx';
import ProblemLeftSB from './components/problems/ProblemLeftSB.jsx';
import ProblemSolutionsMenu from './components/problems/ProblemSolutionsMenu.jsx';
import ProblemTopSolutions from './components/problems/ProblemTopSolutions.jsx';
import ProjectBreakdownForm from './components/problems/ProjectBreakdownForm.jsx';
import ProjectBreakdownEditForm from './components/problems/ProjectBreakdownEditForm.jsx';
import ProjectBreakdownFlagForm from './components/problems/ProjectBreakdownFlagForm.jsx';
import ProjectBreakdownProjectForm from './components/problems/ProjectBreakdownProjectForm.jsx';
import ProjectDeleteForm from './components/problems/ProjectDeleteForm.jsx';
import ProjectEditForm from './components/problems/ProjectEditForm.jsx';
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
import ProfilePassions from './components/profile/ProfilePassions.jsx';
import ProfilePoints from './components/profile/ProfilePoints.jsx';
import ProfileProblemsSolutions from './components/profile/ProfileProblemsSolutions.jsx';
import ProfileResume from './components/profile/ProfileResume.jsx';
import ProfileSettings from './components/profile/ProfileSettings.jsx';
import ProfileWorkspace from './components/profile/ProfileWorkspace.jsx';
import ProposalDiscussMenu from './components/solutions/ProposalDiscussMenu.jsx';
import ProposalDiscussMenuPrivate from './components/solutions/ProposalDiscussMenuPrivate.jsx';
import ProposalLearnMenu from './components/solutions/ProposalLearnMenu.jsx';
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
import Empty from './components/Empty.jsx';
import UserMessages from './components/profile/UserMessages.jsx';
import UserPassions from './components/profile/UserPassions.jsx';
import UserProblemsSolutions from './components/profile/UserProblemsSolutions.jsx';
import VersionForm from './components/versions/VersionForm.jsx';
import WelcomeCreateButton from './components/welcome/WelcomeCreateButton.jsx';
import WelcomeCreateForm from './components/welcome/WelcomeCreateForm.jsx';


//Load Containers
import ActivityFeedOmniContainer from './containers/feed/ActivityFeedOmniContainer.jsx';
import ActivityFeedProjectsContainer from './containers/feed/ActivityFeedProjectsContainer.jsx';
import ActivityFeedProposalsContainer from './containers/feed/ActivityFeedProposalsContainer.jsx';
import ActivityFeedDiscussContainer from './containers/feed/ActivityFeedDiscussContainer.jsx';
import ActivityFeedLearnContainer from './containers/feed/ActivityFeedLearnContainer.jsx';
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
import DiscussCommentContainer from './containers/DiscussCommentContainer.jsx';
import ErrorContainer from './containers/ErrorContainer.jsx';
import FreeFormContainer from './containers/FreeFormContainer.jsx';
import FreeFormContainerPrivate from './containers/FreeFormContainerPrivate.jsx';
import LearnContainer from './containers/LearnContainer.jsx';
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
    <IndexRoute component={Layout}></IndexRoute>
    <Route path='/home' component={Layout}>
      <Route path='/shortstory' component={ShortStoryContainer}></Route>
      <Route path='/thementalworld' component={BenPaperContainer}></Route>
      {/* Add :user param later. */}
      <Route path='/passwordreset' component={PasswordResetContainer}>
        <IndexRoute component={PasswordResetStart}></IndexRoute>
        <Route path='/passwordreset/start' component={PasswordResetStart}></Route>
        <Route path='/passwordreset/finish/:passID' component={PasswordResetFinish}></Route>
      </Route>

      <Route path='/error' component={ErrorContainer}>
        <IndexRoute component={Redirection}></IndexRoute>
        <Route path='/404' component={Error404}></Route>
        <Route path='/redirection' component={Redirection}></Route>
        <Route path='/load' component={Load}></Route>
      </Route>
      <IndexRoute component={FullProblem}></IndexRoute>
      <Route path='/welcome/container' component={WelcomeContainer}>
        <Route path='/introduction' component={Introduction}></Route>
        <Route path='/demo' component={FullTutorial}></Route>
        <Route path='/welcome/container/project' component={WelcomeProjectsContainer}>
          <IndexRoute component={WelcomeCreateButton}></IndexRoute>
          <Route path='/welcomecreate' component={WelcomeCreateButton}>
            {/* <IndexRoute component={ChatBoxContainer}></IndexRoute> */}
            {/* <Route path='/chatbox' component={ChatBoxContainer}/> */}
            <Route path='/welcome/old' component={Empty}/>
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
          <Route path='/welcome/feed/discuss' component={ActivityFeedDiscussContainer}>
            <IndexRoute component={ActivityFeedDiscussUnits}></IndexRoute>
            <Route path='/welcome/discuss' component={ActivityFeedDiscussUnits}></Route>
          </Route>
          <Route path='/welcome/feed/learn' component={ActivityFeedLearnContainer}>
            <IndexRoute component={ActivityFeedLearnUnits}></IndexRoute>
            <Route path='/welcome/learn' component={ActivityFeedLearnUnits}></Route>
          </Route>
        </Route>
      </Route>
      <Route path='/logincontainer' component={LoginContainer}>
        <IndexRoute component={LoginContainer}></IndexRoute>
        <Route path='/login' component={LoginUnit}></Route>
        <Route path='/register' component={RegisterUnit}></Route>
      </Route>
      <Route path='/mindtemple/container' component={MindTempleContainer}>
        <IndexRoute component={Empty}></IndexRoute>
        <Route path='/mindtemple' component={Empty}></Route>
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
        <Route path='/profile/passions' component={ProfilePassions}></Route>
        <Route path='/profile/resume' component={ProfileResume}></Route>
        <Route path='/profile/feedback' component={FeedbackForm}></Route>
        <Route path='/profile/prestige' component={ProfilePoints}></Route>
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
      <Route path='/project/private/:probID' component={FullProblem}>
        <IndexRoute component={Empty}></IndexRoute>
        <Route path='/project/private/:probID/create' component={ProblemFormContainerPrivate}>
            <IndexRoute component={ProblemForm}></IndexRoute>
            <Route path='/project/private/:probID/create' component={ProblemForm}></Route>
            <Route path='/project/private/:probID/link' component={ProjectLinkForm}></Route>
        </Route>
        <Route path='/project/private/:probID/edit' component={ProjectEditForm}></Route>
        <Route path='/project/private/:probID/delete' component={ProjectDeleteForm}></Route>
        <Route path='/project/private/:probID/flag' component={ProjectFlagForm}></Route>
        <Route path='/project/private/:probID/subprojects' component={ProjectBreakdownSlogan}></Route>
        <Route path='/project/private/:probID/solutions' component={ProblemSolutionsMenu}>
          <IndexRoute component={ProblemTopSolutions}></IndexRoute>
          <Route path='/project/private/:probID/solutions/create' component={SolutionForm}></Route>
        </Route>
        <Route path='/project/private/:probID/proposal/:solutionID/container' component={FullSolution}>
            <IndexRoute component={FullSolutionContent}></IndexRoute>
            <Route path='/project/private/:probID/proposal/:solutionID/content/container' component={FullSolutionContent}>
            <Route path='/project/private/:probID/proposal/:solutionID' component={Empty}></Route>
            <Route path='/proposal/private/:probID/:solutionID/delete' component={SolutionDeleteForm}></Route>
            <Route path='/proposal/private/:probID/:solutionID/edit' component={SolutionEditForm}></Route>
            <Route path='/project/private/:probID/proposal/:solutionID/subprojects' component={SubProjectProposalContainer}></Route>
            <Route path='/project/private/:probID/proposal/:solutionID/subprojects/create' component={ProblemFormContainerProposal}>
              <IndexRoute component={ProblemForm}></IndexRoute>
              <Route path='/project/private/:probID/proposal/:solutionID/create' component={ProblemForm}></Route>
              <Route path='/project/private/:probID/proposal/:solutionID/link' component={ProjectLinkForm}></Route>
            </Route>
            <Route path='/project/private/:probID/proposal/:solutionID/versions/create' component={VersionForm}></Route>
            <Route path='/project/private/:probID/proposal/:solutionID/versions' component={VersionsContainer}></Route>
            <Route path='/project/private/:probID/proposal/:solutionID/related' component={RelatedProposalsContainer}></Route>
            <Route path='/project/private/:probID/proposal/:solutionID/discuss/menu' component={ProposalDiscussMenuPrivate}>
              <IndexRoute component={DiscussContainer}></IndexRoute>
              <Route path='/project/private/:probID/discuss/container' component={DiscussContainer}>
                <IndexRoute component={DiscussForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/discuss' component={DiscussForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/discuss/:discussID/edit' component={DiscussEditForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/discuss/:discussID/flag' component={DiscussFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/discuss/:discussID/delete' component={DiscussDeleteForm}></Route>
              </Route> 
              <Route path='/project/private/:probID/proposal/:solutionID/discuss/:discussID/comments/container' component={DiscussCommentContainer}>
                <IndexRoute component={DiscussCommentForm}></IndexRoute>
                <Route path='/project/private/:probID/proposal/:solutionID/discuss/:discussID/comments' component={DiscussCommentForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/discuss/:discussID/comments/:commentID/edit' component={DiscussEditForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/discuss/:discussID/comments/:commentID/flag' component={DiscussFlagForm}></Route>
                <Route path='/project/private/:probID/proposal/:solutionID/discuss/:discussID/comments/:commentID/delete' component={DiscussDeleteForm}></Route>
              </Route>
            </Route>
         
            <Route path='/project/private/:probID/proposal/:solutionID/cons/:conID/container' component={CommentConContainerPrivate}>
              <IndexRoute component={CommentFormPrivate}></IndexRoute>
              <Route path='/project/private/:probID/proposal/:solutionID/cons/:conID/comments' component={CommentFormPrivate}></Route>
            </Route>   
          </Route>
          <Route path='/project/private/:probID/proposal/:solutionID/fullversion' component={FullVersion}></Route>
        </Route>
        <Route path='/project/private/:probID/discuss/menu' component={ProblemDiscussMenu}>
            <IndexRoute component={DiscussContainer}></IndexRoute>
            <Route path='/project/private/:probID/discuss/container' component={DiscussContainer}>
              <IndexRoute component={DiscussForm}></IndexRoute>
              <Route path='/project/private/:probID/discuss' component={DiscussForm}></Route>
              <Route path='/project/private/:probID/discuss/:discussID/edit' component={DiscussEditForm}></Route>
              <Route path='/project/private/:probID/discuss/:discussID/flag' component={DiscussFlagForm}></Route>
              <Route path='/project/private/:probID/discuss/:discussID/delete' component={DiscussDeleteForm}></Route>
            </Route> 
            <Route path='/project/private/:probID/discuss/:discussID/comments/container' component={DiscussCommentContainer}>
              <IndexRoute component={DiscussCommentForm}></IndexRoute>
              <Route path='/project/private/:probID/discuss/:discussID/comments' component={DiscussCommentForm}></Route>
              <Route path='/project/private/:probID/discuss/:discussID/comments/:commentID/edit' component={DiscussEditForm}></Route>
              <Route path='/project/private/:probID/discuss/:discussID/comments/:commentID/flag' component={DiscussFlagForm}></Route>
              <Route path='/project/private/:probID/discuss/:discussID/comments/:commentID/delete' component={DiscussDeleteForm}></Route>
            </Route>
        </Route>
        <Route path='/project/private/:probID/learn/menu' component={ProblemLearnMenu}>
          <Route path='/project/private/:probID/learn/content/full' component={LearnContainer}>
            <IndexRoute component={LearnForm}></IndexRoute>
            <Route path='/project/private/:probID/learn' component={LearnForm}></Route>
            <Route path='/project/private/:probID/learn/:learnItemID/edit' component={LearnEditForm}></Route>
            <Route path='/project/private/:probID/learn/:learnItemID/flag' component={LearnFlagForm}></Route>
            <Route path='/project/private/:probID/learn/:learnItemID/delete' component={LearnDeleteForm}></Route>
          </Route>
        </Route>
      </Route>
      <Route path='/project/:probID/tree/container' component={OverviewContainer}>
        <IndexRoute component={Empty}></IndexRoute>
        <Route path='/project/:probID/tree' component={Empty}></Route>
        <Route path='/project/:probID/tree/create' component={OverviewProjectForm}></Route>
      </Route>
      <Route path='/project/:probID' component={FullProblem}>
        <IndexRoute component={ProjectBreakdownSlogan}></IndexRoute>
        <Route path='/project/:probID/add' component={ProblemFormContainer}>
          <IndexRoute component={ProblemForm}></IndexRoute>
          <Route path='/project/:probID/create' component={ProblemForm}></Route>
          <Route path='/project/:probID/link' component={ProjectLinkForm}></Route>
        </Route>
        <Route path='/project/:probID/create/breakdown' component={ProjectBreakdownForm}></Route>
        <Route path='/project/:probID/create/breakdown/:bdID' component={ProjectBreakdownProjectForm}></Route>
        <Route path='/project/:probID/create/breakdown/:bdID/edit' component={ProjectBreakdownEditForm}></Route>
        <Route path='/project/:probID/create/breakdown/:bdID/flag' component={ProjectBreakdownFlagForm}></Route>
        <Route path='/project/:probID/edit' component={ProjectEditForm}></Route>
        <Route path='/project/:probID/flag' component={ProjectFlagForm}></Route>
        <Route path='/project/:probID/delete' component={ProjectDeleteForm}></Route>
        <Route path='/project/:probID/subprojects' component={ProjectBreakdownSlogan}></Route>
        <Route path='/project/:probID/solutions' component={ProblemSolutionsMenu}>
          <IndexRoute component={ProblemTopSolutions}></IndexRoute>
          <Route path='/project/:probID/solutions/create' component={SolutionForm}></Route>
        </Route>
        <Route path='/project/:probID/proposal/:solutionID/container' component={FullSolution}>
            <IndexRoute component={FullSolutionContent}></IndexRoute>
            <Route path='/project/:probID/proposal/:solutionID/content/container' component={FullSolutionContent}>
            <Route path='/project/:probID/proposal/:solutionID' component={Empty}></Route>
            <Route path='/project/:probID/proposal/:solutionID/delete' component={SolutionDeleteForm}></Route>
            <Route path='/project/:probID/proposal/:solutionID/edit' component={SolutionEditForm}></Route>
            <Route path='/project/:probID/proposal/:solutionID/flag' component={SolutionFlagForm}></Route>
            <Route path='/project/:probID/proposal/:solutionID/subprojects' component={SubProjectProposalContainer}></Route>
            <Route path='/project/:probID/proposal/:solutionID/subprojects/create' component={ProblemFormContainerProposal}>
              <IndexRoute component={ProblemForm}></IndexRoute>
              <Route path='/project/:probID/proposal/:solutionID/create' component={ProblemForm}></Route>
              <Route path='/project/:probID/proposal/:solutionID/link' component={ProjectLinkForm}></Route>
            </Route>
            <Route path='/project/:probID/proposal/:solutionID/versions/create' component={VersionForm}></Route>
            <Route path='/project/:probID/proposal/:solutionID/versions' component={VersionsContainer}></Route>
            <Route path='/project/:probID/proposal/:solutionID/related' component={RelatedProposalsContainer}></Route>
            <Route path='/project/:probID/proposal/:solutionID/discuss/menu' component={ProposalDiscussMenu}>
              <IndexRoute component={DiscussContainer}></IndexRoute>
              <Route path='/project/:probID/proposal/:solutionID/question/container' component={DiscussContainer}>
                <IndexRoute component={DiscussForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/discuss' component={DiscussForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/discuss/:discussID/edit' component={DiscussEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/discuss/:discussID/flag' component={DiscussFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/discuss/:discussID/delete' component={DiscussDeleteForm}></Route>
              </Route>
              <Route path='/project/:probID/discuss/:discussID/comments/container' component={DiscussCommentContainer}>
                <IndexRoute component={DiscussCommentForm}></IndexRoute>
                <Route path='/project/:probID/proposal/:solutionID/discuss/:discussID/comments' component={DiscussCommentForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/discuss/:discussID/comments/:commentID/edit' component={DiscussEditForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/discuss/:discussID/comments/:commentID/flag' component={DiscussFlagForm}></Route>
                <Route path='/project/:probID/proposal/:solutionID/discuss/:discussID/comments/:commentID/delete' component={DiscussDeleteForm}></Route>
              </Route>
            </Route>    
            </Route>
            <Route path='/project/:probID/proposal/:solutionID/fullversion' component={FullVersion}></Route>
        </Route>
        <Route path='/project/:probID/discuss/menu' component={ProblemDiscussMenu}>
            <IndexRoute component={DiscussContainer}></IndexRoute>
            <Route path='/project/:probID/discuss/container' component={DiscussContainer}>
              <IndexRoute component={DiscussForm}></IndexRoute>
              <Route path='/project/:probID/discuss' component={DiscussForm}></Route>
              <Route path='/project/:probID/discuss/:discussID/edit' component={DiscussEditForm}></Route>
              <Route path='/project/:probID/discuss/:discussID/flag' component={DiscussFlagForm}></Route>
              <Route path='/project/:probID/discuss/:discussID/delete' component={DiscussDeleteForm}></Route>
            </Route> 
            <Route path='/project/:probID/discuss/:discussID/comments/container' component={DiscussCommentContainer}>
              <IndexRoute component={DiscussCommentForm}></IndexRoute>
              <Route path='/project/:probID/discuss/:discussID/comments' component={DiscussCommentForm}></Route>
              <Route path='/project/:probID/discuss/:discussID/comments/:commentID/edit' component={DiscussEditForm}></Route>
              <Route path='/project/:probID/discuss/:discussID/comments/:commentID/flag' component={DiscussFlagForm}></Route>
              <Route path='/project/:probID/discuss/:discussID/comments/:commentID/delete' component={DiscussDeleteForm}></Route>
            </Route>
        </Route>
          {/*<IndexRoute component={ProblemLearnMenu}></IndexRoute>*/}
          <Route path='/project/:probID/learn/menu' component={ProblemLearnMenu}>
            <Route path='/project/:probID/learn/content/full' component={LearnContainer}>
              <IndexRoute component={LearnForm}></IndexRoute>
              <Route path='/project/:probID/learn' component={LearnForm}></Route>
              <Route path='/project/:probID/learn/:learnItemID/edit' component={LearnEditForm}></Route>
              <Route path='/project/:probID/learn/:learnItemID/flag' component={LearnFlagForm}></Route>
              <Route path='/project/:probID/learn/:learnItemID/delete' component={LearnDeleteForm}></Route>
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