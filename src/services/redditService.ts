import axios from 'axios';
import { ThreadReddit } from '../interfaces/Thread';
import toISODate from '../utils/toISODate';

export const fetchHotThreads = async () => {
  const response = await axios.get('https://api.reddit.com/r/artificial/hot');
  return response.data.data.children.map((thread: ThreadReddit) => ({
    id: thread.data.id,
    title: thread.data.title,
    author: thread.data.author,
    created_utc: toISODate(thread.data.created_utc),
    ups: thread.data.ups,
    num_comments: thread.data.num_comments,
  }));
};
