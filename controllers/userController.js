const { User, Comment } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Sorry, there is no user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

      createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },

      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Sorry, there is not user with this id!' })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
        },

      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Sorry, there is no user with that ID' })
              : Comment.deleteMany({ _id: { $in: user.comments } })
          )
          .then(() => res.json({ message: 'User and associated thoughts have been deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
}