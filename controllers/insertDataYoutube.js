import ChannelSchema from "../models/Channel"
import PlaylistSchema from "../models/Playlist"
import VideoByPlaylist from "../models/VideoByPlaylist"
import VideoByChannel from "../models/VideoByChannel"
import CommentByVideo from "../models/CommentByVideo"

const addChannel = async data => {
    try {
        let result = await ChannelSchema.create({ id_channel: data })
        return result
    } catch (error) {
        throw error
    }
}

const updateInformationChannel = async (id, data) => {
    try {
        let result = await ChannelSchema.updateOne(
            { _id: id },
            {
                $set: {
                    title: data.snippet.title,
                    description: data.snippet.description,
                    keyword: data.snippet.customUrl,
                    date_of_participation: data.snippet.publishedAt,
                    location: data.snippet.country,
                    view_count: data.statistics.viewCount,
                    comment_count: data.statistics.commentCount,
                    subscriber_count: data.statistics.subscriberCount,
                    related_playlists: data.contentDetails.relatedPlaylists.uploads,
                    used_get_channel: true,
                    execution_time: new Date(),
                }
            }
        )
        return result
    } catch (error) {
        throw error
    }
}

const addPlaylistByChannelId = async (id, toTalPlaylist, data) => {
    try {
        let totalCountPlaylist = Number(toTalPlaylist)
        await ChannelSchema.updateOne(
            { _id: id },
            {
                $set: {
                    total_count_playlist: totalCountPlaylist,
                    used_get_playlist: true
                }
            }
        )
        let result = await PlaylistSchema.insertMany(data)
        return result
    } catch (error) {
        throw error
    }
}

const addItemVideoByPlaylistId = async (id, data) => {
    try {
        await PlaylistSchema.updateOne(
            { _id: id },
            {
                $set: {
                    used_get_item_playlist: true
                }
            }
        )
        let result = await VideoByPlaylist.insertMany(data)
        return result
    } catch (error) {
        throw error
    }
}

const addListVideoByChannelId = async (id, data) => {
    try {
        await ChannelSchema.updateOne(
            { _id: id },
            {
                $set: {
                    used_get_all_video: true
                }
            }
        )
        let result = await VideoByChannel.insertMany(data)
        return result
    } catch (error) {
        throw error
    }
}

const updateFullDataDetailVideoByChannel = async (data) => {
    try {
        let result = await VideoByChannel.updateOne(
            {
                id_video: data.id_video,
                used_get_full_data: false
            },
            {
                $set: {
                    title: data.title,
                    description: data.description,
                    tags: data.tags,
                    view_count: data.view_count,
                    comment_count: data.comment_count,
                    like_count: data.like_count,
                    dislike_count: data.dislike_count,
                    used_get_full_data: true
                }
            }
        )
        return result
    } catch (error) {
        throw error
    }
}

const updateVideoRelatedByChannel = async (id, data) => {
    try {
        let result = await VideoByChannel.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    video_suggestion: data
                }
            }
        )
        return result
    } catch (error) {
        throw error
    }
}

const addListCommentByVideo = async (id, data) => {
    try {
        await VideoByChannel.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    used_get_comment: true
                }
            }
        )
        let result = CommentByVideo.insertMany(data)
        return result
    } catch (error) {
        throw error
    }
}
module.exports = {
    addChannel,
    updateInformationChannel,
    addPlaylistByChannelId,
    addItemVideoByPlaylistId,
    addListVideoByChannelId,
    updateFullDataDetailVideoByChannel,
    updateVideoRelatedByChannel,
    addListCommentByVideo
}