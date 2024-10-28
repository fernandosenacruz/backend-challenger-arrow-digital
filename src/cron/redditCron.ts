import cron from 'node-cron';
import { fetchHotPosts } from '../services/redditService';
import { Post } from '../models/Post';

cron.schedule('0 9 * * *', async () => {
  // A tarefa será executada todos os dias às 9:00 UTC
  console.log('Executando tarefa agendada para buscar posts do subreddit artificial.');
  try {
    const posts = await fetchHotPosts();
    await Post.insertMany(posts);
    console.log('Postagens salvas com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar postagens:', error);
  }
});
