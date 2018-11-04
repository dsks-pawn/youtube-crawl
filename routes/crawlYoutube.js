import express from "express"
const router = express.Router()
import insertDataYoutube from '../controllers/insertDataYoutube'
import getDataDatabase from '../controllers/getDataDatabase'
import config from 'config'
const keyAPI = config.get("keyAPI")
import { loadClientSecrets } from "../helpers/youtube"
import { LoginTicket } from "google-auth-library/build/src/auth/loginticket";
import { google } from 'googleapis'
var service = google.youtube('v3');


router.post("/add_channel", async (req, res) => {
    try {
        let { id_channel } = req.body
        let result = await insertDataYoutube.addChannel(id_channel)
        return res.json({ result })
    } catch (error) {
        throw error
    }
})

// get thông tin channel sau đó get all video của kênh
router.get("/infor_channel", async (req, res) => {
    try {
        let result = await getDataDatabase.getDataChannelByIdChannelNotUsed()
        if (result.length > 0) {
            result.forEach(element => {
                async function getChannel(auth) {

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
            setTimeout(() => {
                res.redirect("/crawl/infor_all_video_by_channel")
            }, 5000);
        } else {
            res.json({ "Status": "Không có dữ liệu channel thích hợp" })
        }
    } catch (error) {
        throw error
    }
})

router.get("/infor_all_video_by_channel", async (req, res) => {
    try {
        let result = await getDataDatabase.getDataAllVideoByIdChannelNotUsed()
        if (result.length > 0) {
            result.forEach(element => {
                async function getAllVideoByChannelId(auth) {

                    let responseFirst = await service.search.list({
                        auth: auth,
                        oder: 'date',
                        part: 'snippet',
                        channelId: element.id_channel,
                        type: 'video',
                        maxResults: 50
                    });
                    var data = []
                    let itemVideoList = responseFirst.data.items
                    itemVideoList.forEach(e => {
                        data.push({
                            id_channel: element.id_channel,
                            id_video: e.id.videoId,
                            title: e.snippet.title,
                            description: e.snippet.description,
                            date_of_participation: e.snippet.publishedAt,
                            execution_time: new Date()
                        })
                    });

                    if (responseFirst.data.nextPageToken) {
                        let nextPage = responseFirst.data.nextPageToken
                        async function getDataCheckNextPageToken(nextPage) {
                            let responseNext = await service.search.list({
                                auth: auth,
                                oder: 'date',
                                part: 'snippet',
                                pageToken: nextPage,
                                channelId: element.id_channel,
                                type: 'video',
                                maxResults: 50
                            });
                            let itemVideoListNext = responseNext.data.items
                            itemVideoListNext.forEach(e => {
                                data.push({
                                    id_channel: element.id_channel,
                                    id_video: e.id.videoId,
                                    title: e.snippet.title,
                                    description: e.snippet.description,
                                    date_of_participation: e.snippet.publishedAt,
                                    execution_time: new Date()
                                })
                            });
                            if (responseNext.data.nextPageToken) {
                                setTimeout(() => {
                                    nextPage = responseNext.data.nextPageToken
                                    getDataCheckNextPageToken(nextPage)
                                }, 1000);
                            } else {
                                await insertDataYoutube.addListVideoByChannelId(element._id, data)
                            }
                        }
                        getDataCheckNextPageToken(nextPage)
                    } else {
                        await insertDataYoutube.addListVideoByChannelId(element._id, data)
                    }
                }
                loadClientSecrets(getAllVideoByChannelId)
            })
            res.json({ "Status": "Get data result" })
        } else {
            res.json({ "Status": "Không có dữ liệu channel thích hợp" })
        }
    } catch (error) {
        throw error
    }
})

//get các playlist của channel sau đó get từng video của mỗi playlist
router.get("/infor_playlist_by_channel", async (req, res) => {
    try {
        let result = await getDataDatabase.getDataPlaylistByIdChannelNotUsed()
        if (result.length > 0) {
            result.forEach(element => {
                async function playlistsListByChannelId(auth) {
                    setTimeout(async () => {
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
                            await insertDataYoutube.addPlaylistByChannelId(element._id, totalPlaylist, data)
                        }
                    }, 1000);
                }
                loadClientSecrets(playlistsListByChannelId)
            });
            setTimeout(() => {
                res.redirect("/crawl/infor_video_by_playlist")
            }, 5000);
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
                    setTimeout(async () => {
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
                            await insertDataYoutube.addItemVideoByPlaylistId(element._id, data)
                        }
                    }, 1000);
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

// get thông tin từng video của channel sau đó get video liên quan
router.get("/infor_video_by_channel", async (req, res) => {
    try {
        var result = await getDataDatabase.getDataDetailVideoListChannelNotUsed()
        let idVideo = ''
        let listIdVideo = []
        let idVideoNew = ''
        let count = 0

        function getDataVideoLessFifty(listIdVideoLessFifty) {
            idVideo = ''
            listIdVideoLessFifty.forEach(e => {
                idVideo += `,${e.id_video}`
            })
            idVideoNew = idVideo.slice(1)

            async function videoDetailLessByChannal(auth) {
                setTimeout(async () => {
                    let response = await service.videos.list({
                        auth: auth,
                        part: 'snippet,contentDetails,statistics',
                        id: idVideoNew
                    });
                    let listDetailVideo = response.data.items
                    listDetailVideo.forEach(async e => {
                        let data = {
                            id_video: e.id,
                            title: e.snippet.title,
                            description: e.snippet.description,
                            tags: e.snippet.tags,
                            view_count: Number(e.statistics.viewCount),
                            comment_count: Number(e.statistics.commentCount),
                            like_count: Number(e.statistics.likeCount),
                            dislike_count: Number(e.statistics.dislikeCount)
                        }
                        await insertDataYoutube.updateFullDataDetailVideoByChannel(data)
                    })
                    setTimeout(() => {
                        res.redirect("/crawl/infor_video_related_by_video")
                    }, 5000);
                }, 1000);
            }
            loadClientSecrets(videoDetailLessByChannal)
        }

        if (result.length > 0 && result.length < 50) {
            getDataVideoLessFifty(result)
        } else if (result.length > 50) {
            result.forEach(e => {
                count++
                idVideo += `,${e.id_video}`
                if (count == 50) {
                    count = 0
                    idVideoNew = idVideo.slice(1)
                    listIdVideo.push(idVideoNew)
                    idVideo = ''
                }
            })

            listIdVideo.forEach(elem => {
                async function videoDetailByChannal(auth) {
                    let responseL = await service.videos.list({
                        auth: auth,
                        part: 'snippet,contentDetails,statistics',
                        id: elem
                    });
                    let listDetailVideoL = responseL.data.items
                    listDetailVideoL.forEach(async e => {
                        let dataL = {
                            id_video: e.id,
                            title: e.snippet.title,
                            description: e.snippet.description,
                            tags: e.snippet.tags,
                            view_count: Number(e.statistics.viewCount),
                            comment_count: Number(e.statistics.commentCount),
                            like_count: Number(e.statistics.likeCount),
                            dislike_count: Number(e.statistics.dislikeCount)
                        }
                        await insertDataYoutube.updateFullDataDetailVideoByChannel(dataL)
                    })
                }
                loadClientSecrets(videoDetailByChannal)
            })

            setTimeout(async () => {
                let resultL = await getDataDatabase.getDataDetailVideoListChannelNotUsed()
                if (resultL.length > 0) {
                    getDataVideoLessFifty(resultL)
                }
            }, 5000);
        } else {
            res.json({ "Status": "Không có dữ liệu video thích hợp" })
        }
    } catch (error) {
        throw error
    }
})

router.get("/infor_video_related_by_video", async (req, res) => {
    let result = await getDataDatabase.getDataVideoRelatedNotUsed()
    if (result.length > 0) {
        result.forEach(element => {
            async function searchListRelatedVideos(auth) {
                setTimeout(async () => {
                    let response = await service.search.list({
                        auth: auth,
                        part: 'snippet',
                        maxResults: 50,
                        type: 'video',
                        relatedToVideoId: element.id_video
                    });
                    let listVideoRelated = response.data.items
                    let data = []
                    listVideoRelated.forEach(e => {
                        data.push({
                            id_channel: e.snippet.channelId,
                            id_video: e.id.videoId,
                            title: e.snippet.title,
                            description: e.snippet.description,
                            date_of_participation: e.snippet.publishedAt,
                        })
                    });
                    await insertDataYoutube.updateVideoRelatedByChannel(element._id, data)
                }, 1000);
            }
            loadClientSecrets(searchListRelatedVideos)
        })
        res.json({ "Status": "Get data video related success" })
    } else {
        res.json({ "Status": "Không có dữ liệu video thích hợp" })
    }
})

//get comment riêng
router.get("/infor_comment_by_video", async (req, res) => {
    let result = await getDataDatabase.getDataCommentVideoListChannelNotUsed()
    if (result.length > 0) {
        result.forEach(element => {
            let pageToken = ''
            let data = []
            async function commentThreadsListByVideoId() {
                setTimeout(async () => {
                    let response = await service.commentThreads.list({
                        part: 'snippet,replies',
                        maxResults: 100,
                        videoId: element.id_video,
                        pageToken: pageToken,
                        key: keyAPI
                    });
                    let listComment = response.data.items
                    listComment.forEach(e => {
                        data.push({
                            id_video: e.snippet.videoId,
                            id_comment: e.id,
                            content: e.snippet.topLevelComment.snippet.textOriginal,
                            date_of_participation: e.snippet.topLevelComment.snippet.publishedAt,
                            auth_channel_id: e.snippet.topLevelComment.snippet.authorChannelId.value,
                            auth_name: e.snippet.topLevelComment.snippet.authorDisplayName
                        })
                    })
                    if (response.data.nextPageToken) {
                        pageToken = response.data.nextPageToken
                        commentThreadsListByVideoId()
                    } else {
                        await insertDataYoutube.addListCommentByVideo(element._id, data)
                        data = []
                    }
                }, 1000);
            }
            loadClientSecrets(commentThreadsListByVideoId)
        })
        res.json({ "Status": "Crawl comment ..." })
    } else {
        res.json({ "Status": "Không có dữ liệu video thích hợp" })
    }
})

module.exports = router