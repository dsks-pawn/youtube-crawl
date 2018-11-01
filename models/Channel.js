import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ChannelSchema = Schema({
    id_channel: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    keyword: {
        type: String,
        default: null
    },
    date_of_participation: {
        type: String,
        default: null
    },
    location: {
        type: String,
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
    subscriber_count: {
        type: Number,
        default: null
    },
    related_playlists: {
        type: String,
        default: null
    },
    total_count_playlist:{
        type: Number,
        default: null
    },
    used_get_channel: {
        type: Boolean,
        required: true,
        default: false
    },
    used_get_playlist: {
        type: Boolean,
        required: true,
        default: false
    },
    used_get_all_video: {
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
module.exports = mongoose.model('Channel', ChannelSchema)