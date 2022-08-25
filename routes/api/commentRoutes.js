const router = require('express').Router();

const {
    getComments,
    getSingleComment,
    createComment,
    updateComment,
    deleteComment
} = require('../../controllers/commentController');

router.route('/').get(getComments).post(createComment);

router.route('/:commentId').get(getSingleComment).put(updateComment).delete(deleteComment);




module.exports = router;