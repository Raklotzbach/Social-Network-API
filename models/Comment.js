const { Schema, model } = require('mongoose');

const commentSchema = new Schema (
    {
    commentText: { 
    type: String,
    required: true,
    minLength: 1,
    maxLength: 300,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    meta: {
        reactions: Number,
    },
    username: {
        type: String,
        required: true,
    },
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

commentSchema.virtual('reactionCount')
.get(function () {
    return this.meta.reactions;
});

const Comment = model('comment', commentSchema);

module.exports = Comment;