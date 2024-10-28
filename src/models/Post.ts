import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  created_utc: Number,
  ups: Number,
  num_comments: Number,
});

export const Post = mongoose.model('Post', postSchema);
