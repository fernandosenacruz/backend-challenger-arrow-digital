import express, { Request, Response } from 'express';
import cors from 'cors';
import { apiDocs, redocly, swagger } from './routes';
import { connectToDatabase } from './infrastructure/database/connection';
import threadRoutes from './routes/thread';
import { scheduleTask } from './infrastructure/cron/redditCron';
import { loadVariables } from './utils/envLoader';

export const app = express();

const startServer = async () => {
  const { PORT, BASE_URL, MONGO_URL } = loadVariables();
  if (!BASE_URL) throw new Error('Variável de ambiente BASE_URL não definida');

  app.use(express.json());
  app.use(cors());
  app.use('/api', apiDocs, redocly, swagger, threadRoutes);

  await connectToDatabase(MONGO_URL);

  app.get('/env', (_req: Request, res: Response) => {
    res.json({ BASE_URL });
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

  scheduleTask.start();

  if (process.env.NODE_ENV === 'test') scheduleTask.stop();
};

startServer();
