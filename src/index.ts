import express from 'express';
import mongoose from 'mongoose';
import threadRoutes from './routes/thread';
import dotenv from 'dotenv';
import './cron/redditCron';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017/reddit_artificial';

app.use(express.json());
app.use('/api', threadRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => console.error('Erro de conexão:', err));
