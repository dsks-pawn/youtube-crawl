import ChannelSchema from "../models/Channel"
import PlaylistSchema from "../models/Playlists"
import VideoByPlaylistSchema from "../models/VideoByPlaylist"

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

const updateTotalCountPlaylistByChannel = async (idChannel, data) => {
    let totalCountPlaylist = Number(data)
    try {
        let result = await ChannelSchema.updateOne(
            { id_channel: idChannel },
            {
                $set: {
                    total_count_playlist: totalCountPlaylist,
                    used_get_playlist: true
                }
            }
        )
        return result
    } catch (error) {
        throw error
    }
}

const addPlaylistByChannelId = async (data) => {
    try {
        let result = await PlaylistSchema.insertMany(data)
        return result
    } catch (error) {
        throw error
    }
}

const addItemVideoByPlaylistId = async (data) => {
    try {
        let result = await VideoByPlaylistSchema.insertMany(data)
        return result
    } catch (error) {
        throw error
    }
}

const updateStatusUsedGetItemPlaylist = async (idPlaylist) => {
    try {
        let result = await PlaylistSchema.updateOne(
            { id_playlist: idPlaylist },
            {
                $set: {
                    used_get_video_suggestion: true
                }
            }
        )
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    addChannel,
    updateInformationChannel,
    addPlaylistByChannelId,
    updateTotalCountPlaylistByChannel,
    addItemVideoByPlaylistId,
    updateStatusUsedGetItemPlaylist
}