import express from 'express';
import { Post } from '../models/Post';

const router = express.Router();

router.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

export default router;
