var stream = require('getstream');
// Instantiate a new client (server side)
// client = stream.connect('m95khpsuyu6c', 'xr4aw4d4j76q38wjc7r7yb5wx6bzzhsae552qgnzngdg98tctm9amchhbs29x86d');
// Optionally supply the app identifier and an object specifying the data center to use
client = stream.connect('m95khpsuyu6c', 'xr4aw4d4j76q38wjc7r7yb5wx6bzzhsae552qgnzngdg98tctm9amchhbs29x86d', '27935', { location: 'us-west' });
// Instantiate a new client (client side)
// client = stream.connect('m95khpsuyu6c');
// Find your API keys here https://getstream.io/dashboard/

// Instantiate a feed object server side
user1 = client.feed('user', '1');
// Instantiate a feed object client side
// Generate a feed's token using server side signing
// user1 = client.feed('user', '1', '27935');

// Get activities from 5 to 10 (slow pagination)
// user1.get({limit:5, offset:5}, callback);
// (Recommended & faster) Filter on an id less than a given UUID
// user1.get({limit:5, id_lt:"e561de8f-00f1-11e4-b400-0cc47a024be0"});

// All API calls are performed asynchronous and return a Promise object
// user1.get({limit:5, id_lt:"1"})
// 	.then(function(body) { /* on success */
//         console.log('hey')
//      })
// 	.catch(function(reason) { console.log("SUP")/* on failure, reason.error contains an explanation */ });

// // Create a new activity
activity = {'actor': 1, 'verb': 'tweet', 'object': 1, 'foreign_id': 'tweet:1'};
user1.addActivity(activity);
// Create a bit more complex activity
activity = {'actor': 1, 'verb': 'run', 'object': 1, 'foreign_id': 'run:1',
	'course': {'name': 'Golden Gate park', 'distance': 10},
	'participants': ['Thierry', 'Tommaso'],
	'started_at': new Date()
};
console.log(user1)
// user1.addActivity(activity);

// // Remove an activity by its id
// // user1.removeActivity("e561de8f-00f1-11e4-b400-0cc47a024be0");
// // or remove by the foreign id
// user1.removeActivity({foreignId: 'tweet:1'});

// // mark a notification feed as read
notification1 = client.feed('notification', '1');
var params = {mark_read: true};
notification1.get(params);

// // mark a notification feed as seen
var params = {mark_seen:true};
notification1.get(params);

// // Follow another feed
// user1.follow('flat', '42');

// // Stop following another feed
// user1.unfollow('flat', '42');

// // Stop following another feed while keeping previously published activities
// // from that feed
// user1.unfollow('flat', '42', { keepHistory: true });

// // Follow another feed without copying the history
// user1.follow('flat', '42', { limit: 0 });

// // List followers, following
// user1.followers({limit: '10', offset: '10'});
// user1.following({limit: '10', offset: '0'});

// // all methods support callback as the last argument
// user1.follow('flat', '42');

// // adding multiple activities
// activities = [
// 	{'actor': 1, 'verb': 'tweet', 'object': 1},
// 	{'actor': 2, 'verb': 'tweet', 'object': 3},
// ];
// user1.addActivities(activities);

// // specifying additional feeds to push the activity to using the to param
// // especially usefull for notification style feeds
// to = ['user:2', 'user:3'];
// activity = {'to': to, 'actor': 1, 'verb': 'tweet', 'object': 1, 'foreign_id': 'tweet:1'};
// user1.addActivity(activity);

// // adding one activity to multiple feeds
// var feeds = ['flat:1', 'flat:2', 'flat:3', 'flat:4'];
// activity = {
//   'actor': 'User:2',
//   'verb': 'pin',
//   'object': 'Place:42',
//   'target': 'Board:1'
// };

// client.addToMany(activity, feeds);

// // Batch create follow relations (let flat:1 follow user:1, user:2 and user:3 feeds in one single request)
// var follows = [
//   {'source': 'flat:1', 'target': 'user:1'},
//   {'source': 'flat:1', 'target': 'user:2'},
//   {'source': 'flat:1', 'target': 'user:3'}
// ];

// client.followMany(follows);

// // creating a feed token server side
// token = user1.token;
// // passed to client via template or api and initialized as such
// user1 = client.feed('user', '1', token);

// // creating a read-only feed token server side
// readonlyToken = client.feed('user', '1').getReadOnlyToken();
// // passed to client via template or api and initialized as such
// user1 = client.feed('user', '1', readonlyToken);

// // Create redirect urls
// var impression = {
//     'content_list': ['tweet:1', 'tweet:2', 'tweet:3'],
//     'user_data': 'tommaso',
//     'location': 'email',
//     'feed_id': 'user:global'
// };
// var engagement = {
//     'content': 'tweet:2',
//     'label': 'click',
//     'position': 1,
//     'user_data': 'tommaso',
//     'location': 'email',
//     'feed_id':
//     'user:global'
// };
// var events = [impression, engagement];
// var redirectUrl = client.createRedirectUrl('http://google.com', 'user_id', events);