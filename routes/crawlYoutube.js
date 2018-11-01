import express from "express"
const router = express.Router()
import insertDataYoutube from '../controllers/insertDataYoutube'
import getDataDatabase from '../controllers/getDataDatabase'
import { SUCCESS, FAILED } from "../constans.js"
import { loadClientSecrets } from "../helpers/youtube"
import { LoginTicket } from "google-auth-library/build/src/auth/loginticket";
var { google } = require('googleapis');

router.post("/add_channel", async (req, res) => {
    try {
        let { id_channel } = req.body
        let result = await insertDataYoutube.addChannel(id_channel)
        return res.json({ result })
    } catch (error) {
        throw error
    }
})

router.get("/infor_channel", async (req, res) => {
    try {
        let result = await getDataDatabase.getDataChannelByIdChannelNotUsed()
        if (result.length > 0) {
            result.forEach(element => {
                async function getChannel(auth) {
                    let service = google.youtube('v3');
                    let response = await service.channels.list({
                        auth: auth,
                        part: 'snippet,contentDetails,statistics',
                        id: element.id_channel,
                    });
                    let channels = response.data.items;
                    if (channels.length == 0) {
                        console.log('No channel found.');
                    } else {
                        await insertDataYoutube.updateInformationChannel(element._id, channels[0])
                    }
                }
                loadClientSecrets(getChannel)
            });
            res.json({ "Status": "Get all data channel" })
        } else {
            res.json({ "Status": "Không có dữ liệu channel thích hợp" })
        }
    } catch (error) {
        throw error
    }
})

router.get("/infor_playlist", async (req, res) => {
    try {
        let result = await getDataDatabase.getDataPlaylistByIdChannelNotUsed()
        if (result.length > 0) {
            result.forEach(element => {
                async function playlistsListByChannelId(auth) {
                    let service = google.youtube('v3');
                    let response = await service.playlists.list({
                        auth: auth,
                        channelId: element.id_channel,
                        maxResults: 50,
                        part: 'snippet,contentDetails'
                    });
                    let playList = response.data.items
                    let totalPlaylist = response.data.pageInfo.totalResults
                    if (playList.length == 0) {
                        console.log('No channel found.');
                    } else {
                        let data = []
                        playList.forEach(e => {
                            data.push({
                                id_channel: e.snippet.channelId,
                                id_playlist: e.id,
                                title: e.snippet.title,
                                description: e.snippet.description,
                                date_of_participation: e.snippet.publishedAt,
                                videos_count: Number(e.contentDetails.itemCount)
                            })
                        });
                        await insertDataYoutube.updateTotalCountPlaylistByChannel(element.id_channel, totalPlaylist)
                        await insertDataYoutube.addPlaylistByChannelId(data)
                        res.redirect("/crawl/infor_video_by_playlist")
                    }
                }
                loadClientSecrets(playlistsListByChannelId)
            });
        } else {
            res.json({ "Status": "Không có dữ liệu channel thích hợp" })
        }
    } catch (error) {
        throw error
    }
})

router.get("/infor_video_by_playlist", async (req, res) => {
    try {
        let result = await getDataDatabase.getDataPlaylistByIdPlaylistNotUsed()
        if (result.length > 0) {
            result.forEach(element => {
                async function playlistItemsListByPlaylistId(auth) {
                    let service = google.youtube('v3');
                    let response = await service.playlistItems.list({
                        auth: auth,
                        part: 'snippet,contentDetails',
                        playlistId: element.id_playlist,
                        maxResults: 50
                    });
                    let listItemVideo = response.data.items
                    if (listItemVideo.length == 0) {
                        console.log('No channel found.');
                    } else {
                        let data = []
                        listItemVideo.forEach(e => {
                            data.push({
                                id_channel: element.id_channel,
                                id_playlist: element.id_playlist,
                                id_video: e.contentDetails.videoId,
                                title: e.snippet.title,
                                description: e.snippet.description,
                                date_of_participation: e.snippet.publishedAt,
                                execution_time: new Date()
                            })
                        });
                        await insertDataYoutube.addItemVideoByPlaylistId(data)
                        await insertDataYoutube.updateStatusUsedGetItemPlaylist(element.id_playlist)
                    }
                }
                loadClientSecrets(playlistItemsListByPlaylistId)
            })
            res.json({ "Status": "Get data result" })
        } else {
            res.json({ "Status": "Không có dữ liệu playlist thích hợp" })
        }
    } catch (error) {
        throw error
    }
})

// router.get("/get_all_video_by_channel_id", async (req, res) => {
//     try {
//         let result = await getDataDatabase.getDataAllVideoByIdChannelNotUsed()
//         if (result.length > 0) {
//             result.forEach(element => {
//                 async function getAllVideoByChannelId(auth) {
//                     let service = google.youtube('v3');
//                     let response = await service.search.list({
//                         auth: auth,
//                         part: 'snippet',
//                         q: 'surfing',
//                         videoType: "any",
//                         type: element.id_channel,
//                         maxResults: 50
//                     });
//                     console.log(response);
//                 }
//                 loadClientSecrets(getAllVideoByChannelId)
//             })
//         } else {
//             res.json({ "Status": "Không có dữ liệu channel thích hợp" })
//         }
//     } catch (error) {
//         throw error
//     }
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