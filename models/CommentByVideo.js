import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommentByVideoSchema = Schema({
    id_video: {
        type: String
    },
    id_comment: {
        type: String
    },
    content: {
        type: String
    },
    date_of_participation: {
        type: String
    },
    auth_channel_id: {
        type: String
    },
    auth_name:{
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('CommentByVideo', CommentByVideoSchema)