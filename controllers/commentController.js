
const { User, Comment } = require('../models');

module.exports = {
    getComments(req,res) {
        Comment.find()
            .then((comment) => res.json(comment))
            .catch((err) => res.status(500).json(err));
    },

    // Get single comment
    getSingleComment(req, res) {
        Comment.findOne({ _id: req.params.commentId })
            .then((comment) => 
                !comment
                    ? res.status(404).json({ message: 'No thoughts found with that ID' })
                    : res.json(comment)
            )
            .catch((err) => res.status(500).json(err));
    },

    createComment(req, res) {
        Comment.create(req.body)
          .then((comment) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { comments: comment._id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Thought created, but no thoughts with this ID' })
              : res.json({ message: 'Thought created' })
          )
          .catch((err) => {
            console.error(err);
          });
      },

      updateComment(req, res) {
        Comment.findOneAndUpdate(
          { _id: req.params.commentId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((comment) =>
            !comment
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(comment)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
        },

        deleteComment(req, res) {
            Comment.findOneAndRemove({ _id: req.params.commentId })
              .then((comment) =>
                !comment
                  ? res.status(404).json({ message: 'No thought with this id!' })
                  : User.findOneAndUpdate(
                      { comments: req.params.commentId },
                      { $pull: { comments: req.params.commentId } },
                      { new: true }
                    )
              )
              .then((user) =>
                !user
                  ? res.status(404).json({
                      message: 'Thought created but no user with this id!',
                    })
                  : res.json({ message: 'Thought successfully deleted!' })
              )
              .catch((err) => res.status(500).json(err));
          },
}