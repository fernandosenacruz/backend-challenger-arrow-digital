import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './routes/posts';
import './cron/redditCron';

const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017/test';

app.use(express.json());
app.use('/api', postRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Erro de conexão:', err));
