import dotenv from 'dotenv';

dotenv.config();

interface Environment {
  PORT: string | number;
  BASE_URL?: string;
  MONGO_URL?: string;
}

export const loadVariables = (): Environment => {
  const PORT = process.env.PORT ?? 3000;
  const MONGO_URL = process.env.MONGO_URL;
  const BASE_URL = process.env.BASE_URL;

  return {
    PORT,
    MONGO_URL,
    BASE_URL,
  };
};
