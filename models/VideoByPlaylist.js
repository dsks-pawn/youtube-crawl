import mongoose from 'mongoose'
const Schema = mongoose.Schema

const VideoByPlaylistSchema = Schema({
    id_channel: {
        type: String,
        required: true
    },
    id_playlist: {
        type: String,
        required: true
    },
    id_video: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date_of_participation: {
        type: String,
        default: null
    },
    tags: {
        type: Array,
        default: null
    },
    view_count: {
        type: Number,
        default: null
    },
    comment_count: {
        type: Number,
        default: null
    },
    like_count: {
        type: Number,
        default: null
    },
    dislike_count: {
        type: Number,
        default: null
    },
    used_get_full_data: {
        type: Boolean,
        required: true,
        default: false
    },
    used_get_video_suggestion: {
        type: Boolean,
        required: true,
        default: false
    },
    execution_time: {
        type: Date,
        default: null
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('VideoByPlaylist', VideoByPlaylistSchema)