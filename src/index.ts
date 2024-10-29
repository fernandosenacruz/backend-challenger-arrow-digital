import express from 'express';
import cors from 'cors';
import { apiDocs, redocly, swagger } from './routes';
import { connectToDatabase } from './infrastructure/database/connection';
import threadRoutes from './routes/thread';
import './infrastructure/cron/redditCron';
import { loadVariables } from './utils/envLoader';

const startServer = async () => {
  const { PORT, BASE_URL, MONGO_URL } = loadVariables();
  if (!BASE_URL) throw new Error('Variável de ambiente BASE_URL não definida');

  const app = express();
  app.use(express.json(), cors());
  app.use('/api', apiDocs, redocly, swagger, threadRoutes);

  await connectToDatabase(MONGO_URL);

  app.get(
    '/env',
    (_req: any, res: { json: (arg0: { BASE_URL: string }) => any }) =>
      res.json({ BASE_URL })
  );
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

startServer();
