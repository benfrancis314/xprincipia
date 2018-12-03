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
import DiscussDeleteForm from './components/discuss/DiscussDeleteForm.jsx';
import DiscussEditForm from './components/discuss/DiscussEditForm.jsx';
import DiscussFlagForm from './components/discuss/DiscussFlagForm.jsx';
import DiscussForm from './components/discuss/DiscussForm.jsx';
import DiscussCommentForm from './components/discuss/DiscussCommentForm.jsx';
import ProjectBreakdownSlogan from './components/ProjectBreakdownSlogan.jsx';
import Error404 from './components/Error404.jsx';
import FeedbackForm from './components/FeedbackForm.jsx';
import FullProblem from './components/problems/FullProblem.jsx';
import FullSolution from './components/solutions/FullSolution.jsx';
import FullSolutionContent from './components/solutions/FullSolutionContent.jsx';
import GeneralTutorial from './components/tutorials/GeneralTutorial.jsx';
import FullIdea from './components/home/FullIdea.jsx';
import FullVersion from './components/versions/FullVersion.jsx';
import Introduction from './components/Introduction.jsx';
import Layout from './components/Layout.jsx';
import LayoutEr from './components/LayoutEr.jsx';
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
import ProblemFormProposal from './components/problems/ProblemFormProposal.jsx';
import ProblemDiscussMenu from './components/problems/ProblemDiscussMenu.jsx';
import ProblemLearnMenu from './components/problems/ProblemLearnMenu.jsx';
import ProblemSolutionsMenu from './components/problems/ProblemSolutionsMenu.jsx';
import ProblemTopSolutions from './components/problems/ProblemTopSolutions.jsx';
import ProjectBreakdownForm from './components/problems/ProjectBreakdownForm.jsx';
import ProjectBreakdownEditForm from './components/problems/ProjectBreakdownEditForm.jsx';
import ProjectBreakdownFlagForm from './components/problems/ProjectBreakdownFlagForm.jsx';
import ProjectBreakdownProjectForm from './components/problems/ProjectBreakdownProjectForm.jsx';
import ProjectDeleteForm from './components/problems/ProjectDeleteForm.jsx';
import ProjectEditForm from './components/problems/ProjectEditForm.jsx';
import ProjectFlagForm from './components/problems/ProjectFlagForm.jsx';
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
import ProfileShow from './components/home/ProfileShow.jsx';
import ProfileTutorial from './components/tutorials/ProfileTutorial.jsx';
import ProfileWorkspace from './components/profile/ProfileWorkspace.jsx';
import ProposalDiscussMenu from './components/solutions/ProposalDiscussMenu.jsx';
import ProposalDiscussMenuPrivate from './components/solutions/ProposalDiscussMenuPrivate.jsx';
import Redirection from './components/Redirection.jsx';
import RegisterUnit from './components/RegisterUnit.jsx';
import SolutionDeleteForm from './components/solutions/SolutionDeleteForm.jsx';
import SolutionEditForm from './components/solutions/SolutionEditForm.jsx';
import SolutionFlagForm from './components/solutions/SolutionFlagForm.jsx';
import SolutionForm from './components/solutions/SolutionForm.jsx';
import TopicBranches from './components/home/TopicBranches.jsx';
import TopicForm from './components/home/TopicForm.jsx';
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
import BenPaperContainer from './containers/BenPaperContainer.jsx';
import DiscussContainer from './containers/DiscussContainer.jsx';
import DiscussCommentContainer from './containers/DiscussCommentContainer.jsx';
import ErContainer from './containers/teams/ErContainer.jsx';
import ErrorContainer from './containers/ErrorContainer.jsx';
import Home from './containers/Home.jsx';
import LearnContainer from './containers/LearnContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import MindTempleContainer from './containers/MindTempleContainer.jsx';
import NewsFeedContainer from './containers/NewsFeedContainer.jsx';
import OverviewContainer from './containers/OverviewContainer.jsx';
import ProfileAboutContainer from './containers/ProfileAboutContainer.jsx';
import ProfileContainer from './containers/ProfileContainer.jsx';
import RelatedProposalsContainer from './containers/RelatedProposalsContainer.jsx';
import ShortStoryContainer from './containers/ShortStoryContainer.jsx';
import SubProjectProposalContainer from './containers/SubProjectProposalContainer.jsx';
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
    <Route path='/home/er' component={LayoutEr}>
      <Route path='/er/container' component={ErContainer}>
        <IndexRoute component={Empty}></IndexRoute>
        <Route path='/er' component={Empty}></Route>
        <Route path='/er/create' component={PrivateProjectForm}></Route>
      </Route>
    </Route>

    <Route path='/home/layout' component={Layout}>
      <Route path='/shortstory' component={ShortStoryContainer}></Route>
      <Route path='/story' component={ShortStoryContainer}></Route>
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
        <Route path='/demo' component={GeneralTutorial}></Route>
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
      <Route path='/home/container' component={Home}>
            <IndexRoute component={Empty}></IndexRoute>
            <Route path='/home' component={Empty}></Route>
            <Route path='/topic' component={TopicBranches}></Route>
            <Route path='/topic/new' component={TopicForm}></Route>
            <Route path='/idea' component={FullIdea}></Route>
            <Route path='/profile/show' component={ProfileShow}></Route>
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
        <Route path='/profile/guide' component={ProfileTutorial}></Route>
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
        <Route path='/project/private/:probID/create' component={ProblemForm}></Route>
        {/* <Route path='/project/private/:probID/create/container' component={ProblemFormContainerPrivate}>
            <IndexRoute component={ProblemForm}></IndexRoute>
            <Route path='/project/private/:probID/create' component={ProblemForm}></Route>
            <Route path='/project/private/:probID/link' component={ProjectLinkForm}></Route>
        </Route> */}
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
            <Route path='/project/private/:probID/proposal/:solutionID/create' component={ProblemFormProposal}></Route>
            {/* <Route path='/project/private/:probID/proposal/:solutionID/subprojects/create' component={ProblemFormContainerProposal}>
              <IndexRoute component={ProblemFormProposal}></IndexRoute>
              <Route path='/project/private/:probID/proposal/:solutionID/create' component={ProblemFormProposal}></Route>
              <Route path='/project/private/:probID/proposal/:solutionID/link' component={ProjectLinkForm}></Route>
            </Route> */}
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
        <IndexRoute component={ProblemSolutionsMenu}></IndexRoute>
        <Route path='/project/:probID/create' component={ProblemForm}></Route>
        {/* <Route path='/project/:probID/add' component={ProblemFormContainer}>
          <IndexRoute component={ProblemForm}></IndexRoute>
          <Route path='/project/:probID/create' component={ProblemForm}></Route>
          <Route path='/project/:probID/link' component={ProjectLinkForm}></Route>
        </Route> */}
        <Route path='/project/:probID/create/breakdown' component={ProjectBreakdownForm}></Route>
        <Route path='/project/:probID/create/breakdown/:bdID' component={ProjectBreakdownProjectForm}></Route>
        <Route path='/project/:probID/create/breakdown/:bdID/edit' component={ProjectBreakdownEditForm}></Route>
        <Route path='/project/:probID/create/breakdown/:bdID/flag' component={ProjectBreakdownFlagForm}></Route>
        <Route path='/project/:probID/edit' component={ProjectEditForm}></Route>
        <Route path='/project/:probID/flag' component={ProjectFlagForm}></Route>
        <Route path='/project/:probID/delete' component={ProjectDeleteForm}></Route>
        <Route path='/project/:probID/subprojects' component={ProblemSolutionsMenu}></Route>
        <Route path='/project/:probID/proposals' component={ProblemSolutionsMenu}>
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
            <Route path='/project/:probID/proposal/:solutionID/create' component={ProblemFormProposal}></Route>
            {/* <Route path='/project/:probID/proposal/:solutionID/subprojects/create' component={ProblemFormContainerProposal}>
              <IndexRoute component={ProblemFormProposal}></IndexRoute>
              <Route path='/project/:probID/proposal/:solutionID/create' component={ProblemFormProposal}></Route>
              <Route path='/project/:probID/proposal/:solutionID/link' component={ProjectLinkForm}></Route>
            </Route> */}
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
        {/* <Route path='/project/:probID/related' component={ProjectRelatedParentsContainer}></Route> */}
        </Route>
        
        </Route>
      </Route>
    {/*<Redirect from='*' to='/404' />*/}
    <Route path='*' component={Error404}/>
  </Router>,
  document.getElementById('root')
);