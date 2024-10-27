import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017/test';

// Middlewares
app.use(express.json());

// Conexão ao MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro de conexão:', err));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
