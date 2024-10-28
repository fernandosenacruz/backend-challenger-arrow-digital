import axios from 'axios';
import { PostReddit } from '../interfaces/Post';
import toISODate from '../utils/toISODate';

export const fetchHotPosts = async () => {
  const response = await axios.get('https://api.reddit.com/r/artificial/hot');
  return response.data.data.children.map((post: PostReddit) => ({
    id: post.data.id,
    title: post.data.title,
    author: post.data.author,
    created_utc: toISODate(post.data.created_utc),
    ups: post.data.ups,
    num_comments: post.data.num_comments,
  }));
};
