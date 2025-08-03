const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body; 
    const post = await Post.create({
      content,
      image: image || null,
      author: req.user,
    });

    await post.populate('author', 'name profilePic title'); 

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name profilePic title') 
      .sort({ createdAt: -1 });

    const enrichedPosts = posts.map(post => ({
      _id: post._id,
      content: post.content,
      image: post.image,
      createdAt: post.createdAt,
      likes: post.likes?.length || 0,
      author: post.author,
    }));

    res.json(enrichedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId })
      .populate('author', 'name profilePic title')
      .sort({ createdAt: -1 });

    const enrichedPosts = posts.map(post => ({
      _id: post._id,
      content: post.content,
      image: post.image,
      createdAt: post.createdAt,
      likes: post.likes?.length || 0,
      author: post.author,
    }));

    res.json(enrichedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
};

