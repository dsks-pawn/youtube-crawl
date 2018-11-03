import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PlaylistSchema = Schema({
    id_channel: {
        type: String,
        required: true
    },
    id_playlist: {
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
    videos_count: {
        type: Number,
        required: true
    },
    view_count: {
        type: Number,
        default: null
    },
    used_get_item_playlist: {
        type: Boolean,
        required: true,
        default: false
    },
    last_update: {
        type: String,
        default: null
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Playlist', PlaylistSchema)