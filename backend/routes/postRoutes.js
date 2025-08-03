const express = require('express');
const { createPost, getAllPosts, getUserPosts } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getAllPosts);
router.get('/user/:userId', getUserPosts);

module.exports = router;
