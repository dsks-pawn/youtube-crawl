import ChannelSchema from "../models/Channel"
import PlaylistSchema from "../models/Playlists"

const getDataChannelByIdChannelNotUsed = async () => {
    try {
        let result = await ChannelSchema.find({ used_get_channel: false }).select({
            id_channel: 1,
        })
        return result
    } catch (error) {
        throw error
    }
}
const getDataAllVideoByIdChannelNotUsed = async () => {
    try {
        let result = await ChannelSchema.find({ used_get_all_video: false }).select({
            id_channel: 1,
        })
        return result
    } catch (error) {
        throw error
    }
}

const getDataPlaylistByIdChannelNotUsed = async () => {
    try {
        let result = await ChannelSchema.find({ used_get_playlist: false }).select({
            id_channel: 1,
        })
        return result
    } catch (error) {
        throw error
    }
}

const getDataPlaylistByIdPlaylistNotUsed = async () => {
    try {
        let result = await PlaylistSchema.find({ used_get_item_playlist: false }).select({
            id_channel: 1,
            id_playlist: 1
        })
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    getDataChannelByIdChannelNotUsed,
    getDataAllVideoByIdChannelNotUsed,
    getDataPlaylistByIdChannelNotUsed,
    getDataPlaylistByIdPlaylistNotUsed,
}