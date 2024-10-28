import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  _id: String,
  title: String,
  author: String,
  created_utc: String,
  ups: Number,
  num_comments: Number,
});

export const Post = mongoose.model('Post', postSchema);
