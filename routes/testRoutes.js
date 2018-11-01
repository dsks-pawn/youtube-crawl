import express from "express"
const router = express.Router()
import { SUCCESS, FAILED } from "../constans.js"
// import { loadClientSecrets } from "../helpers/youtube"
// var { google } = require('googleapis');


// function getChannel(auth) {
// 	var service = google.youtube('v3');
// 	service.channels.list({
// 		auth: auth,
// 		part: 'snippet,contentDetails,statistics',
// 		id: 'UCnsQjCVzmEd-YvlQZbo6zCg',
// 	}, function (err, response) {
// 		if (err) {
// 			console.log('The API returned an error: ' + err);
// 			return;
// 		}
// 		var channels = response.data.items;
// 		if (channels.length == 0) {
// 			console.log('No channel found.');
// 		} else {
// 			console.log(channels)
// 		}
// 	});
// }

// function playlistsListByChannelId(auth) {
// 	var service = google.youtube('v3');
// 	service.playlists.list({
// 		auth: auth,
// 		channelId: 'UCCQKqUcnREDAxdGCitGmgvQ',
// 		maxResults: 50,
// 		part: 'snippet,contentDetails'
// 	}, function (err, response) {
// 		if (err) {
// 			console.log('The API returned an error: ' + err);
// 			return;
// 		}
// 		var channels = response.data
// 		// if (channels.length == 0) {
// 		// 	console.log('No channel found.');
// 		// } else {
// 		console.log(channels)
// 		// }
// 	});
// }

// router.get("/t", async (req, res) => {
// 	function playlistItemsListByPlaylistId(auth) {
// 		var service = google.youtube('v3');
// 		service.playlistItems.list({
// 			auth: auth,
// 			part: 'snippet,contentDetails',
// 			playlistId: 'PLuBJdRFInTJI2_aOUIf7ZFfcjfrNgofOo',
// 			maxResults: 50
// 		}, function (err, response) {
// 			if (err) {
// 				console.log('The API returned an error: ' + err);
// 				return;
// 			}
// 			var channels = response.data
// 			// if (channels.length == 0) {
// 			// 	console.log('No channel found.');
// 			// } else {
// 			res.json({
// 				channels
// 			})
// 			// }
// 		});
// 	}
// 	loadClientSecrets(playlistItemsListByPlaylistId)
// })
// router.get("/tz", async (req, res) => {

// 	function videosListMultipleIds(auth) {
// 		var service = google.youtube('v3');
// 		service.videos.list({
// 			auth: auth,
// 			part: 'snippet,contentDetails,statistics',
// 			id: 'Ks-_Mh1QhMc',
// 		}, function (err, response) {
// 			if (err) {
// 				console.log('The API returned an error: ' + err);
// 				return;
// 			}
// 			var channels = response.data
// 			// if (channels.length == 0) {
// 			// 	console.log('No channel found.');
// 			// } else {
// 			res.json({
// 				channels
// 			})
// 			// }
// 		});
// 	}
// 	loadClientSecrets(videosListMultipleIds)
// })
// router.get("/gggg", (req, res) => {
// 	async function commentThreadsListByVideoId(auth) {
// 		try {
// 			let service = google.youtube({
// 				version: 'v3',
// 				auth: "AIzaSyAo-50y3ycDeV2UJF7xFlpgH0fP_q_4sNw"
// 			});
// 			let result = await service.commentThreads.list({
// 				auth: auth,
// 				part: 'snippet,replies',
// 				videoId: 'tndWY2o-aBA'
// 			})
// 			res.json({ result })
// 		} catch (error) {
// 			throw error
// 		}
// 	}
// 	loadClientSecrets(commentThreadsListByVideoId)
// })


module.exports = router