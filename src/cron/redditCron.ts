import cron from 'node-cron';
import { fetchHotThreads } from '../services/redditService';
import { Thread } from '../models/thread';
import { ThreadMongo } from '../interfaces/Thread';

cron.schedule('0 9 * * *', async () => {
  // A tarefa será executada todos os dias às 9:00 UTC
  console.log('Executando tarefa agendada para buscar threads do subreddit artificial.');
  try {
    const threads = await fetchHotThreads();

    const operations = threads.map((thread: ThreadMongo) => ({
      updateOne: {
        filter: { _id: thread.id },
        update: { $set: thread },
        upsert: true,
      },
    }));

    if (operations.length === 0)
      console.log('Nenhum threads válido encontrado para salvar.');

    await Thread.bulkWrite(operations);
    console.log('Threads salvas ou atualizadas com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar threads:', error);
  }
});
