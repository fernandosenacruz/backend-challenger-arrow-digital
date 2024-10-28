import cron from 'node-cron';
import { fetchHotPosts } from '../services/redditService';
import { Post } from '../models/Post';
import { PostMongo } from '../interfaces/Post';

cron.schedule('0 9 * * *', async () => {
  // A tarefa será executada todos os dias às 9:00 UTC
  console.log('Executando tarefa agendada para buscar posts do subreddit artificial.');
  try {
    const posts = await fetchHotPosts();

    const operations = posts.map((post: PostMongo) => ({
      updateOne: {
        filter: { _id: post.id },
        update: { $set: post },
        upsert: true,
      },
    }));

    if (operations.length === 0)
      console.log('Nenhum post válido encontrado para salvar.');

    await Post.bulkWrite(operations);
    console.log('Postagens salvas ou atualizadas com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar postagens:', error);
  }
});
