import axios from 'axios';
import { Post } from '../interfaces/Post';

export const fetchHotPosts = async () => {
  const response = await axios.get('https://api.reddit.com/r/artificial/hot');
  return response.data.data.children.map((post: Post) => ({
    title: post.data.title,
    author: post.data.author,
    created_utc: post.data.created_utc,
    ups: post.data.ups,
    num_comments: post.data.num_comments,
  }));
};