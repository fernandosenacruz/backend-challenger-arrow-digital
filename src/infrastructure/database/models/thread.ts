import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  _id: String,
  title: String,
  author: String,
  created_utc: String,
  ups: Number,
  num_comments: Number,
});

export const Thread = mongoose.model('Thread', threadSchema);
