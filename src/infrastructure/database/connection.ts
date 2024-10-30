import mongoose from 'mongoose';

export const connectToDatabase = async (db_url: string | undefined) => {
  if (!db_url) throw new Error('Variável de ambiente MONGO_URL não definida');

  return mongoose
    .connect(db_url)
    .then(() => console.log('Conectado ao banco de dados'))
    .catch((err) => console.error('Erro de conexão:', err));
};
