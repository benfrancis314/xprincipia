import React from 'react';
import ProfileUnit from '../components/profile/ProfileUnit.jsx';
import stream from 'getstream';
// import stream from 'getstream-node';
// import client from stream.connect('m95khpsuyu6c', 'xr4aw4d4j76q38wjc7r7yb5wx6bzzhsae552qgnzngdg98tctm9amchhbs29x86d', '27935', { location: 'us-west' });

export default class NewsFeedContainer extends React.Component {  

// Trying it here since error of publicly sharing private key, caused by:
// if (this.browser && this.apiSecret)
// Error might be from:
// Note: Stream's API uses SSL to keep your data secure. SSL can give errors if your libraries are outdated. See this discussion.

// Instantiate a new client (server side)
// client = stream.connect('jhvqmgj4wjb6', 'pwcy9cczz8e46rmbahbwaf9ak45ps4t46y9quwq6tv9vf3h3cnf5dyw3attkgddh', '27689');
// Instantiate a new client (client side)
// client = stream.connect('jhvqmgj4wjb6', null, '27689');
// Find your API keys here https://getstream.io/dashboard/


// The following line should be uncommented out when you begin working on this again
    // client = stream.connect('m95khpsuyu6c', 'xr4aw4d4j76q38wjc7r7yb5wx6bzzhsae552qgnzngdg98tctm9amchhbs29x86d', '27935', { location: 'us-west' });
    // user1 = client.feed('user', '1');
// The following line should be uncommented out when you begin working on this again     
    // activity = {'actor': 1, 'verb': 'tweet', 'object': 1, 'foreign_id': 'tweet:1'};


postNotification() {

    // user1.addActivity({
    //     'actor': 1,
    //     'verb': 'tweet',
    //     'object': 1,
    //     'foreign_id': 'tweet:1'
    // });
    // Create a bit more complex activity
//     activity = {'actor': 1, 'verb': 'run', 'object': 1, 'foreign_id': 'run:1',
// 	'course': {'name': 'Golden Gate park', 'distance': 10},
// 	'participants': ['Thierry', 'Tommaso'],
// 	'started_at': new Date()
// };

}





   render() {

    // var client = stream.connect('jhvqmgj4wjb6', 'pwcy9cczz8e46rmbahbwaf9ak45ps4t46y9quwq6tv9vf3h3cnf5dyw3attkgddh');

    // var general = client.feed('user', 'general');


    // general.addActivity({
    //     actor: 'general',
    //     verb: 'add',
    //     object: 'picture:10',
    //     foreign_id: 'picture:10',
    //     message: 'Beautiful bird. Absolutely beautiful. Phenomenal bird.'
    // });
    // // jack's 'timeline' feed follows chris' 'user' feed:
    // var jack = client.feed('timeline', 'jack');
    // jack.follow('user', 'general');

    // // Read 'timeline' for jack - the post by chris will show up:
    // jack.get({ limit: 10 }).then(function(results) {
    // var activityData = results;

    // // Read the next page, using id filtering for optimal performance:
    // jack.get({ limit: 10, id_lte: activityData[activityData.length-1].id }).then(function(results) {
    //     var nextActivityData = results;
    // });
    // });



// Second part


// // Instantiate a feed using feed class 'user' and user id '1'
// var user1 = client.feed('user', '1');
// // Instantiate a feed for feed group 'user', user id '1' and a security token generated server side

// // $token not defined
// // user1 = client.feed('user', '1', $token);

// // Add an activity to the feed
// var activity = {"actor": "User:1", "verb": "pin", "object": "Place:42", "target": "Board:1"};

// // Asynchronous methods return Promise since v3.0.0
// user1.addActivity(activity)
//     .then(function(data) { /* on success */ })
//     .catch(function(reason) { /* on failure, reason.error contains an explanation */ });

      return (
    <div>
      <div id="newsFeedBox">
        <div id="newsFeedLeft">
            <div id="userInformation">
                <p id="userName">Fields</p>
                {/*<img src={require('../assets/dnaAvatar.svg')} id="avatarImageProfile" width="150" height="150" alt="User Avatar, DNA Helix" />*/}
                {/*<p id="userEmail">{cookie.load('userName')}</p>*/}
            </div>
            <div id="userOptions">
                <div id="newsFeedFieldUnit">Physics</div>
                <div id="newsFeedFieldUnit">Astrophysics</div>
                <div id="newsFeedFieldUnit">Information Theory</div>
                <div id="newsFeedFieldUnit">Astrobiology</div>
                <div id="newsFeedFieldUnit">Quantum Physics</div>
                <div id="newsFeedFieldUnit">Machine Learning</div>
                <div id="newsFeedFieldUnit">Artificial Intelligence</div>
                <div id="newsFeedFieldUnit">Neural Networks</div>
                <div id="newsFeedFieldUnit">Consciousness</div>
                <div id="newsFeedFieldUnit">General Relativity</div>
                                
                <br />
                <p id="xp">XP</p>
            </div>
        </div>
        <div id="newsFeedRight">
            {/*Warning: profileRightElements is used elsewhere, create new ID to change*/}
            <div id="profileRightElements">
              {/*<ProfileUnit />*/}
            </div>
            <div id="moreButton">
                More
            </div>
        </div>
      </div>
    </div>

      );
   }
}
