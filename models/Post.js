const {model, Schema} = require('mongoose')
const postSchema = new Schema({
    caption: String,
    username: String,
    createdAt: String,
    image: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Post', postSchema)
